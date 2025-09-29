import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CreditCard, Check, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Package {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  category: string;
  isPopular: boolean;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: Package | null;
}

export default function PaymentModal({ isOpen, onClose, package: selectedPackage }: PaymentModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [orderId, setOrderId] = useState<string>("");
  const { toast } = useToast();

  const resetModal = () => {
    setStep('details');
    setLoading(false);
    setCustomerData({ name: "", email: "", phone: "", notes: "" });
    setOrderId("");
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(parseFloat(price));
  };

  const handleCustomerDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    setLoading(true);
    try {
      // Create payment order
      const response = await fetch("/api/create-payment-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          customerName: customerData.name,
          customerEmail: customerData.email,
          customerPhone: customerData.phone,
          notes: customerData.notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOrderId(data.orderId);
        setStep('payment');
        
        // For now, since we don't have actual Razorpay integration, 
        // we'll simulate the payment process
        simulatePayment(data.orderId);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create payment order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const simulatePayment = async (orderId: string) => {
    try {
      // Simulate Razorpay payment process
      setTimeout(async () => {
        try {
          const response = await fetch("/api/update-payment-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: orderId,
              status: "success",
              paymentId: `pay_${Date.now()}`,
              signature: `sig_${Date.now()}`,
              method: "card",
            }),
          });

          const data = await response.json();

          if (data.success) {
            setStep('success');
            toast({
              title: "Payment Successful!",
              description: "Your payment has been processed successfully.",
            });
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          toast({
            title: "Payment Failed",
            description: "Payment processing failed. Please try again.",
            variant: "destructive"
          });
          setStep('details');
        }
      }, 3000); // Simulate 3 second payment processing
    } catch (error) {
      console.error("Payment simulation error:", error);
    }
  };

  if (!selectedPackage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {step === 'details' && 'Customer Details'}
            {step === 'payment' && 'Processing Payment'}
            {step === 'success' && 'Payment Successful'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {selectedPackage.name}
                {selectedPackage.isPopular && (
                  <Badge variant="default" className="bg-yellow-500">Popular</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{selectedPackage.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(selectedPackage.price)}
                </span>
                <Badge variant="outline">{selectedPackage.category}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {selectedPackage.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-3 w-3 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Details Form */}
          {step === 'details' && (
            <form onSubmit={handleCustomerDetailsSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerData.name}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Enter your full name"
                    data-testid="input-customer-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    placeholder="your@email.com"
                    data-testid="input-customer-email"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  placeholder="+91 XXXXX XXXXX"
                  data-testid="input-customer-phone"
                />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={customerData.notes}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any specific requirements or questions..."
                  rows={3}
                  data-testid="textarea-customer-notes"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  data-testid="button-proceed-payment"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Proceed to Payment
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Payment Processing */}
          {step === 'payment' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Processing Your Payment</h3>
              <p className="text-muted-foreground mb-4">
                Please wait while we securely process your payment...
              </p>
              <Alert>
                <AlertDescription>
                  <strong>Demo Mode:</strong> This is a simulated payment for demonstration purposes. 
                  In production, this would integrate with actual Razorpay payment gateway.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Success */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for your purchase. Our team will contact you shortly to begin your career guidance journey.
              </p>
              <div className="bg-muted p-4 rounded-lg mb-6">
                <p className="text-sm">
                  <strong>Order ID:</strong> {orderId}
                </p>
                <p className="text-sm">
                  <strong>Package:</strong> {selectedPackage.name}
                </p>
                <p className="text-sm">
                  <strong>Amount:</strong> {formatPrice(selectedPackage.price)}
                </p>
              </div>
              <Button onClick={handleClose} className="w-full" data-testid="button-close-success">
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}