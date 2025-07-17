import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const StatsCounter = () => {
  const [animatedStats, setAnimatedStats] = useState({
    networkPartners: 0,
    countries: 0,
    webinars: 0,
    speakers: 0,
    participants: 0,
  });

  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/stats"],
    enabled: true,
  });

  useEffect(() => {
    if (stats) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const stepDelay = duration / steps;

      const animateCounter = (key, target) => {
        let current = 0;
        const increment = target / steps;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
        }, stepDelay);
      };

      // Start animations with slight delays
      setTimeout(() => animateCounter('networkPartners', stats.networkPartners), 500);
      setTimeout(() => animateCounter('countries', stats.countries), 700);
      setTimeout(() => animateCounter('webinars', stats.webinars), 900);
      setTimeout(() => animateCounter('speakers', stats.speakers), 1100);
      setTimeout(() => animateCounter('participants', stats.participants), 1300);
    }
  }, [stats]);

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-300 mb-2">
                  ---
                </div>
                <div className="w-24 h-4 bg-gray-200 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const statsData = [
    {
      value: animatedStats.networkPartners,
      label: "Network Partners",
      color: "text-primary",
    },
    {
      value: animatedStats.countries,
      label: "Countries",
      color: "text-secondary",
    },
    {
      value: animatedStats.webinars,
      label: "Webinars",
      color: "text-accent",
    },
    {
      value: animatedStats.speakers,
      label: "Speakers",
      color: "text-success",
    },
    {
      value: animatedStats.participants,
      label: "Participants",
      color: "text-warning",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 tabular-nums`}>
                {stat.value.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
