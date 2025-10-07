import { Users, GraduationCap, Presentation } from "lucide-react";

export default function WorkshopsSection() {
  const services = [
    {
      icon: Presentation,
      title: "Executive Mentorship",
      description: "Specialized mentorship programs for schools, colleges, and corporate executives",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Workshops & Seminars", 
      description: "Interactive sessions on career development, leadership, and industry trends",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: GraduationCap,
      title: "Admission Guidance",
      description: "Comprehensive guidance for students seeking higher education opportunities",
      gradient: "from-red-500 to-red-600"
    }
  ];

  return (
    <section id="workshops" className="scroll-mt-20 py-12 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4 animate-fade-in-up">
            Professional Development
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Corporate services, workshops, and seminars for organizations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass-strong p-6 rounded-xl card-pop hover-gradient-border text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
              data-testid={`workshop-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto mb-4 hover-glow`}>
                <service.icon className="text-white h-8 w-8 icon-bounce" />
              </div>
              <h3 className="text-xl font-semibold mb-3 gradient-text-bright">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
