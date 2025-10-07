import { useCountUp } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";
import { useEffect, useState } from "react";

interface StatItemProps {
  targetNumber: number;
  suffix: string;
  label: string;
  color: string;
  delay: number;
  inView: boolean;
}

function StatItem({ targetNumber, suffix, label, color, delay, inView }: StatItemProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const { count, startAnimation } = useCountUp({
    end: targetNumber,
    start: 0,
    duration: 2000,
    delay: delay * 1000,
  });

  useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true);
      startAnimation();
    }
  }, [inView, hasStarted, startAnimation]);

  const formatNumber = (num: number) => {
    if (targetNumber >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <div 
      className={`transition-all duration-1000 ${inView ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}
      style={{ animationDelay: `${delay * 1000}ms` }}
      data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`text-4xl md:text-5xl font-bold ${color} mb-2 tabular-nums`}>
        {formatNumber(count)}{suffix}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  const stats = [
    {
      targetNumber: 3725,
      suffix: "+",
      label: "Professionals Guided",
      color: "text-blue-600",
      delay: 0
    },
    {
      targetNumber: 30,
      suffix: "+",
      label: "Years of Experience",
      color: "text-green-600",
      delay: 0.2
    },
    {
      targetNumber: 94,
      suffix: "%",
      label: "Success Rate",
      color: "text-red-600",
      delay: 0.4
    }
  ];

  return (
    <section ref={ref} className="py-10 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              targetNumber={stat.targetNumber}
              suffix={stat.suffix}
              label={stat.label}
              color={stat.color}
              delay={stat.delay}
              inView={isInView}
            />
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
