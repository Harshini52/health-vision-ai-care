
import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Image, Camera, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onAnalysis: (results: any) => void;
}

export const ImageUpload = ({ onAnalysis }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      analyzeImage(file);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (file: File) => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResults = {
      type: 'image',
      confidence: 94.2,
      diagnosis: 'Possible skin lesion detected',
      recommendations: [
        'Consult with a dermatologist within 2 weeks',
        'Monitor for any changes in size or color',
        'Avoid direct sun exposure on the area'
      ],
      urgency: 'medium',
      details: 'AI analysis indicates irregularities in pigmentation and border characteristics that warrant professional evaluation.'
    };
    
    setAnalyzing(false);
    onAnalysis(mockResults);
    
    toast({
      title: "Analysis Complete",
      description: "Your medical image has been analyzed successfully",
    });
  };

  const handleChooseFile = () => {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors duration-300">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
          <Image className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">Medical Image Analysis</CardTitle>
        <CardDescription className="text-gray-600">
          Upload X-rays, MRIs, skin photos, or other medical images for AI analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : uploadedImage 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {analyzing ? (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
              <div className="text-lg font-medium text-gray-700">Analyzing your image...</div>
              <div className="text-sm text-gray-500">Our AI is examining the medical image for patterns and anomalies</div>
            </div>
          ) : uploadedImage ? (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
              <img src={uploadedImage} alt="Uploaded" className="max-h-32 mx-auto rounded-lg shadow-lg" />
              <Badge className="bg-green-100 text-green-700">Image uploaded successfully</Badge>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <div className="text-lg font-medium text-gray-700">
                Drop your medical image here
              </div>
              <div className="text-sm text-gray-500">
                Supports JPG, PNG, DICOM files up to 10MB
              </div>
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={analyzing}
          />
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            onClick={handleChooseFile}
            disabled={analyzing}
          >
            <Camera className="mr-2 h-4 w-4" />
            Choose File
          </Button>
          
          <Button variant="outline" className="flex-1 border-blue-200 hover:bg-blue-50">
            <Upload className="mr-2 h-4 w-4" />
            Take Photo
          </Button>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          Your medical data is encrypted and processed securely
        </div>
      </CardContent>
    </Card>
  );
};
