
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/ImageUpload";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { DiagnosisResults } from "@/components/DiagnosisResults";
import { HealthDashboard } from "@/components/HealthDashboard";
import { ProviderDashboard } from "@/components/ProviderDashboard";
import { Stethoscope, Brain, Heart, Shield, Activity, Monitor, Phone, Calendar } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("diagnosis");
  const [analysisResults, setAnalysisResults] = useState(null);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnosis",
      description: "Advanced machine learning algorithms for faster and more accurate disease diagnosis and prediction",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Enhanced personalization of patient care through precise AI recommendations tailored to individual needs",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Shield,
      title: "24/7 Medical Support",
      description: "Improved patient experience with continuous, reliable medical support and instant consultation",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Activity,
      title: "Provider Efficiency",
      description: "Increased efficiency and reduced workload for healthcare providers through intelligent automation",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const stats = [
    { value: "99.2%", label: "Diagnostic Accuracy", icon: Brain },
    { value: "85%", label: "Faster Diagnosis", icon: Activity },
    { value: "50K+", label: "Patients Served", icon: Heart },
    { value: "24/7", label: "Support Available", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 text-sm font-medium">
              🚀 Revolutionary Healthcare AI Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
              AI-Powered Healthcare for Everyone
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Experience the future of healthcare with our advanced AI platform. 
              Get faster diagnoses, personalized care, and 24/7 medical support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Stethoscope className="mr-2 h-5 w-5" />
                Start Free Diagnosis
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-blue-200 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl">
                <Monitor className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Revolutionary Healthcare Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform delivers unprecedented capabilities in healthcare diagnosis and patient care
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-sm hover:bg-white hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Platform */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              AI Healthcare Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload medical images, record symptoms, and get instant AI-powered analysis
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/70 backdrop-blur-sm p-2 rounded-2xl">
                <TabsTrigger value="diagnosis" className="rounded-xl py-3 text-lg font-medium">
                  <Brain className="mr-2 h-5 w-5" />
                  AI Diagnosis
                </TabsTrigger>
                <TabsTrigger value="patient" className="rounded-xl py-3 text-lg font-medium">
                  <Heart className="mr-2 h-5 w-5" />
                  Patient Care
                </TabsTrigger>
                <TabsTrigger value="provider" className="rounded-xl py-3 text-lg font-medium">
                  <Stethoscope className="mr-2 h-5 w-5" />
                  Provider Tools
                </TabsTrigger>
              </TabsList>

              <TabsContent value="diagnosis" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <ImageUpload onAnalysis={setAnalysisResults} />
                  <VoiceRecorder onTranscription={setAnalysisResults} />
                </div>
                {analysisResults && <DiagnosisResults results={analysisResults} />}
              </TabsContent>

              <TabsContent value="patient">
                <HealthDashboard />
              </TabsContent>

              <TabsContent value="provider">
                <ProviderDashboard />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of healthcare providers and patients who trust our AI platform for better health outcomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-xl">
              <Phone className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
