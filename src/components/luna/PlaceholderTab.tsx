import type { ReactNode } from "react";
import { LunaCard } from "./Card";

export function PlaceholderTab({
  title,
  subtitle,
  icon,
  message,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  message: string;
}) {
  return (
    <div className="flex flex-col gap-5 px-6 pb-28 pt-10">
      <header>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </header>
      <LunaCard>
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <div
            className="grid h-16 w-16 place-items-center rounded-2xl text-white"
            style={{ background: "var(--gradient-luna)" }}
          >
            {icon}
          </div>
          <h3 className="text-lg font-semibold">Coming soon</h3>
          <p className="max-w-xs text-sm text-muted-foreground">{message}</p>
        </div>
      </LunaCard>
    </div>
  );
}