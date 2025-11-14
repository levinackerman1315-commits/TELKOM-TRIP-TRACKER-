import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plane, 
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  FileText,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';

// Mock data
const pendingRequests = [
  {
    id: 1,
    employee: "John Doe",
    destination: "Jakarta",
    purpose: "Client Meeting",
    startDate: "2024-02-20",
    endDate: "2024-02-22",
    advance: 5000000,
    estimatedCost: 7000000,
  },
  {
    id: 2,
    employee: "Jane Smith",
    destination: "Surabaya",
    purpose: "Network Installation",
    startDate: "2024-02-25",
    endDate: "2024-02-27",
    advance: 3500000,
    estimatedCost: 4500000,
  },
];

const approvedRequests = [
  {
    id: 3,
    employee: "Mike Johnson",
    destination: "Bandung",
    purpose: "Training Session",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    advance: 2500000,
    approvedBy: "Finance Area",
  },
];

const FinanceDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const stats = {
    pendingApproval: pendingRequests.length,
    approvedToday: 5,
    totalAdvances: 15500000,
    pendingSettlement: 3,
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
              <h1 className="text-xl font-bold text-white">Finance Regional Portal</h1>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pendingApproval}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.approvedToday}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Advances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {(stats.totalAdvances / 1000000).toFixed(1)}M</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Settlement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.pendingSettlement}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Trip Requests</CardTitle>
            <CardDescription>Review and manage employee business trip requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList>
                <TabsTrigger value="pending">
                  <Clock className="w-4 h-4 mr-2" />
                  Pending ({pendingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approved
                </TabsTrigger>
                <TabsTrigger value="all">
                  <FileText className="w-4 h-4 mr-2" />
                  All Requests
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-4">
                {pendingRequests.map((request) => (
                  <div 
                    key={request.id}
                    className="p-4 rounded-lg border bg-card hover:shadow-soft transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                          <Plane className="w-6 h-6 text-warning" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {request.employee} - {request.destination}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{request.purpose}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Period: </span>
                              <span className="text-foreground">{request.startDate} - {request.endDate}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Estimated: </span>
                              <span className="text-foreground font-medium">Rp {request.estimatedCost.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Advance Request: </span>
                              <span className="text-accent font-medium">Rp {request.advance.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end border-t pt-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="destructive" size="sm">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" className="bg-success hover:bg-success/90">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="approved" className="space-y-4 mt-4">
                {approvedRequests.map((request) => (
                  <div 
                    key={request.id}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-6 h-6 text-success" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {request.employee} - {request.destination}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{request.purpose}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">{request.startDate} - {request.endDate}</span>
                            <span>•</span>
                            <span className="text-muted-foreground">Advance: Rp {request.advance.toLocaleString()}</span>
                            <span>•</span>
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              {request.approvedBy}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="all" className="mt-4">
                <p className="text-center text-muted-foreground py-8">
                  All requests view - coming soon
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceDashboard;
