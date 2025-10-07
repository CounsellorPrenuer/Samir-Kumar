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
  const [activeFilter, setActiveFilter] = useState<string>("all");
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

  // Filter packages by category
  const filteredPackages = activeFilter === "all" 
    ? packages 
    : packages.filter(pkg => pkg.category === activeFilter);

  // Sort packages - popular first, then by price
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return parseFloat(a.price) - parseFloat(b.price);
  });

  const filters = [
    { id: "all", label: "All Packages", icon: Star },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "graduates", label: "Graduates", icon: Users },
    { id: "professionals", label: "Professionals", icon: Briefcase },
  ];

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
        className="scroll-mt-20 py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 relative overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 section-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Premium Packages</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the package that best fits your career development needs
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
                }`}
                data-testid={`filter-${filter.id}`}
              >
                <filter.icon className="h-4 w-4" />
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sortedPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`group enhanced-card p-8 rounded-2xl cursor-pointer relative ${pkg.isPopular ? "ring-2 ring-purple-500 shadow-2xl shadow-purple-500/30" : ""}`}
                data-testid={`package-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Crown className="h-3 w-3" />
                      Popular
                    </span>
                  </div>
                )}

                {/* Category Tag */}
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(pkg.category)}`}
                  >
                    {getCategoryIcon(pkg.category)}
                    {getCategoryDisplayName(pkg.category)}
                  </span>
                </div>

                {/* Package Icon */}
                <div className="mb-4 flex justify-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${
                    pkg.isPopular
                      ? "from-purple-500 to-pink-500"
                      : "from-blue-500 to-cyan-500"
                  } rounded-full flex items-center justify-center`}>
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-xl font-semibold mb-2">{pkg.name}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                  <div className="mb-4">
                    <span
                      className={`text-2xl font-bold ${
                        pkg.isPopular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600"
                          : "bg-gradient-to-r from-blue-600 to-cyan-600"
                      } bg-clip-text text-transparent`}
                    >
                      {formatPrice(pkg.price)}
                    </span>
                  </div>

                  <ul className="text-left space-y-2 mb-4">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="bg-green-100 rounded-full p-0.5 mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full gradient-button text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 group-hover:scale-105 ${
                      pkg.isPopular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : "bg-gradient-to-r from-blue-600 to-cyan-600"
                    }`}
                    data-testid={`button-choose-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span className="relative z-10">Choose Package</span>
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
