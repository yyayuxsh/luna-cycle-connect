import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: number;
  withWordmark?: boolean;
}

export function LunaLogo({ className, size = 56, withWordmark = false }: Props) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="relative grid place-items-center rounded-2xl"
        style={{
          width: size,
          height: size,
          background: "var(--gradient-luna)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
            fill="white"
          />
        </svg>
      </div>
      {withWordmark && (
        <span className="text-2xl font-bold tracking-tight text-foreground">
          Luna
        </span>
      )}
    </div>
  );
}