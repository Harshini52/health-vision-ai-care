
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUpload } from '@/components/ImageUpload';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { DiagnosisResults } from '@/components/DiagnosisResults';
import { Brain, Image, Mic, Stethoscope } from 'lucide-react';

const AIAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleImageAnalysis = (results: any) => {
    setAnalysisResults(results);
  };

  const handleVoiceAnalysis = (results: any) => {
    setAnalysisResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            AI Medical Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload medical images or describe your symptoms using voice to get instant AI-powered health insights
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-blue-500" />
                  AI Analysis Tools
                </CardTitle>
                <CardDescription>
                  Choose your preferred method for health analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="image" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="image" className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Image Analysis
                    </TabsTrigger>
                    <TabsTrigger value="voice" className="flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      Voice Analysis
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="image" className="space-y-4">
                    <div className="text-center py-4">
                      <Stethoscope className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Medical Image Analysis</h3>
                      <p className="text-gray-600 mb-4">
                        Upload X-rays, MRIs, CT scans, or other medical images for AI analysis
                      </p>
                    </div>
                    <ImageUpload />
                  </TabsContent>
                  
                  <TabsContent value="voice" className="space-y-4">
                    <div className="text-center py-4">
                      <Mic className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Voice Symptom Analysis</h3>
                      <p className="text-gray-600 mb-4">
                        Describe your symptoms verbally for AI-powered health insights
                      </p>
                    </div>
                    <VoiceRecorder />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            {analysisResults ? (
              <DiagnosisResults results={analysisResults} />
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">
                    Waiting for Analysis
                  </h3>
                  <p className="text-gray-400">
                    Upload an image or record your symptoms to see AI analysis results here
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
