import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PlaceholderTab } from "@/components/luna/PlaceholderTab";

export const Route = createFileRoute("/_app/checkin")({
  head: () => ({ meta: [{ title: "Daily Check-In — Luna" }] }),
  component: () => (
    <PlaceholderTab
      title="Daily Check-In"
      subtitle="How are you feeling today?"
      icon={<Plus className="h-7 w-7" />}
      message="Log mood, symptoms, energy and flow with quick taps. The daily check-in trains Luna's personalized insights."
    />
  ),
});