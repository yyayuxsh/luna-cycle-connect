import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { PlaceholderTab } from "@/components/luna/PlaceholderTab";

export const Route = createFileRoute("/_app/cycle")({
  head: () => ({ meta: [{ title: "Cycle — Luna" }] }),
  component: () => (
    <PlaceholderTab
      title="Your Cycle"
      subtitle="Calendar & predictions"
      icon={<Calendar className="h-7 w-7" />}
      message="A beautiful cycle calendar with predictions, fertile windows and phase insights will live here."
    />
  ),
});