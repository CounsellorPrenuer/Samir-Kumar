import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import packageIntroImage from "@assets/stock_images/career_counselor_mee_55ef8d9e.jpg";
import { handlePayment } from "@/lib/payment";

interface Package {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  category: string;
  isPopular: boolean;
  isPremium?: boolean;
  displayOrder?: number;
  isActive: boolean;
  paymentButtonId: string;
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

import { client, urlFor } from "@/lib/sanity";
import { getPaymentButtonId } from "@/lib/static-payment-ids";
import { useQuery } from "@tanstack/react-query";

interface SanityPackage {
  title: string;
  displayPrice: string; // Corrected field name
  description: string;
  features: string[];
  category: string;
  isPopular?: boolean;
  isPremium?: boolean;
  displayOrder?: number;
}

interface SanityCustomizePlan {
  _id: string;
  title: string;
  description: string;
  displayPrice: string; // "₹ 1,500"
  amount?: number; // 1500
  image?: any;
  displayOrder?: number;
  paymentButtonId?: string;
}

interface SiteSettings {
  paymentQrCode?: any;
  paymentUpiId?: string;
}

import { STATIC_PACKAGES, STATIC_CUSTOMIZE_PLANS } from "@/lib/static-data";

import PaymentRegistrationModal, { RegistrationFormData } from "./payment-registration-modal";

export default function PackagesSectionTabs() {
  const [activeTab, setActiveTab] = useState("normal-plans");
  const [activeCategory, setActiveCategory] = useState("8-9-students"); // Default active category
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedPlanForRegistration, setSelectedPlanForRegistration] = useState<{ id: string, name: string, price: string } | null>(null);

  // Explicit mapping to ensure Backend Worker IDs match exactly
  const SERVER_PLAN_MAP: Record<string, string> = {
    "Discover": "discover",
    "Discovery Plus": "discovery-plus",
    "Achieve": "achieve",
    "Achieve Plus": "achieve-plus",
    "Ascend": "ascend",
    "Ascend Plus": "ascend-plus",
    "Resume Review": "resume-review",
    "Mock Interview": "mock-interview"
  };

  // Fetch from Sanity at Runtime
  const { data: sanityData, isLoading } = useQuery({
    queryKey: ['sanity-data'],
    queryFn: async () => {
      try {
        // Fetch Packages, Customize Plans AND Site Settings
        const packageQuery = `*[_type == "pricing" && !(_id in path("drafts.**")) && defined(title)] | order(displayOrder asc)`;
        const customizeQuery = `*[_type == "customizePlan" && !(_id in path("drafts.**"))] | order(displayOrder asc)`;
        const settingsQuery = `*[_type == "siteSettings"][0]`;

        const [packages, customizePlans, settings] = await Promise.all([
          client.fetch<SanityPackage[]>(packageQuery),
          client.fetch<SanityCustomizePlan[]>(customizeQuery),
          client.fetch<SiteSettings>(settingsQuery)
        ]);

        console.log("Sanity Data:", { packages, customizePlans, settings });
        return { packages, customizePlans, settings };
      } catch (error) {
        console.warn("Sanity fetch failed, using fallback:", error);
        return { packages: [], customizePlans: [], settings: null };
      }
    }
  });

  // Use Sanity data if available, else static
  const sanityPackages = sanityData?.packages || [];
  const fetchedCustomizePlans = sanityData?.customizePlans || [];
  const settings = sanityData?.settings;

  const categories = [
    { id: "8-9-students", label: "8-9 STUDENTS" },
    { id: "10-12-students", label: "10-12 STUDENTS" },
    { id: "college-graduates", label: "COLLEGE GRADUATES" },
    { id: "working-professionals", label: "WORKING PROFESSIONALS" },
  ];

  // Use Sanity data if available and not loading, otherwise fallback to static
  const packages: Package[] = (!isLoading && sanityPackages.length > 0)
    ? sanityPackages.map(pkg => ({
      id: SERVER_PLAN_MAP[pkg.title] || pkg.title?.toLowerCase().replace(/\s+/g, '-') || "unknown-plan",
      name: pkg.title || "Untitled Plan",
      description: pkg.description || "",
      price: pkg.displayPrice?.replace(/[^0-9.]/g, '') || "0",
      features: pkg.features || [],
      category: pkg.category || "8-9-students",
      isPopular: pkg.isPopular || false,
      isPremium: pkg.isPremium || false,
      isActive: true,
      paymentButtonId: getPaymentButtonId(pkg.title) || ""
    }))
    : STATIC_PACKAGES as unknown as Package[];

