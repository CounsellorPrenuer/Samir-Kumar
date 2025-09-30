import { ArrowRight, Target, Heart, TrendingUp, Users, BookOpen, MapPin, CheckCircle, Lightbulb, GraduationCap } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

export default function AboutSection() {
  const { ref: cardsRef, isInView: cardsInView } = useInView({ threshold: 0.2 });
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
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {transformations.map((transform, index) => {
            const IconComponent = transform.icon;
            return (
              <div 
                key={index}
                className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600 ${cardsInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}
                style={{ animationDelay: `${index * 150}ms` }}
                data-testid={`transformation-${transform.from.toLowerCase()}`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4`}>
                    <IconComponent className={`h-8 w-8 ${transform.color}`} />
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">From</div>
                  <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">{transform.from}</div>
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

      </div>
      {/* Psychometric Assessment Section - content moved to Why CS section */}
   
    </section>
  );
}