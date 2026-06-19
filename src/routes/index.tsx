import { createFileRoute, Link } from "@tanstack/react-router";
import { LunaLogo } from "@/components/luna/LunaLogo";
import { PhoneFrame } from "@/components/luna/PhoneFrame";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luna — Understand Your Cycle. Support Each Other." },
      {
        name: "description",
        content:
          "Luna is a modern menstrual health companion with an optional Couple Mode to keep partners informed and connected.",
      },
      { property: "og:title", content: "Luna — Menstrual Health, Together" },
      {
        property: "og:description",
        content: "Track your cycle privately or share insights with your partner.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <PhoneFrame background="hero">
      <div className="relative flex flex-1 flex-col items-center justify-between px-8 py-14 text-center text-white">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[color:var(--accent-rose)]/40 blur-3xl" />

        <div className="relative z-10 flex w-full flex-col items-center gap-4 pt-10">
          <LunaLogo size={72} />
          <h1 className="mt-4 text-5xl font-bold tracking-tight">Luna</h1>
          <p className="max-w-xs text-lg font-light text-white/85">
            Understand Your Cycle.<br />Support Each Other.
          </p>
        </div>

        <div className="relative z-10 mt-10 flex w-full flex-col gap-3">
          <Link
            to="/account-type"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-white text-base font-semibold text-primary shadow-[var(--shadow-elevated)] transition-transform active:scale-[0.98]"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/40 bg-white/10 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/15"
          >
            Log In
          </Link>
          <p className="mt-3 text-xs text-white/70">
            Private by default · Science-driven insights
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}