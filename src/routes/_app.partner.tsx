import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useLunaUser } from "@/lib/luna-store";
import { PartnerSync } from "@/components/luna/PartnerSync";

export const Route = createFileRoute("/_app/partner")({
  head: () => ({ meta: [{ title: "Partner — Luna" }] }),
  component: PartnerPage,
});

function PartnerPage() {
  const { user, loading, refresh } = useLunaUser();
  if (loading) return null;
  if (!user) return <Navigate to="/" />;

  return (
    <div className="flex flex-col gap-5 px-6 pb-28 pt-10">
      <header>
        <p className="text-sm text-muted-foreground">Couple Mode</p>
        <h1 className="text-3xl font-bold tracking-tight">Partner Sync ❤️</h1>
      </header>
      <PartnerSync user={user} onChange={refresh} />
    </div>
  );
}