import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-nNVda_Oo.js
function createSupabaseClient() {
	const SUPABASE_URL = "https://mthxmieyfzmybavklumo.supabase.co";
	const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_BFIRJF-9r2g_-r60TZcJsQ_sRji3vy5";
	console.log("SUPABASE URL:", SUPABASE_URL);
	console.log("SUPABASE KEY:", SUPABASE_PUBLISHABLE_KEY.slice(0, 20));
	return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
