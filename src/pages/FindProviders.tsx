
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Phone, Clock, Filter, Search, Calendar } from 'lucide-react';

const FindProviders = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [insuranceFilter, setInsuranceFilter] = useState('');

  // Mock data for healthcare providers
  const providers = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      hospital: "City Medical Center",
      rating: 4.9,
      reviews: 156,
      distance: "2.1 miles",
      address: "123 Health St, Downtown",
      phone: "(555) 123-4567",
      acceptsInsurance: ["Blue Cross", "Aetna", "Cigna"],
      nextAvailable: "Tomorrow",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      hospital: "Wellness Clinic",
      rating: 4.8,
      reviews: 203,
      distance: "1.8 miles",
      address: "456 Care Ave, Midtown",
      phone: "(555) 987-6543",
      acceptsInsurance: ["UnitedHealth", "Blue Cross", "Humana"],
      nextAvailable: "Next Week",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Dr. Emily Roberts",
      specialty: "Internal Medicine",
      hospital: "General Hospital",
      rating: 4.7,
      reviews: 89,
      distance: "3.2 miles",
      address: "789 Medical Blvd, Uptown",
      phone: "(555) 456-7890",
      acceptsInsurance: ["Aetna", "Cigna", "Kaiser"],
      nextAvailable: "Today",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Dr. James Thompson",
      specialty: "Orthopedics",
      hospital: "Sports Medicine Center",
      rating: 4.9,
      reviews: 267,
      distance: "4.1 miles",
      address: "321 Sports Way, Athletic District",
      phone: "(555) 789-0123",
      acceptsInsurance: ["Blue Cross", "UnitedHealth", "Aetna"],
      nextAvailable: "Next Week",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Dr. Lisa Martinez",
      specialty: "Pediatrics",
      hospital: "Children's Health Clinic",
      rating: 4.8,
      reviews: 142,
      distance: "2.7 miles",
      address: "654 Family Dr, Suburban",
      phone: "(555) 234-5678",
      acceptsInsurance: ["Cigna", "Blue Cross", "Humana"],
      nextAvailable: "Tomorrow",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      specialty: "Neurology",
      hospital: "Brain & Spine Institute",
      rating: 4.9,
      reviews: 98,
      distance: "5.3 miles",
      address: "987 Neural Ave, Medical District",
      phone: "(555) 345-6789",
      acceptsInsurance: ["UnitedHealth", "Aetna", "Kaiser"],
      nextAvailable: "Next Month",
      image: "/placeholder.svg"
    }
  ];

  const specialties = [
    "All Specialties", "Cardiology", "Dermatology", "Internal Medicine", 
    "Orthopedics", "Pediatrics", "Neurology", "Psychiatry", "Oncology"
  ];

  const insurancePlans = [
    "All Insurance", "Blue Cross", "Aetna", "Cigna", "UnitedHealth", "Humana", "Kaiser"
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesSpecialty = !searchSpecialty || searchSpecialty === "All Specialties" || 
                           provider.specialty.toLowerCase().includes(searchSpecialty.toLowerCase());
    const matchesInsurance = !insuranceFilter || insuranceFilter === "All Insurance" || 
                           provider.acceptsInsurance.includes(insuranceFilter);
    return matchesSpecialty && matchesInsurance;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Find Healthcare Providers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover qualified healthcare professionals in your area, check availability, and book appointments
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-6 w-6 text-blue-500" />
              Search & Filter
            </CardTitle>
            <CardDescription>
              Find the right healthcare provider for your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Enter your location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={searchSpecialty} onValueChange={setSearchSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={insuranceFilter} onValueChange={setInsuranceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Insurance accepted" />
                </SelectTrigger>
                <SelectContent>
                  {insurancePlans.map((plan) => (
                    <SelectItem key={plan} value={plan}>
                      {plan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{provider.name}</h3>
                        <p className="text-blue-600 font-medium">{provider.specialty}</p>
                        <p className="text-gray-600 text-sm">{provider.hospital}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-bold">{provider.rating}</span>
                          <span className="text-gray-500 text-sm">({provider.reviews})</span>
                        </div>
                        <Badge variant="secondary">{provider.distance}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {provider.address}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {provider.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        Next available: {provider.nextAvailable}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Accepts Insurance:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.acceptsInsurance.map((insurance) => (
                          <Badge key={insurance} variant="outline" className="text-xs">
                            {insurance}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                      <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 mt-8">
            <CardContent className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No providers found</h3>
              <p className="text-gray-400">
                Try adjusting your search criteria or location
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FindProviders;
