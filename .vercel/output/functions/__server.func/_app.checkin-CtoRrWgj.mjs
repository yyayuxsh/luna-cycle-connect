import { o as useLunaUser } from "./_ssr/luna-store-Dx5EzBat.mjs";
import { i as require_jsx_runtime } from "./_libs/@radix-ui/react-label+[...].mjs";
import { _ as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { p as Plus } from "./_libs/lucide-react.mjs";
import { n as LunaCard } from "./_ssr/Card-B625H_H2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.checkin-CtoRrWgj.js
var import_jsx_runtime = require_jsx_runtime();
function PlaceholderTab({ title, subtitle, icon, message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-6 pb-28 pt-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: subtitle
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold tracking-tight",
			children: title
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3 py-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-16 w-16 place-items-center rounded-2xl text-white",
					style: { background: "var(--gradient-luna)" },
					children: icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold",
					children: "Coming soon"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xs text-sm text-muted-foreground",
					children: message
				})
			]
		}) })]
	});
}
function CheckinPage() {
	const { user, loading } = useLunaUser();
	if (loading) return null;
	if (user?.accountType === "partner") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/home" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderTab, {
		title: "Daily Check-In",
		subtitle: "How are you feeling today?",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-7 w-7" }),
		message: "Log mood, symptoms, energy and flow with quick taps. The daily check-in trains Luna's personalized insights."
	});
}
//#endregion
export { CheckinPage as component };
