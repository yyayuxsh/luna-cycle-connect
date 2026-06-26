import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-nNVda_Oo.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { C as Check, S as Copy, a as Unlink, b as Heart, f as RefreshCw, v as Link2 } from "../_libs/lucide-react.mjs";
import { n as LunaCard, t as CardLabel } from "./Card-B625H_H2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PartnerSync-BD8OchHA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PartnerSync({ user, onChange }) {
	const [code, setCode] = (0, import_react.useState)(user.partnerCode ?? "");
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	if (!!user.partnerId) {
		const since = user.connectedSince ? new Date(user.connectedSince).toLocaleDateString(void 0, {
			year: "numeric",
			month: "long",
			day: "numeric"
		}) : null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, {
			tone: "rose",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mt-1 h-6 w-6 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white/80",
							children: "Connected"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mt-1 text-xl font-semibold",
							children: [user.partnerName ?? "Your partner", " ❤️"]
						}),
						since && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-white/85",
							children: ["Together since ", since]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: async () => {
								setBusy(true);
								const { error } = await supabase.rpc("disconnect_partner");
								setBusy(false);
								if (error) setMsg({
									type: "err",
									text: error.message
								});
								else onChange();
							},
							disabled: busy,
							className: "mt-4 inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unlink, { className: "h-4 w-4" }), " Disconnect"]
						}),
						msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-white/90",
							children: msg.text
						})
					]
				})]
			})
		});
	}
	if (user.accountType === "partner") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-6 w-6" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Connect with your partner" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-lg font-semibold",
					children: "Enter her invite code"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Ask her for the 6-character code from her Luna app."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (e) => setInput(e.target.value.toUpperCase()),
						placeholder: "LUNA7X",
						maxLength: 6,
						className: "flex-1 rounded-xl border border-border bg-background px-3 py-2 text-center text-base font-mono tracking-widest uppercase outline-none focus:border-primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy || input.length < 6,
						onClick: async () => {
							setBusy(true);
							setMsg(null);
							const { error } = await supabase.rpc("connect_partner_by_code", { _code: input.trim() });
							setBusy(false);
							if (error) setMsg({
								type: "err",
								text: error.message
							});
							else {
								setMsg({
									type: "ok",
									text: "Connected!"
								});
								setInput("");
								onChange();
							}
						},
						className: "rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition active:scale-95 disabled:opacity-50",
						children: "Connect"
					})]
				}),
				msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs " + (msg.type === "ok" ? "text-emerald-600" : "text-destructive"),
					children: msg.text
				})
			]
		})]
	}) });
	if (!code) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, {
		tone: "rose",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mt-1 h-6 w-6 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold",
						children: "Connect with your partner"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-white/85",
						children: "Share your invite code to start tracking together."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy,
						onClick: async () => {
							setBusy(true);
							const { data, error } = await supabase.rpc("regenerate_partner_code");
							setBusy(false);
							if (error) setMsg({
								type: "err",
								text: error.message
							});
							else if (data) setCode(data);
						},
						className: "mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[color:var(--accent-rose)] transition active:scale-95 disabled:opacity-60",
						children: "Generate Code"
					})
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, {
		tone: "rose",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mt-1 h-6 w-6 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/80",
						children: "Your invite code"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 rounded-2xl border border-white/40 bg-white/15 px-4 py-3 text-center text-2xl font-bold font-mono tracking-[0.3em] text-white backdrop-blur",
							children: code
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-white/85",
						children: "Share this code with your partner so they can connect."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: async () => {
								try {
									await navigator.clipboard.writeText(code);
									setCopied(true);
									setTimeout(() => setCopied(false), 1500);
								} catch {}
							},
							className: "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/15 px-3 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/25",
							children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), copied ? "Copied" : "Copy"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: busy,
							onClick: async () => {
								setBusy(true);
								setMsg(null);
								const { data, error } = await supabase.rpc("regenerate_partner_code");
								setBusy(false);
								if (error) setMsg({
									type: "err",
									text: error.message
								});
								else if (data) setCode(data);
							},
							className: "inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/15 px-3 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/25 disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), "New"]
						})]
					}),
					msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-white",
						children: msg.text
					})
				]
			})]
		})
	});
}
//#endregion
export { PartnerSync as t };
