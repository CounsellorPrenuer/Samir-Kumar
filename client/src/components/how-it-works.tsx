import { Search, TrendingUp, Route, GraduationCap, Handshake, BookOpen } from "lucide-react";

export default function HowItWorks() {
  const services = [
    {
      icon: Search,
      title: "Career Audit",
      description: "Career readiness assessment & interest mapping to understand your strengths",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Skill Mapping",
      description: "Transferable skills identification for career advancement",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Route,
      title: "Career Pivot",
      description: "Guidance for smooth career transitions and new opportunities",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: GraduationCap,
      title: "Mentorship",
      description: "Lifetime guidance via comprehensive Career Management System",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Handshake,
      title: "Placement Services",
      description: "Corporate tie-ups and student placement support programs",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      icon: BookOpen,
      title: "Admission Guidance",
      description: "Expert guidance for higher education and course selection",
      gradient: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section id="how-it-works" className="scroll-mt-20 py-12 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              How Careerskope Helps You
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive approach to career development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="text-center group"
              data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="text-white h-8 w-8" />
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
