import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { PhoneFrame } from "@/components/luna/PhoneFrame";
import { LunaLogo } from "@/components/luna/LunaLogo";
import { clearDraft, getDraft, setUser } from "@/lib/luna-store";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your Luna account" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return setError("Please complete all fields.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    const draft = getDraft();
    setUser({
      name: form.name,
      email: form.email,
      accountType: draft.accountType ?? "woman",
      mode: draft.mode ?? (draft.accountType === "partner" ? "couple" : "solo"),
      partnerName: draft.accountType === "partner" ? undefined : "Alex",
      togetherSince: new Date(Date.now() - 1000 * 60 * 60 * 24 * 412).toISOString(),
    });
    clearDraft();
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame background="default">
      <div className="flex flex-1 flex-col px-6 pb-10 pt-8">
        <Link
          to="/account-type"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <LunaLogo size={44} />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
            <p className="text-sm text-muted-foreground">Start your Luna journey.</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@example.com" />
          <Field label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} placeholder="At least 6 characters" />
          <Field label="Confirm password" type="password" value={form.confirm} onChange={(v) => setForm({ ...form, confirm: v })} placeholder="Re-enter password" />

          {error && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            className="mt-2 inline-flex h-14 items-center justify-center rounded-2xl text-base font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform active:scale-[0.98]"
            style={{ background: "var(--gradient-luna)" }}
          >
            Create account
          </button>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary">Log in</Link>
          </p>
        </form>
      </div>
    </PhoneFrame>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-2xl border border-input bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
    </label>
  );
}