import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  FileText, 
  Package, 
  CreditCard,
  LogOut,
  Settings,
  BarChart3,
  Image
} from "lucide-react";
import ContactsManagement from "@/components/admin/contacts-management";
import TestimonialsManagement from "@/components/admin/testimonials-management";
import BlogManagement from "@/components/admin/blog-management";
import PackagesManagement from "@/components/admin/packages-management";
import PaymentsManagement from "@/components/admin/payments-management";
import PhotoGalleryManagement from "@/components/admin/photo-gallery-management";
import CustomizePlansManagement from "@/components/admin/customize-plans-management";
import DashboardOverview from "@/components/admin/dashboard-overview";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [, navigate] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth/me");
      const data = await response.json();

      if (data.success) {
        setAdmin(data.admin);
      } else {
        navigate("/admin/login");
      }
    } catch (error) {
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <LayoutDashboard className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
              <h1 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white">
                Careerskope Admin
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">
                Welcome, {admin.username}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Contacts</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Solutions</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="customize-plans" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Customize</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <ContactsManagement />
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <TestimonialsManagement />
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <PackagesManagement />
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <PaymentsManagement />
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <PhotoGalleryManagement />
          </TabsContent>

          <TabsContent value="customize-plans" className="space-y-6">
            <CustomizePlansManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}