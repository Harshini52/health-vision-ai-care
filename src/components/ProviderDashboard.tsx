
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Clock, Activity, Brain, Calendar, FileText, TrendingUp } from "lucide-react";

export const ProviderDashboard = () => {
  const todayStats = [
    { label: "Patients Seen", value: "24", change: "+3", icon: Users, color: "blue" },
    { label: "AI Diagnoses", value: "18", change: "+5", icon: Brain, color: "purple" },
    { label: "Avg. Consultation", value: "12 min", change: "-2 min", icon: Clock, color: "green" },
    { label: "Efficiency Score", value: "94%", change: "+8%", icon: TrendingUp, color: "cyan" }
  ];

  const pendingCases = [
    { 
      id: "PAT-001", 
      name: "Sarah Johnson", 
      condition: "Chest Pain Analysis", 
      priority: "high", 
      aiConfidence: 92,
      time: "2 hours ago"
    },
    { 
      id: "PAT-002", 
      name: "Michael Chen", 
      condition: "Skin Lesion Review", 
      priority: "medium", 
      aiConfidence: 87,
      time: "4 hours ago"
    },
    { 
      id: "PAT-003", 
      name: "Emily Davis", 
      condition: "Headache Assessment", 
      priority: "low", 
      aiConfidence: 76,
      time: "6 hours ago"
    }
  ];

  const aiInsights = [
    {
      type: "Pattern Detection",
      message: "Increased respiratory symptoms in patients aged 45-65 this week",
      confidence: 89,
      action: "Consider seasonal allergy screening"
    },
    {
      type: "Resource Optimization",
      message: "Peak appointment times: 9-11 AM and 2-4 PM",
      confidence: 94,
      action: "Optimize scheduling algorithms"
    },
    {
      type: "Clinical Alert",
      message: "3 similar cases with cardiac symptoms detected",
      confidence: 82,
      action: "Review environmental factors"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayStats.map((stat, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                <Badge className="bg-green-100 text-green-700">
                  {stat.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="cases" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
          <TabsTrigger value="cases">Pending Cases</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Pending Case Reviews
              </CardTitle>
              <CardDescription>AI-analyzed cases awaiting physician review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingCases.map((case_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {case_.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{case_.name}</div>
                      <div className="text-sm text-gray-600">{case_.condition}</div>
                      <div className="text-xs text-gray-500">{case_.time}</div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={`${getPriorityColor(case_.priority)} border`}>
                      {case_.priority} priority
                    </Badge>
                    <div className="text-sm text-gray-600">AI: {case_.aiConfidence}%</div>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                AI Clinical Insights
              </CardTitle>
              <CardDescription>Intelligent patterns and recommendations from patient data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge className="bg-purple-100 text-purple-700 mb-2">
                        {insight.type}
                      </Badge>
                      <div className="font-medium text-gray-800">{insight.message}</div>
                    </div>
                    <div className="text-sm text-purple-600 font-medium">
                      {insight.confidence}% confidence
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 italic">{insight.action}</div>
                    <Button size="sm" variant="outline" className="border-purple-200 hover:bg-purple-100">
                      Act on Insight
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  Workload Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Routine Consultations</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Cases</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Follow-ups</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-cyan-500" />
                  Efficiency Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-cyan-50 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-600">18%</div>
                    <div className="text-sm text-gray-600">Time Saved</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">25%</div>
                    <div className="text-sm text-gray-600">More Patients</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-sm text-gray-600">AI Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">8.9</div>
                    <div className="text-sm text-gray-600">Patient Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
