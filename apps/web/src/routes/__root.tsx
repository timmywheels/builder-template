import { Outlet, createRootRoute, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthProvider, AuthState } from "@/store/auth-provider";

interface AppContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<AppContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
