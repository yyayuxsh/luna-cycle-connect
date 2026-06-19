import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LunaCard({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "primary" | "rose";
}) {
  const toneStyle =
    tone === "primary"
      ? { background: "var(--gradient-luna)", color: "white" }
      : tone === "rose"
      ? {
          background:
            "linear-gradient(135deg, var(--accent-rose), oklch(0.78 0.16 30))",
          color: "white",
        }
      : undefined;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]",
        tone !== "default" && "border-transparent shadow-[var(--shadow-elevated)]",
        className,
      )}
      style={toneStyle}
    >
      {children}
    </div>
  );
}

export function CardLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}