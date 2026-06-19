import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/luna/PhoneFrame";
import { BottomNav } from "@/components/luna/BottomNav";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <PhoneFrame background="default">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}