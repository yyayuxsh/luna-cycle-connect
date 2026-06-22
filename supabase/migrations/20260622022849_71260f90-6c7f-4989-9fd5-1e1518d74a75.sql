CREATE POLICY "Partners can view linked partner's cycles"
ON public.cycles
FOR SELECT
TO authenticated
USING (
  user_id IN (
    SELECT p.partner_id FROM public.profiles p
    WHERE p.id = auth.uid() AND p.partner_id IS NOT NULL
  )
);