  // Use Sanity customize plans if available, else fallback to static
  const customizePlansToRender = (fetchedCustomizePlans.length > 0)
    ? fetchedCustomizePlans.map(plan => ({
      id: plan._id,
      name: plan.title,
      description: plan.description,
      price: plan.amount ? plan.amount.toString() : (plan.displayPrice?.replace(/[^0-9.]/g, '') || "0"),
      displayPrice: plan.displayPrice || "0",
      image: plan.image ? urlFor(plan.image) : null,
      paymentButtonId: plan.paymentButtonId || ""
    }))
    : [];

  // Formatting Helper
  const formatPrice = (price: string) => {
    if (price === "0" || !price) return "View Details";
    // check if it already has currency symbol
    if (price.includes("₹")) return price;

    const num = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return price;

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(num);
  };

  const filteredPackages = packages.filter(pkg => pkg.category === activeCategory);

  // State for tracking which package is being purchased
  const [processingId, setProcessingId] = useState<string | null>(null);

  const onBuyClick = async (pkgId: string, isCustomizePlan: boolean = false, planDetails?: { name: string, price: string }) => {
    // Always open registration modal for lead capture
    if (planDetails) {
      setSelectedPlanForRegistration({
        id: pkgId,
        name: planDetails.name,
        price: planDetails.price
      });
      setRegistrationModalOpen(true);
    }
  };

  const handleRegistrationSuccess = async (planId: string, leadData: RegistrationFormData) => {
    setRegistrationModalOpen(false);
    setProcessingId(planId);
    try {
      // Parse amount from string (e.g. "₹ 1500" -> 1500)
      let amount = 0;
      if (selectedPlanForRegistration?.price) {
        amount = parseFloat(selectedPlanForRegistration.price.replace(/[^0-9.]/g, ''));
      }

      // Proceed to payment with custom amount
      await handlePayment(planId, undefined, amount);
    } finally {
      setProcessingId(null);
      setSelectedPlanForRegistration(null);
    }
  };

  return (
    <section id="packages" className="scroll-mt-20 py-16 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Career Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
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
            <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-lg">
              <img
                src={packageIntroImage}
                alt="Career Guidance Services in Faridabad and Delhi NCR"
                className="w-full h-full object-cover"
                data-testid="img-package-intro"
              />
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
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all ${activeCategory === cat.id
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
            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
              {filteredPackages.map((pkg) => {
                const isPremium = pkg.isPremium;
                return (
                  <div
                    key={pkg.id}
                    className={`relative rounded-2xl p-6 border-2 transition-all hover:shadow-xl hover:scale-105 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] flex flex-col ${isPremium
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

                    <div className="mt-auto">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6"
                        onClick={() => onBuyClick(pkg.id)}
                        disabled={processingId === pkg.id || !!processingId}
                      >
                        {processingId === pkg.id ? "Processing..." : "Buy Now"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Customize Plans Tab */}
          <TabsContent value="customize-plan" className="mt-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-muted-foreground mb-8">
                Want to customise your Mentorship plan? If you want to subscribe to specific services that resolve your career challenges, you can choose one or more of the following:
              </p>

              <div className="space-y-4">
                {customizePlansToRender.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:border-blue-400"
                    data-testid={`customize-plan-${plan.id}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">

                      {/* Image Section */}
                      {plan.image && (
                        <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <p className="text-gray-600 text-sm">{plan.description}</p>
                      </div>

                      <div className="flex flex-col items-end gap-3 md:min-w-[200px]">
                        <div className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-right">
                          {plan.displayPrice}
                        </div>

                        <Button
                          variant="outline"
                          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-full md:w-auto"
                          data-testid={`button-buy-plan-${plan.id}`}
                          onClick={() => onBuyClick(plan.id, true, { name: plan.name, price: plan.displayPrice })}
                          disabled={processingId === plan.id || !!processingId}
                        >
                          {processingId === plan.id ? "Processing..." : "Buy Now"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <PaymentRegistrationModal
          isOpen={registrationModalOpen}
          onClose={() => setRegistrationModalOpen(false)}
          planId={selectedPlanForRegistration?.id || null}
          planName={selectedPlanForRegistration?.name || ""}
          amount={selectedPlanForRegistration?.price || ""}
          onSuccess={handleRegistrationSuccess}
        />
      </div>
    </section>
  );
}
