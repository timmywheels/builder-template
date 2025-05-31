import { Card, CardContent } from "./ui/card";
import { TrendingUp, Bot, Brain, Search, Quote, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";

export function StatsSection() {
  const stats = [
    {
      platform: "OpenAI",
      metric: "Weekly active users",
      value: "400M",
      icon: Bot,
      trend: "+72%",
      description: "ChatGPT dominates AI search",
    },
    {
      platform: "Claude",
      metric: "Monthly active users",
      value: "20.8M",
      icon: Brain,
      trend: "+124%",
      description: "Anthropic's rapid growth",
    },
    {
      platform: "Perplexity",
      metric: "Monthly active users",
      value: "10.1M",
      icon: Search,
      trend: "+300%",
      description: "AI-first search pioneer",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950/50 dark:to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3 text-[11px] font-normal">
            Market Growth
          </Badge>
          <h2 className="text-2xl font-light mb-3">The AI search revolution is happening now</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-light">
            Every major tech company is investing billions in AI search. The market is exploding,
            and early movers are capturing massive mindshare.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.platform} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/10 to-gray-300/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700" />
              <Card className="relative overflow-hidden border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden h-full transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 dark:hover:border-gray-600">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                      <stat.icon className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-[11px] font-medium">{stat.trend}</span>
                    </div>
                  </div>
                  <div className="space-y-1 mb-3">
                    <p className="text-2xl font-light tracking-tight transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.metric}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100/50 dark:border-gray-800/50">
                    <p className="text-[11px] font-medium text-gray-900 dark:text-gray-100">
                      {stat.platform}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-light">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Redesigned Quote Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center">
          <blockquote className="relative">
            <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 text-gray-200 dark:text-gray-800" />
            <p
              className="relative text-2xl md:text-3xl font-medium italic leading-relaxed text-gray-800 dark:text-gray-200"
              style={{ fontFamily: "Playfair Display Variable, serif" }}
            >
              "Can AI-Powered Search Engine Overtake Google? It Has for Me."
            </p>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400 font-light">
              A start-up called Perplexity reveals what's possible when a search engine is built
              from the ground up with artificial intelligence.
            </p>
            <footer className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Kevin Roose</span>
              <span className="mx-1">·</span>
              <span className="font-light">New York Times</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
