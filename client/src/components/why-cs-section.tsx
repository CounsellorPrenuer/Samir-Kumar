import { Target, Brain, Lightbulb, TrendingUp, Users, CheckCircle2, ArrowRight } from "lucide-react";
import counsellingFramework1 from "@assets/WhatsApp Image 2025-10-01 at 14.09.57_1759310947676.jpeg";
import counsellingFramework2 from "@assets/WhatsApp Image 2025-09-30 at 11.56.28_1759303602861.jpeg";

export default function WhyCSSection() {
  return (
    <section id="why-cs" className="scroll-mt-20 py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
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
        <div className="mb-16 no-rainbow" data-testid="subsection-counselling-framework">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl shadow-2xl ring-1 ring-black/5 p-10 md:p-12 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12">
              {/* Left Column: Header + Vertical Stepper */}
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Counselling Framework</span>
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Our comprehensive framework combines evaluation, career planning, unbiased guidance, and informed decision-making to guide you toward the perfect career path.
                  </p>
                </div>

                {/* Vertical Stepper - Desktop */}
                <ol className="hidden md:flex md:flex-col space-y-6 relative">
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 to-indigo-200"></div>
                  
                  <li className="flex items-start gap-4 relative group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md ring-4 ring-white dark:ring-gray-900 transition-transform group-hover:scale-105">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <div className="pt-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Career Options</h4>
                      <p className="text-sm text-muted-foreground mt-1">Explore diverse career paths</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 relative group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md ring-4 ring-white dark:ring-gray-900 transition-transform group-hover:scale-105">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div className="pt-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Roadmap</h4>
                      <p className="text-sm text-muted-foreground mt-1">Create your action plan</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 relative group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md ring-4 ring-white dark:ring-gray-900 transition-transform group-hover:scale-105">
                      <Brain className="h-6 w-6" />
                    </div>
                    <div className="pt-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Opportunities</h4>
                      <p className="text-sm text-muted-foreground mt-1">Identify growth prospects</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 relative group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md ring-4 ring-white dark:ring-gray-900 transition-transform group-hover:scale-105">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="pt-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Decisions</h4>
                      <p className="text-sm text-muted-foreground mt-1">Make informed choices</p>
                    </div>
                  </li>
                </ol>

                {/* Horizontal Stepper - Mobile */}
                <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-2 px-2">
                  <div className="flex-shrink-0 snap-center flex flex-col items-center text-center gap-2 min-w-[140px]">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Career Options</span>
                  </div>
                  <div className="flex-shrink-0 snap-center flex flex-col items-center text-center gap-2 min-w-[140px]">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Roadmap</span>
                  </div>
                  <div className="flex-shrink-0 snap-center flex flex-col items-center text-center gap-2 min-w-[140px]">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                      <Brain className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Opportunities</span>
                  </div>
                  <div className="flex-shrink-0 snap-center flex flex-col items-center text-center gap-2 min-w-[140px]">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Decisions</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Framework Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                {/* First Image */}
                <div className="group">
                  <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl ring-1 ring-black/5 overflow-hidden transition-all duration-300 h-full">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={counsellingFramework1} 
                        alt="Career Counselling at CareerSkope Framework" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        data-testid="img-counselling-framework-1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-medium text-muted-foreground text-center">
                        Career Counselling at CareerSkope
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Second Image */}
                <div className="group">
                  <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl ring-1 ring-black/5 overflow-hidden transition-all duration-300 h-full">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={counsellingFramework2} 
                        alt="Career Choice Framework" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        data-testid="img-counselling-framework-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-medium text-muted-foreground text-center">
                        Career Choice Framework
                      </p>
                    </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The psychometric assessment administered by Careerskope is the most advanced and accurate online career test 
                    that will help you make informed career decisions. It is one of the highest rated career assessment platforms in India.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our online career assessment is based on well-proven psychometric theories and Artificial Intelligence (AI). 
                    The multi-dimensional career assessment test includes detailed analysis of interests, personality, and abilities.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
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




        {/* Subsection 5: Professional Development */}
        <div className="mb-20" data-testid="subsection-professional-development">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Professional Development
                </h3>
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
