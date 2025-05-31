import { useAuthContext } from "../lib/auth";
import { NavigationHeader } from "../components/navigation-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AuthGuard } from "../components/auth-guard";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - AI Platform Monitoring" },
    {
      name: "description",
      content: "Your AI Platform Monitoring dashboard",
    },
  ];
}

export default function Dashboard() {
  const { user, logout } = useAuthContext();

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavigationHeader />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-medium">
              Welcome back{user?.name ? `, ${user.name}` : ""}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor your brand's presence across AI platforms
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Mentions</CardTitle>
                <CardDescription className="text-xs">Across all AI platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">1,247</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Visibility Score</CardTitle>
                <CardDescription className="text-xs">Your brand's AI presence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">87/100</div>
                <p className="text-xs text-muted-foreground mt-1">Excellent visibility</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Active Monitors</CardTitle>
                <CardDescription className="text-xs">Tracking your brand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">5</div>
                <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              {user?.name && (
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
              )}
              <div className="pt-4">
                <Button variant="outline" onClick={() => logout()}>
                  Sign out
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </AuthGuard>
  );
}
