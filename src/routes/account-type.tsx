import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, User2, Users } from "lucide-react";
import { PhoneFrame } from "@/components/luna/PhoneFrame";
import { setDraft } from "@/lib/luna-store";

export const Route = createFileRoute("/account-type")({
  head: () => ({ meta: [{ title: "Who are you? — Luna" }] }),
  component: AccountTypePage,
});

function AccountTypePage() {
  const navigate = useNavigate();

  const pick = (type: "woman" | "partner") => {
    setDraft({ accountType: type });
    if (type === "woman") navigate({ to: "/experience" });
    else navigate({ to: "/signup" });
  };

  return (
    <PhoneFrame background="soft">
      <div className="flex flex-1 flex-col px-6 pb-10 pt-8">
        <Link
          to="/"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="mt-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Who are you?</h1>
          <p className="mt-2 text-base text-muted-foreground">
            We'll personalize Luna for your experience.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <OptionCard
            onClick={() => pick("woman")}
            icon={<User2 className="h-6 w-6" />}
            title="Woman"
            description="Track your cycle, log symptoms, and discover insights."
            accent="primary"
          />
          <OptionCard
            onClick={() => pick("partner")}
            icon={<Users className="h-6 w-6" />}
            title="Partner"
            description="Stay informed and supportive with shared insights."
            accent="rose"
          />
        </div>
      </div>
    </PhoneFrame>
  );
}

function OptionCard({
  onClick,
  icon,
  title,
  description,
  accent,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: "primary" | "rose";
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-5 text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
    >
      <div
        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white"
        style={{
          background:
            accent === "primary"
              ? "var(--gradient-luna)"
              : "linear-gradient(135deg, var(--accent-rose), oklch(0.78 0.16 30))",
        }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </button>
  );
}