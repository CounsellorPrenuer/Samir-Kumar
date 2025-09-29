import { useState, useEffect } from "react";
import { Check, Star } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
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
  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.2 });
  
  // Check for reduced motion preference to ensure packages are always visible
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
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
        variant: "destructive"
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
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(parseFloat(price));
  };

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'students': return 'Students';
      case 'graduates': return 'Graduates';
      case 'professionals': return 'Professionals';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'students': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'graduates': return 'bg-green-100 text-green-800 border-green-200';
      case 'professionals': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
      <section id="services" className="scroll-mt-20 py-20 bg-card">
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
      <section id="services" className="scroll-mt-20 py-20 bg-card" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Our Packages</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the package that best fits your career development needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sortedPackages.map((pkg, index) => (
              <div 
                key={pkg.id}
                className={`group pricing-card ${pkg.isPopular ? 'bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200' : 'bg-card border border-border'} rounded-xl p-8 hover-lift transition-all duration-500 transform hover:scale-105 cursor-pointer relative`}
                style={{ animationDelay: `${index * 100}ms` }}
                data-testid={`package-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                {/* Category Tag */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(pkg.category)}`}>
                    {getCategoryDisplayName(pkg.category)}
                  </span>
                </div>

                <div className="text-center">
                  <h4 className="text-2xl font-bold mb-2">{pkg.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  <div className={`text-3xl font-bold mb-4 ${pkg.isPopular ? 'text-green-600' : 'text-blue-600'}`}>
                    {formatPrice(pkg.price)}
                  </div>
                  <ul className="text-left space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full ${pkg.isPopular ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg group-hover:animate-pulse`}
                    data-testid={`button-choose-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
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