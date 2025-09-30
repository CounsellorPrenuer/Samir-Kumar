import { useState, useEffect } from "react";
import { Check, Star, GraduationCap, Briefcase, Users, Crown, Zap, Sparkles } from "lucide-react";
import PaymentModal from "./payment-modal";
import { useToast } from "@/hooks/use-toast";

interface Package {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  category: string;
  isPopular: boolean;
  isActive: boolean;
}

export default function PackagesSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages");
      const data = await response.json();
      setPackages(data || []);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
      toast({
        title: "Error",
        description: "Failed to load packages. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setShowPaymentModal(true);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(parseFloat(price));
  };

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case "students":
        return "Students";
      case "graduates":
        return "Graduates";
      case "professionals":
        return "Professionals";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "students":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "graduates":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "professionals":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "students":
        return <GraduationCap className="h-4 w-4" />;
      case "graduates":
        return <Users className="h-4 w-4" />;
      case "professionals":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  // Sort packages - popular first, then by price
  const sortedPackages = [...packages].sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return parseFloat(a.price) - parseFloat(b.price);
  });

  if (loading) {
    return (
      <section id="packages" className="scroll-mt-20 py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading packages...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="packages"
        className="scroll-mt-20 py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="mb-6">
              <span className="inline-flex items-center modern-card px-6 py-3 rounded-full text-gray-700 text-sm font-medium">
                <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                Premium Career Guidance
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Our Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the package that best fits your career development needs and unlock your potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sortedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`group enhanced-card ${pkg.isPopular ? "ring-2 ring-purple-400" : ""} rounded-2xl p-8 cursor-pointer relative`}
                data-testid={`package-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Crown className="h-4 w-4" />
                      Most Popular
                      <Sparkles className="h-4 w-4" />
                    </span>
                  </div>
                )}

                {/* Category Tag */}
                <div className="mb-6">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getCategoryColor(pkg.category)}`}
                  >
                    {getCategoryIcon(pkg.category)}
                    {getCategoryDisplayName(pkg.category)}
                  </span>
                </div>

                {/* Package Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="service-icon">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-2xl font-bold mb-3 text-gray-800">{pkg.name}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">{pkg.description}</p>
                  <div className="mb-8">
                    <span
                      className={`text-4xl font-bold ${
                        pkg.isPopular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600"
                          : "bg-gradient-to-r from-blue-600 to-cyan-600"
                      } bg-clip-text text-transparent`}
                    >
                      {formatPrice(pkg.price)}
                    </span>
                  </div>

                  <ul className="text-left space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start group">
                        <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5 group-hover:bg-green-200 transition-colors">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full vibrant-button btn-interactive text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      pkg.isPopular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : "bg-gradient-to-r from-blue-600 to-cyan-600"
                    }`}
                    data-testid={`button-choose-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    Choose {pkg.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        package={selectedPackage}
      />
    </>
  );
}
