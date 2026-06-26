import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PhoneFrame-BBLDmFXX.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Mobile-first centered container. On mobile it fills the screen;
* on larger screens it shows a soft, premium-feeling phone-width column.
*/
function PhoneFrame({ children, className, background = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-svh w-full bg-[image:var(--gradient-soft)] flex items-stretch justify-center md:py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("relative w-full max-w-[440px] md:rounded-[2.5rem] md:shadow-[0_30px_80px_-30px_rgba(124,92,252,0.35)] overflow-hidden flex flex-col", background === "hero" ? "bg-[image:var(--gradient-hero)]" : background === "soft" ? "bg-[image:var(--gradient-soft)]" : "bg-background", className),
			children
		})
	});
}
//#endregion
export { PhoneFrame as t };
