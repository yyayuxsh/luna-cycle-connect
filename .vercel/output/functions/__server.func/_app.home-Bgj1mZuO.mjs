import { r as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-nNVda_Oo.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { o as useLunaUser } from "./_ssr/luna-store-Dx5EzBat.mjs";
import { i as require_jsx_runtime } from "./_libs/@radix-ui/react-label+[...].mjs";
import { _ as Navigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { T as CalendarDays, b as Heart, c as Sun, g as MessageCircleHeart, l as Sparkles, o as TrendingUp, x as Droplet } from "./_libs/lucide-react.mjs";
import { n as LunaCard, t as CardLabel } from "./_ssr/Card-B625H_H2.mjs";
import { n as formatPredictionDate, t as computePredictions } from "./_ssr/cycle-predictions-CADt63Ia.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.home-Bgj1mZuO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SoloHome({ user }) {
	const greeting = getGreeting();
	const [prediction, setPrediction] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data } = await supabase.from("cycles").select("*").order("period_start", { ascending: false });
			setPrediction(computePredictions(data ?? []));
		})();
	}, []);
	const p = prediction;
	const hasData = !!p?.hasData;
	const canPredict = !!p?.canPredict;
	const isOngoing = p?.status === "ongoing";
	const insufficient = p?.status === "insufficient";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-6 pb-28 pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [greeting, ","]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: [
					user.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl",
						children: "🌙"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, {
				tone: "primary",
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/80",
						children: "Current Phase"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-semibold",
							children: hasData && p?.currentPhase ? p.currentPhase : "—"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-white/85",
							children: isOngoing ? "Period Ongoing" : canPredict && p?.currentCycleDay ? `Day ${p.currentCycleDay} of ${p.avgCycleLength}` : insufficient ? "Log one more completed cycle to unlock predictions." : "Log a period to see your phase"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "h-10 w-10 text-white/80" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Current Cycle Day" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-xl font-semibold",
						children: hasData && p?.currentCycleDay ? `Day ${p.currentCycleDay}` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: canPredict ? `Cycle avg ${p?.avgCycleLength} days` : isOngoing ? "Period ongoing" : insufficient ? `Period length ${p?.avgPeriodLength} days` : "No cycles logged"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-6 w-6" })
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Next Period" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-xl font-semibold",
						children: canPredict && p?.daysUntilNextPeriod !== null && p?.daysUntilNextPeriod !== void 0 ? p.daysUntilNextPeriod >= 0 ? `in ${p.daysUntilNextPeriod} days` : `${Math.abs(p.daysUntilNextPeriod)} days late` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: canPredict && p?.nextPeriodDate ? `Estimated ${formatPredictionDate(p.nextPeriodDate)}` : isOngoing ? "Available after period ends" : insufficient ? "Log one more completed cycle to unlock" : "Log a period for predictions"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-6 w-6" })
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Average Cycle" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-xl font-semibold",
						children: canPredict ? `${p?.avgCycleLength} days` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: canPredict ? `Period avg ${p?.avgPeriodLength} days` : insufficient ? "Log one more completed cycle to unlock" : "Based on your history"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-6 w-6" })
				})]
			}) })
		]
	});
}
function getGreeting() {
	const h = (/* @__PURE__ */ new Date()).getHours();
	if (h < 12) return "Good morning";
	if (h < 18) return "Good afternoon";
	return "Good evening";
}
function CoupleHome({ user }) {
	const connected = !!user.partnerId;
	const womanName = user.accountType === "woman" ? user.name : user.partnerName ?? "Your partner";
	const partnerName = user.accountType === "woman" ? user.partnerName ?? "Your partner" : user.name;
	const days = user.connectedSince ? Math.max(1, Math.floor((Date.now() - new Date(user.connectedSince).getTime()) / (1e3 * 60 * 60 * 24))) : 0;
	const sinceLabel = user.connectedSince ? new Date(user.connectedSince).toLocaleDateString(void 0, {
		year: "numeric",
		month: "long",
		day: "numeric"
	}) : null;
	const [prediction, setPrediction] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data } = await supabase.from("cycles").select("*").order("period_start", { ascending: false });
			setPrediction(computePredictions(data ?? []));
		})();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-6 pb-28 pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Welcome back,"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: [
					user.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl",
						children: "❤️"
					})
				]
			})] }),
			!connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, {
				tone: "rose",
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-white/15 blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mt-1 h-6 w-6 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: "Connect With Your Partner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-white/90",
								children: user.accountType === "woman" ? "Share your invite code to start tracking together." : "Enter your partner's invite code to start tracking together."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/partner",
								className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[color:var(--accent-rose)] transition active:scale-95",
								children: user.accountType === "woman" ? "Generate Code" : "Enter Code"
							})
						]
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, {
				tone: "rose",
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-white/15 blur-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { label: womanName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-white/90" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { label: partnerName })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-4 text-2xl font-semibold",
						children: [
							womanName,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-light",
								children: "&"
							}),
							" ",
							partnerName
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-white/90",
						children: user.accountType === "woman" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Your partner: ",
							partnerName,
							" ❤️"
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Connected with ",
							partnerName,
							" ❤️"
						] })
					}),
					sinceLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-white/80",
						children: [
							"Together since ",
							sinceLabel,
							" · ",
							days,
							" days"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, {
				tone: "primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-white/80",
					children: "Current Phase"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: prediction?.currentPhase ?? (prediction?.status === "ongoing" ? "Menstrual" : "—")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-white/85",
						children: [prediction?.currentCycleDay ? `Day ${prediction.currentCycleDay}` : "Log a period to see your phase", prediction?.status === "ongoing" && " · Period ongoing"]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "h-9 w-9 text-white/80" })]
				})]
			}),
			prediction?.canPredict && prediction.nextPeriodDate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Next Period" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-xl font-semibold",
						children: prediction.daysUntilNextPeriod !== null && prediction.daysUntilNextPeriod >= 0 ? `in ${prediction.daysUntilNextPeriod} days` : formatPredictionDate(prediction.nextPeriodDate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: ["Estimated ", formatPredictionDate(prediction.nextPeriodDate)]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-6 w-6" })
				})]
			}) }),
			connected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircleHeart, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Partner Insights" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "mt-1 text-lg font-semibold",
						children: [
							"You and ",
							partnerName,
							" are in sync ❤️"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [partnerName, " can see your current phase and upcoming period from their app."]
					})
				] })]
			}) })
		]
	});
}
function Avatar({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/20 text-base font-semibold text-white backdrop-blur",
		children: label.charAt(0).toUpperCase()
	});
}
function PartnerDashboard({ user }) {
	const [cycles, setCycles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const load = async () => {
			if (!user.partnerId) {
				setLoading(false);
				return;
			}
			const { data } = await supabase.from("cycles").select("*").eq("user_id", user.partnerId).order("period_start", { ascending: false });
			if (cancelled) return;
			setCycles(data ?? []);
			setLoading(false);
		};
		load();
		return () => {
			cancelled = true;
		};
	}, [user.partnerId]);
	const partnerName = user.partnerName ?? "Your partner";
	const sinceLabel = user.connectedSince ? new Date(user.connectedSince).toLocaleDateString(void 0, {
		year: "numeric",
		month: "long",
		day: "numeric"
	}) : null;
	if (!user.partnerId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-6 pb-28 pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Welcome back,"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: [
					user.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl",
						children: "❤️"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, {
				tone: "rose",
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-white/15 blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mt-1 h-6 w-6 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: "Connect With Your Partner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-white/90",
								children: "Enter her invite code to start supporting her cycle together."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/partner",
								className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[color:var(--accent-rose)] transition active:scale-95",
								children: "Enter Code"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Partner mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Once you connect, you'll see her current cycle, phase, and gentle tips to support her — right here. You won't log periods yourself."
			})] })
		]
	});
	const prediction = computePredictions(cycles);
	const latest = cycles[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 px-6 pb-28 pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Welcome back,"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: [
					user.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl",
						children: "❤️"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, {
				tone: "rose",
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-white/15 blur-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/80",
						children: "Connected with"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-1 text-2xl font-semibold",
						children: [partnerName, " ❤️"]
					}),
					sinceLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-white/85",
						children: ["Together since ", sinceLabel]
					})
				]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading her cycle…"
			}) }) : !latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Her Cycle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [partnerName, " hasn't logged any cycle data yet. Once she does, you'll see her current phase and upcoming period here."]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, {
					tone: "primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/80",
						children: "Current Phase"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold",
							children: prediction.currentPhase ?? (prediction.status === "ongoing" ? "Menstrual" : "—")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-white/85",
							children: [prediction.currentCycleDay ? `Day ${prediction.currentCycleDay}` : "Awaiting more cycle data", prediction.status === "ongoing" && " · Period ongoing"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "h-9 w-9 text-white/80" })]
					})]
				}),
				prediction.canPredict && prediction.nextPeriodDate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Next Period" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 text-xl font-semibold",
							children: prediction.daysUntilNextPeriod !== null && prediction.daysUntilNextPeriod >= 0 ? `in ${prediction.daysUntilNextPeriod} days` : formatPredictionDate(prediction.nextPeriodDate)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: formatPredictionDate(prediction.nextPeriodDate)
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-6 w-6" })
					})]
				}) }),
				prediction.status === "insufficient" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LunaCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Predictions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [partnerName, " needs to log one more completed cycle before predictions become available."]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircleHeart, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Partner Insights" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 text-lg font-semibold",
							children: tipForPhase(prediction.currentPhase, prediction.status)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: detailForPhase(prediction.currentPhase, prediction.status, partnerName)
						})
					] })]
				}) })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LunaCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLabel, { children: "Partner mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"You're in support mode — only ",
						partnerName,
						" can log her periods. You'll always see her latest cycle here."
					]
				})] })]
			}) })
		]
	});
}
function tipForPhase(phase, status) {
	if (status === "ongoing") return "Be extra gentle today";
	switch (phase) {
		case "Menstrual": return "Be extra gentle today";
		case "Follicular": return "Energy is rising — plan something fun";
		case "Ovulation": return "Peak energy days";
		case "Luteal": return "Suggest a quiet night in";
		default: return "Check in with her today";
	}
}
function detailForPhase(phase, status, name) {
	if (status === "ongoing") return `${name} is on her period. A warm drink, comfort food, and patience go a long way.`;
	switch (phase) {
		case "Menstrual": return `${name} may have lower energy. Offer comfort, warmth, and a slower pace.`;
		case "Follicular": return `${name} likely feels more energetic and social. Great time for plans together.`;
		case "Ovulation": return `${name} may feel her most confident and connected. Enjoy quality time.`;
		case "Luteal": return `${name} may have lower energy this week. A warm meal and a movie would mean a lot.`;
		default: return `Send a thoughtful message to let ${name} know you're thinking of her.`;
	}
}
function HomePage() {
	const { user, loading } = useLunaUser();
	if (loading) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	if (user.accountType === "partner") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerDashboard, { user });
	if (user.mode === "couple") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoupleHome, { user });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoloHome, { user });
}
//#endregion
export { HomePage as component };
