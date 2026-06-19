import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PlaceholderTab } from "@/components/luna/PlaceholderTab";

export const Route = createFileRoute("/_app/partner")({
  head: () => ({ meta: [{ title: "Partner — Luna" }] }),
  component: () => (
    <PlaceholderTab
      title="Partner Space"
      subtitle="Stay close, stay informed"
      icon={<Heart className="h-7 w-7" />}
      message="Shared insights, gentle nudges, and small ways to show up for each other — all controlled by you."
    />
  ),
});