
-- 1. Add new columns (partner_id already exists)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS partner_code TEXT,
  ADD COLUMN IF NOT EXISTS connected_since TIMESTAMPTZ;

-- 2. Code generator (avoids ambiguous chars)
CREATE OR REPLACE FUNCTION public.generate_partner_code()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code TEXT;
  i INT;
  exists_already BOOLEAN;
BEGIN
  LOOP
    code := 'LUNA';
    FOR i IN 1..2 LOOP
      code := code || substr(chars, 1 + floor(random() * length(chars))::int, 1);
    END LOOP;
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE partner_code = code) INTO exists_already;
    EXIT WHEN NOT exists_already;
  END LOOP;
  RETURN code;
END;
$$;

-- 3. Backfill codes for existing profiles
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT id FROM public.profiles WHERE partner_code IS NULL LOOP
    UPDATE public.profiles SET partner_code = public.generate_partner_code() WHERE id = r.id;
  END LOOP;
END $$;

-- 4. Unique constraint
CREATE UNIQUE INDEX IF NOT EXISTS profiles_partner_code_key ON public.profiles (partner_code);

-- 5. Update handle_new_user to populate code at signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, account_type, experience_mode, partner_code)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    NULLIF(NEW.raw_user_meta_data ->> 'account_type', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'experience_mode', ''),
    public.generate_partner_code()
  );
  RETURN NEW;
END;
$$;

-- 6. Ensure trigger exists on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. RLS: allow viewing a linked partner's profile
DROP POLICY IF EXISTS "Users can view linked partner profile" ON public.profiles;
CREATE POLICY "Users can view linked partner profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  id IN (SELECT partner_id FROM public.profiles WHERE id = auth.uid() AND partner_id IS NOT NULL)
);

-- 8. RPC: connect by code (atomic, links both sides)
CREATE OR REPLACE FUNCTION public.connect_partner_by_code(_code TEXT)
RETURNS public.profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me UUID := auth.uid();
  target public.profiles;
  ts TIMESTAMPTZ := now();
BEGIN
  IF me IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT * INTO target FROM public.profiles WHERE upper(partner_code) = upper(_code) LIMIT 1;
  IF target.id IS NULL THEN
    RAISE EXCEPTION 'Invalid invite code';
  END IF;
  IF target.id = me THEN
    RAISE EXCEPTION 'You cannot connect to your own code';
  END IF;
  IF target.partner_id IS NOT NULL AND target.partner_id <> me THEN
    RAISE EXCEPTION 'That code is already linked to another partner';
  END IF;

  UPDATE public.profiles SET partner_id = target.id, connected_since = ts WHERE id = me;
  UPDATE public.profiles SET partner_id = me, connected_since = ts WHERE id = target.id;

  RETURN target;
END;
$$;

GRANT EXECUTE ON FUNCTION public.connect_partner_by_code(TEXT) TO authenticated;

-- 9. RPC: regenerate own code
CREATE OR REPLACE FUNCTION public.regenerate_partner_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_code TEXT := public.generate_partner_code();
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  UPDATE public.profiles SET partner_code = new_code WHERE id = auth.uid();
  RETURN new_code;
END;
$$;

GRANT EXECUTE ON FUNCTION public.regenerate_partner_code() TO authenticated;

-- 10. RPC: disconnect
CREATE OR REPLACE FUNCTION public.disconnect_partner()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me UUID := auth.uid();
  current_partner UUID;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  SELECT partner_id INTO current_partner FROM public.profiles WHERE id = me;
  IF current_partner IS NOT NULL THEN
    UPDATE public.profiles SET partner_id = NULL, connected_since = NULL WHERE id = current_partner;
  END IF;
  UPDATE public.profiles SET partner_id = NULL, connected_since = NULL WHERE id = me;
END;
$$;

GRANT EXECUTE ON FUNCTION public.disconnect_partner() TO authenticated;
