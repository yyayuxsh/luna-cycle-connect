import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PlaceholderTab } from "@/components/luna/PlaceholderTab";
import { useLunaUser } from "@/lib/luna-store";

export const Route = createFileRoute("/_app/checkin")({
  head: () => ({ meta: [{ title: "Daily Check-In — Luna" }] }),
  component: CheckinPage,
});

function CheckinPage() {
  const { user, loading } = useLunaUser();
  if (loading) return null;
  if (user?.accountType === "partner") return <Navigate to="/home" />;
  return (
    <PlaceholderTab
      title="Daily Check-In"
      subtitle="How are you feeling today?"
      icon={<Plus className="h-7 w-7" />}
      message="Log mood, symptoms, energy and flow with quick taps. The daily check-in trains Luna's personalized insights."
    />
  );
}