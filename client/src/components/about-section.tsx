import { ArrowRight, Target, Heart, TrendingUp, Users, BookOpen, MapPin, CheckCircle, Lightbulb, GraduationCap } from "lucide-react";

export default function AboutSection() {
  const transformations = [
    {
      from: "Confusion",
      to: "Clarity",
      icon: Target,
      color: "text-blue-600"
    },
    {
      from: "Doubts",
      to: "Confidence", 
      icon: Heart,
      color: "text-red-600"
    },
    {
      from: "Indecisiveness",
      to: "Informed Decisions",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      from: "Careers I know",
      to: "Careers I can pursue",
      icon: Users,
      color: "text-blue-600"
    }
  ];

  return (
    <section id="about" className="scroll-mt-20 py-20 bg-gradient-to-br from-blue-50 via-green-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-blue-600 via-green-600 to-red-600 bg-clip-text text-transparent">CareerSkope</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering you to choose careers
          </p>
        </div>

        {/* Transformations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {transformations.map((transform, index) => {
            const IconComponent = transform.icon;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                data-testid={`transformation-${transform.from.toLowerCase()}`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4`}>
                    <IconComponent className={`h-8 w-8 ${transform.color}`} />
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">From</div>
                  <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">{transform.from}</div>
                  <ArrowRight className="h-5 w-5 mx-auto text-gray-400 mb-2" />
                  <div className="text-sm text-muted-foreground mb-2">To</div>
                  <div className={`font-bold ${transform.color}`}>{transform.to}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Bridging the Gap to Your Ideal Career
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At CareerSkope, we bridge this gap and make you a better, well-informed, and knowledgeable individual. 
              You will be enabled to pursue a career that suits you, a career choice that can lead to overall happiness, 
              spiritual uplifting, and prosperity.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              More than <span className="font-bold text-blue-600">12,000+ career options</span> are available... 
              which one fits you based on your attributes, skills, interests, and personality is a mystery puzzle 
              that is not easy to solve without the guidance of professionals.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Choosing a career and pursuing it can no longer be left to chance. You need to be clear on your goals, 
              opportunities available, and plans for it based on scientific assessment and professional guidance.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h4 className="text-2xl font-bold mb-6 text-center">Our Expertise</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-muted-foreground">Psychometric assessments for students, college graduates, and working professionals</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-muted-foreground">Understanding strengths and improvement areas</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <p className="text-muted-foreground">Identifying suitable career options</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-muted-foreground">Future of jobs insights with AI integration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Framework Information */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-blue-600">Counselling Framework</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Service Areas */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm" data-testid="framework-diagram-services">
              <h4 className="text-xl font-bold text-center mb-6 text-blue-600">Service Areas</h4>
              <div className="space-y-4">
                <div className="text-center font-semibold text-lg text-foreground mb-4">Career Counselling at CareerSkope</div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Evaluate Career Options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Career Opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Unbiased Counselling Process</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Informed Career Decisions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Education and Career Road Map Discussions</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Assessment Approach */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm" data-testid="framework-diagram-assessment">
              <h4 className="text-xl font-bold text-center mb-6 text-blue-600">Assessment Approach</h4>
              <div className="space-y-4">
                <p className="text-center text-muted-foreground text-sm mb-4">
                  Our assessment is based on three core components:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Individual's Personality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Career Interest</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Learning Abilities</span>
                  </li>
                </ul>
                <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-lg font-bold text-blue-600">
                    ↓ Informed Career Choice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Psychometric Assessment Section */}
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

        {/* Call to Action */}
        <div className="text-center">
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
      </div>
    </section>
  );
}