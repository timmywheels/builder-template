import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "react-router";

interface PricingCardProps {
  name: string;
  price: string;
  annualPrice?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  savings?: string;
}

export function PricingCard({
  name,
  price,
  annualPrice,
  description,
  features,
  highlighted = false,
  savings,
}: PricingCardProps) {
  return (
    <Card
      className={`relative ${
        highlighted
          ? "border-primary border-2 scale-105"
          : "border border-gray-300/70 dark:border-gray-700/70"
      } bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600`}
    >
      {highlighted && (
        <Badge
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[11px] font-normal"
          variant="default"
        >
          Most Popular
        </Badge>
      )}
      {savings && (
        <Badge className="absolute -top-2.5 right-4 text-[10px] font-normal" variant="secondary">
          Save {savings}
        </Badge>
      )}
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">{name}</CardTitle>
        <CardDescription className="text-xs font-light">{description}</CardDescription>
        <div className="mt-3">
          <span className="text-2xl font-light">{price}</span>
          <span className="text-muted-foreground text-xs font-light">/month</span>
          {annualPrice && (
            <p className="text-[11px] text-muted-foreground mt-1">
              or <span className="font-medium text-foreground">{annualPrice}/month</span> billed
              annually
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-[11px] font-light leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full font-medium text-xs h-9 border-gray-300/70 dark:border-gray-700/70 hover:border-gray-400 dark:hover:border-gray-600 transition-all"
          variant={highlighted ? "default" : "outline"}
          asChild
        >
          <Link to="/register">Start 7-day Free Trial</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
