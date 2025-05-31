import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TrendingUp, Users, Bot, Globe } from "lucide-react";

export function AnalyticsPreview() {
  const platforms = [
    {
      name: "ChatGPT",
      model: "GPT-4o",
      competitor: "Expedia",
      mentions: "1,247",
      visibility: "12%",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      name: "Claude",
      model: "3.7 Sonnet",
      competitor: "Kayak",
      mentions: "983",
      visibility: "5%",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      name: "Deepseek",
      model: "V3",
      competitor: "Hotels.com",
      mentions: "689",
      visibility: "2%",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      name: "Gemini",
      model: "Gemini Pro 2.5",
      competitor: "Agoda",
      mentions: "542",
      visibility: "1%",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      name: "Perplexity",
      model: "Sonar Reasoning",
      competitor: "Kayak",
      mentions: "423",
      visibility: "2%",
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950/20",
    },
  ];

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-50/50 dark:from-gray-950/50 dark:via-transparent dark:to-gray-950/50" />

      <div className="container mx-auto max-w-5xl relative">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-300/70 dark:border-gray-700/70 overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b bg-gradient-to-r from-gray-50/50 to-white dark:from-gray-950/50 dark:to-gray-900">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div>
                <h3 className="text-lg font-medium tracking-tight">Booking LA Monitoring</h3>
                <p className="text-muted-foreground text-xs font-light">
                  Monitor how LLMs mention your brand compared to competitors
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="gap-1 text-[11px] font-normal backdrop-blur-sm bg-white/50 dark:bg-gray-900/50"
                >
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live
                </Badge>
                <Badge
                  variant="outline"
                  className="gap-1 text-[11px] font-normal animate-in fade-in slide-in-from-right-2 duration-700"
                >
                  Last updated 2 mins ago
                </Badge>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-3 gap-5 p-5 bg-gray-50/50 dark:bg-gray-950/50">
            <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-light">
                <TrendingUp className="h-3 w-3" />
                Your Brand Mentions
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-light">1,247</span>
                <span className="text-[11px] text-green-600 font-normal animate-pulse">
                  +12% from last month
                </span>
              </div>
            </div>

            <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-light">
                <Users className="h-3 w-3" />
                Estimated Traffic
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-light">8K - 10K</span>
                <span className="text-[11px] text-muted-foreground font-light">
                  Last updated today
                </span>
              </div>
            </div>

            <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-light">
                <Globe className="h-3 w-3" />
                Visibility Score
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-light">87%</span>
                <span className="text-[11px] text-muted-foreground font-light">
                  Positive brand perception
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="prompts">Prompts</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-1 mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground">Monitored Prompt</h4>
                  <p className="text-lg font-medium">I need a hotel in Los Angeles for next week</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-sm">Model</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Version</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Top Competitor</th>
                        <th className="text-right py-3 px-4 font-medium text-sm">Mentions</th>
                        <th className="text-right py-3 px-4 font-medium text-sm">Visibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {platforms.map((platform) => (
                        <tr
                          key={platform.name}
                          className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                                <Bot className={`h-4 w-4 ${platform.color}`} />
                              </div>
                              <span className="font-medium">{platform.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {platform.model}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {platform.competitor[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{platform.competitor}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-medium">{platform.mentions}</td>
                          <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                            {platform.visibility}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="prompts" className="mt-6">
                <div className="text-center py-12 text-muted-foreground">
                  Prompt analysis coming soon...
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="text-center py-12 text-muted-foreground">
                  Analytics charts coming soon...
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
