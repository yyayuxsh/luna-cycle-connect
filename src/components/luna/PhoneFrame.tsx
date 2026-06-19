import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Mobile-first centered container. On mobile it fills the screen;
 * on larger screens it shows a soft, premium-feeling phone-width column.
 */
export function PhoneFrame({
  children,
  className,
  background = "default",
}: {
  children: ReactNode;
  className?: string;
  background?: "default" | "soft" | "hero";
}) {
  const bg =
    background === "hero"
      ? "bg-[image:var(--gradient-hero)]"
      : background === "soft"
      ? "bg-[image:var(--gradient-soft)]"
      : "bg-background";

  return (
    <div className="min-h-svh w-full bg-[image:var(--gradient-soft)] flex items-stretch justify-center md:py-8">
      <div
        className={cn(
          "relative w-full max-w-[440px] md:rounded-[2.5rem] md:shadow-[0_30px_80px_-30px_rgba(124,92,252,0.35)] overflow-hidden flex flex-col",
          bg,
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}