import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { PhoneFrame } from "@/components/luna/PhoneFrame";
import { LunaLogo } from "@/components/luna/LunaLogo";
import { setUser } from "@/lib/luna-store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in to Luna" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError("Please enter your credentials.");
    setUser({
      name: "Luna",
      email: form.email,
      accountType: "woman",
      mode: "couple",
      partnerName: "Alex",
      togetherSince: new Date(Date.now() - 1000 * 60 * 60 * 24 * 412).toISOString(),
    });
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame background="default">
      <div className="flex flex-1 flex-col px-6 pb-10 pt-8">
        <Link
          to="/"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="mt-6 flex flex-col items-center text-center">
          <LunaLogo size={56} />
          <h1 className="mt-5 text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Log in to continue your journey.</p>
        </div>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="h-12 rounded-2xl border border-input bg-card px-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Your password"
              className="h-12 rounded-2xl border border-input bg-card px-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </label>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            className="mt-2 inline-flex h-14 items-center justify-center rounded-2xl text-base font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform active:scale-[0.98]"
            style={{ background: "var(--gradient-luna)" }}
          >
            Log in
          </button>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            New to Luna?{" "}
            <Link to="/account-type" className="font-semibold text-primary">Create an account</Link>
          </p>
        </form>
      </div>
    </PhoneFrame>
  );
}