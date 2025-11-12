import { Target, Brain, Lightbulb, TrendingUp, Users, CheckCircle2, ArrowRight } from "lucide-react";
import counsellingFramework1 from "@assets/WhatsApp Image 2025-10-01 at 14.09.57_1759310947676.jpeg";
import counsellingFramework2 from "@assets/WhatsApp Image 2025-09-30 at 11.56.28_1759303602861.jpeg";
import professionalDevelopmentImage from "@assets/stock_images/professional_develop_1997d031.jpg";
import psychometricAssessmentImage from "@assets/generated_images/man_with_complete_face_completing_questionnaire_6a568d2e.png";

export default function WhyCSSection() {
  return (
    <section id="why-cs" className="scroll-mt-20 py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Careerskope?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  Counselling Framework
                </span>
              </h3>
              <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                Our comprehensive framework combines evaluation, career planning, unbiased guidance, and informed decision-making to guide you toward the perfect career path.
              </p>
            </div>

            {/* Framework Flow - Stepper Style */}
            <div className="py-4">
              <div className="flex items-center justify-center gap-2 md:gap-4 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">
                    1
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">Career Options</span>
                </div>
                <div className="hidden md:block h-px flex-1 max-w-[80px] bg-gradient-to-r from-blue-300 to-indigo-300"></div>
                
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">
                    2
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">Roadmap</span>
                </div>
                <div className="hidden md:block h-px flex-1 max-w-[80px] bg-gradient-to-r from-blue-300 to-indigo-300"></div>
                
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">
                    3
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">Opportunities</span>
                </div>
                <div className="hidden md:block h-px flex-1 max-w-[80px] bg-gradient-to-r from-blue-300 to-indigo-300"></div>
                
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">
                    4
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">Decisions</span>
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
                Advanced Psychometric <span className="bg-gradient-to-r from-blue-600 via-green-600 to-red-600 bg-clip-text text-transparent">Career Assessment</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Image Section - Now on the left */}
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <div className="rounded-2xl overflow-hidden shadow-lg" data-testid="img-psychometric-assessment">
                      <img 
                        src={psychometricAssessmentImage} 
                        alt="Psychometric Assessment and Career Testing" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section - Now on the right */}
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The psychometric assessment administered by Careerskope is the most advanced and accurate online career test 
                    that will help you make informed career decisions. It is one of the highest rated career assessment platforms in India.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our online career assessment is based on well-proven psychometric theories and Artificial Intelligence (AI). 
                    The multi-dimensional career assessment test includes detailed analysis of interests, personality, and abilities.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mt-6">
                    <h4 className="text-xl font-bold mb-4 text-center">Assessment Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-muted-foreground">Industry benchmark accuracy</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span className="text-muted-foreground">AI-powered insights</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        <span className="text-muted-foreground">Multi-dimensional analysis</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-muted-foreground">10+ page comprehensive report</span>
                      </li>
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
                    Professional Development
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Beyond career selection, we offer comprehensive professional development programs to help you excel in your chosen field. Our training covers both technical and soft skills essential for career success.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Our Training Programs Include:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Leadership and management skills</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Communication and presentation</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Interview preparation and techniques</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Resume building and LinkedIn optimization</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Industry-specific certifications</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Networking and personal branding</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg" data-testid="img-professional-development">
                <img 
                  src={professionalDevelopmentImage} 
                  alt="Professional Development and Career Growth" 
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
          Embark on a fulfilling career path with our expert career guidance services. Our knowledgeable career counsellors 
          will assist you in exploring various industries, identifying your interests, and mapping your personality to help 
          you make informed career decisions.
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
