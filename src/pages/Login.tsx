import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [financeEmail, setFinanceEmail] = useState("");
  const [financePassword, setFinancePassword] = useState("");

  const handleEmployeeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would validate credentials
    if (employeeEmail && employeePassword) {
      localStorage.setItem("userRole", "employee");
      toast.success("Login successful!");
      navigate("/employee/dashboard");
    }
  };

  const handleFinanceLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would validate credentials
    if (financeEmail && financePassword) {
      localStorage.setItem("userRole", "finance");
      toast.success("Login successful!");
      navigate("/finance/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo-telkom-akses.png" 
              alt="Telkom Akses Logo" 
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Telkom Akses</h1>
          <p className="text-muted-foreground">Business Trip Administration System</p>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your role to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="employee" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="employee">Employee</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="employee">
                <form onSubmit={handleEmployeeLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-email">Email</Label>
                    <Input
                      id="employee-email"
                      type="email"
                      placeholder="employee@telkomakses.co.id"
                      value={employeeEmail}
                      onChange={(e) => setEmployeeEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-password">Password</Label>
                    <Input
                      id="employee-password"
                      type="password"
                      value={employeePassword}
                      onChange={(e) => setEmployeePassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In as Employee
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="finance">
                <form onSubmit={handleFinanceLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="finance-email">Email</Label>
                    <Input
                      id="finance-email"
                      type="email"
                      placeholder="finance@telkomakses.co.id"
                      value={financeEmail}
                      onChange={(e) => setFinanceEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="finance-password">Password</Label>
                    <Input
                      id="finance-password"
                      type="password"
                      value={financePassword}
                      onChange={(e) => setFinancePassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In as Finance
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Secure access for authorized personnel only
        </p>
      </div>
    </div>
  );
};

export default Login;
