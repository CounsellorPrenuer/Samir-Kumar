import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Package, 
  CreditCard,
  TrendingUp,
  DollarSign
} from "lucide-react";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    pendingContacts: 0,
    totalTestimonials: 0,
    totalBlogs: 0,
    totalPackages: 0,
    totalPayments: 0,
    revenue: 0,
    successfulPayments: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all data in parallel
      const [contacts, testimonials, blogs, packages, payments] = await Promise.all([
        fetch("/api/contact-submissions").then(r => r.json()),
        fetch("/api/admin/testimonials").then(r => r.json()),
        fetch("/api/admin/blog-articles").then(r => r.json()),
        fetch("/api/admin/packages").then(r => r.json()),
        fetch("/api/admin/payments").then(r => r.json())
      ]);

      const pendingContacts = contacts.filter((c: any) => c.status === 'pending').length;
      const successfulPayments = payments.data?.filter((p: any) => p.status === 'success').length || 0;
      const revenue = payments.data?.reduce((sum: number, p: any) => 
        p.status === 'success' ? sum + parseFloat(p.amount) : sum, 0) || 0;

      setStats({
        totalContacts: contacts.length || 0,
        pendingContacts,
        totalTestimonials: testimonials.data?.length || 0,
        totalBlogs: blogs.data?.length || 0,
        totalPackages: packages.data?.length || 0,
        totalPayments: payments.data?.length || 0,
        revenue,
        successfulPayments
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to your admin dashboard. Here's what's happening with your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingContacts} pending responses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTestimonials}</div>
            <p className="text-xs text-muted-foreground">
              Active customer reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Published content
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPackages}</div>
            <p className="text-xs text-muted-foreground">
              Service offerings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.revenue)}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.successfulPayments} successful payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPayments}</div>
            <p className="text-xs text-muted-foreground">
              {stats.successfulPayments} successful
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalPayments > 0 
                ? Math.round((stats.successfulPayments / stats.totalPayments) * 100) 
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Payment success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalContacts > 0 
                ? Math.round(((stats.totalContacts - stats.pendingContacts) / stats.totalContacts) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Contact response rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Pending Contacts</h3>
              <p className="text-2xl font-bold text-orange-600">{stats.pendingContacts}</p>
              <p className="text-xs text-muted-foreground">Need immediate attention</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-sm mb-2">This Month's Revenue</h3>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.revenue)}</p>
              <p className="text-xs text-muted-foreground">Total earnings</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Active Services</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.totalPackages}</p>
              <p className="text-xs text-muted-foreground">Available packages</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}