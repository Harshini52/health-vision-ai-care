
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Play, Square, Loader2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceRecorderProps {
  onTranscription: (results: any) => void;
}

export const VoiceRecorder = ({ onTranscription }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      setRecordingTime(0);
      
      // Simulate recording timer
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Store timer reference for cleanup
      (window as any).recordingTimer = timer;
      
      toast({
        title: "Recording started",
        description: "Speak clearly about your symptoms",
      });
    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record symptoms",
        variant: "destructive",
      });
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsProcessing(true);
    clearInterval((window as any).recordingTimer);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTranscription = "I've been experiencing persistent headaches for the past three days, particularly in the morning. The pain is located on the right side of my head and feels like a throbbing sensation. I've also noticed some sensitivity to light and occasional nausea. The headaches seem to worsen when I'm stressed or haven't had enough sleep.";
    
    setTranscription(mockTranscription);
    setIsProcessing(false);
    
    // Simulate AI analysis
    setTimeout(() => {
      analyzeSymptoms(mockTranscription);
    }, 1000);
  };

  const analyzeSymptoms = async (text: string) => {
    const mockResults = {
      type: 'voice',
      confidence: 87.5,
      diagnosis: 'Tension headache with possible migraine features',
      symptoms: ['Persistent headaches', 'Photophobia', 'Nausea', 'Right-sided pain'],
      recommendations: [
        'Consider stress management techniques',
        'Maintain regular sleep schedule',
        'Stay hydrated and avoid trigger foods',
        'Consult with primary care physician if symptoms persist'
      ],
      urgency: 'low',
      details: 'Based on the described symptoms, this appears to be a tension-type headache with some migraine characteristics. The pattern of morning headaches and stress correlation suggests lifestyle factors may be contributing.',
      transcription: text
    };
    
    onTranscription(mockResults);
    
    toast({
      title: "Analysis Complete",
      description: "Your symptoms have been analyzed successfully",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-400 transition-colors duration-300">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
          <MessageCircle className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">Voice Symptom Analysis</CardTitle>
        <CardDescription className="text-gray-600">
          Record your symptoms and get AI-powered health insights
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse' 
              : isProcessing
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-green-500 hover:to-emerald-500'
          }`}>
            {isProcessing ? (
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            ) : isRecording ? (
              <MicOff className="w-12 h-12 text-white" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </div>
          
          {isRecording && (
            <div className="mt-4 space-y-2">
              <Badge className="bg-red-100 text-red-700 animate-pulse">
                Recording: {formatTime(recordingTime)}
              </Badge>
              <div className="text-sm text-gray-600">Speak clearly about your symptoms</div>
            </div>
          )}
          
          {isProcessing && (
            <div className="mt-4">
              <Badge className="bg-blue-100 text-blue-700">
                Processing audio...
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {!isRecording ? (
            <Button 
              onClick={startRecording}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Recording
            </Button>
          ) : (
            <Button 
              onClick={stopRecording}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
            >
              <Square className="mr-2 h-4 w-4" />
              Stop Recording
            </Button>
          )}
        </div>
        
        {transcription && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm font-medium text-green-800 mb-2">Transcription:</div>
            <div className="text-sm text-green-700 leading-relaxed">{transcription}</div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 text-center">
          Your voice data is processed securely and not stored permanently
        </div>
      </CardContent>
    </Card>
  );
};
