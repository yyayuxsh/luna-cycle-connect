import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Card-B625H_H2.js
var import_jsx_runtime = require_jsx_runtime();
function LunaCard({ children, className, tone = "default" }) {
	const toneStyle = tone === "primary" ? {
		background: "var(--gradient-luna)",
		color: "white"
	} : tone === "rose" ? {
		background: "linear-gradient(135deg, var(--accent-rose), oklch(0.78 0.16 30))",
		color: "white"
	} : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]", tone !== "default" && "border-transparent shadow-[var(--shadow-elevated)]", className),
		style: toneStyle,
		children
	});
}
function CardLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
		children
	});
}
//#endregion
export { LunaCard as n, CardLabel as t };
