import { o as useLunaUser } from "./_ssr/luna-store-Dx5EzBat.mjs";
import { i as require_jsx_runtime } from "./_libs/@radix-ui/react-label+[...].mjs";
import { _ as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as PartnerSync } from "./_ssr/PartnerSync-BD8OchHA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.partner-1orB9ihS.js
var import_jsx_runtime = require_jsx_runtime();
function PartnerPage() {
	const { user, loading, refresh } = useLunaUser();
	if (loading) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-6 pb-28 pt-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Couple Mode"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold tracking-tight",
			children: "Partner Sync ❤️"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerSync, {
			user,
			onChange: refresh
		})]
	});
}
//#endregion
export { PartnerPage as component };
