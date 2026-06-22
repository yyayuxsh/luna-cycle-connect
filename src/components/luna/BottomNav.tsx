import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calendar, Plus, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLunaUser } from "@/lib/luna-store";

type NavItem = {
  to: "/home" | "/cycle" | "/checkin" | "/partner" | "/profile";
  label: string;
  icon: typeof Home;
  primary?: boolean;
};

const womanItems: NavItem[] = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/cycle", label: "Cycle", icon: Calendar },
  { to: "/checkin", label: "Check-In", icon: Plus, primary: true },
  { to: "/partner", label: "Partner", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
];

const partnerItems: NavItem[] = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/partner", label: "Partner", icon: Heart, primary: true },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useLunaUser();
  const items = user?.accountType === "partner" ? partnerItems : womanItems;
  const cols = items.length === 3 ? "grid-cols-3" : "grid-cols-5";
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 border-t border-border bg-background/85 backdrop-blur-xl">
      <ul className={cn("grid px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2", cols)}>
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.to;
          if (it.primary) {
            return (
              <li key={it.to} className="flex items-center justify-center">
                <Link
                  to={it.to}
                  className="grid h-14 w-14 -translate-y-3 place-items-center rounded-2xl text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform active:scale-95"
                  style={{ background: "var(--gradient-luna)" }}
                  aria-label={it.label}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              </li>
            );
          }
          return (
            <li key={it.to}>
              <Link
                to={it.to}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}