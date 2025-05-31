import { createFileRoute, Link } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  IconBot,
  IconPlus,
  IconPlay,
  IconPause,
  IconStop,
  IconCloud,
  IconEye,
  IconCog,
  IconRocket,
} from "@/components/icons";

export const Route = createFileRoute("/dashboard/agents/")({
  component: AgentsPage,
});

// Mock data for agents
const agents = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Handles customer inquiries and provides instant support responses",
    status: "active",
    deploymentUrl: "https://support-bot.your-domain.workers.dev",
    lastDeployed: "2024-01-15T10:30:00Z",
    requests: 1247,
    uptime: "99.9%",
  },
  {
    id: "2",
    name: "Content Moderator",
    description: "Automatically moderates user-generated content for inappropriate material",
    status: "paused",
    deploymentUrl: "https://moderator.your-domain.workers.dev",
    lastDeployed: "2024-01-14T15:45:00Z",
    requests: 892,
    uptime: "99.7%",
  },
  {
    id: "3",
    name: "Data Processor",
    description: "Processes and transforms incoming data streams in real-time",
    status: "draft",
    deploymentUrl: null,
    lastDeployed: null,
    requests: 0,
    uptime: "N/A",
  },
];

function AgentsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <IconPlay className="h-3 w-3" />;
      case "paused":
        return <IconPause className="h-3 w-3" />;
      case "draft":
        return <IconStop className="h-3 w-3" />;
      default:
        return <IconStop className="h-3 w-3" />;
    }
  };

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
                <BreadcrumbLink href="/dashboard">Agent Platform</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Agents</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 space-y-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
              <p className="text-muted-foreground">
                Manage and deploy your AI agents to Cloudflare Workers
              </p>
            </div>
            <Button className="gap-2" asChild>
              <Link to="/dashboard/agents/builder">
                <IconPlus className="h-4 w-4" />
                Create Agent
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
                <IconBot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agents.length}</div>
                <p className="text-xs text-muted-foreground">
                  {agents.filter((a) => a.status === "active").length} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <IconCloud className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {agents.reduce((sum, agent) => sum + agent.requests, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deployments</CardTitle>
                <IconRocket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {agents.filter((a) => a.deploymentUrl).length}
                </div>
                <p className="text-xs text-muted-foreground">Currently deployed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Uptime</CardTitle>
                <IconEye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.8%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Agents List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Agents</h2>
            <div className="grid gap-4">
              {agents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <Badge
                            variant="outline"
                            className={`gap-1 ${getStatusColor(agent.status)}`}
                          >
                            {getStatusIcon(agent.status)}
                            {agent.status}
                          </Badge>
                        </div>
                        <CardDescription>{agent.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <IconEye className="h-3 w-3" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <IconCog className="h-3 w-3" />
                          Configure
                        </Button>
                        {agent.status === "active" && (
                          <Button variant="outline" size="sm" className="gap-2">
                            <IconPause className="h-3 w-3" />
                            Pause
                          </Button>
                        )}
                        {agent.status === "paused" && (
                          <Button variant="outline" size="sm" className="gap-2">
                            <IconPlay className="h-3 w-3" />
                            Resume
                          </Button>
                        )}
                        {agent.status === "draft" && (
                          <Button size="sm" className="gap-2" asChild>
                            <Link to="/dashboard/agents/builder">
                              <IconRocket className="h-3 w-3" />
                              Edit & Deploy
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Deployment URL</p>
                        <p className="font-mono text-xs truncate">
                          {agent.deploymentUrl || "Not deployed"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Deployed</p>
                        <p>
                          {agent.lastDeployed
                            ? new Date(agent.lastDeployed).toLocaleDateString()
                            : "Never"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Requests</p>
                        <p>{agent.requests.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Uptime</p>
                        <p>{agent.uptime}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
