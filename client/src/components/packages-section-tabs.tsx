import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import PaymentModal from "./payment-modal";

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

interface CustomizePlan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceType: string;
  duration: string | null;
  isActive: boolean;
  displayOrder: number;
}

export default function PackagesSectionTabs() {
  const [activeTab, setActiveTab] = useState("normal-plans");
  const [activeCategory, setActiveCategory] = useState("8-9-students");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<CustomizePlan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { toast } = useToast();

  // Fetch normal packages
  const { data: packages = [], isLoading: packagesLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  // Fetch customize plans
  const { data: customizePlans = [], isLoading: plansLoading } = useQuery<CustomizePlan[]>({
    queryKey: ["/api/customize-plans"],
  });

  const formatPrice = (price: string, priceType?: string) => {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(parseFloat(price));
    
    if (priceType === "monthly") return `${formatted}/month`;
    if (priceType === "per-interaction") return `${formatted} per interaction`;
    return formatted;
  };

  const categories = [
    { id: "8-9-students", label: "8-9 STUDENTS" },
    { id: "10-12-students", label: "10-12 STUDENTS" },
    { id: "college-graduates", label: "COLLEGE GRADUATES" },
    { id: "working-professionals", label: "WORKING PROFESSIONALS" },
  ];

  const filteredPackages = packages.filter(pkg => pkg.category === activeCategory);

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setSelectedPlan(null);
    setShowPaymentModal(true);
  };

  const handlePlanSelect = (plan: CustomizePlan) => {
    setSelectedPlan(plan);
    setSelectedPackage(null);
    setShowPaymentModal(true);
  };

  return (
    <section id="packages" className="scroll-mt-20 py-16 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Career Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose from our comprehensive packages or customize your own plan
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-8 h-auto p-1">
            <TabsTrigger 
              value="normal-plans" 
              className="text-base font-semibold py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              data-testid="tab-normal-plans"
            >
              Careerskope's Plans
            </TabsTrigger>
            <TabsTrigger 
              value="customize-plan" 
              className="text-base font-semibold py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              data-testid="tab-customize-plan"
            >
              Customise Your Plan
            </TabsTrigger>
          </TabsList>

          {/* Normal Plans Tab */}
          <TabsContent value="normal-plans" className="mt-8">
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                    activeCategory === cat.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600"
                  }`}
                  data-testid={`category-${cat.id}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Packages Grid */}
            {packagesLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading packages...</p>
              </div>
            ) : filteredPackages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No packages available for this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl hover:scale-105 ${
                      pkg.isPopular ? "border-purple-500 shadow-purple-200" : "border-gray-200"
                    }`}
                    data-testid={`package-card-${pkg.id}`}
                  >
                    {pkg.isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Sparkles className="h-4 w-4" /> Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                      <p className="text-gray-600 mt-2">{pkg.description}</p>
                    </div>

                    <div className="mb-6">
                      <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                        {formatPrice(pkg.price)}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePackageSelect(pkg)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      data-testid={`button-select-package-${pkg.id}`}
                    >
                      Select Plan
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Customize Plans Tab */}
          <TabsContent value="customize-plan" className="mt-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-muted-foreground mb-8">
                Want to customise your plan? If you want to subscribe to specific services that resolve your career challenges, you can choose one or more of the following:
              </p>

              {plansLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Loading customize plans...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customizePlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:border-blue-400"
                      data-testid={`customize-plan-${plan.id}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                          <p className="text-gray-600 text-sm">{plan.description}</p>
                        </div>

                        <div className="flex flex-col items-end gap-3 md:min-w-[200px]">
                          <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                            {formatPrice(plan.price, plan.priceType)}
                          </div>
                          {plan.duration && (
                            <div className="text-xs text-gray-500">{plan.duration}</div>
                          )}
                          <Button
                            onClick={() => handlePlanSelect(plan)}
                            variant="outline"
                            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                            data-testid={`button-buy-plan-${plan.id}`}
                          >
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (selectedPackage || selectedPlan) && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPackage(null);
            setSelectedPlan(null);
          }}
          package={selectedPackage || {
            id: selectedPlan!.id,
            name: selectedPlan!.name,
            price: selectedPlan!.price,
            description: selectedPlan!.description,
            features: [],
            category: "customize",
            isPopular: false,
          }}
        />
      )}
    </section>
  );
}
