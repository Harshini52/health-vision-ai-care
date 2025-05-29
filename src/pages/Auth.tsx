
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Stethoscope, Heart, Shield, Users } from 'lucide-react';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Sign in failed',
          description: error.message,
          variant: 'destructive',
        });
      } else if (data.user) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast({
          title: 'Sign up failed',
          description: error.message,
          variant: 'destructive',
        });
      } else if (data.user) {
        toast({
          title: 'Account created!',
          description: 'Welcome to Healthcare AI. You can now access all features.',
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  HealthcareAI
                </h1>
                <p className="text-sm text-gray-600">Intelligent Medical Care</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                AI-Powered Healthcare at Your Fingertips
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience the future of medical diagnosis with our advanced AI technology
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Faster Diagnosis</h3>
                  <p className="text-gray-600">Get accurate disease diagnosis and predictions in seconds</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Personalized Care</h3>
                  <p className="text-gray-600">Enhanced personalization through precise AI recommendations</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Secure & Reliable</h3>
                  <p className="text-gray-600">Continuous, reliable medical support with data privacy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="max-w-md mx-auto w-full">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Join HealthcareAI</CardTitle>
                <CardDescription className="text-gray-600">
                  Access AI-powered medical analysis and personalized care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="bg-white/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <Input
                          id="signin-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-white/50"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                        disabled={loading}
                      >
                        {loading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input
                          id="signup-name"
                          name="fullName"
                          type="text"
                          placeholder="John Doe"
                          required
                          className="bg-white/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="bg-white/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          minLength={6}
                          className="bg-white/50"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        disabled={loading}
                      >
                        {loading ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
