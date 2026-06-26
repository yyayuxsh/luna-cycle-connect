//#region node_modules/.nitro/vite/services/ssr/assets/cycle-predictions-CADt63Ia.js
var DEFAULT_CYCLE_LENGTH = 28;
var DEFAULT_PERIOD_LENGTH = 5;
function parseISO(iso) {
	return /* @__PURE__ */ new Date(iso + "T00:00:00");
}
function toISO(d) {
	return d.toISOString().slice(0, 10);
}
function diffDays(aISO, bISO) {
	return Math.round((parseISO(bISO).getTime() - parseISO(aISO).getTime()) / 864e5);
}
function computePredictions(cycles) {
	if (!cycles.length) return {
		hasData: false,
		status: "none",
		canPredict: false,
		avgCycleLength: DEFAULT_CYCLE_LENGTH,
		avgPeriodLength: DEFAULT_PERIOD_LENGTH,
		lastPeriodStart: null,
		currentCycleDay: null,
		currentPhase: null,
		nextPeriodDate: null,
		daysUntilNextPeriod: null
	};
	const sortedDesc = [...cycles].sort((a, b) => b.period_start.localeCompare(a.period_start));
	const cycleLengths = sortedDesc.map((c) => c.cycle_length).filter((v) => typeof v === "number" && v > 0);
	const periodLengths = sortedDesc.map((c) => c.period_length).filter((v) => typeof v === "number" && v > 0);
	const completedCount = sortedDesc.filter((c) => !!c.period_end).length;
	const avgCycleLength = cycleLengths.length ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length) : DEFAULT_CYCLE_LENGTH;
	const avgPeriodLength = periodLengths.length ? Math.round(periodLengths.reduce((a, b) => a + b, 0) / periodLengths.length) : DEFAULT_PERIOD_LENGTH;
	const last = sortedDesc[0];
	const isOngoing = !last.period_end;
	const canPredict = !isOngoing && completedCount >= 2 && cycleLengths.length > 0;
	if (isOngoing) {
		const todayISO = toISO(/* @__PURE__ */ new Date());
		const dayIndex = diffDays(last.period_start, todayISO);
		const currentCycleDay = dayIndex >= 0 ? dayIndex + 1 : null;
		return {
			hasData: true,
			status: "ongoing",
			canPredict: false,
			avgCycleLength,
			avgPeriodLength,
			lastPeriodStart: last.period_start,
			currentCycleDay,
			currentPhase: "Menstrual",
			nextPeriodDate: null,
			daysUntilNextPeriod: null
		};
	}
	if (!canPredict) {
		const todayISO = toISO(/* @__PURE__ */ new Date());
		const dayIndex = diffDays(last.period_start, todayISO);
		const currentCycleDay = dayIndex >= 0 ? dayIndex + 1 : null;
		return {
			hasData: true,
			status: "insufficient",
			canPredict: false,
			avgCycleLength,
			avgPeriodLength,
			lastPeriodStart: last.period_start,
			currentCycleDay,
			currentPhase: null,
			nextPeriodDate: null,
			daysUntilNextPeriod: null
		};
	}
	const todayISO = toISO(/* @__PURE__ */ new Date());
	const dayIndex = diffDays(last.period_start, todayISO);
	const currentCycleDay = dayIndex >= 0 ? dayIndex + 1 : null;
	const nextStart = new Date(parseISO(last.period_start));
	nextStart.setDate(nextStart.getDate() + avgCycleLength);
	const nextPeriodDate = toISO(nextStart);
	const daysUntilNextPeriod = diffDays(todayISO, nextPeriodDate);
	let currentPhase = null;
	if (currentCycleDay) currentPhase = phaseForDay(currentCycleDay, avgCycleLength, avgPeriodLength);
	return {
		hasData: true,
		status: "ready",
		canPredict: true,
		avgCycleLength,
		avgPeriodLength,
		lastPeriodStart: last.period_start,
		currentCycleDay,
		currentPhase,
		nextPeriodDate,
		daysUntilNextPeriod
	};
}
function phaseForDay(day, cycleLength, periodLength) {
	const ovulationDay = Math.max(1, cycleLength - 14);
	if (day <= periodLength) return "Menstrual";
	if (day >= ovulationDay - 1 && day <= ovulationDay + 1) return "Ovulation";
	if (day < ovulationDay - 1) return "Follicular";
	return "Luteal";
}
function formatPredictionDate(iso) {
	return parseISO(iso).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
//#endregion
export { formatPredictionDate as n, computePredictions as t };
