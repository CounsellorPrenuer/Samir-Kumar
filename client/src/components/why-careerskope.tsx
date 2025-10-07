import { Users, Rocket, Building, Trophy } from "lucide-react";

export default function WhyCareerskope() {
  const features = [
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Professional guidance for all segments - students, graduates, and working professionals",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Rocket,
      title: "Future-Ready Skills", 
      description: "Skills aligned with industry trends and digital transformations",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Building,
      title: "Industry Knowledge",
      description: "Deep expertise in education, corporate training, retail marketing, and admissions",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Trophy,
      title: "Proven Track Record",
      description: "30+ years experience with successful placements and mentorship",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section id="why-careerskope" className="scroll-mt-20 py-12 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose Careerskope?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert guidance for all segments with future-ready skills aligned with industry trends
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-strong p-6 rounded-xl card-pop hover-gradient-border animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`feature-card-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 hover-glow`}>
                <feature.icon className="text-white h-6 w-6 icon-bounce" />
              </div>
              <h3 className="text-xl font-semibold mb-3 gradient-text-bright">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
