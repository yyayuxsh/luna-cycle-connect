import { i as setDraft } from "./luna-store-Dx5EzBat.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as PhoneFrame } from "./PhoneFrame-BBLDmFXX.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ArrowLeft, E as ArrowRight, i as UserRound, n as Users } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-type-BnOObkZr.js
var import_jsx_runtime = require_jsx_runtime();
function AccountTypePage() {
	const navigate = useNavigate();
	const pick = (type) => {
		setDraft({ accountType: type });
		if (type === "woman") navigate({ to: "/experience" });
		else navigate({ to: "/signup" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, {
		background: "soft",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col px-6 pb-10 pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted",
					"aria-label": "Back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl font-bold tracking-tight text-foreground",
						children: "Who are you?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base text-muted-foreground",
						children: "We'll personalize Luna for your experience."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
						onClick: () => pick("woman"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-6 w-6" }),
						title: "Woman",
						description: "Track your cycle, log symptoms, and discover insights.",
						accent: "primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
						onClick: () => pick("partner"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6" }),
						title: "Partner",
						description: "Stay informed and supportive with shared insights.",
						accent: "rose"
					})]
				})
			]
		})
	});
}
function OptionCard({ onClick, icon, title, description, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "group flex items-center gap-4 rounded-3xl border border-border bg-card p-5 text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white",
				style: { background: accent === "primary" ? "var(--gradient-luna)" : "linear-gradient(135deg, var(--accent-rose), oklch(0.78 0.16 30))" },
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold text-foreground",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: description
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" })
		]
	});
}
//#endregion
export { AccountTypePage as component };
