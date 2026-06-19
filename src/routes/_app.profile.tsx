import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, Settings, Shield, User } from "lucide-react";
import { LunaCard, CardLabel } from "@/components/luna/Card";
import { setUser, useLunaUser } from "@/lib/luna-store";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — Luna" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = useLunaUser();
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate({ to: "/" });
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-5 px-6 pb-28 pt-10">
      <header>
        <p className="text-sm text-muted-foreground">Account</p>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      </header>

      <LunaCard tone="primary">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/40 bg-white/20 text-2xl font-bold text-white backdrop-blur">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-white/85">{user.email}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-white/75">
              {user.mode === "couple" ? "❤️ Couple Mode" : "🌙 Solo Mode"} ·{" "}
              {user.accountType === "woman" ? "Woman" : "Partner"}
            </p>
          </div>
        </div>
      </LunaCard>

      <LunaCard className="p-0 overflow-hidden">
        <Row icon={<User className="h-5 w-5" />} label="Personal information" />
        <Row icon={<Shield className="h-5 w-5" />} label="Privacy & sharing" />
        <Row icon={<Settings className="h-5 w-5" />} label="Preferences" />
      </LunaCard>

      <button
        onClick={logout}
        className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card text-sm font-semibold text-destructive transition-colors hover:bg-destructive/5"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Luna · v0.1 · Designed with care
      </p>
    </div>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex w-full items-center gap-3 border-b border-border px-5 py-4 text-left last:border-b-0 hover:bg-muted/50">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
      <CardLabel>Soon</CardLabel>
    </button>
  );
}