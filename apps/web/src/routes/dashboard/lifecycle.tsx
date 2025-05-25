import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, redirect } from "@tanstack/react-router";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { IconPlus, IconCalendar, IconUsers, IconListDetails } from "@/components/icons";

export const Route = createFileRoute("/dashboard/lifecycle")({
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
  const lifecycleStages = [
    {
      id: 1,
      name: "Planning",
      description: "Define project scope and requirements",
      projects: 3,
      avgDuration: "2 weeks",
      status: "active",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Development",
      description: "Build and implement the solution",
      projects: 5,
      avgDuration: "8 weeks",
      status: "active",
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Testing",
      description: "Quality assurance and bug fixes",
      projects: 2,
      avgDuration: "3 weeks",
      status: "active",
      color: "bg-yellow-500",
    },
    {
      id: 4,
      name: "Deployment",
      description: "Release to production environment",
      projects: 1,
      avgDuration: "1 week",
      status: "active",
      color: "bg-purple-500",
    },
    {
      id: 5,
      name: "Maintenance",
      description: "Ongoing support and updates",
      projects: 4,
      avgDuration: "Ongoing",
      status: "active",
      color: "bg-orange-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      project: "E-commerce Platform",
      stage: "Development",
      action: "Moved to Testing",
      timestamp: "2 hours ago",
      user: "Sarah Johnson",
    },
    {
      id: 2,
      project: "Mobile App Redesign",
      stage: "Planning",
      action: "Requirements approved",
      timestamp: "4 hours ago",
      user: "Michael Chen",
    },
    {
      id: 3,
      project: "API Documentation",
      stage: "Testing",
      action: "Bug fixes completed",
      timestamp: "6 hours ago",
      user: "Emily Rodriguez",
    },
    {
      id: 4,
      project: "Analytics Dashboard",
      stage: "Deployment",
      action: "Deployed to production",
      timestamp: "1 day ago",
      user: "David Kim",
    },
  ];

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
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Lifecycle</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Project Lifecycle</h1>
              <p className="text-muted-foreground">
                Track projects through their development stages and manage workflows.
              </p>
            </div>
            <Button>
              <IconPlus className="mr-2 h-4 w-4" />
              New Stage
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lifecycleStages.map((stage) => (
              <Card key={stage.id} className="rounded-lg border shadow-none">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                      <CardTitle className="text-lg">{stage.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">{stage.projects} projects</Badge>
                  </div>
                  <CardDescription className="text-sm">{stage.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg Duration</span>
                    <span className="font-medium">{stage.avgDuration}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Projects
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-lg border shadow-none">
              <CardHeader>
                <CardTitle>Lifecycle Overview</CardTitle>
                <CardDescription>Distribution of projects across lifecycle stages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lifecycleStages.map((stage) => (
                    <div key={stage.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <span className="text-sm font-medium">{stage.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{stage.projects}</span>
                        <div className="w-20">
                          <Progress value={(stage.projects / 15) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-lg border shadow-none">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest project lifecycle changes and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.project}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.action} • {activity.stage}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-lg border shadow-none">
            <CardHeader>
              <CardTitle>Lifecycle Metrics</CardTitle>
              <CardDescription>
                Key performance indicators for project lifecycle management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">6.2</div>
                  <div className="text-sm text-muted-foreground">Avg Weeks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <div className="text-sm text-muted-foreground">On Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">4.8</div>
                  <div className="text-sm text-muted-foreground">Quality Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
