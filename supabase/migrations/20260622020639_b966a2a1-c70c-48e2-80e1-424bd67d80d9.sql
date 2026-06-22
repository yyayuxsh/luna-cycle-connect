
REVOKE ALL ON FUNCTION public.generate_partner_code() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.connect_partner_by_code(TEXT) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.regenerate_partner_code() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.disconnect_partner() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.connect_partner_by_code(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.regenerate_partner_code() TO authenticated;
GRANT EXECUTE ON FUNCTION public.disconnect_partner() TO authenticated;
