import { a as signOut, o as useLunaUser } from "./_ssr/luna-store-Dx5EzBat.mjs";
import { i as require_jsx_runtime } from "./_libs/@radix-ui/react-label+[...].mjs";
import { _ as Navigate, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as LogOut, d as Settings, r as User, u as Shield } from "./_libs/lucide-react.mjs";
import { n as LunaCard, t as CardLabel } from "./_ssr/Card-B625H_H2.mjs";
import { t as PartnerSync } from "./_ssr/PartnerSync-BD8OchHA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.profile-CgXPyvem.js
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user, loading, refresh } = useLunaUser();
	const navigate = useNavigate();
	const logout = async () => {
		await signOut();
		navigate({ to: "/" });
	};
	if (loading) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-6 pb-28 pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Account"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Profile"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, {
				tone: "primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-16 w-16 place-items-center rounded-2xl border border-white/40 bg-white/20 text-2xl font-bold text-white backdrop-blur",
						children: user.name.charAt(0).toUpperCase()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: user.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs uppercase tracking-wider text-white/85",
						children: user.accountType === "partner" ? "❤️ Partner Mode" : user.mode === "couple" ? "❤️ Couple Mode · Woman" : "🌙 Solo Mode · Woman"
					})] })]
				})
			}),
			(user.mode === "couple" || user.accountType === "partner") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground",
					children: "Partner Connection"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerSync, {
					user,
					onChange: refresh
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, {
				className: "p-0 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" }),
						label: "Personal information"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5" }),
						label: "Privacy & sharing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5" }),
						label: "Preferences"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: logout,
				className: "mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card text-sm font-semibold text-destructive transition-colors hover:bg-destructive/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Log out"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-center text-xs text-muted-foreground",
				children: "Luna · v0.1 · Designed with care"
			})
		]
	});
}
function Row({ icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "flex w-full items-center gap-3 border-b border-border px-5 py-4 text-left last:border-b-0 hover:bg-muted/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1 text-sm font-medium text-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Soon" })
		]
	});
}
//#endregion
export { ProfilePage as component };
