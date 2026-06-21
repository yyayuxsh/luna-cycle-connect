import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Droplet, Pencil, Plus, Trash2, X } from "lucide-react";
import { LunaCard, CardLabel } from "@/components/luna/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { computePredictions, formatPredictionDate } from "@/lib/cycle-predictions";

export const Route = createFileRoute("/_app/cycle")({
  head: () => ({ meta: [{ title: "Cycle — Luna" }] }),
  component: CyclePage,
});

type CycleRow = {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string | null;
  cycle_length: number | null;
  period_length: number | null;
  created_at: string;
  updated_at: string;
};

function diffDaysInclusive(startISO: string, endISO: string) {
  const s = new Date(startISO + "T00:00:00");
  const e = new Date(endISO + "T00:00:00");
  return Math.round((e.getTime() - s.getTime()) / 86400000) + 1;
}
function diffDays(startISO: string, endISO: string) {
  const s = new Date(startISO + "T00:00:00");
  const e = new Date(endISO + "T00:00:00");
  return Math.round((e.getTime() - s.getTime()) / 86400000);
}
function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function PredictionStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/40 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-base font-semibold">{value}</p>
    </div>
  );
}

function CyclePage() {
  const [cycles, setCycles] = useState<CycleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CycleRow | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cycles")
      .select("*")
      .order("period_start", { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      setCycles((data ?? []) as CycleRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const sortedAsc = useMemo(
    () => [...cycles].sort((a, b) => a.period_start.localeCompare(b.period_start)),
    [cycles],
  );

  const current = cycles[0] ?? null;
  const avgCycleLength = useMemo(() => {
    const vals = sortedAsc.map((c) => c.cycle_length).filter((v): v is number => !!v);
    if (!vals.length) return null;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [sortedAsc]);
  const prediction = useMemo(() => computePredictions(cycles), [cycles]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this cycle record?")) return;
    const { error } = await supabase.from("cycles").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Cycle deleted");
    load();
  };

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (c: CycleRow) => {
    setEditing(c);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-5 px-6 pb-28 pt-10">
      <header>
        <p className="text-sm text-muted-foreground">Period tracking</p>
        <h1 className="text-3xl font-bold tracking-tight">Your Cycle</h1>
      </header>

      <LunaCard tone="primary" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <CardLabel>
          <span className="text-white/80">Current Cycle</span>
        </CardLabel>
        {current ? (
          <div className="mt-2">
            <h2 className="text-2xl font-semibold">
              Started {formatDate(current.period_start)}
            </h2>
            <p className="mt-1 text-sm text-white/85">
              {current.period_end
                ? `Period: ${current.period_length ?? "—"} days`
                : "Period ongoing"}
              {avgCycleLength ? ` · Avg cycle: ${avgCycleLength} days` : ""}
            </p>
          </div>
        ) : (
          <div className="mt-2">
            <h2 className="text-2xl font-semibold">No cycles yet</h2>
            <p className="mt-1 text-sm text-white/85">
              Log your first period to get started.
            </p>
          </div>
        )}
      </LunaCard>

      <Button
        onClick={openNew}
        size="lg"
        className="h-14 rounded-2xl text-base font-semibold shadow-[var(--shadow-elevated)]"
        style={{ background: "var(--gradient-luna)", color: "white" }}
      >
        <Plus className="mr-2 h-5 w-5" /> Log Period
      </Button>

      {prediction.status === "ongoing" && (
        <LunaCard>
          <CardLabel>Current Status</CardLabel>
          <p className="mt-2 text-base font-semibold">Period Ongoing</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Predictions will be available once you log your period end date.
          </p>
        </LunaCard>
      )}

      {prediction.status === "insufficient" && (
        <LunaCard>
          <CardLabel>Predictions</CardLabel>
          <p className="mt-2 text-sm text-muted-foreground">
            Log one more completed cycle to unlock predictions.
          </p>
        </LunaCard>
      )}

      {prediction.canPredict && (
        <LunaCard>
          <CardLabel>Predictions</CardLabel>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <PredictionStat
              label="Cycle Day"
              value={
                prediction.currentCycleDay
                  ? `Day ${prediction.currentCycleDay}`
                  : "—"
              }
            />
            <PredictionStat
              label="Phase"
              value={prediction.currentPhase ?? "—"}
            />
            <PredictionStat
              label="Next Period"
              value={
                prediction.nextPeriodDate
                  ? formatPredictionDate(prediction.nextPeriodDate)
                  : "—"
              }
            />
            <PredictionStat
              label="Days Remaining"
              value={
                prediction.daysUntilNextPeriod === null
                  ? "—"
                  : prediction.daysUntilNextPeriod >= 0
                    ? `${prediction.daysUntilNextPeriod} days`
                    : `${Math.abs(prediction.daysUntilNextPeriod)} days late`
              }
            />
          </div>
        </LunaCard>
      )}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cycle History</h2>
          <span className="text-xs text-muted-foreground">
            {cycles.length} {cycles.length === 1 ? "record" : "records"}
          </span>
        </div>

        {loading ? (
          <LunaCard>
            <p className="text-sm text-muted-foreground">Loading…</p>
          </LunaCard>
        ) : cycles.length === 0 ? (
          <LunaCard>
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Droplet className="h-6 w-6" />
              </div>
              <p className="text-sm text-muted-foreground">
                Your cycle history will appear here.
              </p>
            </div>
          </LunaCard>
        ) : (
          <div className="flex flex-col gap-3">
            {cycles.map((c) => (
              <LunaCard key={c.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[color:var(--accent-rose)]/10 text-[color:var(--accent-rose)]">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold leading-tight">
                        {formatDate(c.period_start)}
                        {c.period_end ? ` → ${formatDate(c.period_end)}` : ""}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {c.period_length
                          ? `${c.period_length}-day period`
                          : "Period ongoing"}
                        {c.cycle_length ? ` · ${c.cycle_length}-day cycle` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(c)}
                      className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label="Edit cycle"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Delete cycle"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </LunaCard>
            ))}
          </div>
        )}
      </section>

      {modalOpen && (
        <LogPeriodModal
          existing={editing}
          allCycles={cycles}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            setModalOpen(false);
            load();
          }}
        />
      )}
    </div>
  );
}

function LogPeriodModal({
  existing,
  allCycles,
  onClose,
  onSaved,
}: {
  existing: CycleRow | null;
  allCycles: CycleRow[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [start, setStart] = useState(existing?.period_start ?? todayISO());
  const [end, setEnd] = useState(existing?.period_end ?? "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!start) return toast.error("Period start date is required");
    if (end && end < start) return toast.error("End date must be after start date");

    setSaving(true);
    const period_length =
      end && start ? diffDaysInclusive(start, end) : null;

    // Compute cycle_length for the previous cycle (gap between its start and this start)
    // and for this cycle relative to the next-later one (if editing in the middle).
    const others = allCycles.filter((c) => c.id !== existing?.id);
    const prev = others
      .filter((c) => c.period_start < start)
      .sort((a, b) => b.period_start.localeCompare(a.period_start))[0];
    const next = others
      .filter((c) => c.period_start > start)
      .sort((a, b) => a.period_start.localeCompare(b.period_start))[0];

    const cycle_length = next ? diffDays(start, next.period_start) : null;

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      setSaving(false);
      return toast.error("Not signed in");
    }

    let error;
    if (existing) {
      ({ error } = await supabase
        .from("cycles")
        .update({
          period_start: start,
          period_end: end || null,
          period_length,
          cycle_length,
        })
        .eq("id", existing.id));
    } else {
      ({ error } = await supabase.from("cycles").insert({
        user_id: auth.user.id,
        period_start: start,
        period_end: end || null,
        period_length,
        cycle_length,
      }));
    }

    if (error) {
      setSaving(false);
      return toast.error(error.message);
    }

    // Update the previous cycle's cycle_length now that this start anchors it.
    if (prev) {
      await supabase
        .from("cycles")
        .update({ cycle_length: diffDays(prev.period_start, start) })
        .eq("id", prev.id);
    }

    setSaving(false);
    toast.success(existing ? "Cycle updated" : "Period logged");
    onSaved();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-card p-6 shadow-[var(--shadow-elevated)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {existing ? "Edit Cycle" : "Log Period"}
          </h2>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="start">Period start</Label>
            <Input
              id="start"
              type="date"
              value={start}
              max={todayISO()}
              onChange={(e) => setStart(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="end">Period end (optional)</Label>
            <Input
              id="end"
              type="date"
              value={end}
              min={start}
              max={todayISO()}
              onChange={(e) => setEnd(e.target.value)}
              className="mt-1"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Leave empty if your period is ongoing.
            </p>
          </div>

          <Button
            onClick={save}
            disabled={saving}
            size="lg"
            className="h-12 rounded-2xl text-base font-semibold"
            style={{ background: "var(--gradient-luna)", color: "white" }}
          >
            {saving ? "Saving…" : existing ? "Save changes" : "Save period"}
          </Button>
        </div>
      </div>
    </div>
  );
}