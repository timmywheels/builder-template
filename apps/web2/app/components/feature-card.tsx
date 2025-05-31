import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/30 hover:shadow-xl transition-all duration-500 group">
      {/* Decorative gradient orb */}
      <div className="absolute -right-20 -top-20 h-32 w-32 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-3xl group-hover:from-primary/20 group-hover:to-purple-500/20 transition-colors duration-500" />

      <CardHeader className="relative pb-3">
        <div className="mb-3 inline-flex p-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
          <Icon className="h-4 w-4" />
        </div>
        <CardTitle className="text-base font-medium tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-xs font-light leading-relaxed text-muted-foreground/80">
          {description}
        </CardDescription>
      </CardContent>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
}
