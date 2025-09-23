import { Button } from "@/components/ui/button";
import { Calendar, Users, Lightbulb } from "lucide-react";
import { Link } from "wouter";

export function FAOConferenceBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 text-amber-700">
          <Users size={40} />
        </div>
        <div className="absolute top-32 right-32 text-orange-700">
          <Lightbulb size={35} />
        </div>
        <div className="absolute bottom-20 left-40 text-yellow-700">
          <Calendar size={30} />
        </div>
        {/* Agricultural symbols */}
        <div className="absolute top-16 right-16 text-amber-800 text-4xl">🌾</div>
        <div className="absolute bottom-16 right-20 text-orange-800 text-3xl">🚜</div>
        <div className="absolute top-24 left-60 text-yellow-800 text-3xl">🌱</div>
        <div className="absolute bottom-32 left-16 text-amber-700 text-2xl">🌻</div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h2 
                className="text-2xl lg:text-3xl font-bold text-white leading-tight"
                data-testid="text-cta-headline"
              >
                Call for abstracts now open:
              </h2>
              <h3 
                className="text-xl lg:text-2xl font-semibold text-white"
                data-testid="text-conference-title"
              >
                Africa Conference on Sustainable Agricultural Mechanization
              </h3>
            </div>
            
            <Button 
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Link 
                href="/events" 
                data-testid="link-read-more-fao"
                aria-label="Read more about the Africa Conference on Sustainable Agricultural Mechanization"
              >
                Read More
              </Link>
            </Button>
          </div>

          {/* Right Content */}
          <div className="space-y-4 text-white">
            {/* FAO Logo Area */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white rounded-lg px-3 py-2 shadow-md">
                <div className="text-orange-600 font-bold text-xl tracking-wide">FAO</div>
              </div>
              <div className="bg-white rounded-full p-2 shadow-md">
                <div className="text-2xl">🌍</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl lg:text-2xl font-bold" data-testid="text-conference-main-title">
                Africa Conference on
              </h4>
              <h4 className="text-xl lg:text-2xl font-bold">
                Sustainable Agricultural
              </h4>
              <h4 className="text-xl lg:text-2xl font-bold">
                Mechanization
              </h4>
              
              <p className="text-lg font-semibold text-yellow-100 mt-4" data-testid="text-conference-tagline">
                Innovate. Transform. Sustain.
              </p>
              
              <div className="mt-4 space-y-2">
                <p className="text-lg font-bold" data-testid="text-conference-dates">
                  25 – 28 November 2025
                </p>
                
                {/* Africa Map Icon */}
                <div className="flex items-center space-x-2 mt-4">
                  <div className="text-white text-2xl">🌍</div>
                  <span className="text-lg font-medium" data-testid="text-conference-hashtag">#AgriculturalMechanization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-300/30 to-orange-400/30 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-400/30 to-yellow-300/30 rounded-full translate-y-24 -translate-x-24"></div>
    </section>
  );
}