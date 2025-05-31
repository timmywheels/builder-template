import { useAuthContext } from "../lib/auth";
import { NavigationHeader } from "../components/navigation-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AuthGuard } from "../components/auth-guard";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { Route } from "./+types/dashboard";
import {
  TrendingUp,
  TrendingDown,
  Bot,
  Brain,
  Search,
  AlertCircle,
  CheckCircle2,
  Quote,
  FileText,
  Users,
  Building2,
  Sparkles,
  Eye,
  Activity,
  Target,
  ArrowUp,
  ArrowDown,
  Zap,
  Shield,
  Award,
  Link2,
  MessageSquare,
  BarChart3,
  Info,
  ExternalLink,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GEO Dashboard - Generative Engine Optimization Platform" },
    {
      name: "description",
      content:
        "Monitor and optimize your brand's visibility across AI search engines and language models",
    },
  ];
}

// Mock data for the dashboard
const aiPlatformData = [
  { name: "Mon", ChatGPT: 145, Perplexity: 98, Claude: 67, Gemini: 89 },
  { name: "Tue", ChatGPT: 152, Perplexity: 103, Claude: 72, Gemini: 95 },
  { name: "Wed", ChatGPT: 163, Perplexity: 110, Claude: 75, Gemini: 98 },
  { name: "Thu", ChatGPT: 178, Perplexity: 118, Claude: 82, Gemini: 103 },
  { name: "Fri", ChatGPT: 195, Perplexity: 125, Claude: 88, Gemini: 112 },
  { name: "Sat", ChatGPT: 203, Perplexity: 132, Claude: 92, Gemini: 118 },
  { name: "Sun", ChatGPT: 218, Perplexity: 140, Claude: 95, Gemini: 125 },
];

const eatScoreData = [
  { subject: "Experience", A: 92, fullMark: 100 },
  { subject: "Expertise", A: 88, fullMark: 100 },
  { subject: "Authoritativeness", A: 85, fullMark: 100 },
  { subject: "Trustworthiness", A: 90, fullMark: 100 },
];

const citationSourceData = [
  { name: "Direct Citations", value: 45, color: "#0ea5e9" },
  { name: "Indirect References", value: 30, color: "#8b5cf6" },
  { name: "Brand Mentions", value: 15, color: "#10b981" },
  { name: "Product Features", value: 10, color: "#f59e0b" },
];

const competitorData = [
  { metric: "AI Visibility", yourBrand: 87, competitor1: 72, competitor2: 65, competitor3: 58 },
  { metric: "Citation Rate", yourBrand: 82, competitor1: 68, competitor2: 71, competitor3: 54 },
  { metric: "Entity Score", yourBrand: 90, competitor1: 75, competitor2: 62, competitor3: 69 },
  { metric: "Content Quality", yourBrand: 85, competitor1: 79, competitor2: 73, competitor3: 61 },
];

const contentOptimizationData = [
  { strategy: "Add Statistics", impact: 39.5, current: 72 },
  { strategy: "Include Citations", impact: 40.4, current: 65 },
  { strategy: "Expert Quotes", impact: 38.1, current: 45 },
  { strategy: "Fluent Writing", impact: 35.2, current: 88 },
  { strategy: "Technical Terms", impact: 32.7, current: 78 },
  { strategy: "Authoritative Tone", impact: 30.1, current: 82 },
];

