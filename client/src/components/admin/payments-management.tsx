import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  User, 
  Package,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  packageId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: string;
  currency: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
  paidAt?: string;
}

export default function PaymentsManagement() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch("/api/admin/payments");
      const data = await response.json();
      if (data.success) {
        setPayments(data.data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch payments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'success':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Success</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      case 'refunded':
        return <Badge variant="outline"><RefreshCw className="h-3 w-3 mr-1" />Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: string, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const filteredPayments = payments.filter(payment => 
    statusFilter === "all" || payment.status === statusFilter
  );

  const getTotalStats = () => {
    const total = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const successful = payments.filter(p => p.status === 'success');
    const successfulAmount = successful.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const pending = payments.filter(p => p.status === 'pending').length;
    const failed = payments.filter(p => p.status === 'failed').length;
    
    return {
      total: formatCurrency(total.toString()),
      successful: formatCurrency(successfulAmount.toString()),
      successfulCount: successful.length,
      pending,
      failed,
      successRate: payments.length > 0 ? Math.round((successful.length / payments.length) * 100) : 0
    };
  };

  const stats = getTotalStats();

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading payments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payments Management</h2>
          <p className="text-muted-foreground">Track customer payments and transactions</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">{stats.successful}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Successful Payments</p>
                <p className="text-2xl font-bold">{stats.successfulCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{stats.successRate}%</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments List */}
      <div className="grid gap-4">
        {filteredPayments.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No payments found</p>
            </CardContent>
          </Card>
        ) : (
          filteredPayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-lg">{payment.customerName}</h3>
                      {getStatusBadge(payment.status)}
                      <Badge variant="outline" className="text-green-600">
                        {formatCurrency(payment.amount, payment.currency)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {payment.customerEmail}
                      </div>
                      <div>
                        📱 {payment.customerPhone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(payment.createdAt)}
                      </div>
                      {payment.paidAt && (
                        <div>
                          ✅ Paid: {formatDate(payment.paidAt)}
                        </div>
                      )}
                    </div>
                    {payment.notes && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {payment.notes}
                      </p>
                    )}
                    {payment.razorpayPaymentId && (
                      <p className="text-xs text-muted-foreground">
                        Payment ID: {payment.razorpayPaymentId}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedPayment(payment)}
                          data-testid={`button-view-${payment.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Payment Details</DialogTitle>
                        </DialogHeader>
                        {selectedPayment && (
                          <PaymentDetailModal payment={selectedPayment} />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function PaymentDetailModal({ payment }: { payment: Payment }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Customer Information</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {payment.customerName}</p>
            <p><strong>Email:</strong> {payment.customerEmail}</p>
            <p><strong>Phone:</strong> {payment.customerPhone}</p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Payment Information</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Amount:</strong> {new Intl.NumberFormat('en-IN', { style: 'currency', currency: payment.currency }).format(parseFloat(payment.amount))}</p>
            <p><strong>Status:</strong> <span className="inline-block ml-1">{payment.status}</span></p>
            <p><strong>Created:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
            {payment.paidAt && (
              <p><strong>Paid At:</strong> {new Date(payment.paidAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>

      {(payment.razorpayOrderId || payment.razorpayPaymentId) && (
        <div>
          <h4 className="font-medium mb-2">Razorpay Details</h4>
          <div className="space-y-2 text-sm bg-muted p-3 rounded-lg">
            {payment.razorpayOrderId && (
              <p><strong>Order ID:</strong> {payment.razorpayOrderId}</p>
            )}
            {payment.razorpayPaymentId && (
              <p><strong>Payment ID:</strong> {payment.razorpayPaymentId}</p>
            )}
            {payment.razorpaySignature && (
              <p><strong>Signature:</strong> {payment.razorpaySignature.substring(0, 20)}...</p>
            )}
            {payment.paymentMethod && (
              <p><strong>Method:</strong> {payment.paymentMethod}</p>
            )}
          </div>
        </div>
      )}

      {payment.notes && (
        <div>
          <h4 className="font-medium mb-2">Notes</h4>
          <p className="text-sm bg-muted p-3 rounded-lg">{payment.notes}</p>
        </div>
      )}
    </div>
  );
}