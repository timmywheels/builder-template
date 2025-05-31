import type { Route } from "./+types/demo";
import { NavigationHeader } from "../components/navigation-header";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Link } from "react-router";
import { ArrowLeft, PlayCircle } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Watch Demo | AI Platform Monitoring" },
    {
      name: "description",
      content:
        "See how our AI monitoring platform helps brands track and optimize their visibility across ChatGPT, Claude, and other AI platforms.",
    },
  ];
}

export default function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-8" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-3xl font-light mb-4">Watch our 2-minute demo</h1>
            <p className="text-lg text-muted-foreground font-light">
              See how AI Monitor helps you track and improve your brand's visibility across AI
              platforms
            </p>
          </div>

          <Card className="border-2 border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">Demo video coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Ready to get started?</p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link to="/register">Start free trial</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Contact sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
