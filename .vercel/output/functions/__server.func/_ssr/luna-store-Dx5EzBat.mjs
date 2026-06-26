import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-nNVda_Oo.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/luna-store-Dx5EzBat.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var DRAFT = "luna_signup_draft";
function getDraft() {
	if (typeof window === "undefined") return {};
	try {
		const raw = localStorage.getItem(DRAFT);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}
function setDraft(patch) {
	if (typeof window === "undefined") return;
	const next = {
		...getDraft(),
		...patch
	};
	localStorage.setItem(DRAFT, JSON.stringify(next));
}
function clearDraft() {
	if (typeof window === "undefined") return;
	localStorage.removeItem(DRAFT);
}
function normalizeAccountType(value) {
	if (typeof value !== "string") return null;
	const normalized = value.trim().toLowerCase();
	return normalized === "woman" || normalized === "partner" ? normalized : null;
}
function normalizeExperienceMode(value) {
	if (typeof value !== "string") return null;
	const normalized = value.trim().toLowerCase();
	return normalized === "solo" || normalized === "couple" ? normalized : null;
}
function metadataValue(authUser, key) {
	return authUser.user_metadata?.[key];
}
async function loadLunaUser(authUser) {
	const { data, error } = await supabase.from("profiles").select("display_name, account_type, experience_mode, avatar_url, partner_code, partner_id, connected_since").eq("id", authUser.id).single();
	if (error) throw new Error(`Unable to load Luna profile: ${error.message}`);
	const profile = data;
	const accountType = normalizeAccountType(profile.account_type) ?? normalizeAccountType(metadataValue(authUser, "account_type"));
	if (!accountType) throw new Error("Your Luna profile is missing an account type. Please finish account setup.");
	const mode = normalizeExperienceMode(profile.experience_mode) ?? normalizeExperienceMode(metadataValue(authUser, "experience_mode")) ?? (accountType === "partner" ? "couple" : "solo");
	let partnerName = null;
	if (profile.partner_id) {
		const { data: p } = await supabase.from("profiles").select("display_name").eq("id", profile.partner_id).maybeSingle();
		partnerName = p?.display_name ?? null;
	}
	return {
		id: authUser.id,
		name: profile.display_name ?? authUser.user_metadata?.display_name ?? authUser.email ?? "Luna",
		email: authUser.email ?? "",
		accountType,
		mode,
		partnerCode: profile.partner_code ?? null,
		partnerId: profile.partner_id ?? null,
		partnerName,
		connectedSince: profile.connected_since ?? null,
		togetherSince: profile.connected_since ?? void 0
	};
}
var LunaUserContext = (0, import_react.createContext)(null);
function useLunaUserState() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [version, setVersion] = (0, import_react.useState)(0);
	const requestId = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const hydrate = async (authUser) => {
			const currentRequest = ++requestId.current;
			setLoading(true);
			setError(null);
			try {
				const u = await loadLunaUser(authUser);
				if (!cancelled && currentRequest === requestId.current) setUser(u);
			} catch (err) {
				if (!cancelled && currentRequest === requestId.current) {
					setUser(null);
					setError(err instanceof Error ? err.message : "Unable to load Luna profile.");
				}
			} finally {
				if (!cancelled && currentRequest === requestId.current) setLoading(false);
			}
		};
		const sync = async () => {
			setLoading(true);
			setError(null);
			const { data, error: authError } = await supabase.auth.getUser();
			if (cancelled) return;
			if (authError || !data.user) {
				setUser(null);
				setError(authError?.message ?? null);
				setLoading(false);
				return;
			}
			hydrate(data.user);
		};
		sync();
		const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT" || !session?.user) {
				requestId.current += 1;
				setUser(null);
				setError(null);
				setLoading(false);
				return;
			}
			if (event === "SIGNED_IN" || event === "USER_UPDATED") hydrate(session.user);
		});
		return () => {
			cancelled = true;
			sub.subscription.unsubscribe();
		};
	}, [version]);
	return {
		user,
		loading,
		error,
		refresh: () => setVersion((v) => v + 1)
	};
}
function LunaUserProvider({ children }) {
	const value = useLunaUserState();
	return (0, import_react.createElement)(LunaUserContext.Provider, { value }, children);
}
function useLunaUser() {
	const ctx = (0, import_react.useContext)(LunaUserContext);
	if (ctx) return ctx;
	throw new Error("useLunaUser must be used inside LunaUserProvider");
}
async function signOut() {
	await supabase.auth.signOut();
}
//#endregion
export { signOut as a, setDraft as i, clearDraft as n, useLunaUser as o, getDraft as r, LunaUserProvider as t };
