import { Target, Brain, Lightbulb, TrendingUp, Users } from "lucide-react";
import counsellingFrameworkImage from "@assets/WhatsApp Image 2025-09-30 at 11.56.28_1759219050985.jpeg";

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
        <div className="mb-20" data-testid="subsection-counselling-framework">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Counselling Framework
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Our comprehensive counselling framework combines evaluation, career planning, unbiased guidance, and informed decision-making to help you make the right career choices. We integrate personality assessment, career interests, and learning abilities to guide you toward the perfect career path.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <img 
                src={counsellingFrameworkImage} 
                alt="CareerSkope Counselling Framework" 
                className="w-full h-auto rounded-lg"
                data-testid="img-counselling-framework"
              />
              <p className="mt-4 text-sm text-gray-600 text-center">
                Our comprehensive counselling framework integrating personality assessment, career interests, and learning abilities
              </p>
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


        {/* Subsection 3: Unique Approach */}
        <div className="mb-20" data-testid="subsection-unique-approach">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Unique Approach
                </h3>
                <p className="text-lg mb-6 text-white/90">
                  What sets Careerskope apart is our personalized, holistic methodology that combines data-driven insights with human expertise. We don't just assess—we partner with you throughout your career journey.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-semibold mb-2">One-on-One Mentorship</h4>
                    <p className="text-sm text-white/80">Personalized guidance from industry experts</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Industry Connections</h4>
                    <p className="text-sm text-white/80">Access to our network of professionals</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Continuous Support</h4>
                    <p className="text-sm text-white/80">Ongoing guidance beyond initial consultation</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Real-World Focus</h4>
                    <p className="text-sm text-white/80">Practical strategies for immediate application</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subsection 4: Comprehensive Approach to Career Development */}
        <div className="mb-20" data-testid="subsection-comprehensive-approach">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Comprehensive Approach to Career Development
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Our 360-degree approach covers every aspect of career development, from initial exploration to ongoing professional growth. We address not just what career to choose, but how to thrive in it.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Career Planning</h4>
                    <p className="text-sm text-gray-600">Strategic roadmap for your professional journey</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Skill Development</h4>
                    <p className="text-sm text-gray-600">Identifying and building essential competencies</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Market Insights</h4>
                    <p className="text-sm text-gray-600">Understanding industry trends and opportunities</p>
                  </div>
                </div>
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
      CareerSkope Counselling Framework based on === use this image
    </section>
  );
}
