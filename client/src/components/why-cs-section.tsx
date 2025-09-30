import { Target, Brain, Lightbulb, TrendingUp, Users } from "lucide-react";
import counsellingFramework1 from "@assets/image_1759211621193.png";
import counsellingFramework2 from "@assets/image_1759211627992.png";

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
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <img 
                src={counsellingFramework1} 
                alt="Career Counselling at Careerskope Framework" 
                className="w-full h-auto rounded-lg"
                data-testid="img-counselling-framework-1"
              />
              <p className="mt-4 text-sm text-gray-600 text-center">
                Comprehensive approach covering career options evaluation, roadmap discussion, opportunities exploration, and informed decisions
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <img 
                src={counsellingFramework2} 
                alt="Career Choice Framework" 
                className="w-full h-auto rounded-lg"
                data-testid="img-counselling-framework-2"
              />
              <p className="mt-4 text-sm text-gray-600 text-center">
                Integrating individual personality, career interests, and learning abilities for optimal career guidance
              </p>
            </div>
          </div>
        </div>

        {/* Subsection 2: Advanced Psychometrics */}
        <div className="mb-20" data-testid="subsection-advanced-psychometrics">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Advanced Psychometrics
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Our scientifically-validated psychometric assessments provide deep insights into your personality, aptitudes, interests, and values. These comprehensive tools help identify your natural strengths and guide you toward careers where you'll excel and find fulfillment.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Personality profiling and behavioral assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Aptitude and cognitive ability testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Interest inventories and values clarification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Detailed reports with actionable career recommendations</span>
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
        <div data-testid="subsection-professional-development">
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
    </section>
  );
}
