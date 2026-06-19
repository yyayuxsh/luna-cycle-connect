import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Moon, Heart, Check } from "lucide-react";
import { PhoneFrame } from "@/components/luna/PhoneFrame";
import { setDraft } from "@/lib/luna-store";

export const Route = createFileRoute("/experience")({
  head: () => ({ meta: [{ title: "Choose Your Experience — Luna" }] }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const navigate = useNavigate();
  const pick = (mode: "solo" | "couple") => {
    setDraft({ mode });
    navigate({ to: "/signup" });
  };

  return (
    <PhoneFrame background="soft">
      <div className="flex flex-1 flex-col px-6 pb-10 pt-8">
        <Link
          to="/account-type"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="mt-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Choose Your Experience
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            You can change this anytime in settings.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <ModeCard
            onClick={() => pick("solo")}
            icon={<Moon className="h-7 w-7" />}
            emoji="🌙"
            title="Solo Mode"
            description="Track your cycle privately with personalized insights and predictions."
            features={["100% private", "AI-powered predictions", "Daily check-ins"]}
            gradient="var(--gradient-luna)"
          />
          <ModeCard
            onClick={() => pick("couple")}
            icon={<Heart className="h-7 w-7" />}
            emoji="❤️"
            title="Couple Mode"
            description="Track your cycle and share selected insights with your partner."
            features={[
              "Share what you choose",
              "Partner gets gentle nudges",
              "Stronger together",
            ]}
            gradient="linear-gradient(135deg, var(--accent-rose), oklch(0.78 0.16 30))"
          />
        </div>
      </div>
    </PhoneFrame>
  );
}

function ModeCard({
  onClick,
  icon,
  emoji,
  title,
  description,
  features,
  gradient,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  emoji: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-3xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
    >
      <div
        className="flex items-center gap-4 px-5 py-5 text-white"
        style={{ background: gradient }}
      >
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur">
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/80">
            {emoji} {title.split(" ")[0]}
          </p>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </div>
      <div className="px-5 py-5">
        <p className="text-sm text-muted-foreground">{description}</p>
        <ul className="mt-4 space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="h-4 w-4 text-primary" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}