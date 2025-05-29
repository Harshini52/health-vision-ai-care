
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ImageUpload";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { DiagnosisResults } from "@/components/DiagnosisResults";
import { HealthDashboard } from "@/components/HealthDashboard";
import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Brain, 
  Stethoscope, 
  Heart, 
  Users, 
  Shield, 
  Zap,
  ArrowRight,
  Star,
  CheckCircle2,
  TrendingUp,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { user, loading } = useAuth();

  const handleAnalysis = (results: any) => {
    setAnalysisResults(results);
  };

  const resetAnalysis = () => {
    setAnalysisResults(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
            <Stethoscope className="h-8 w-8 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {analysisResults ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Analysis Results</h2>
                <Button onClick={resetAnalysis} variant="outline">
                  New Analysis
                </Button>
              </div>
              <DiagnosisResults results={analysisResults} />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Welcome back, {user.user_metadata?.full_name || 'User'}!
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Choose how you'd like to analyze your health today. Our AI is ready to provide personalized insights.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Analyses Done</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">24</div>
                    <p className="text-blue-100 text-sm">+3 this week</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Health Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">92%</div>
                    <p className="text-green-100 text-sm">Excellent</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">8</div>
                    <p className="text-purple-100 text-sm">Active</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Next Checkup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">15</div>
                    <p className="text-orange-100 text-sm">Days</p>
                  </CardContent>
                </Card>
              </div>

              {/* AI Analysis Options */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <ImageUpload onAnalysis={handleAnalysis} />
                <VoiceRecorder onTranscription={handleAnalysis} />
              </div>

              {/* Health Dashboard */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-800">Your Health Dashboard</h2>
                  <Badge className="bg-green-100 text-green-700">All systems normal</Badge>
                </div>
                <HealthDashboard />
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Badge className="bg-blue-100 text-blue-700 px-4 py-2">
              🚀 AI-Powered Healthcare Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
              The Future of 
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Medical Care</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience revolutionary healthcare with AI-powered diagnosis, personalized treatment plans, 
              and 24/7 medical support. Your health, enhanced by artificial intelligence.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-blue-200 hover:bg-blue-50">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Revolutionary Healthcare Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our AI technology is transforming medical care with cutting-edge features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">AI Diagnosis</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Faster and more accurate disease diagnosis and prediction using advanced machine learning algorithms.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Personalized Care</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Enhanced personalization of patient care through precise AI recommendations tailored to your health profile.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">24/7 Support</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Improved patient experience and satisfaction with continuous, reliable medical support around the clock.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Provider Efficiency</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Increased efficiency and reduced workload for healthcare providers through intelligent automation.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Diagnostic Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Patients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">AI Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15s</div>
              <div className="text-blue-100">Average Analysis Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-xl text-gray-600">See what medical experts are saying about our platform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Sarah Mitchell",
              role: "Chief of Cardiology",
              content: "HealthcareAI has revolutionized how we diagnose heart conditions. The accuracy is remarkable.",
              rating: 5
            },
            {
              name: "Dr. James Chen",
              role: "Emergency Medicine",
              content: "The speed of diagnosis has improved our emergency response times significantly.",
              rating: 5
            },
            {
              name: "Dr. Maria Rodriguez",
              role: "Family Medicine",
              content: "My patients love the personalized care recommendations. It's truly the future of healthcare.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of patients and healthcare providers who are already experiencing the future of medicine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-blue-200 hover:bg-blue-50">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">HealthcareAI</h3>
                  <p className="text-sm text-gray-400">Intelligent Medical Care</p>
                </div>
              </div>
              <p className="text-gray-400">
                Revolutionizing healthcare with AI-powered diagnosis and personalized treatment plans.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Diagnosis</li>
                <li>Image Analysis</li>
                <li>Voice Recognition</li>
                <li>Health Monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HealthcareAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
