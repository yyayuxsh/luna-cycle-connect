import { createFileRoute, Navigate, Outlet, useRouterState } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/luna/PhoneFrame";
import { BottomNav } from "@/components/luna/BottomNav";
import { LunaUserProvider, useLunaUser } from "@/lib/luna-store";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

// Routes only the woman account may access.
const WOMAN_ONLY = new Set(["/cycle", "/checkin"]);

function AppGate() {
  const { user, loading, error } = useLunaUser();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (loading) return null;
  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Profile unavailable</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/" />;

  if (user.accountType === "partner" && WOMAN_ONLY.has(pathname)) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}

function AppLayout() {
  return (
    <LunaUserProvider>
      <PhoneFrame background="default">
        <AppGate />
      </PhoneFrame>
    </LunaUserProvider>
  );
}