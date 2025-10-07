import { Users, GraduationCap, Presentation } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

export default function WorkshopsSection() {
  const { ref: cardsRef, isInView: cardsInView } = useInView({ threshold: 0.1 });
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-500 via-green-500 to-emerald-500 bg-clip-text text-transparent">
              Professional Development
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Corporate services, workshops, and seminars for organizations
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-card p-6 rounded-xl hover-lift text-center border-2 border-transparent hover:border-green-300 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 ${
                cardsInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              data-testid={`workshop-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <service.icon className="text-white h-8 w-8 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
