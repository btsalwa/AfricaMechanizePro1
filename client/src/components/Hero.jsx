import { useState, useEffect } from "react";
import { ChevronDown, Play, Sparkles, Leaf, Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    setIsVisible(true);
    
    // Create floating particles
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
      });
    }
    setParticles(newParticles);
  }, []);

  const scrollToFramework = () => {
    const element = document.getElementById("framework");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-black/60 to-secondary/80"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-secondary/30 transform rotate-45 animate-pulse" />
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-32 w-8 h-8 bg-primary/20 transform rotate-45 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        {/* Floating Icons */}
        <div className="absolute -top-10 left-0 right-0 flex justify-center space-x-8">
          <div className="animate-float" style={{ animationDelay: '0s' }}>
            <Leaf className="text-primary w-8 h-8 opacity-60" />
          </div>
          <div className="animate-float" style={{ animationDelay: '1s' }}>
            <Tractor className="text-secondary w-10 h-10 opacity-70" />
          </div>
          <div className="animate-float" style={{ animationDelay: '2s' }}>
            <Sparkles className="text-accent w-6 h-6 opacity-50" />
          </div>
        </div>

        <div className="mb-8">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-1">
            <p className="text-black/90 text-lg font-medium">
              🌱 Sustainable Agricultural Mechanization Framework
            </p>
          </div>
        </div>

        <h1 
          className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
            Transforming
          </span>
          <span className="block bg-gradient-to-r from-orange-500 to-orange-500 bg-clip-text text-transparent sm:inline sm:ml-4">
            Agriculture
          </span>
          <span className="block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
            in Africa
          </span>
        </h1>
        
        <p 
          className={`text-lg sm:text-xl md:text-2xl mb-8 opacity-100 max-w-4xl mx-auto transition-all duration-1000 delay-300 leading-relaxed ${
            isVisible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Empowering farmers through innovative mechanization solutions, sustainable practices, and collaborative networks across the continent
        </p>
        
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-10 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button
            size="lg"
            onClick={scrollToFramework}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary/25"
          >
            <Sparkles className="mr-2 w-5 h-5" />
            Explore F-SAMA Framework
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/about")}
            className="border-2 border-white/50 text-black hover:bg-white/20 hover:border-white backdrop-blur-sm px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Introduction
          </Button>
        </div>

        {/* Enhanced Feature Pills with Legacy Data */}
        <div className={`flex flex-wrap gap-3 justify-center mb-2 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {["10 F-SAMA Elements", "54+ Countries", "42 Legacy Resources", "$13M Project Portfolio", "Expert Network"].map((pill, index) => (
            <div 
              key={pill}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm font-medium hover:bg-white/20 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div 
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-1000 delay-700 group ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        onClick={scrollToFramework}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center group-hover:border-white transition-colors duration-300">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse group-hover:bg-white transition-colors duration-300"></div>
          </div>
          <ChevronDown className="text-white/80 group-hover:text-white transition-colors duration-300 animate-bounce" size={24} />
          <p className="text-white/60 text-xs font-medium group-hover:text-white/80 transition-colors duration-300">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
};
