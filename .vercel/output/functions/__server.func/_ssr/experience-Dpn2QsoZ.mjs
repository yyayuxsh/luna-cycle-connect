import { i as setDraft } from "./luna-store-Dx5EzBat.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as PhoneFrame } from "./PhoneFrame-BBLDmFXX.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Check, D as ArrowLeft, b as Heart, h as Moon } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experience-Dpn2QsoZ.js
var import_jsx_runtime = require_jsx_runtime();
function ExperiencePage() {
	const navigate = useNavigate();
	const pick = (mode) => {
		setDraft({ mode });
		navigate({ to: "/signup" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, {
		background: "soft",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col px-6 pb-10 pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account-type",
					className: "inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted",
					"aria-label": "Back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl font-bold tracking-tight text-foreground",
						children: "Choose Your Experience"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base text-muted-foreground",
						children: "You can change this anytime in settings."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
						onClick: () => pick("solo"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-7 w-7" }),
						emoji: "🌙",
						title: "Solo Mode",
						description: "Track your cycle privately with personalized insights and predictions.",
						features: [
							"100% private",
							"AI-powered predictions",
							"Daily check-ins"
						],
						gradient: "var(--gradient-luna)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
						onClick: () => pick("couple"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-7 w-7" }),
						emoji: "❤️",
						title: "Couple Mode",
						description: "Track your cycle and share selected insights with your partner.",
						features: [
							"Share what you choose",
							"Partner gets gentle nudges",
							"Stronger together"
						],
						gradient: "linear-gradient(135deg, var(--accent-rose), oklch(0.78 0.16 30))"
					})]
				})
			]
		})
	});
}
function ModeCard({ onClick, icon, emoji, title, description, features, gradient }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "group overflow-hidden rounded-3xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 px-5 py-5 text-white",
			style: { background: gradient },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-medium uppercase tracking-wider text-white/80",
				children: [
					emoji,
					" ",
					title.split(" ")[0]
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xl font-semibold",
				children: title
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: description
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2 text-sm text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-primary" }), f]
				}, f))
			})]
		})]
	});
}
//#endregion
export { ExperiencePage as component };
