import { r as __toESM } from "./_runtime.mjs";
import { t as cva } from "./_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as supabase } from "./_ssr/client-nNVda_Oo.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { o as useLunaUser } from "./_ssr/luna-store-Dx5EzBat.mjs";
import { i as require_jsx_runtime, n as Slot, t as Root } from "./_libs/@radix-ui/react-label+[...].mjs";
import { _ as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { T as CalendarDays, m as Pencil, p as Plus, s as Trash2, t as X, x as Droplet } from "./_libs/lucide-react.mjs";
import { n as LunaCard, t as CardLabel } from "./_ssr/Card-B625H_H2.mjs";
import { n as formatPredictionDate, t as computePredictions } from "./_ssr/cycle-predictions-CADt63Ia.mjs";
import { t as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.cycle-DOBlabwZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
function diffDaysInclusive(startISO, endISO) {
	const s = /* @__PURE__ */ new Date(startISO + "T00:00:00");
	const e = /* @__PURE__ */ new Date(endISO + "T00:00:00");
	return Math.round((e.getTime() - s.getTime()) / 864e5) + 1;
}
function diffDays(startISO, endISO) {
	const s = /* @__PURE__ */ new Date(startISO + "T00:00:00");
	const e = /* @__PURE__ */ new Date(endISO + "T00:00:00");
	return Math.round((e.getTime() - s.getTime()) / 864e5);
}
function formatDate(iso) {
	return (/* @__PURE__ */ new Date(iso + "T00:00:00")).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function todayISO() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function PredictionStat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-muted/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-base font-semibold",
			children: value
		})]
	});
}
function CyclePage() {
	const { user, loading: userLoading } = useLunaUser();
	const [cycles, setCycles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const load = async () => {
		setLoading(true);
		const { data, error } = await supabase.from("cycles").select("*").order("period_start", { ascending: false });
		if (error) toast.error(error.message);
		else setCycles(data ?? []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		if (user && user.accountType !== "partner") load();
		else setLoading(false);
	}, [user]);
	if (userLoading) return null;
	if (user && user.accountType === "partner") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/home" });
	const sortedAsc = (0, import_react.useMemo)(() => [...cycles].sort((a, b) => a.period_start.localeCompare(b.period_start)), [cycles]);
	const current = cycles[0] ?? null;
	const avgCycleLength = (0, import_react.useMemo)(() => {
		const vals = sortedAsc.map((c) => c.cycle_length).filter((v) => !!v);
		if (!vals.length) return null;
		return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
	}, [sortedAsc]);
	const prediction = (0, import_react.useMemo)(() => computePredictions(cycles), [cycles]);
	const handleDelete = async (id) => {
		if (!confirm("Delete this cycle record?")) return;
		const { error } = await supabase.from("cycles").delete().eq("id", id);
		if (error) return toast.error(error.message);
		toast.success("Cycle deleted");
		load();
	};
	const openNew = () => {
		setEditing(null);
		setModalOpen(true);
	};
	const openEdit = (c) => {
		setEditing(c);
		setModalOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-6 pb-28 pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Period tracking"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Your Cycle"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, {
				tone: "primary",
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/80",
						children: "Current Cycle"
					}) }),
					current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-2xl font-semibold",
							children: ["Started ", formatDate(current.period_start)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-white/85",
							children: [current.period_end ? `Period: ${current.period_length ?? "—"} days` : "Period ongoing", avgCycleLength ? ` · Avg cycle: ${avgCycleLength} days` : ""]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold",
							children: "No cycles yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-white/85",
							children: "Log your first period to get started."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: openNew,
				size: "lg",
				className: "h-14 rounded-2xl text-base font-semibold shadow-[var(--shadow-elevated)]",
				style: {
					background: "var(--gradient-luna)",
					color: "white"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-5 w-5" }), " Log Period"]
			}),
			prediction.status === "ongoing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Current Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base font-semibold",
					children: "Period Ongoing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Predictions will be available once you log your period end date."
				})
			] }),
			prediction.status === "insufficient" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Predictions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Log one more completed cycle to unlock predictions."
			})] }),
			prediction.canPredict && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Predictions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionStat, {
						label: "Cycle Day",
						value: prediction.currentCycleDay ? `Day ${prediction.currentCycleDay}` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionStat, {
						label: "Phase",
						value: prediction.currentPhase ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionStat, {
						label: "Next Period",
						value: prediction.nextPeriodDate ? formatPredictionDate(prediction.nextPeriodDate) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionStat, {
						label: "Days Remaining",
						value: prediction.daysUntilNextPeriod === null ? "—" : prediction.daysUntilNextPeriod >= 0 ? `${prediction.daysUntilNextPeriod} days` : `${Math.abs(prediction.daysUntilNextPeriod)} days late`
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Cycle History"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: [
						cycles.length,
						" ",
						cycles.length === 1 ? "record" : "records"
					]
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading…"
			}) }) : cycles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2 py-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Your cycle history will appear here."
				})]
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: cycles.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold leading-tight",
							children: [formatDate(c.period_start), c.period_end ? ` → ${formatDate(c.period_end)}` : ""]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: [c.period_length ? `${c.period_length}-day period` : "Period ongoing", c.cycle_length ? ` · ${c.cycle_length}-day cycle` : ""]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => openEdit(c),
							className: "grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground",
							"aria-label": "Edit cycle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleDelete(c.id),
							className: "grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
							"aria-label": "Delete cycle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})]
				}) }, c.id))
			})] }),
			modalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogPeriodModal, {
				existing: editing,
				allCycles: cycles,
				onClose: () => setModalOpen(false),
				onSaved: () => {
					setModalOpen(false);
					load();
				}
			})
		]
	});
}
function LogPeriodModal({ existing, allCycles, onClose, onSaved }) {
	const [start, setStart] = (0, import_react.useState)(existing?.period_start ?? todayISO());
	const [end, setEnd] = (0, import_react.useState)(existing?.period_end ?? "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async () => {
		if (!start) return toast.error("Period start date is required");
		if (end && end < start) return toast.error("End date must be after start date");
		setSaving(true);
		const period_length = end && start ? diffDaysInclusive(start, end) : null;
		const others = allCycles.filter((c) => c.id !== existing?.id);
		const prev = others.filter((c) => c.period_start < start).sort((a, b) => b.period_start.localeCompare(a.period_start))[0];
		const next = others.filter((c) => c.period_start > start).sort((a, b) => a.period_start.localeCompare(b.period_start))[0];
		const cycle_length = next ? diffDays(start, next.period_start) : null;
		const { data: auth } = await supabase.auth.getUser();
		if (!auth.user) {
			setSaving(false);
			return toast.error("Not signed in");
		}
		let error;
		if (existing) ({error} = await supabase.from("cycles").update({
			period_start: start,
			period_end: end || null,
			period_length,
			cycle_length
		}).eq("id", existing.id));
		else ({error} = await supabase.from("cycles").insert({
			user_id: auth.user.id,
			period_start: start,
			period_end: end || null,
			period_length,
			cycle_length
		}));
		if (error) {
			setSaving(false);
			return toast.error(error.message);
		}
		if (prev) await supabase.from("cycles").update({ cycle_length: diffDays(prev.period_start, start) }).eq("id", prev.id);
		setSaving(false);
		toast.success(existing ? "Cycle updated" : "Period logged");
		onSaved();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl bg-card p-6 shadow-[var(--shadow-elevated)]",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: existing ? "Edit Cycle" : "Log Period"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "start",
						children: "Period start"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "start",
						type: "date",
						value: start,
						max: todayISO(),
						onChange: (e) => setStart(e.target.value),
						className: "mt-1"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "end",
							children: "Period end (optional)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "end",
							type: "date",
							value: end,
							min: start,
							max: todayISO(),
							onChange: (e) => setEnd(e.target.value),
							className: "mt-1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Leave empty if your period is ongoing."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: save,
						disabled: saving,
						size: "lg",
						className: "h-12 rounded-2xl text-base font-semibold",
						style: {
							background: "var(--gradient-luna)",
							color: "white"
						},
						children: saving ? "Saving…" : existing ? "Save changes" : "Save period"
					})
				]
			})]
		})
	});
}
//#endregion
export { CyclePage as component };
