import { Target, Brain, Lightbulb, TrendingUp, Users, CheckCircle2, ArrowRight } from "lucide-react";
import counsellingFrameworkImage from "@assets/WhatsApp Image 2025-09-30 at 11.56.28_1759219364143.jpeg";

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
          <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-1 shadow-2xl">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    CareerSkope Counselling Framework
                  </span>
                </h3>
                <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
                  Our scientifically-designed counselling framework is built on four fundamental pillars that guide you through a transformative career discovery journey. We combine cutting-edge psychometric assessment with personalized expert guidance to help you make confident, informed career decisions.
                </p>
              </div>

              {/* Framework Flow Diagram */}
              <div className="mb-10">
                <h4 className="text-2xl font-bold text-center mb-8 text-gray-900">Our 4-Step Counselling Framework</h4>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    {/* Step 1 */}
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-3xl font-bold mb-2">1</div>
                        <h5 className="font-bold text-lg mb-2">Career Options Evaluation</h5>
                        <p className="text-sm text-white/90">Analyze available career paths</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex justify-center">
                      <ArrowRight className="h-8 w-8 text-blue-600" />
                    </div>

                    {/* Step 2 */}
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-3xl font-bold mb-2">2</div>
                        <h5 className="font-bold text-lg mb-2">Career Roadmap Discussion</h5>
                        <p className="text-sm text-white/90">Plan your journey step-by-step</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex justify-center">
                      <ArrowRight className="h-8 w-8 text-indigo-600" />
                    </div>

                    {/* Step 3 */}
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-3xl font-bold mb-2">3</div>
                        <h5 className="font-bold text-lg mb-2">Opportunities Exploration</h5>
                        <p className="text-sm text-white/90">Discover new possibilities</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex justify-center">
                      <ArrowRight className="h-8 w-8 text-cyan-600" />
                    </div>

                    {/* Step 4 */}
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-3xl font-bold mb-2">4</div>
                        <h5 className="font-bold text-lg mb-2">Informed Decisions</h5>
                        <p className="text-sm text-white/90">Make confident choices</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Framework Details Image */}
              <div className="mb-10">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <img 
                    src={counsellingFrameworkImage} 
                    alt="CareerSkope Counselling Framework Integration" 
                    className="w-full h-auto rounded-xl"
                    data-testid="img-counselling-framework"
                  />
                </div>
              </div>

              {/* Integration Section */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-2xl p-8 text-white text-center">
                <h4 className="text-2xl font-bold mb-4">Integrated Assessment Approach</h4>
                <p className="text-lg text-white/90 mb-6 max-w-3xl mx-auto">
                  Our framework uniquely integrates three critical dimensions to provide you with the most accurate career guidance:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Brain className="h-8 w-8 mx-auto mb-3" />
                    <h5 className="font-semibold mb-2">Individual Personality</h5>
                    <p className="text-sm text-white/80">Understanding your unique traits and behavioral patterns</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Target className="h-8 w-8 mx-auto mb-3" />
                    <h5 className="font-semibold mb-2">Career Interests</h5>
                    <p className="text-sm text-white/80">Identifying what truly motivates and excites you</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Lightbulb className="h-8 w-8 mx-auto mb-3" />
                    <h5 className="font-semibold mb-2">Learning Abilities</h5>
                    <p className="text-sm text-white/80">Assessing your strengths and cognitive capabilities</p>
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
      CareerSkope Counselling Framework based on === use this imagei w
    </section>
  );
}
