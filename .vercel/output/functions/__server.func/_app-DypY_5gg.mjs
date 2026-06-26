import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { o as useLunaUser, t as LunaUserProvider } from "./_ssr/luna-store-Dx5EzBat.mjs";
import { i as require_jsx_runtime } from "./_libs/@radix-ui/react-label+[...].mjs";
import { t as PhoneFrame } from "./_ssr/PhoneFrame-BBLDmFXX.mjs";
import { _ as Navigate, f as Outlet, g as Link, l as useRouterState } from "./_libs/@tanstack/react-router+[...].mjs";
import { b as Heart, p as Plus, r as User, w as Calendar, y as House } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-DypY_5gg.js
var import_jsx_runtime = require_jsx_runtime();
var womanItems = [
	{
		to: "/home",
		label: "Home",
		icon: House
	},
	{
		to: "/cycle",
		label: "Cycle",
		icon: Calendar
	},
	{
		to: "/checkin",
		label: "Check-In",
		icon: Plus,
		primary: true
	},
	{
		to: "/partner",
		label: "Partner",
		icon: Heart
	},
	{
		to: "/profile",
		label: "Profile",
		icon: User
	}
];
var partnerItems = [
	{
		to: "/home",
		label: "Home",
		icon: House
	},
	{
		to: "/partner",
		label: "Partner",
		icon: Heart,
		primary: true
	},
	{
		to: "/profile",
		label: "Profile",
		icon: User
	}
];
function BottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user } = useLunaUser();
	const items = user?.accountType === "partner" ? partnerItems : womanItems;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "sticky bottom-0 left-0 right-0 z-30 border-t border-border bg-background/85 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: cn("grid px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2", items.length === 3 ? "grid-cols-3" : "grid-cols-5"),
			children: items.map((it) => {
				const Icon = it.icon;
				const active = pathname === it.to;
				if (it.primary) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: it.to,
						className: "grid h-14 w-14 -translate-y-3 place-items-center rounded-2xl text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform active:scale-95",
						style: { background: "var(--gradient-luna)" },
						"aria-label": it.label,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
					})
				}, it.to);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: it.to,
					className: cn("flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-medium transition-colors", active ? "text-primary" : "text-muted-foreground hover:text-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), it.label]
				}) }, it.to);
			})
		})
	});
}
var WOMAN_ONLY = new Set(["/cycle", "/checkin"]);
function AppGate() {
	const { user, loading, error } = useLunaUser();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (loading) return null;
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-1 items-center justify-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-semibold tracking-tight",
			children: "Profile unavailable"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: error
		})] })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	if (user.accountType === "partner" && WOMAN_ONLY.has(pathname)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/home" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-1 flex-col overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})] });
}
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaUserProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, {
		background: "default",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppGate, {})
	}) });
}
//#endregion
export { AppLayout as component };
