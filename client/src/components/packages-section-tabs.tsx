import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import PaymentModal from "./payment-modal";

const CareerGuidanceVector = () => (
  <svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="bgGradPkg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#EEF2FF', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#F3E8FF', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="counselorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="studentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect width="600" height="500" fill="url(#bgGradPkg)" />
    
    {/* Counseling Session - Desk/Table */}
    <rect x="150" y="280" width="300" height="15" rx="7" fill="#94A3B8" opacity="0.6"/>
    
    {/* Counselor (Left) */}
    <g transform="translate(200, 200)">
      {/* Head */}
      <circle cx="0" cy="0" r="30" fill="url(#counselorGrad)"/>
      {/* Body */}
      <path d="M 0 30 L 0 80" stroke="url(#counselorGrad)" strokeWidth="12" strokeLinecap="round"/>
      {/* Arms - one gesturing */}
      <path d="M 0 45 L -35 60" stroke="url(#counselorGrad)" strokeWidth="10" strokeLinecap="round"/>
      <path d="M 0 45 L 30 30" stroke="url(#counselorGrad)" strokeWidth="10" strokeLinecap="round"/>
      {/* Legs */}
      <path d="M 0 80 L -15 120" stroke="url(#counselorGrad)" strokeWidth="10" strokeLinecap="round"/>
      <path d="M 0 80 L 15 120" stroke="url(#counselorGrad)" strokeWidth="10" strokeLinecap="round"/>
    </g>
    
    {/* Student/Client (Right) */}
    <g transform="translate(400, 200)">
      {/* Head */}
      <circle cx="0" cy="0" r="30" fill="url(#studentGrad)"/>
      {/* Body */}
      <path d="M 0 30 L 0 80" stroke="url(#studentGrad)" strokeWidth="12" strokeLinecap="round"/>
      {/* Arms */}
      <path d="M 0 45 L 35 60" stroke="url(#studentGrad)" strokeWidth="10" strokeLinecap="round"/>
      <path d="M 0 45 L -30 30" stroke="url(#studentGrad)" strokeWidth="10" strokeLinecap="round"/>
      {/* Legs */}
      <path d="M 0 80 L -15 120" stroke="url(#studentGrad)" strokeWidth="10" strokeLinecap="round"/>
      <path d="M 0 80 L 15 120" stroke="url(#studentGrad)" strokeWidth="10" strokeLinecap="round"/>
    </g>
    
    {/* Assessment Document on Table */}
    <g transform="translate(280, 250)">
      <rect x="0" y="0" width="45" height="35" rx="3" fill="white" stroke="#3B82F6" strokeWidth="2"/>
      <rect x="5" y="5" width="35" height="3" rx="1" fill="#3B82F6"/>
      <rect x="5" y="12" width="25" height="2" rx="1" fill="#94A3B8"/>
      <rect x="5" y="17" width="30" height="2" rx="1" fill="#94A3B8"/>
      <rect x="5" y="22" width="20" height="2" rx="1" fill="#94A3B8"/>
      <circle cx="35" cy="25" r="3" fill="#10B981"/>
    </g>
    
    {/* Conversation/Communication Lines */}
    <path d="M 230 200 Q 300 180 370 200" stroke="#6366F1" strokeWidth="2" strokeDasharray="4 2" opacity="0.5"/>
    <path d="M 230 210 Q 300 230 370 210" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 2" opacity="0.5"/>
    
    {/* Top Elements - Career Options/Insights */}
    <g transform="translate(100, 80)">
      <circle cx="0" cy="0" r="35" fill="#3B82F6" opacity="0.2"/>
      <circle cx="0" cy="0" r="25" fill="white" stroke="#3B82F6" strokeWidth="3"/>
      <text x="0" y="7" fontSize="16" fontWeight="bold" fill="#3B82F6" textAnchor="middle">📊</text>
      <text x="0" y="55" fontSize="12" fontWeight="600" fill="#1E40AF" textAnchor="middle">Assessment</text>
    </g>
    
    <g transform="translate(300, 50)">
      <circle cx="0" cy="0" r="35" fill="#10B981" opacity="0.2"/>
      <circle cx="0" cy="0" r="25" fill="white" stroke="#10B981" strokeWidth="3"/>
      <text x="0" y="7" fontSize="16" fontWeight="bold" fill="#10B981" textAnchor="middle">🎯</text>
      <text x="0" y="55" fontSize="12" fontWeight="600" fill="#059669" textAnchor="middle">Career Plan</text>
    </g>
    
    <g transform="translate(500, 80)">
      <circle cx="0" cy="0" r="35" fill="#8B5CF6" opacity="0.2"/>
      <circle cx="0" cy="0" r="25" fill="white" stroke="#8B5CF6" strokeWidth="3"/>
      <text x="0" y="7" fontSize="16" fontWeight="bold" fill="#8B5CF6" textAnchor="middle">📄</text>
      <text x="0" y="55" fontSize="12" fontWeight="600" fill="#6D28D9" textAnchor="middle">Report</text>
    </g>
    
    {/* Connection arrows from counseling to elements */}
    <path d="M 200 170 L 130 100" stroke="#3B82F6" strokeWidth="2" opacity="0.4" strokeDasharray="3 2"/>
    <path d="M 300 150 L 300 90" stroke="#10B981" strokeWidth="2" opacity="0.4" strokeDasharray="3 2"/>
    <path d="M 400 170 L 470 100" stroke="#8B5CF6" strokeWidth="2" opacity="0.4" strokeDasharray="3 2"/>
    
    {/* Bottom - Success Path */}
    <g transform="translate(300, 420)">
      <rect x="-120" y="0" width="240" height="50" rx="25" fill="white" stroke="#10B981" strokeWidth="3"/>
      <text x="0" y="18" fontSize="14" fontWeight="bold" fill="#059669" textAnchor="middle">Personalized Guidance</text>
      <text x="0" y="35" fontSize="11" fill="#6B7280" textAnchor="middle">Your Path to Success</text>
      
      {/* Success icon */}
      <circle cx="140" cy="25" r="20" fill="#10B981"/>
      <path d="M 133 25 L 138 30 L 147 21" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    
    {/* Floating sparkle elements */}
    <circle cx="80" cy="250" r="4" fill="#F59E0B" opacity="0.6"/>
    <circle cx="520" cy="250" r="4" fill="#F59E0B" opacity="0.6"/>
    <circle cx="150" cy="140" r="3" fill="#3B82F6" opacity="0.4"/>
    <circle cx="450" cy="140" r="3" fill="#8B5CF6" opacity="0.4"/>
  </svg>
);

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

  const filteredPackages = packages
    .filter(pkg => pkg.category === activeCategory)
    .sort((a, b) => {
      // Sort by price: lower prices (standard) first, higher prices (premium) last
      return parseFloat(a.price) - parseFloat(b.price);
    });

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

        {/* Featured Package Introduction */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Comprehensive Career Guidance in <span className="text-blue-600">Faridabad and Delhi NCR</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                Our expert career counsellors in Faridabad and Delhi NCR provide personalized guidance tailored to your unique strengths, 
                interests, and aspirations. Whether you're a student exploring career options or a professional seeking 
                advancement, we have the perfect solution for you.
              </p>
              <p className="text-base text-muted-foreground">
                Each package includes psychometric assessments, one-on-one counselling sessions, and comprehensive career 
                reports designed to help you make informed decisions about your future.
              </p>
            </div>
            <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-purple-50" data-testid="img-package-intro">
              <CareerGuidanceVector />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-8 h-auto p-1">
            <TabsTrigger 
              value="normal-plans" 
              className="text-sm sm:text-base font-semibold py-3 px-2 sm:px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              data-testid="tab-normal-plans"
            >
              <span className="hidden sm:inline">Careerskope's Plans</span>
              <span className="sm:hidden">Our Plans</span>
            </TabsTrigger>
            <TabsTrigger 
              value="customize-plan" 
              className="text-sm sm:text-base font-semibold py-3 px-2 sm:px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              data-testid="tab-customize-plan"
            >
              <span className="hidden sm:inline">Customise Your Plan</span>
              <span className="sm:hidden">Customise</span>
            </TabsTrigger>
          </TabsList>

          {/* Normal Plans Tab */}
          <TabsContent value="normal-plans" className="mt-8">
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all ${
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
              <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
                {filteredPackages.map((pkg) => {
                  const isPremium = pkg.name.toLowerCase().includes('plus+');
                  return (
                  <div
                    key={pkg.id}
                    className={`relative rounded-2xl p-6 border-2 transition-all hover:shadow-xl hover:scale-105 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] ${
                      isPremium 
                        ? "bg-gradient-to-br from-purple-50 via-white to-blue-50 border-purple-400 shadow-lg shadow-purple-100" 
                        : pkg.isPopular 
                          ? "bg-white border-purple-500 shadow-purple-200" 
                          : "bg-white border-gray-200"
                    }`}
                    data-testid={`package-card-${pkg.id}`}
                  >
                    {isPremium && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Sparkles className="h-4 w-4" /> Premium
                        </span>
                      </div>
                    )}
                    {pkg.isPopular && !isPremium && (
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
                  );
                })}
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
