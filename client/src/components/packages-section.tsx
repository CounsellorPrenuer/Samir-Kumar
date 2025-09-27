import { Check } from "lucide-react";

export default function PackagesSection() {
  const ascendFeatures = [
    "Psychometric assessment",
    "1 career coaching session", 
    "Lifetime access to Knowledge Gateway",
    "Pre-recorded webinars"
  ];

  const ascendPlusFeatures = [
    "Psychometric assessment",
    "3 career coaching sessions",
    "Guidance on Masters' admissions",
    "CV reviews",
    "Career helpline",
    "Guidance until job placement"
  ];

  const professionalFeatures = [
    "Career clarity, skill mapping, corporate mentorship, and leadership guidance",
    "Lifetime mentorship via CMS platform",
    "100% Money Back Guarantee",
    "24/7 support"
  ];

  return (
    <section id="services" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Our Packages</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the package that best fits your career development needs
          </p>
        </div>
        
        {/* Freshers/College Graduates */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">
            For Freshers & College Graduates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Ascend Package */}
            <div className="pricing-card bg-card border border-border rounded-xl p-8 hover-lift" data-testid="package-ascend">
              <div className="text-center">
                <h4 className="text-2xl font-bold mb-2">Ascend</h4>
                <div className="text-3xl font-bold text-blue-600 mb-4">₹6,499</div>
                <ul className="text-left space-y-3 mb-8">
                  {ascendFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300" data-testid="button-choose-ascend">
                  Choose Ascend
                </button>
              </div>
            </div>

            {/* Ascend Plus Package */}
            <div className="pricing-card bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-8 hover-lift relative" data-testid="package-ascend-plus">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-bold mb-2">Ascend Plus</h4>
                <div className="text-3xl font-bold text-green-600 mb-4">₹10,599</div>
                <ul className="text-left space-y-3 mb-8">
                  {ascendPlusFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300" data-testid="button-choose-ascend-plus">
                  Choose Ascend Plus
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Working Professionals */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-red-600">
            For Working Professionals & Mid-Career
          </h3>
          <div className="bg-gradient-to-br from-red-50 to-purple-50 border-2 border-red-200 rounded-xl p-8 text-center" data-testid="package-professional">
            <h4 className="text-2xl font-bold mb-4">Professional Transformation</h4>
            <p className="text-lg text-muted-foreground mb-6">
              Career clarity, skill mapping, corporate mentorship, and leadership guidance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-red-500 text-2xl mb-2">∞</div>
                <div className="font-semibold">Lifetime Mentorship</div>
                <div className="text-sm text-muted-foreground">via CMS platform</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-green-500 text-2xl mb-2">🛡</div>
                <div className="font-semibold">100% Money Back</div>
                <div className="text-sm text-muted-foreground">Guarantee</div>
              </div>
            </div>
            <button className="bg-gradient-to-r from-red-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-purple-700 transition-all duration-300" data-testid="button-get-professional-guidance">
              Get Professional Guidance
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
