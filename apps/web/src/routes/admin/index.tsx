import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Admin</h1>
      <Outlet />
    </div>
  );
}
