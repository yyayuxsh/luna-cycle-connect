import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-nNVda_Oo.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as PhoneFrame } from "./PhoneFrame-BBLDmFXX.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as LunaLogo } from "./LunaLogo-q3DXMkPx.mjs";
import { t as lovable } from "./lovable-Br2epuE7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-wiu7ggik.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		email: "",
		password: ""
	});
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		if (!form.email || !form.password) return setError("Please enter your credentials.");
		setBusy(true);
		const { error: err } = await supabase.auth.signInWithPassword({
			email: form.email,
			password: form.password
		});
		setBusy(false);
		if (err) {
			setError(err.message);
			return;
		}
		navigate({ to: "/home" });
	};
	const onGoogle = async () => {
		setError(null);
		const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/home` });
		if (result.error) {
			setError(result.error.message ?? "Google sign-in failed.");
			return;
		}
		if (result.redirected) return;
		navigate({ to: "/home" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, {
		background: "default",
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
					className: "mt-6 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaLogo, { size: 56 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 text-3xl font-bold tracking-tight",
							children: "Welcome back"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Log in to continue your journey."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-10 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: form.email,
								onChange: (e) => setForm({
									...form,
									email: e.target.value
								}),
								placeholder: "you@example.com",
								className: "h-12 rounded-2xl border border-input bg-card px-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: form.password,
								onChange: (e) => setForm({
									...form,
									password: e.target.value
								}),
								placeholder: "Your password",
								className: "h-12 rounded-2xl border border-input bg-card px-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy,
							className: "mt-2 inline-flex h-14 items-center justify-center rounded-2xl text-base font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform active:scale-[0.98]",
							style: { background: "var(--gradient-luna)" },
							children: busy ? "Logging in…" : "Log in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-2 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
								" or ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onGoogle,
							className: "inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card text-sm font-semibold text-foreground transition-colors hover:bg-muted",
							children: "Continue with Google"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-center text-sm text-muted-foreground",
							children: [
								"New to Luna?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/account-type",
									className: "font-semibold text-primary",
									children: "Create an account"
								})
							]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
