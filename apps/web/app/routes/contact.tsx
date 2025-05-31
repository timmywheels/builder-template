import type { Route } from "./+types/contact";
import { NavigationHeader } from "../components/navigation-header";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Link } from "react-router";
import { ArrowLeft, Mail, Phone, MessageSquare } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Sales | AI Platform Monitoring" },
    {
      name: "description",
      content: "Get in touch with our sales team for enterprise AI monitoring solutions.",
    },
  ];
}

export default function Contact() {
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
            <h1 className="text-3xl font-light mb-4">Contact our sales team</h1>
            <p className="text-lg text-muted-foreground font-light">
              Let's discuss how AI Monitor can help your enterprise succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border border-gray-300/70 dark:border-gray-700/70">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-medium mb-2">Email us</h3>
                <p className="text-sm text-muted-foreground">sales@aimonitor.com</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-300/70 dark:border-gray-700/70">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-medium mb-2">Call us</h3>
                <p className="text-sm text-muted-foreground">+1 (888) 123-4567</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-300/70 dark:border-gray-700/70">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-medium mb-2">Live chat</h3>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50">
            <CardHeader>
              <CardTitle>Get in touch</CardTitle>
              <CardDescription>Our sales team will respond within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <p>Contact form coming soon</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Want to explore on your own?</p>
            <Button variant="outline" asChild>
              <Link to="/register">Start free trial</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
