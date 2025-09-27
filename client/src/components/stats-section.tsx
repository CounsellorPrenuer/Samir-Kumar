export default function StatsSection() {
  const stats = [
    {
      number: "3,725+",
      label: "Professionals Guided",
      color: "text-blue-600",
      delay: "0s"
    },
    {
      number: "30+",
      label: "Years of Experience",
      color: "text-green-600",
      delay: "0.2s"
    },
    {
      number: "94%",
      label: "Success Rate",
      color: "text-red-600",
      delay: "0.4s"
    }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="animate-slide-up"
              style={{animationDelay: stat.delay}}
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Trusted by schools, colleges, corporates, and working professionals
          </p>
        </div>
      </div>
    </section>
  );
}
