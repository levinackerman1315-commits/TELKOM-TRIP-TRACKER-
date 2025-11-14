import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Plane, 
  Receipt, 
  DollarSign, 
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - in real app, this would come from API
const trips = [
  {
    id: 1,
    destination: "Jakarta",
    purpose: "Client Meeting",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    status: "approved",
    advance: 5000000,
  },
  {
    id: 2,
    destination: "Surabaya",
    purpose: "Network Installation",
    startDate: "2024-02-20",
    endDate: "2024-02-22",
    status: "pending",
    advance: 3500000,
  },
  {
    id: 3,
    destination: "Bandung",
    purpose: "Training Session",
    startDate: "2024-01-10",
    endDate: "2024-01-12",
    status: "completed",
    advance: 2500000,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-success text-success-foreground"><CheckCircle2 className="w-3 h-3 mr-1" />Approved</Badge>;
    case "pending":
      return <Badge className="bg-warning text-warning-foreground"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    case "rejected":
      return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
    case "completed":
      return <Badge variant="secondary"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const stats = {
    total: trips.length,
    pending: trips.filter(t => t.status === "pending").length,
    approved: trips.filter(t => t.status === "approved").length,
    completed: trips.filter(t => t.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-telkom-akses.png" 
              alt="Telkom Akses" 
              className="h-10 w-auto bg-white rounded px-2 py-1"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Employee Portal</h1>
              <p className="text-sm text-white/80">Telkom Akses Travel System</p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => {
              localStorage.removeItem("userRole");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your business trips and expenses</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate("/employee/trip/new")}
              className="h-auto py-6 flex-col gap-2"
            >
              <PlusCircle className="w-6 h-6" />
              <span>New Trip Request</span>
            </Button>
            <Button 
              variant="outline"
              className="h-auto py-6 flex-col gap-2"
            >
              <Receipt className="w-6 h-6" />
              <span>Upload Receipts</span>
            </Button>
            <Button 
              variant="outline"
              className="h-auto py-6 flex-col gap-2"
            >
              <DollarSign className="w-6 h-6" />
              <span>Request Advance</span>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Trips */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>My Trips</CardTitle>
            <CardDescription>View and manage your business trip requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trips.map((trip) => (
                <div 
                  key={trip.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-soft transition-shadow"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Plane className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{trip.destination}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{trip.purpose}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{trip.startDate} - {trip.endDate}</span>
                        <span>•</span>
                        <span>Advance: Rp {trip.advance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(trip.status)}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/employee/trips/${trip.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
