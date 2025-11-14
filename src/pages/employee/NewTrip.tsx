import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plane } from "lucide-react";
import { toast } from "sonner";

const NewTrip = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    purpose: "",
    startDate: "",
    endDate: "",
    estimatedCost: "",
    advanceRequest: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would send to API
    toast.success("Trip request submitted successfully!");
    navigate("/employee/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/employee/dashboard")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">New Trip Request</h1>
                <p className="text-sm text-white/80">Submit your business trip details</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Trip Information</CardTitle>
            <CardDescription>
              Fill in all required details for your business trip request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination *</Label>
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="e.g., Jakarta"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose *</Label>
                  <Input
                    id="purpose"
                    name="purpose"
                    placeholder="e.g., Client Meeting"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">Estimated Cost (Rp) *</Label>
                  <Input
                    id="estimatedCost"
                    name="estimatedCost"
                    type="number"
                    placeholder="e.g., 5000000"
                    value={formData.estimatedCost}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advanceRequest">Advance Request / Panjar (Rp)</Label>
                  <Input
                    id="advanceRequest"
                    name="advanceRequest"
                    type="number"
                    placeholder="e.g., 3000000"
                    value={formData.advanceRequest}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Add any additional information about your trip..."
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/employee/dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6 shadow-soft border-accent/20 bg-accent/5">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 text-foreground">Important Notes:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>All fields marked with * are required</li>
              <li>Advance requests (Panjar) will be reviewed by finance team</li>
              <li>Please ensure all dates and costs are accurate</li>
              <li>You will be notified once your request is reviewed</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewTrip;
