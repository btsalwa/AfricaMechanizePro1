import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Globe, Video, Users, Award } from "lucide-react";

export const StatsCounter = () => {
  const [animatedStats, setAnimatedStats] = useState({
    network: 0,
    countries: 0,
    webinars: 0,
    speakers: 0,
    participants: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/statistics"],
    enabled: true,
  });

  // Default values if stats are not available
  const defaultStats = {
    network: 150,
    countries: 35,
    webinars: 12,
    speakers: 85,
    participants: 8500,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // total duration in ms
    const startTime = performance.now();

    const dataToUse = stats || defaultStats;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAnimatedStats({
        network: Math.floor(dataToUse.network * progress),
        countries: Math.floor(dataToUse.countries * progress),
        webinars: Math.floor(dataToUse.webinars * progress),
        speakers: Math.floor(dataToUse.speakers * progress),
        participants: Math.floor(dataToUse.participants * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, stats]);

  if (isLoading) {
    return (
      <section
        ref={sectionRef}
        className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="text-4xl md:text-5xl font-bold text-gray-300 mb-2">
                  ---
                </div>
                <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const currentStats = stats || defaultStats;
  const displayStats = isVisible
    ? animatedStats
    : { network: 0, countries: 0, webinars: 0, speakers: 0, participants: 0 };

  const statsData = [
    {
      value: displayStats.network || 0,
      label: "Network Partners",
      color: "text-primary",
      bgColor: "bg-primary/10",
      icon: TrendingUp,
    },
    {
      value: displayStats.countries || 0,
      label: "Countries",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      icon: Globe,
    },
    {
      value: displayStats.webinars || 0,
      label: "Webinars",
      color: "text-accent",
      bgColor: "bg-accent/10",
      icon: Video,
    },
    {
      value: displayStats.speakers || 0,
      label: "Conference Speakers",
      color: "text-success",
      bgColor: "bg-success/10",
      icon: Users,
    },
    {
      value: displayStats.participants || 0,
      label: "Participants",
      color: "text-warning",
      bgColor: "bg-warning/10",
      icon: Award,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Impact at a Glance
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building a sustainable agricultural future across Africa through
            collaboration and innovation
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`text-center group hover:scale-105 transition-all duration-0 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 5.0}s` }}
              >
                <div
                  className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-0`}
                >
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div
                  className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 tabular-nums group-hover:scale-110 transition-transform duration-0`}
                >
                  {stat.value.toLocaleString()}
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
