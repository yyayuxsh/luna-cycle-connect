export type CycleRow = {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string | null;
  cycle_length: number | null;
  period_length: number | null;
  created_at: string;
  updated_at: string;
};

export type CyclePhase = "Menstrual" | "Follicular" | "Ovulation" | "Luteal";

export type CycleStatus = "none" | "ongoing" | "insufficient" | "ready";

export type CyclePrediction = {
  hasData: boolean;
  status: CycleStatus;
  canPredict: boolean;
  avgCycleLength: number;
  avgPeriodLength: number;
  lastPeriodStart: string | null;
  currentCycleDay: number | null;
  currentPhase: CyclePhase | null;
  nextPeriodDate: string | null;
  daysUntilNextPeriod: number | null;
};

const DEFAULT_CYCLE_LENGTH = 28;
const DEFAULT_PERIOD_LENGTH = 5;

function parseISO(iso: string) {
  return new Date(iso + "T00:00:00");
}
function toISO(d: Date) {
  return d.toISOString().slice(0, 10);
}
function diffDays(aISO: string, bISO: string) {
  return Math.round(
    (parseISO(bISO).getTime() - parseISO(aISO).getTime()) / 86400000,
  );
}

export function computePredictions(cycles: CycleRow[]): CyclePrediction {
  if (!cycles.length) {
    return {
      hasData: false,
      status: "none",
      canPredict: false,
      avgCycleLength: DEFAULT_CYCLE_LENGTH,
      avgPeriodLength: DEFAULT_PERIOD_LENGTH,
      lastPeriodStart: null,
      currentCycleDay: null,
      currentPhase: null,
      nextPeriodDate: null,
      daysUntilNextPeriod: null,
    };
  }

  const sortedDesc = [...cycles].sort((a, b) =>
    b.period_start.localeCompare(a.period_start),
  );

  const cycleLengths = sortedDesc
    .map((c) => c.cycle_length)
    .filter((v): v is number => typeof v === "number" && v > 0);
  const periodLengths = sortedDesc
    .map((c) => c.period_length)
    .filter((v): v is number => typeof v === "number" && v > 0);

  const completedCount = sortedDesc.filter((c) => !!c.period_end).length;

  const avgCycleLength = cycleLengths.length
    ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
    : DEFAULT_CYCLE_LENGTH;
  const avgPeriodLength = periodLengths.length
    ? Math.round(periodLengths.reduce((a, b) => a + b, 0) / periodLengths.length)
    : DEFAULT_PERIOD_LENGTH;

  const last = sortedDesc[0];
  const isOngoing = !last.period_end;
  // Medically, you need at least two completed cycles (one full gap between
  // two period starts where both periods have ended) before any cycle-length
  // based prediction is meaningful.
  const canPredict =
    !isOngoing && completedCount >= 2 && cycleLengths.length > 0;

  if (isOngoing) {
    const todayISO = toISO(new Date());
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
      daysUntilNextPeriod: null,
    };
  }

  if (!canPredict) {
    const todayISO = toISO(new Date());
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
      daysUntilNextPeriod: null,
    };
  }

  const todayISO = toISO(new Date());
  const dayIndex = diffDays(last.period_start, todayISO); // 0 = day 1
  const currentCycleDay = dayIndex >= 0 ? dayIndex + 1 : null;

  const nextStart = new Date(parseISO(last.period_start));
  nextStart.setDate(nextStart.getDate() + avgCycleLength);
  const nextPeriodDate = toISO(nextStart);
  const daysUntilNextPeriod = diffDays(todayISO, nextPeriodDate);

  let currentPhase: CyclePhase | null = null;
  if (currentCycleDay) {
    currentPhase = phaseForDay(currentCycleDay, avgCycleLength, avgPeriodLength);
  }

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
    daysUntilNextPeriod,
  };
}

// Standard model: ovulation ~14 days before next period (luteal length ~14).
// Menstrual = period days, Follicular = post-period until ovulation window,
// Ovulation = ±1 day around ovulation day, Luteal = after ovulation.
export function phaseForDay(
  day: number,
  cycleLength: number,
  periodLength: number,
): CyclePhase {
  const ovulationDay = Math.max(1, cycleLength - 14);
  if (day <= periodLength) return "Menstrual";
  if (day >= ovulationDay - 1 && day <= ovulationDay + 1) return "Ovulation";
  if (day < ovulationDay - 1) return "Follicular";
  return "Luteal";
}

export function formatPredictionDate(iso: string) {
  return parseISO(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}