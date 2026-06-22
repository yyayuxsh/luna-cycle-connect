import { useState } from "react";
import { Heart, Copy, RefreshCw, Link2, Unlink, Check } from "lucide-react";
import { LunaCard, CardLabel } from "./Card";
import { supabase } from "@/integrations/supabase/client";
import type { LunaUser } from "@/lib/luna-store";

export function PartnerSync({
  user,
  onChange,
}: {
  user: LunaUser;
  onChange: () => void;
}) {
  const [code, setCode] = useState(user.partnerCode ?? "");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const connected = !!user.partnerId;

  if (connected) {
    const since = user.connectedSince
      ? new Date(user.connectedSince).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;
    return (
      <LunaCard tone="rose">
        <div className="flex items-start gap-3">
          <Heart className="mt-1 h-6 w-6 text-white" />
          <div className="flex-1">
            <CardLabel>
              <span className="text-white/80">Connected</span>
            </CardLabel>
            <h3 className="mt-1 text-xl font-semibold">
              {user.partnerName ?? "Your partner"} ❤️
            </h3>
            {since && (
              <p className="mt-1 text-sm text-white/85">Together since {since}</p>
            )}
            <button
              onClick={async () => {
                setBusy(true);
                const { error } = await supabase.rpc("disconnect_partner");
                setBusy(false);
                if (error) setMsg({ type: "err", text: error.message });
                else onChange();
              }}
              disabled={busy}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-60"
            >
              <Unlink className="h-4 w-4" /> Disconnect
            </button>
            {msg && (
              <p className="mt-2 text-xs text-white/90">{msg.text}</p>
            )}
          </div>
        </div>
      </LunaCard>
    );
  }

  // Partner account: input flow
  if (user.accountType === "partner") {
    return (
      <LunaCard>
        <div className="flex items-start gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]">
            <Link2 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardLabel>Connect with your partner</CardLabel>
            <h3 className="mt-1 text-lg font-semibold">Enter her invite code</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ask her for the 6-character code from her Luna app.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                placeholder="LUNA7X"
                maxLength={6}
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-center text-base font-mono tracking-widest uppercase outline-none focus:border-primary"
              />
              <button
                disabled={busy || input.length < 6}
                onClick={async () => {
                  setBusy(true);
                  setMsg(null);
                  const { error } = await supabase.rpc("connect_partner_by_code", {
                    _code: input.trim(),
                  });
                  setBusy(false);
                  if (error) {
                    setMsg({ type: "err", text: error.message });
                  } else {
                    setMsg({ type: "ok", text: "Connected!" });
                    setInput("");
                    onChange();
                  }
                }}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition active:scale-95 disabled:opacity-50"
              >
                Connect
              </button>
            </div>
            {msg && (
              <p
                className={
                  "mt-2 text-xs " +
                  (msg.type === "ok" ? "text-emerald-600" : "text-destructive")
                }
              >
                {msg.text}
              </p>
            )}
          </div>
        </div>
      </LunaCard>
    );
  }

  // Woman: show invite code
  if (!code) {
    return (
      <LunaCard tone="rose">
        <div className="flex items-start gap-3">
          <Heart className="mt-1 h-6 w-6 text-white" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Connect with your partner</h3>
            <p className="mt-1 text-sm text-white/85">
              Share your invite code to start tracking together.
            </p>
            <button
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                const { data, error } = await supabase.rpc("regenerate_partner_code");
                setBusy(false);
                if (error) setMsg({ type: "err", text: error.message });
                else if (data) setCode(data as string);
              }}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[color:var(--accent-rose)] transition active:scale-95 disabled:opacity-60"
            >
              Generate Code
            </button>
          </div>
        </div>
      </LunaCard>
    );
  }

  return (
    <LunaCard tone="rose">
      <div className="flex items-start gap-3">
        <Heart className="mt-1 h-6 w-6 text-white" />
        <div className="flex-1">
          <CardLabel>
            <span className="text-white/80">Your invite code</span>
          </CardLabel>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 rounded-2xl border border-white/40 bg-white/15 px-4 py-3 text-center text-2xl font-bold font-mono tracking-[0.3em] text-white backdrop-blur">
              {code}
            </div>
          </div>
          <p className="mt-2 text-xs text-white/85">
            Share this code with your partner so they can connect.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(code);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                } catch {
                  /* no-op */
                }
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/15 px-3 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/25"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                setMsg(null);
                const { data, error } = await supabase.rpc("regenerate_partner_code");
                setBusy(false);
                if (error) setMsg({ type: "err", text: error.message });
                else if (data) setCode(data as string);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/15 px-3 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/25 disabled:opacity-60"
            >
              <RefreshCw className="h-4 w-4" />
              New
            </button>
          </div>
          {msg && <p className="mt-2 text-xs text-white">{msg.text}</p>}
        </div>
      </div>
    </LunaCard>
  );
}