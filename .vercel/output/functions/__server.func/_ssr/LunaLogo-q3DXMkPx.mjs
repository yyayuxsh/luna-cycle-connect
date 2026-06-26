import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LunaLogo-q3DXMkPx.js
var import_jsx_runtime = require_jsx_runtime();
function LunaLogo({ className, size = 56, withWordmark = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative grid place-items-center rounded-2xl",
			style: {
				width: size,
				height: size,
				background: "var(--gradient-luna)",
				boxShadow: "var(--shadow-glow)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				width: size * .55,
				height: size * .55,
				viewBox: "0 0 24 24",
				fill: "none",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z",
					fill: "white"
				})
			})
		}), withWordmark && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-2xl font-bold tracking-tight text-foreground",
			children: "Luna"
		})]
	});
}
//#endregion
export { LunaLogo as t };
