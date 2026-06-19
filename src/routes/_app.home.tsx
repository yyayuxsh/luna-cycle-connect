import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useLunaUser } from "@/lib/luna-store";
import { SoloHome } from "@/components/luna/SoloHome";
import { CoupleHome } from "@/components/luna/CoupleHome";

export const Route = createFileRoute("/_app/home")({
  head: () => ({ meta: [{ title: "Home — Luna" }] }),
  component: HomePage,
});

function HomePage() {
  const { user, loading } = useLunaUser();
  if (loading) return null;
  if (!user) return <Navigate to="/" />;
  if (user.mode === "couple" || user.accountType === "partner") return <CoupleHome user={user} />;
  return <SoloHome user={user} />;
}