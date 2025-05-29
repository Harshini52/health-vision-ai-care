
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Activity, Calendar, Pill, TrendingUp, AlertTriangle } from "lucide-react";

export const HealthDashboard = () => {
  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", status: "normal", icon: Heart, color: "green" },
    { label: "Heart Rate", value: "72 BPM", status: "normal", icon: Activity, color: "blue" },
    { label: "BMI", value: "23.5", status: "healthy", icon: TrendingUp, color: "green" },
    { label: "Sleep Quality", value: "8.2/10", status: "excellent", icon: Calendar, color: "purple" }
  ];

  const upcomingAppointments = [
    { date: "Mar 15", time: "10:00 AM", doctor: "Dr. Sarah Wilson", type: "Cardiology Checkup" },
    { date: "Mar 22", time: "2:30 PM", doctor: "Dr. Michael Chen", type: "Dermatology Follow-up" },
    { date: "Apr 5", time: "9:15 AM", doctor: "Dr. Emily Roberts", type: "Annual Physical" }
  ];

  const medications = [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", nextDose: "8:00 AM" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", nextDose: "6:00 PM" },
    { name: "Vitamin D3", dosage: "2000 IU", frequency: "Once daily", nextDose: "8:00 AM" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': case 'healthy': case 'excellent': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <metric.icon className={`h-6 w-6 text-${metric.color}-500`} />
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Health Trends */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Health Trends
            </CardTitle>
            <CardDescription>Your health metrics over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Weight Loss Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Exercise Goal</span>
                <span>90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Medication Adherence</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Sleep Quality</span>
                <span>82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Your scheduled healthcare visits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{appointment.type}</div>
                  <div className="text-sm text-gray-600">{appointment.doctor}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">{appointment.date}</div>
                  <div className="text-xs text-gray-500">{appointment.time}</div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50">
              Schedule New Appointment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Medications */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-green-500" />
            Current Medications
          </CardTitle>
          <CardDescription>Track your medication schedule and adherence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {medications.map((med, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Pill className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{med.name}</div>
                    <div className="text-sm text-gray-600">{med.dosage} • {med.frequency}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">Next: {med.nextDose}</div>
                  <Button size="sm" variant="outline" className="mt-2 border-green-200 hover:bg-green-100">
                    Mark Taken
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Alerts */}
      <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <AlertTriangle className="h-5 w-5" />
            Health Alerts & Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <div>
              <div className="font-medium text-yellow-800">Annual Blood Work Due</div>
              <div className="text-sm text-yellow-600">Schedule your yearly blood panel check</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <div className="font-medium text-blue-800">Flu Shot Reminder</div>
              <div className="text-sm text-blue-600">Annual flu vaccination recommended</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
