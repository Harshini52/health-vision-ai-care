
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, Clock, Download, Share } from "lucide-react";

interface DiagnosisResultsProps {
  results: {
    type: string;
    confidence: number;
    diagnosis: string;
    recommendations: string[];
    urgency: string;
    details: string;
    symptoms?: string[];
    transcription?: string;
  };
}

export const DiagnosisResults = ({ results }: DiagnosisResultsProps) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full bg-white shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              AI Analysis Results
              <Badge className={`${getUrgencyColor(results.urgency)} border`}>
                {getUrgencyIcon(results.urgency)}
                {results.urgency.charAt(0).toUpperCase() + results.urgency.slice(1)} Priority
              </Badge>
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Analysis based on {results.type === 'image' ? 'medical image' : 'voice symptoms'} • Confidence: {results.confidence}%
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Diagnosis */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Preliminary Diagnosis</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-blue-800 font-medium text-lg">{results.diagnosis}</div>
            <div className="text-blue-600 mt-2 text-sm leading-relaxed">{results.details}</div>
          </div>
        </div>

        {/* Confidence Meter */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Confidence Level</span>
            <span className="text-sm font-bold text-gray-800">{results.confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${results.confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Symptoms (for voice analysis) */}
        {results.symptoms && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Identified Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {results.symptoms.map((symptom, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">AI Recommendations</h3>
          <div className="space-y-3">
            {results.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <div className="text-green-800 leading-relaxed">{recommendation}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Transcription (for voice analysis) */}
        {results.transcription && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Voice Transcription</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-gray-700 leading-relaxed italic">"{results.transcription}"</div>
            </div>
          </div>
        )}

        <Separator />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
            Book Consultation
          </Button>
          <Button variant="outline" className="flex-1 border-blue-200 hover:bg-blue-50">
            Get Second Opinion
          </Button>
          <Button variant="outline" className="flex-1 border-green-200 hover:bg-green-50">
            Save to Health Record
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          ⚠️ This is an AI-generated analysis for informational purposes only. Always consult with qualified healthcare professionals for proper medical diagnosis and treatment.
        </div>
      </CardContent>
    </Card>
  );
};
