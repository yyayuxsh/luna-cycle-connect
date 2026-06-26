import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-nNVda_Oo.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as clearDraft, r as getDraft } from "./luna-store-Dx5EzBat.mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as PhoneFrame } from "./PhoneFrame-BBLDmFXX.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as LunaLogo } from "./LunaLogo-q3DXMkPx.mjs";
import { t as lovable } from "./lovable-Br2epuE7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-oee2spwP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SignupPage() {
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		password: "",
		confirm: ""
	});
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		if (!form.name || !form.email) return setError("Please complete all fields.");
		if (form.password.length < 6) return setError("Password must be at least 6 characters.");
		if (form.password !== form.confirm) return setError("Passwords do not match.");
		const draft = getDraft();
		const accountType = draft.accountType ?? "woman";
		const mode = draft.mode ?? (accountType === "partner" ? "couple" : "solo");
		setBusy(true);
		const { data, error: err } = await supabase.auth.signUp({
			email: form.email,
			password: form.password,
			options: {
				emailRedirectTo: `${window.location.origin}/home`,
				data: {
					display_name: form.name,
					account_type: accountType,
					experience_mode: mode
				}
			}
		});
		setBusy(false);
		if (err) {
			setError(err.message);
			return;
		}
		if (!data.session) {
			setError("Account created. Please check your email to confirm before signing in.");
			return;
		}
		clearDraft();
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
					to: "/account-type",
					className: "inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted",
					"aria-label": "Back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaLogo, { size: 44 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: "Create account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Start your Luna journey."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-8 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							value: form.name,
							onChange: (v) => setForm({
								...form,
								name: v
							}),
							placeholder: "Your name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							type: "email",
							value: form.email,
							onChange: (v) => setForm({
								...form,
								email: v
							}),
							placeholder: "you@example.com"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							type: "password",
							value: form.password,
							onChange: (v) => setForm({
								...form,
								password: v
							}),
							placeholder: "At least 6 characters"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Confirm password",
							type: "password",
							value: form.confirm,
							onChange: (v) => setForm({
								...form,
								confirm: v
							}),
							placeholder: "Re-enter password"
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
							children: busy ? "Creating…" : "Create account"
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
								"Already have an account?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "font-semibold text-primary",
									children: "Log in"
								})
							]
						})
					]
				})
			]
		})
	});
}
function Field({ label, value, onChange, placeholder, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "h-12 rounded-2xl border border-input bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/15"
		})]
	});
}
//#endregion
export { SignupPage as component };
