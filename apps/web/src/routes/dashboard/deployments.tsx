import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  IconCloud,
  IconRocket,
  IconPlay,
  IconPause,
  IconStop,
  IconEye,
  IconCog,
  IconGlobe,
  IconTerminal,
  IconUpload,
  IconDownload,
} from "@/components/icons";

export const Route = createFileRoute("/dashboard/deployments")({
  component: DeploymentsPage,
});

// Mock deployment data
const deployments = [
  {
    id: "1",
    name: "customer-support-bot",
    agentName: "Customer Support Bot",
    status: "deployed",
    url: "https://customer-support-bot.your-domain.workers.dev",
    environment: "production",
    lastDeployed: "2024-01-15T10:30:00Z",
    version: "v1.2.3",
    requests: 1247,
    errors: 3,
    uptime: "99.9%",
    region: "Global",
  },
  {
    id: "2",
    name: "content-moderator",
    agentName: "Content Moderator",
    status: "paused",
    url: "https://content-moderator.your-domain.workers.dev",
    environment: "production",
    lastDeployed: "2024-01-14T15:45:00Z",
    version: "v1.1.0",
    requests: 892,
    errors: 1,
    uptime: "99.7%",
    region: "Global",
  },
  {
    id: "3",
    name: "data-processor",
    agentName: "Data Processor",
    status: "deploying",
    url: "https://data-processor.your-domain.workers.dev",
    environment: "staging",
    lastDeployed: "2024-01-16T09:15:00Z",
    version: "v0.9.0",
    requests: 0,
    errors: 0,
    uptime: "N/A",
    region: "Global",
  },
];

function DeploymentsPage() {
  const [selectedDeployment, setSelectedDeployment] = useState(deployments[0]);
  const [isDeploying, setIsDeploying] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-green-100 text-green-800 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "deploying":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
        return <IconPlay className="h-3 w-3" />;
      case "paused":
        return <IconPause className="h-3 w-3" />;
      case "deploying":
        return <IconUpload className="h-3 w-3 animate-pulse" />;
      case "failed":
        return <IconStop className="h-3 w-3" />;
      default:
        return <IconStop className="h-3 w-3" />;
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
    }, 3000);
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
                <BreadcrumbPage>Deployments</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 space-y-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Deployments</h1>
              <p className="text-muted-foreground">Manage your Cloudflare Worker deployments</p>
            </div>
            <Button className="gap-2" onClick={handleDeploy} disabled={isDeploying}>
              {isDeploying ? (
                <>
                  <IconUpload className="h-4 w-4 animate-pulse" />
                  Deploying...
                </>
              ) : (
                <>
                  <IconRocket className="h-4 w-4" />
                  New Deployment
                </>
              )}
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Deployments</CardTitle>
                <IconCloud className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {deployments.filter((d) => d.status === "deployed").length}
                </div>
                <p className="text-xs text-muted-foreground">Out of {deployments.length} total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <IconGlobe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {deployments.reduce((sum, d) => sum + d.requests, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <IconTerminal className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.2%</div>
                <p className="text-xs text-muted-foreground">
                  {deployments.reduce((sum, d) => sum + d.errors, 0)} total errors
                </p>
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

          <Tabs defaultValue="deployments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="deployments">Deployments</TabsTrigger>
              <TabsTrigger value="deploy">Deploy New</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="deployments" className="space-y-4">
              <div className="grid gap-4">
                {deployments.map((deployment) => (
                  <Card key={deployment.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{deployment.agentName}</CardTitle>
                            <Badge
                              variant="outline"
                              className={`gap-1 ${getStatusColor(deployment.status)}`}
                            >
                              {getStatusIcon(deployment.status)}
                              {deployment.status}
                            </Badge>
                            <Badge variant="secondary">{deployment.environment}</Badge>
                          </div>
                          <CardDescription className="font-mono text-xs">
                            {deployment.url}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <IconEye className="h-3 w-3" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <IconTerminal className="h-3 w-3" />
                            Logs
                          </Button>
                          {deployment.status === "deployed" && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <IconPause className="h-3 w-3" />
                              Pause
                            </Button>
                          )}
                          {deployment.status === "paused" && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <IconPlay className="h-3 w-3" />
                              Resume
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Version</p>
                          <p className="font-mono">{deployment.version}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Deployed</p>
                          <p>{new Date(deployment.lastDeployed).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Requests</p>
                          <p>{deployment.requests.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Errors</p>
                          <p>{deployment.errors}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Uptime</p>
                          <p>{deployment.uptime}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="deploy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Deploy New Agent</CardTitle>
                  <CardDescription>Deploy your agent to Cloudflare Workers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="worker-name">Worker Name</Label>
                      <Input id="worker-name" placeholder="my-agent-worker" pattern="[a-z0-9-]+" />
                      <p className="text-xs text-muted-foreground">
                        Only lowercase letters, numbers, and hyphens allowed
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="environment">Environment</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="production">Production</option>
                        <option value="staging">Staging</option>
                        <option value="development">Development</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cloudflare-token">Cloudflare API Token</Label>
                    <Input
                      id="cloudflare-token"
                      type="password"
                      placeholder="Your Cloudflare API token"
                    />
                    <p className="text-xs text-muted-foreground">
                      Required for deployment. Get your token from Cloudflare dashboard.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-id">Account ID</Label>
                    <Input id="account-id" placeholder="Your Cloudflare account ID" />
                  </div>

                  <div className="space-y-2">
                    <Label>Code Source</Label>
                    <div className="grid gap-2">
                      <Button variant="outline" className="justify-start gap-2">
                        <IconUpload className="h-4 w-4" />
                        Upload Worker Script
                      </Button>
                      <Button variant="outline" className="justify-start gap-2" asChild>
                        <Link to="/dashboard/agents/builder">
                          <IconDownload className="h-4 w-4" />
                          Import from Agent Builder
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full gap-2" disabled={isDeploying}>
                    {isDeploying ? (
                      <>
                        <IconUpload className="h-4 w-4 animate-pulse" />
                        Deploying to Cloudflare...
                      </>
                    ) : (
                      <>
                        <IconRocket className="h-4 w-4" />
                        Deploy to Cloudflare
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cloudflare Configuration</CardTitle>
                  <CardDescription>Configure your Cloudflare account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-account">Default Account ID</Label>
                    <Input id="default-account" placeholder="Your default Cloudflare account ID" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-zone">Default Zone ID (Optional)</Label>
                    <Input id="default-zone" placeholder="Zone ID for custom domains" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-token">API Token</Label>
                    <Input id="api-token" type="password" placeholder="Your Cloudflare API token" />
                  </div>

                  <Button>Save Configuration</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deployment Defaults</CardTitle>
                  <CardDescription>Set default values for new deployments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-env">Default Environment</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="production">Production</option>
                      <option value="staging">Staging</option>
                      <option value="development">Development</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auto-deploy">Auto-deploy on code changes</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="auto-deploy" />
                      <label htmlFor="auto-deploy" className="text-sm">
                        Automatically deploy when agent code is updated
                      </label>
                    </div>
                  </div>

                  <Button>Save Defaults</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
