import { useEffect, useState } from "react";
import { Droplet, CalendarDays, TrendingUp, Sun } from "lucide-react";
import { LunaCard, CardLabel } from "./Card";
import type { LunaUser } from "@/lib/luna-store";
import { supabase } from "@/integrations/supabase/client";
import {
  computePredictions,
  formatPredictionDate,
  type CyclePrediction,
  type CycleRow,
} from "@/lib/cycle-predictions";

export function SoloHome({ user }: { user: LunaUser }) {
  const greeting = getGreeting();
  const [prediction, setPrediction] = useState<CyclePrediction | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("cycles")
        .select("*")
        .order("period_start", { ascending: false });
      setPrediction(computePredictions((data ?? []) as CycleRow[]));
    })();
  }, []);

  const p = prediction;
  const hasData = !!p?.hasData;

  return (
    <div className="flex flex-col gap-5 px-6 pb-28 pt-10">
      <header>
        <p className="text-sm text-muted-foreground">{greeting},</p>
        <h1 className="text-3xl font-bold tracking-tight">
          {user.name} <span className="text-2xl">🌙</span>
        </h1>
      </header>

      <LunaCard tone="primary" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <CardLabel>
          <span className="text-white/80">Current Phase</span>
        </CardLabel>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold">
              {hasData && p?.currentPhase ? p.currentPhase : "—"}
            </h2>
            <p className="mt-1 text-sm text-white/85">
              {hasData && p?.currentCycleDay
                ? `Day ${p.currentCycleDay} of ${p.avgCycleLength}`
                : "Log a period to see your phase"}
            </p>
          </div>
          <Droplet className="h-10 w-10 text-white/80" />
        </div>
      </LunaCard>

      <LunaCard>
        <div className="flex items-center justify-between">
          <div>
            <CardLabel>Current Cycle Day</CardLabel>
            <h3 className="mt-1 text-xl font-semibold">
              {hasData && p?.currentCycleDay ? `Day ${p.currentCycleDay}` : "—"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {hasData
                ? `Cycle avg ${p?.avgCycleLength} days`
                : "No cycles logged"}
            </p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]">
            <Sun className="h-6 w-6" />
          </div>
        </div>
      </LunaCard>

      <LunaCard>
        <div className="flex items-center justify-between">
          <div>
            <CardLabel>Next Period</CardLabel>
            <h3 className="mt-1 text-xl font-semibold">
              {hasData && p?.daysUntilNextPeriod !== null
                ? p!.daysUntilNextPeriod >= 0
                  ? `in ${p!.daysUntilNextPeriod} days`
                  : `${Math.abs(p!.daysUntilNextPeriod)} days late`
                : "—"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {hasData && p?.nextPeriodDate
                ? `Estimated ${formatPredictionDate(p.nextPeriodDate)}`
                : "Log a period for predictions"}
            </p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <CalendarDays className="h-6 w-6" />
          </div>
        </div>
      </LunaCard>

      <LunaCard>
        <div className="flex items-center justify-between">
          <div>
            <CardLabel>Average Cycle</CardLabel>
            <h3 className="mt-1 text-xl font-semibold">
              {hasData ? `${p?.avgCycleLength} days` : "—"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {hasData
                ? `Period avg ${p?.avgPeriodLength} days`
                : "Based on your history"}
            </p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
      </LunaCard>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}