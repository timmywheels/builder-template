import type { Route } from "./+types/calculator";
import { NavigationHeader } from "../components/navigation-header";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Link } from "react-router";
import { ArrowLeft, Calculator } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ROI Calculator | AI Platform Monitoring" },
    {
      name: "description",
      content: "Calculate your potential ROI from AI search visibility and brand monitoring.",
    },
  ];
}

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-8" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>

          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-light mb-4">Calculate your AI search ROI</h1>
            <p className="text-lg text-muted-foreground font-light">
              See how much revenue you could generate by improving your AI visibility
            </p>
          </div>

          <Card className="border-2 border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50">
            <CardHeader>
              <CardTitle>ROI Calculator</CardTitle>
              <CardDescription>
                Coming soon - Calculate your potential returns from AI optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <p>Interactive ROI calculator will be available soon</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Want to learn more about AI search optimization?
            </p>
            <Button asChild>
              <Link to="/register">Start your free trial</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
