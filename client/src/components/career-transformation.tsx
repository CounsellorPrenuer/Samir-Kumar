import { Brain, Map, ArrowLeftRight } from "lucide-react";

export default function CareerTransformation() {
  const transformations = [
    {
      icon: Brain,
      title: "AI-Driven Adaptations",
      description: "Adapting to digital and AI-driven transformations in the modern workplace"
    },
    {
      icon: Map,
      title: "Skills Mapping",
      description: "Comprehensive skills mapping for students and professionals"
    },
    {
      icon: ArrowLeftRight,
      title: "Smooth Transitions",
      description: "Career transitions without starting over from scratch"
    }
  ];

  return (
    <section id="transform" className="scroll-mt-20 py-12 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Transforming Potential into Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {transformations.map((item, index) => (
              <div 
                key={index}
                className="glass-strong p-6 rounded-xl card-pop animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
                data-testid={`transformation-card-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className="h-8 w-8 text-white mb-4 mx-auto icon-bounce hover-glow" />
                <h3 className="text-xl font-semibold mb-3 text-white gradient-text-vibrant">{item.title}</h3>
                <p className="text-white/90">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