export default function Dashboard() {
  const { user, logout } = useAuthContext();

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <NavigationHeader />

        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="default" className="text-[11px] font-normal">
                <Sparkles className="h-3 w-3 mr-1" />
                GEO Platform
              </Badge>
              <Badge variant="outline" className="text-[11px] font-normal">
                Real-time Monitoring
              </Badge>
            </div>
            <h1 className="text-3xl font-light">
              Welcome back{user?.name ? `, ${user.name}` : ""}!
            </h1>
            <p className="text-muted-foreground mt-2 text-sm font-light">
              Your brand's AI visibility and generative engine optimization insights
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="border-gray-300/70 dark:border-gray-700/70">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">AI Visibility Score</CardTitle>
                  <Brain className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-light">87</div>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+5 points this week</span>
                </div>
                <Progress value={87} className="mt-3 h-1.5" />
              </CardContent>
            </Card>

            <Card className="border-gray-300/70 dark:border-gray-700/70">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Citation Rate</CardTitle>
                  <Quote className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-light">3.2%</div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+0.8% from last month</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">Industry avg: 1.8%</p>
              </CardContent>
            </Card>

            <Card className="border-gray-300/70 dark:border-gray-700/70">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">AI Mentions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-light">2,847</div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+23% this month</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">Across 4 AI platforms</p>
              </CardContent>
            </Card>

            <Card className="border-gray-300/70 dark:border-gray-700/70">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Entity Health</CardTitle>
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary" className="text-[10px]">
                    Knowledge Panel
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    Brand SERP
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-5 h-9">
              <TabsTrigger value="overview" className="text-xs">
                Overview
              </TabsTrigger>
              <TabsTrigger value="platforms" className="text-xs">
                AI Platforms
              </TabsTrigger>
              <TabsTrigger value="optimization" className="text-xs">
                Optimization
              </TabsTrigger>
              <TabsTrigger value="competitors" className="text-xs">
                Competitors
              </TabsTrigger>
              <TabsTrigger value="alerts" className="text-xs">
                Alerts
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* AI Platform Performance */}
                <Card className="border-gray-300/70 dark:border-gray-700/70">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">AI Platform Citations</CardTitle>
                    <CardDescription className="text-xs">
                      Daily citation tracking across major AI engines
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={aiPlatformData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{
                            fontSize: "12px",
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid #e5e7eb",
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                        <Line
                          type="monotone"
                          dataKey="ChatGPT"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Perplexity"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Claude"
                          stroke="#0ea5e9"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Gemini"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* E-E-A-T Score */}
                <Card className="border-gray-300/70 dark:border-gray-700/70">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">E-E-A-T Analysis</CardTitle>
                    <CardDescription className="text-xs">
                      Experience, Expertise, Authoritativeness, Trustworthiness
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <RadarChart data={eatScoreData}>
                        <PolarGrid strokeDasharray="3 3" className="opacity-30" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <Radar
                          name="Your Score"
                          dataKey="A"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Overall E-E-A-T Score</span>
                        <span className="font-medium">88.75/100</span>
                      </div>
                      <Progress value={88.75} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Citation Sources */}
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="border-gray-300/70 dark:border-gray-700/70 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Citation Analysis</CardTitle>
                    <CardDescription className="text-xs">
                      How AI engines reference your brand
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={citationSourceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {citationSourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-3">
                        {citationSourceData.map((item) => (
                          <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-xs">{item.name}</span>
                            </div>
                            <span className="text-xs font-medium">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-gray-300/70 dark:border-gray-700/70">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
                    <CardDescription className="text-xs">
                      Improve your GEO performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <FileText className="h-3.5 w-3.5 mr-2" />
                      Optimize Content for AI
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Link2 className="h-3.5 w-3.5 mr-2" />
                      Build Entity Connections
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Award className="h-3.5 w-3.5 mr-2" />
                      Improve E-E-A-T Signals
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Target className="h-3.5 w-3.5 mr-2" />
                      Track New Keywords
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* AI Platforms Tab */}
            <TabsContent value="platforms" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* ChatGPT */}
                <Card className="border-gray-300/70 dark:border-gray-700/70">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-medium">ChatGPT</CardTitle>
                        <CardDescription className="text-xs">
                          OpenAI's conversational AI
                        </CardDescription>
                      </div>
                      <Badge variant="default" className="text-[10px]">
                        <Activity className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-[11px] text-muted-foreground">Visibility</p>
                          <p className="text-lg font-light">92%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">Citations</p>
                          <p className="text-lg font-light">847</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">Accuracy</p>
                          <p className="text-lg font-light">96%</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Response Quality</span>
                          <span>Excellent</span>
                        </div>
                        <Progress value={92} className="h-1.5" />
                      </div>
                      <div className="pt-2">
                        <p className="text-[11px] font-medium mb-2">Top Cited Topics:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-[10px]">
                            Product features
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            Use cases
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            Pricing
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Perplexity */}
                <Card className="border-gray-300/70 dark:border-gray-700/70">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-medium">Perplexity</CardTitle>
                        <CardDescription className="text-xs">
                          AI-powered search engine
                        </CardDescription>
                      </div>
                      <Badge variant="default" className="text-[10px]">
                        <Activity className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-[11px] text-muted-foreground">Visibility</p>
                          <p className="text-lg font-light">85%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">Citations</p>
                          <p className="text-lg font-light">632</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">Accuracy</p>
                          <p className="text-lg font-light">94%</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Response Quality</span>
                          <span>Very Good</span>
                        </div>
                        <Progress value={85} className="h-1.5" />
                      </div>
                      <div className="pt-2">
                        <p className="text-[11px] font-medium mb-2">Top Cited Topics:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-[10px]">
                            Company info
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            Reviews
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            Comparisons
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Claude */}
                <Card className="border-gray-300/70 dark:border-gray-700/70">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-medium">Claude</CardTitle>
                        <CardDescription className="text-xs">
                          Anthropic's AI assistant
                        </CardDescription>
                      </div>
                      <Badge variant="default" className="text-[10px]">
                        <Activity className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-[11px] text-muted-foreground">Visibility</p>
                          <p className="text-lg font-light">78%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">Citations</p>
                          <p className="text-lg font-light">423</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">Accuracy</p>
                          <p className="text-lg font-light">97%</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Response Quality</span>
                          <span>Good</span>
                        </div>
                        <Progress value={78} className="h-1.5" />
                      </div>
                      <div className="pt-2">
                        <p className="text-[11px] font-medium mb-2">Improvement Areas:</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px]">
                            <AlertCircle className="h-3 w-3 text-orange-500" />
                            <span>Add more technical documentation</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px]">
                            <AlertCircle className="h-3 w-3 text-orange-500" />
                            <span>Include API examples</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Google AI Overview */}
                <Card className="border-gray-300/70 dark:border-gray-700/70">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-medium">Google AI Overviews</CardTitle>
                        <CardDescription className="text-xs">
                          SGE / AI-powered search results
                        </CardDescription>
                      </div>
                      <Badge variant="default" className="text-[10px]">
                        <Activity className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-[11px] text-muted-foreground">Visibility</p>
                          <p className="text-lg font-light">81%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">Citations</p>
                          <p className="text-lg font-light">545</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">Accuracy</p>
                          <p className="text-lg font-light">91%</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Response Quality</span>
                          <span>Good</span>
                        </div>
                        <Progress value={81} className="h-1.5" />
                      </div>
                      <div className="pt-2">
                        <p className="text-[11px] font-medium mb-2">Optimization Tips:</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px]">
                            <Sparkles className="h-3 w-3 text-primary" />
                            <span>Structure content with clear headings</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px]">
                            <Sparkles className="h-3 w-3 text-primary" />
                            <span>Add FAQ schema markup</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Optimization Tab */}
            <TabsContent value="optimization" className="space-y-6">
              <Card className="border-gray-300/70 dark:border-gray-700/70">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-medium">
                        Content Optimization Strategies
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Based on Princeton GEO study findings
                      </CardDescription>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Study
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contentOptimizationData.map((strategy) => (
                      <div key={strategy.strategy} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{strategy.strategy}</span>
                            <Badge variant="outline" className="text-[10px]">
                              +{strategy.impact}% potential
                            </Badge>
                          </div>
                          <span className="text-sm font-light">{strategy.current}%</span>
                        </div>
                        <div className="relative">
                          <Progress value={strategy.current} className="h-2" />
                          <div
                            className="absolute top-0 h-2 w-0.5 bg-primary"
                            style={{ left: `${strategy.impact}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Current implementation vs. optimal target
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Top Priority: Add More Statistics</p>
                        <p className="text-[11px] text-muted-foreground">
                          Adding credible statistics to your content can improve AI visibility by up
                          to 39.5%. You're currently at 72% implementation.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Entity Optimization */}
                <Card className="border-gray-300/70 dark:border-gray-700/70">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Entity Optimization</CardTitle>
                    <CardDescription className="text-xs">
                      Knowledge Graph & Brand SERP health
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Knowledge Panel Active</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          Live
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Brand SERP Optimized</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          90%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Entity Home Page</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          Needs update
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Manage Entity Signals
                    </Button>
                  </CardContent>
                </Card>

                {/* Content Recommendations */}
                <Card className="border-gray-300/70 dark:border-gray-700/70">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">AI-Ready Content</CardTitle>
                    <CardDescription className="text-xs">
                      Content optimization recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Product Guide</span>
                          <Badge variant="outline" className="text-[10px]">
                            High priority
                          </Badge>
                        </div>
                        <div className="space-y-1 text-[11px] text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            <span>Add 3-5 statistics with sources</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            <span>Include expert quotes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            <span>Add comparison table</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">API Documentation</span>
                          <Badge variant="outline" className="text-[10px]">
                            Medium priority
                          </Badge>
                        </div>
                        <div className="space-y-1 text-[11px] text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                            <span>Improve code examples</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                            <span>Add use case scenarios</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Competitors Tab */}
            <TabsContent value="competitors" className="space-y-6">
              <Card className="border-gray-300/70 dark:border-gray-700/70">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Competitive Intelligence</CardTitle>
                  <CardDescription className="text-xs">
                    AI visibility comparison with top competitors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={competitorData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          fontSize: "12px",
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Bar dataKey="yourBrand" fill="#8b5cf6" name="Your Brand" />
                      <Bar dataKey="competitor1" fill="#6b7280" name="Competitor A" />
                      <Bar dataKey="competitor2" fill="#9ca3af" name="Competitor B" />
                      <Bar dataKey="competitor3" fill="#d1d5db" name="Competitor C" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Your Strengths</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          <span>Leading in AI visibility (87% vs avg 65%)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          <span>Superior entity recognition score</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          <span>Higher citation accuracy rate</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Opportunities</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-orange-600" />
                          <span>Competitor A strong in technical queries</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-orange-600" />
                          <span>Improve presence in comparison searches</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-orange-600" />
                          <span>Expand coverage in how-to content</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-4">
              <Card className="border-gray-300/70 dark:border-gray-700/70">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">
                      Real-time Monitoring Alerts
                    </CardTitle>
                    <Badge variant="default" className="text-[10px]">
                      12 new alerts
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-start gap-3">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Citation spike on ChatGPT</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your brand was cited 23 times in the last hour for "best AI monitoring
                        tools"
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-2">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-3">
                    <Bot className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New competitor detected</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        "TechMonitor AI" is now appearing in 15% of queries where you're mentioned
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-2">1 hour ago</p>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Accuracy issue detected</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Claude is showing outdated pricing information. Update your entity data.
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-2">3 hours ago</p>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">E-E-A-T improvement</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your authoritativeness score increased by 5 points after recent media
                        coverage
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-2">Yesterday</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-300/70 dark:border-gray-700/70">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Alert Settings</CardTitle>
                  <CardDescription className="text-xs">
                    Configure your monitoring preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Citation threshold alerts</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Competitor movements</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Accuracy issues</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">E-E-A-T score changes</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AuthGuard>
  );
}
