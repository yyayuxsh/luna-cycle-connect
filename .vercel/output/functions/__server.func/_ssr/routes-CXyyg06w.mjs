import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as PhoneFrame } from "./PhoneFrame-BBLDmFXX.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as LunaLogo } from "./LunaLogo-q3DXMkPx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CXyyg06w.js
var import_jsx_runtime = require_jsx_runtime();
function Splash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, {
		background: "hero",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-1 flex-col items-center justify-between px-8 py-14 text-center text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-white/15 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[color:var(--accent-rose)]/40 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex w-full flex-col items-center gap-4 pt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaLogo, { size: 72 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 text-5xl font-bold tracking-tight",
							children: "Luna"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "max-w-xs text-lg font-light text-white/85",
							children: [
								"Understand Your Cycle.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Support Each Other."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 mt-10 flex w-full flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/account-type",
							className: "inline-flex h-14 items-center justify-center rounded-2xl bg-white text-base font-semibold text-primary shadow-[var(--shadow-elevated)] transition-transform active:scale-[0.98]",
							children: "Get Started"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "inline-flex h-14 items-center justify-center rounded-2xl border border-white/40 bg-white/10 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/15",
							children: "Log In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-white/70",
							children: "Private by default · Science-driven insights"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { Splash as component };
