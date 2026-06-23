import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, CalendarDays, MessageCircleHeart, Droplet } from "lucide-react";
import { LunaCard, CardLabel } from "./Card";
import type { LunaUser } from "@/lib/luna-store";
import { supabase } from "@/integrations/supabase/client";
import {
  computePredictions,
  formatPredictionDate,
  type CyclePrediction,
  type CycleRow,
} from "@/lib/cycle-predictions";

export function CoupleHome({ user }: { user: LunaUser }) {
  const connected = !!user.partnerId;
  const womanName = user.accountType === "woman" ? user.name : user.partnerName ?? "Your partner";
  const partnerName = user.accountType === "woman" ? user.partnerName ?? "Your partner" : user.name;
  const days = user.connectedSince
    ? Math.max(1, Math.floor((Date.now() - new Date(user.connectedSince).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const sinceLabel = user.connectedSince
    ? new Date(user.connectedSince).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : null;

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

  return (
    <div className="flex flex-col gap-5 px-6 pb-28 pt-10">
      <header>
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="text-3xl font-bold tracking-tight">
          {user.name} <span className="text-2xl">❤️</span>
        </h1>
      </header>

      {!connected ? (
        <LunaCard tone="rose" className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
          <div className="flex items-start gap-3">
            <Heart className="mt-1 h-6 w-6 text-white" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Connect With Your Partner</h2>
              <p className="mt-1 text-sm text-white/90">
                {user.accountType === "woman"
                  ? "Share your invite code to start tracking together."
                  : "Enter your partner's invite code to start tracking together."}
              </p>
              <Link
                to="/partner"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[color:var(--accent-rose)] transition active:scale-95"
              >
                {user.accountType === "woman" ? "Generate Code" : "Enter Code"}
              </Link>
            </div>
          </div>
        </LunaCard>
      ) : (
      <LunaCard tone="rose" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
        <div className="flex items-center gap-3">
          <Avatar label={womanName} />
          <Heart className="h-5 w-5 text-white/90" />
          <Avatar label={partnerName} />
        </div>
        <h2 className="mt-4 text-2xl font-semibold">
          {womanName} <span className="font-light">&</span> {partnerName}
        </h2>
        <p className="mt-1 text-sm text-white/90">
          {user.accountType === "woman"
            ? <>Your partner: {partnerName} ❤️</>
            : <>Connected with {partnerName} ❤️</>}
        </p>
        {sinceLabel && (
          <p className="mt-1 text-xs text-white/80">Together since {sinceLabel} · {days} days</p>
        )}
      </LunaCard>
      )}

      <LunaCard tone="primary">
        <CardLabel>
          <span className="text-white/80">Current Phase</span>
        </CardLabel>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              {prediction?.currentPhase ??
                (prediction?.status === "ongoing" ? "Menstrual" : "—")}
            </h2>
            <p className="mt-1 text-sm text-white/85">
              {prediction?.currentCycleDay
                ? `Day ${prediction.currentCycleDay}`
                : "Log a period to see your phase"}
              {prediction?.status === "ongoing" && " · Period ongoing"}
            </p>
          </div>
          <Droplet className="h-9 w-9 text-white/80" />
        </div>
      </LunaCard>

      {prediction?.canPredict && prediction.nextPeriodDate && (
        <LunaCard>
          <div className="flex items-center justify-between">
            <div>
              <CardLabel>Next Period</CardLabel>
              <h3 className="mt-1 text-xl font-semibold">
                {prediction.daysUntilNextPeriod !== null &&
                prediction.daysUntilNextPeriod >= 0
                  ? `in ${prediction.daysUntilNextPeriod} days`
                  : formatPredictionDate(prediction.nextPeriodDate)}
              </h3>
              <p className="text-sm text-muted-foreground">
                Estimated {formatPredictionDate(prediction.nextPeriodDate)}
              </p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <CalendarDays className="h-6 w-6" />
            </div>
          </div>
        </LunaCard>
      )}

      {connected && (
        <LunaCard>
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]">
              <MessageCircleHeart className="h-6 w-6" />
            </div>
            <div>
              <CardLabel>Partner Insights</CardLabel>
              <h3 className="mt-1 text-lg font-semibold">
                You and {partnerName} are in sync ❤️
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {partnerName} can see your current phase and upcoming period
                from their app.
              </p>
            </div>
          </div>
        </LunaCard>
      )}
    </div>
  );
}

function Avatar({ label }: { label: string }) {
  return (
    <div className="grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/20 text-base font-semibold text-white backdrop-blur">
      {label.charAt(0).toUpperCase()}
    </div>
  );
}