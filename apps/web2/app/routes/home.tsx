import type { Route } from "./+types/home";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Search,
  BarChart3,
  Users,
  LineChart,
  Zap,
  Shield,
  Globe,
  Sparkles,
  PlayCircle,
  Star,
  ChevronRight,
  Bot,
  Monitor,
  Bell,
  PieChart,
  Lightbulb,
  Target,
  DollarSign,
  Clock,
  Calculator,
} from "lucide-react";
import { NavigationHeader } from "../components/navigation-header";
import { PricingCard } from "../components/pricing-card";
import { TrustLogos } from "../components/trust-logos";
import { Footer } from "../components/footer";
import { HeroSection } from "../components/hero-section";
import { StatsSection } from "../components/stats-section";
import { AnalyticsPreview } from "../components/analytics-preview";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Platform Monitoring & Optimization | Track Your Brand in ChatGPT, Claude & More" },
    {
      name: "description",
      content:
        "Monitor and optimize your brand's presence in AI search engines like ChatGPT, Claude, and Perplexity. Get real-time analytics and improve your visibility.",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <NavigationHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators */}
      <TrustLogos />

      {/* Main Value Prop Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light mb-3">
              Search volumes are shifting from search engines to AI
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto font-light">
              As users migrate from traditional search engines to AI platforms, traffic patterns are
              fundamentally changing. All major AI models are capturing search volume — creating new
              discovery channels.
            </p>
          </div>

          {/* Visual representation of the shift */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Traditional Search - Declining */}
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-transparent" />
              <CardHeader className="relative pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-[11px] font-normal">
                    Traditional
                  </Badge>
                  <div className="flex items-center gap-1 text-red-600">
                    <TrendingDown className="h-3 w-3" />
                    <span className="text-[11px] font-medium">-18%</span>
                  </div>
                </div>
                <CardTitle className="text-base font-normal text-muted-foreground">
                  Google Search
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-3">
                  <div className="h-20 flex items-end justify-between gap-1">
                    {[80, 75, 70, 65, 60, 55, 50, 45].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gray-300 dark:bg-gray-700 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Declining user engagement
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Search - Growing */}
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 to-purple-50 dark:from-primary/20 dark:to-purple-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <CardHeader className="relative pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="default" className="text-[11px] font-normal">
                    AI-Powered
                  </Badge>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-[11px] font-medium">+156%</span>
                  </div>
                </div>
                <CardTitle className="text-base font-normal">
                  ChatGPT, Claude & Perplexity
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-3">
                  <div className="h-20 flex items-end justify-between gap-1">
                    {[20, 30, 40, 50, 60, 70, 85, 95].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Exponential growth trajectory
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Impact Section */}
          <div className="relative mt-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-light mb-2">The real business impact</h3>
              <p className="text-sm text-muted-foreground font-light">
                Companies using our platform see measurable results within 90 days
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Revenue Impact */}
              <Card className="relative overflow-hidden border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 group hover:-translate-y-0.5 hover:border-gray-400 dark:hover:border-gray-600">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="relative p-6">
                  <div className="space-y-4">
                    <div className="inline-flex p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                      <TrendingUp className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <p className="text-3xl font-light text-gray-900 dark:text-gray-100">+43%</p>
                      <p className="text-sm font-medium mt-1">Revenue from AI traffic</p>
                      <p className="text-xs text-muted-foreground mt-2 font-light leading-relaxed">
                        Average increase in qualified traffic that converts 3.4x better than
                        traditional search
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Savings */}
              <Card className="relative overflow-hidden border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 group hover:-translate-y-0.5 hover:border-gray-400 dark:hover:border-gray-600">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="relative p-6">
                  <div className="space-y-4">
                    <div className="inline-flex p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                      <DollarSign className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <p className="text-3xl font-light text-gray-900 dark:text-gray-100">-67%</p>
                      <p className="text-sm font-medium mt-1">Lower acquisition costs</p>
                      <p className="text-xs text-muted-foreground mt-2 font-light leading-relaxed">
                        AI-driven traffic costs significantly less than paid search with higher
                        engagement rates
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time to Value */}
              <Card className="relative overflow-hidden border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 group hover:-translate-y-0.5 hover:border-gray-400 dark:hover:border-gray-600">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="relative p-6">
                  <div className="space-y-4">
                    <div className="inline-flex p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                      <Clock className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <p className="text-3xl font-light text-gray-900 dark:text-gray-100">
                        21 days
                      </p>
                      <p className="text-sm font-medium mt-1">To first AI mention</p>
                      <p className="text-xs text-muted-foreground mt-2 font-light leading-relaxed">
                        Start seeing your brand recommended by AI platforms in less than a month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ROI Calculator CTA */}
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs font-medium border-gray-300/70 dark:border-gray-700/70 hover:border-gray-400 dark:hover:border-gray-600 transition-all"
              >
                <Calculator className="h-3.5 w-3.5" />
                Calculate your potential ROI
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Preview Section */}
      <AnalyticsPreview />

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-3 text-[11px] font-normal">
              Customer Success
            </Badge>
            <h2 className="text-2xl font-light mb-3">Brands winning with AI visibility</h2>
            <p className="text-base text-muted-foreground font-light max-w-2xl mx-auto">
              See how leading companies are capturing AI search traffic
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "We saw a 312% increase in qualified leads after optimizing for AI search. The platform made it incredibly easy to track and improve our mentions.",
                author: "Sarah Chen",
                role: "Head of Growth",
                company: "TravelTech Pro",
                metric: "+312%",
                metricLabel: "qualified leads",
              },
              {
                quote:
                  "AI search now drives 40% of our traffic. This platform helped us understand exactly what to optimize and gave us a competitive edge.",
                author: "Michael Roberts",
                role: "VP Marketing",
                company: "BookingHub",
                metric: "40%",
                metricLabel: "of total traffic",
              },
              {
                quote:
                  "The insights we got helped us outrank competitors in ChatGPT responses. Our brand visibility score went from 23% to 87% in 3 months.",
                author: "Emma Thompson",
                role: "Director of SEO",
                company: "StayLocal",
                metric: "87%",
                metricLabel: "visibility score",
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className="border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 group hover:border-gray-400 dark:hover:border-gray-600"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-sm font-light leading-relaxed mb-6 text-muted-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium">{testimonial.author}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-light text-primary">{testimonial.metric}</p>
                      <p className="text-[10px] text-muted-foreground">{testimonial.metricLabel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3 text-[11px] font-normal">
              Platform Features
            </Badge>
            <h2 className="text-2xl font-light mb-3">
              Everything you need to dominate AI search results
            </h2>
            <p className="text-base text-muted-foreground font-light max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you track, analyze, and optimize your brand's
              presence across every major AI platform
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Real-time Monitoring */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/10 to-gray-300/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700" />
              <Card className="relative border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden h-full transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 dark:hover:border-gray-600">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="pb-4 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                      <Monitor className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      Real-time
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-medium transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    Live Brand Monitoring
                  </CardTitle>
                  <CardDescription className="text-xs font-light">
                    Track mentions across ChatGPT, Claude, Perplexity & more
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 relative">
                  <div className="space-y-2">
                    {[
                      "ChatGPT mentioned you 47 times today",
                      "Claude ranking improved by 3 positions",
                      "New competitor detected: TechCorp",
                    ].map((alert, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[11px] p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 transition-all duration-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-800/70"
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-500" : "bg-orange-500"
                          }`}
                        />
                        <span className="text-muted-foreground">{alert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Dashboard */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300/10 to-gray-400/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700" />
              <Card className="relative border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden h-full transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 dark:hover:border-gray-600">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="pb-4 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                      <BarChart3 className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-[10px] font-medium">+24%</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-medium transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    Actionable Analytics
                  </CardTitle>
                  <CardDescription className="text-xs font-light">
                    Understand your AI search performance at a glance
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-muted-foreground">Visibility Score</span>
                        <span className="font-medium">87/100</span>
                      </div>
                      <Progress
                        value={87}
                        className="h-1.5 [&>div]:bg-gray-700 dark:[&>div]:bg-gray-400"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {[
                        { label: "Mentions", value: "1.2K", change: "+12%" },
                        { label: "Reach", value: "45K", change: "+8%" },
                        { label: "Share of Voice", value: "34%", change: "+5%" },
                      ].map((metric) => (
                        <div
                          key={metric.label}
                          className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 transition-all duration-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-800/70"
                        >
                          <p className="text-xs font-medium">{metric.value}</p>
                          <p className="text-[10px] text-muted-foreground">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prompt Optimization */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/10 to-gray-500/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700" />
              <Card className="relative border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden h-full transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 dark:hover:border-gray-600">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="pb-4 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                      <Sparkles className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <Badge className="text-[10px]" variant="outline">
                      AI-Powered
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-medium transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    Prompt Intelligence
                  </CardTitle>
                  <CardDescription className="text-xs font-light">
                    Test & optimize how AI models respond to your brand
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 border border-gray-200/50 dark:border-gray-700/30 transition-all duration-300 group-hover:border-gray-300/50 dark:group-hover:border-gray-600/30">
                      <p className="text-[11px] font-medium mb-1">Winning prompt pattern:</p>
                      <p className="text-[10px] text-muted-foreground italic">
                        "Best [your category] for [use case]"
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span className="text-[10px] text-green-600">89% mention rate</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Competitive Intelligence */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700" />
              <Card className="relative border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden h-full transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 dark:hover:border-gray-600">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="pb-4 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                      <Target className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <Badge className="text-[10px]" variant="secondary">
                      New
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-medium transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    Competitive Analysis
                  </CardTitle>
                  <CardDescription className="text-xs font-light">
                    Stay ahead by tracking competitor AI performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-2">
                    {[
                      { name: "You", score: 87, color: "bg-gray-800 dark:bg-gray-200" },
                      { name: "Competitor A", score: 72, color: "bg-gray-300 dark:bg-gray-600" },
                      { name: "Competitor B", score: 65, color: "bg-gray-300 dark:bg-gray-600" },
                    ].map((comp) => (
                      <div key={comp.name} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span
                            className={
                              comp.name === "You" ? "font-medium" : "text-muted-foreground"
                            }
                          >
                            {comp.name}
                          </span>
                          <span>{comp.score}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${comp.color} rounded-full transition-all duration-300`}
                            style={{ width: `${comp.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content Optimization Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3 text-[11px] font-normal">
              Content Strategy
            </Badge>
            <h2 className="text-2xl font-light mb-3">
              Improve AI search visibility with strategic content optimization
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto font-light">
              Uncover hidden opportunities and transform your content to capture prime visibility
              across AI platforms
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 group hover:border-gray-400 dark:hover:border-gray-600">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-gray-300/10 to-gray-400/10 blur-2xl" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                  <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                    <Search className="h-4 w-4 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  Content Gap Analysis
                </CardTitle>
                <CardDescription className="text-sm font-light">
                  Identify missing or underrepresented topics
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-normal">Current Coverage</span>
                      <span className="text-xs text-muted-foreground">35%</span>
                    </div>
                    <Progress
                      value={35}
                      className="h-1.5 [&>div]:bg-gray-700 dark:[&>div]:bg-gray-400"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-normal">Growth Potential</span>
                      <span className="text-xs text-green-600">65%</span>
                    </div>
                    <Progress value={65} className="h-1.5 [&>div]:bg-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 group hover:border-gray-400 dark:hover:border-gray-600">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-gray-400/10 to-gray-500/10 blur-2xl" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                  <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                    <Zap className="h-4 w-4 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  Answer Gap Detection
                </CardTitle>
                <CardDescription className="text-sm font-light">
                  Monitor real-time brand mentions in AI-generated answers
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 rounded-lg border border-gray-200/50 dark:border-gray-700/30 transition-all duration-300 group-hover:border-gray-300/50 dark:group-hover:border-gray-600/30">
                    <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-light">Holiday season Travel LA</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-100/50 to-gray-50 dark:from-gray-800/30 dark:to-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/30 transition-all duration-300 group-hover:border-gray-300/50 dark:group-hover:border-gray-600/30">
                    <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-light">Travel San Diego recommendations</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-3 text-[11px] font-normal animate-pulse">
              Limited Time • 20% Off Annual Plans
            </Badge>
            <h2 className="text-2xl font-light mb-3">
              Start increasing your brand visibility in AI search
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Join 500+ brands already dominating AI search results
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            <PricingCard
              name="Solo"
              price="$89"
              annualPrice="$71"
              savings="20%"
              description="Get started with basic monitoring and analytics"
              features={[
                "1 project",
                "2 monitors",
                "50 tracked prompts",
                "500 responses",
                "Weekly refresh",
                "200K analytics events",
                "Google AI overviews",
                "1 seat",
              ]}
            />
            <PricingCard
              name="Startup"
              price="$199"
              annualPrice="$159"
              savings="20%"
              description="Perfect for growing teams"
              features={[
                "2 projects",
                "5 monitors",
                "150 tracked prompts",
                "1,500 responses",
                "Weekly refresh",
                "10M analytics events",
                "Google AI overviews",
                "2 seats",
              ]}
              highlighted
            />
            <PricingCard
              name="Business"
              price="$499"
              annualPrice="$399"
              savings="20%"
              description="Advanced features for growing businesses"
              features={[
                "5 projects",
                "15 monitors",
                "350 tracked prompts",
                "4,500 responses",
                "Daily refresh",
                "50M analytics events",
                "Google AI overviews",
                "5 seats",
              ]}
            />
            <Card className="border-2 border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Enterprise</CardTitle>
                <CardDescription className="text-xs font-light">
                  Custom solutions tailored to your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Contact our team for custom pricing tailored to your organization. Get dedicated
                  support, advanced features, and enterprise-grade security.
                </p>
                <Button
                  className="w-full font-medium text-xs h-9 border-gray-300/70 dark:border-gray-700/70 hover:border-gray-400 dark:hover:border-gray-600 transition-all"
                  variant="outline"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              All plans include a 7-day free trial • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light mb-3">Frequently Asked Questions</h2>
            <p className="text-base text-muted-foreground font-light">
              Learn about AI visibility monitoring and how our platform helps your brand succeed
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is AI Platform Monitoring?</AccordionTrigger>
              <AccordionContent>
                AI Platform Monitoring tracks how your brand appears across major AI assistants like
                ChatGPT, Claude, and Perplexity. It provides insights into when and how AI models
                mention your company, products, or services.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is Generative Engine Optimization (GEO)?</AccordionTrigger>
              <AccordionContent>
                GEO is the practice of optimizing your content to be more discoverable and
                accurately represented by AI language models. It's the AI-era equivalent of SEO,
                focusing on how AI systems understand and present your brand.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Which AI platforms do you monitor?</AccordionTrigger>
              <AccordionContent>
                We monitor all major AI platforms including OpenAI's ChatGPT, Anthropic's Claude,
                Google's Gemini, Perplexity, and emerging AI search engines. Our coverage expands as
                new platforms gain adoption.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How can this improve my brand's AI visibility?</AccordionTrigger>
              <AccordionContent>
                Our platform identifies gaps in how AI models understand your brand, tracks
                competitor mentions, and provides actionable insights to improve your content
                strategy for better AI representation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I track my competitors' AI visibility?</AccordionTrigger>
              <AccordionContent>
                Yes! You can monitor how often competitors are mentioned across AI platforms,
                compare visibility scores, and identify opportunities to improve your own AI
                presence.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Do you support multiple languages?</AccordionTrigger>
              <AccordionContent>
                Absolutely. Our platform supports monitoring in over 50 languages, allowing you to
                track your brand's AI visibility globally and in local markets.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>Who should use this platform?</AccordionTrigger>
              <AccordionContent>
                Marketing teams, SEO professionals, brand managers, and agencies who want to ensure
                their brand is properly represented in AI-generated responses. It's essential for
                any business that wants to stay visible in the AI era.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>How do I get started?</AccordionTrigger>
              <AccordionContent>
                Simply sign up for a 7-day free trial, add your brand and competitors to monitor,
                and start tracking your AI visibility immediately. No credit card required for the
                trial.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5" />
        <div className="container mx-auto max-w-4xl relative text-center">
          <Badge variant="default" className="mb-4 text-[11px] font-normal animate-pulse">
            Limited Time Offer
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Your competitors are already using AI monitoring
          </h2>

          <p className="text-lg text-muted-foreground font-light mb-8 max-w-2xl mx-auto">
            Join <span className="font-medium text-foreground">500+ brands</span> getting{" "}
            <span className="font-medium text-foreground">3.4x more qualified traffic</span> from AI
            search. Start your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              className="text-sm font-medium border-gray-900 dark:border-gray-100 hover:border-gray-700 dark:hover:border-gray-300 transition-all"
            >
              Start Free 7-Day Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-sm font-medium">
              <PlayCircle className="mr-2 h-4 w-4" />
              Watch 2-min Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
