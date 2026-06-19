import { Droplet, Sparkles, CalendarDays, TrendingUp } from "lucide-react";
import { LunaCard, CardLabel } from "./Card";
import type { LunaUser } from "@/lib/luna-store";

export function SoloHome({ user }: { user: LunaUser }) {
  const greeting = getGreeting();
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
            <h2 className="text-3xl font-semibold">Follicular</h2>
            <p className="mt-1 text-sm text-white/85">Day 6 · Energy rising</p>
          </div>
          <Droplet className="h-10 w-10 text-white/80" />
        </div>
      </LunaCard>

      <LunaCard>
        <div className="flex items-center justify-between">
          <div>
            <CardLabel>Next Period</CardLabel>
            <h3 className="mt-1 text-xl font-semibold">in 21 days</h3>
            <p className="text-sm text-muted-foreground">Estimated Jul 10</p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <CalendarDays className="h-6 w-6" />
          </div>
        </div>
      </LunaCard>

      <LunaCard>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardLabel>Cycle Insights</CardLabel>
            <h3 className="mt-1 text-lg font-semibold">A great week for focus</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Estrogen is rising — perfect for deep work, learning, and creative
              projects.
            </p>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>
      </LunaCard>

      <LunaCard>
        <div className="flex items-center justify-between">
          <div>
            <CardLabel>Cycle Length</CardLabel>
            <h3 className="mt-1 text-xl font-semibold">28 days avg</h3>
            <p className="text-sm text-muted-foreground">Last 3 cycles</p>
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