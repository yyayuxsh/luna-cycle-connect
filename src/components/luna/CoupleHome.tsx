import { Heart, CalendarDays, MessageCircleHeart, Droplet } from "lucide-react";
import { LunaCard, CardLabel } from "./Card";
import type { LunaUser } from "@/lib/luna-store";

export function CoupleHome({ user }: { user: LunaUser }) {
  const womanName = user.accountType === "woman" ? user.name : user.partnerName ?? "Sam";
  const partnerName = user.accountType === "woman" ? user.partnerName ?? "Alex" : user.name;
  const days = user.togetherSince
    ? Math.max(1, Math.floor((Date.now() - new Date(user.togetherSince).getTime()) / (1000 * 60 * 60 * 24)))
    : 412;

  return (
    <div className="flex flex-col gap-5 px-6 pb-28 pt-10">
      <header>
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="text-3xl font-bold tracking-tight">
          {user.name} <span className="text-2xl">❤️</span>
        </h1>
      </header>

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
        <p className="mt-1 text-sm text-white/90">Together for {days} days</p>
      </LunaCard>

      <LunaCard tone="primary">
        <CardLabel>
          <span className="text-white/80">Current Phase</span>
        </CardLabel>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Luteal</h2>
            <p className="mt-1 text-sm text-white/85">Day 22 · Be extra gentle today</p>
          </div>
          <Droplet className="h-9 w-9 text-white/80" />
        </div>
      </LunaCard>

      <LunaCard>
        <div className="flex items-center justify-between">
          <div>
            <CardLabel>Next Period</CardLabel>
            <h3 className="mt-1 text-xl font-semibold">in 6 days</h3>
            <p className="text-sm text-muted-foreground">A bit of patience goes a long way 💜</p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <CalendarDays className="h-6 w-6" />
          </div>
        </div>
      </LunaCard>

      <LunaCard>
        <div className="flex items-start gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]">
            <MessageCircleHeart className="h-6 w-6" />
          </div>
          <div>
            <CardLabel>Partner Insights</CardLabel>
            <h3 className="mt-1 text-lg font-semibold">Suggest a quiet night in</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {womanName} may have lower energy this week. A warm meal and a movie
              would mean a lot.
            </p>
          </div>
        </div>
      </LunaCard>
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