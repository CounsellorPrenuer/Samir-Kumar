import { Target, Brain, Lightbulb, TrendingUp, Users, CheckCircle2, ArrowRight } from "lucide-react";
import counsellingFramework1 from "@assets/WhatsApp Image 2025-10-01 at 14.09.57_1759310947676.jpeg";
import counsellingFramework2 from "@assets/WhatsApp Image 2025-09-30 at 11.56.28_1759303602861.jpeg";
import professionalDevelopmentImage from "@assets/stock_images/professional_develop_1997d031.jpg";
import psychometricAssessmentImage from "@assets/generated_images/man_with_complete_face_completing_questionnaire_6a568d2e.png";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity";
import { STATIC_SERVICES } from "@/lib/static-data";

interface SanityService {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export default function WhyCSSection() {
  const { data: sanityServices, isLoading } = useQuery({
    queryKey: ['sanity-services'],
    queryFn: async () => {
      try {
        const result = await client.fetch<SanityService[]>(`*[_type == "service"] | order(displayOrder asc)`);
        console.log("Sanity Services Data:", result);
        return result;
      } catch (error) {
        console.warn("Sanity fetch failed, using fallback:", error);
        return [];
      }
    }
  });

  if (isLoading) {
    return <div className="py-20 text-center"><div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div><p className="mt-4 text-gray-500">Loading services...</p></div>;
  }

  const services = (sanityServices && sanityServices.length > 0) ? sanityServices : STATIC_SERVICES;

  // Map services to specific sections based on title keywords or order
  const counsellingFramework = services.find(s => s.title.toLowerCase().includes("framework")) || services[0];
  const psychometric = services.find(s => s.title.toLowerCase().includes("psychometric")) || services[1];
  const professionalDev = services.find(s => s.title.toLowerCase().includes("professional")) || services[2];

  // Helper to safely get feature at index
  const getStep = (service: any, index: number, fallback: string) => {
    return service?.features?.[index] || fallback;
  };

  return (
    <section id="why-cs" className="scroll-mt-20 py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Careerskope?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl md:max-w-5xl mx-auto text-center">
            Comprehensive career guidance with proven frameworks and personalized approach
          </p>
        </div>

        {/* Subsection 1: Counselling Framework */}
        <div className="mb-16" data-testid="subsection-counselling-framework">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg ring-1 ring-black/5 p-8 md:p-12 space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg mb-2">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {counsellingFramework?.title || "Counselling Framework"}
                </span>
              </h3>
              <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                {counsellingFramework?.description || "Our comprehensive framework combines evaluation, career planning, unbiased guidance, and informed decision-making to guide you toward the perfect career path."}
              </p>
            </div>

            {/* Framework Flow - Stepper Style (Using Features as Steps) */}
            <div className="py-4">
              <div className="flex items-center justify-center gap-2 md:gap-4 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">1</div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">{getStep(counsellingFramework, 0, "Career Options")}</span>
                </div>
                <div className="hidden md:block h-px flex-1 max-w-[80px] bg-gradient-to-r from-blue-300 to-indigo-300"></div>

                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">2</div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">{getStep(counsellingFramework, 1, "Roadmap")}</span>
                </div>
                <div className="hidden md:block h-px flex-1 max-w-[80px] bg-gradient-to-r from-blue-300 to-indigo-300"></div>

                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">3</div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">{getStep(counsellingFramework, 2, "Opportunities")}</span>
                </div>
                <div className="hidden md:block h-px flex-1 max-w-[80px] bg-gradient-to-r from-blue-300 to-indigo-300"></div>

                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">4</div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">{getStep(counsellingFramework, 3, "Decisions")}</span>
                </div>
              </div>
            </div>

            {/* Framework Images - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* First Image - 50% on desktop */}
              <div className="group">
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-[2px] rounded-2xl h-full">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm h-full transition-all duration-300 group-hover:shadow-xl">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                      <img
                        src={counsellingFramework1}
                        alt="Career Counselling at CareerSkope Framework"
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        data-testid="img-counselling-framework-1"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-700/80 text-center border-t border-gray-100 pt-3">
                      Career Counselling at CareerSkope
                    </p>
                  </div>
                </div>
              </div>

              {/* Second Image - 50% on desktop */}
              <div className="group">
                <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 p-[2px] rounded-2xl h-full">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm h-full transition-all duration-300 group-hover:shadow-xl">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                      <img
                        src={counsellingFramework2}
                        alt="Career Choice Framework"
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        data-testid="img-counselling-framework-2"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-700/80 text-center border-t border-gray-100 pt-3">
                      Career Choice Framework
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subsection 2: Advanced Psychometrics */}
        <div className="bg-gradient-to-r from-blue-600 via-green-600 to-red-600 rounded-3xl p-1 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-center mb-8">
              {psychometric?.title || "Advanced Psychometric Career Assessment"}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image Section - Now on the left */}
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <div className="rounded-2xl overflow-hidden shadow-lg" data-testid="img-psychometric-assessment">
                    <img
                      src={psychometricAssessmentImage}
                      alt="Psychometric Assessment"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Content Section - Now on the right */}
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {psychometric?.description || "The psychometric assessment administered by Careerskope is the most advanced and accurate online career test."}
                </p>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mt-6">
                  <h4 className="text-xl font-bold mb-4 text-center">Assessment Features</h4>
                  <ul className="space-y-3">
                    {(psychometric?.features || []).map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${idx % 2 === 0 ? 'bg-blue-600' : 'bg-green-600'} rounded-full`}></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subsection 5: Professional Development */}
        <div className="mb-20" data-testid="subsection-professional-development">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {professionalDev?.title || "Professional Development"}
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-6 whitespace-pre-wrap">
                  {professionalDev?.description || "Beyond career selection, we offer comprehensive professional development programs."}
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Training Programs:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(professionalDev?.features || []).map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg" data-testid="img-professional-development">
                <img
                  src={professionalDevelopmentImage}
                  alt="Professional Development"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <div className="text-center mb-20">
        <h3 className="text-2xl font-bold mb-6">Ready to Transform Your Career Journey?</h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Embark on a fulfilling career path with our expert career guidance services.
        </p>
        <button
          onClick={() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="bg-gradient-to-r from-blue-600 via-green-600 to-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          data-testid="button-start-assessment"
        >
          Start Your Career Assessment
        </button>
      </div>
    </section>
  );
}
