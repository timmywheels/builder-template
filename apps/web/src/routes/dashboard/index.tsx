import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import Loader from "@/components/ui/loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBot, IconCloud, IconRocket, IconUsers, IconPlus, IconEye } from "@/components/icons";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
  pendingComponent: Loader,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Agent Platform</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Agent Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your AI agents and deployments.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card text-card-foreground p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Total Agents</h3>
                <IconBot className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">1 active, 1 paused, 1 draft</p>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Active Deployments</h3>
                <IconCloud className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Running on Cloudflare</p>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Total Requests</h3>
                <IconRocket className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">2,139</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Avg. Uptime</h3>
                <IconEye className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">99.8%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 rounded-lg border bg-card text-card-foreground">
              <div className="p-6 pb-2">
                <h3 className="text-lg font-semibold">Recent Agents</h3>
                <p className="text-sm text-muted-foreground">Your latest agent activities</p>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  {[
                    {
                      name: "Customer Support Bot",
                      status: "Active",
                      requests: 1247,
                      color: "bg-green-500",
                    },
                    {
                      name: "Content Moderator",
                      status: "Paused",
                      requests: 892,
                      color: "bg-yellow-500",
                    },
                    {
                      name: "Data Processor",
                      status: "Draft",
                      requests: 0,
                      color: "bg-gray-500",
                    },
                  ].map((agent, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${agent.color}`} />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.status}</p>
                      </div>
                      <div className="text-sm font-medium">
                        {agent.requests.toLocaleString()} requests
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-3 rounded-lg border bg-card text-card-foreground">
              <div className="p-6 pb-2">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-2">
                  <Link to="/dashboard/agents/builder" className="block w-full">
                    <button className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors">
                      <div className="font-medium text-sm flex items-center gap-2">
                        <IconPlus className="h-4 w-4" />
                        Create New Agent
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Build an agent with natural language
                      </div>
                    </button>
                  </Link>
                  <Link to="/dashboard/deployments" className="block w-full">
                    <button className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors">
                      <div className="font-medium text-sm flex items-center gap-2">
                        <IconRocket className="h-4 w-4" />
                        Deploy to Cloudflare
                      </div>
                      <div className="text-xs text-muted-foreground">Deploy your latest agent</div>
                    </button>
                  </Link>
                  <Link to="/dashboard/analytics" className="block w-full">
                    <button className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors">
                      <div className="font-medium text-sm flex items-center gap-2">
                        <IconEye className="h-4 w-4" />
                        View Analytics
                      </div>
                      <div className="text-xs text-muted-foreground">Check agent performance</div>
                    </button>
                  </Link>
                  <Link to="/dashboard/deployments" className="block w-full">
                    <button className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors">
                      <div className="font-medium text-sm flex items-center gap-2">
                        <IconCloud className="h-4 w-4" />
                        Manage Deployments
                      </div>
                      <div className="text-xs text-muted-foreground">Control your live agents</div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
