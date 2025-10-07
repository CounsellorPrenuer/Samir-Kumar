import { Zap, BarChart3, Scale, UserCheck } from "lucide-react";

export default function FourPillars() {
  const pillars = [
    {
      icon: Zap,
      title: "Strategic Career Guidance",
      description: "Long-term strategic planning for sustainable career growth",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Planning",
      description: "Evidence-based career decisions using market insights",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Scale,
      title: "Holistic Life Integration",
      description: "Balancing career aspirations with personal life goals",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: UserCheck,
      title: "Personalized Mentorship",
      description: "One-on-one guidance tailored to individual needs",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-12 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our Unique Approach
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four pillars that form the foundation of our career guidance methodology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className="glass-strong p-6 rounded-xl text-center card-pop hover-gradient-border animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`pillar-card-${pillar.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${pillar.gradient} rounded-full flex items-center justify-center mx-auto mb-4 hover-glow`}>
                <pillar.icon className="text-white h-8 w-8 icon-bounce" />
              </div>
              <h3 className="text-xl font-semibold mb-3 gradient-text-bright">{pillar.title}</h3>
              <p className="text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
