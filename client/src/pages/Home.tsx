import { Hero } from "../components/Hero";
import { StatsCounter } from "../components/StatsCounter";
import { FrameworkGrid } from "../components/FrameworkGrid";
import { NewsEvents } from "../components/NewsEvents";
import { ResourceLibrary } from "../components/ResourceLibrary";
import { WebinarParticipation } from "../components/WebinarParticipation";
import { ReadingMaterials } from "../components/ReadingMaterials";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <StatsCounter />
      
      <FrameworkGrid />
      
      {/* Featured Content Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Consultative Meeting on Mechanization Strategy
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                New models for sustainable agricultural mechanization in sub-Saharan Africa
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Discover innovative approaches to agricultural mechanization that can transform 
                farming practices across Africa. Our comprehensive strategy focuses on sustainable 
                solutions that empower farmers and strengthen food security.
              </p>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Read More
              </Button>
            </div>
            
            {/* Image */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Agricultural mechanization conference" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <NewsEvents />
      
      <WebinarParticipation />
      
      <ResourceLibrary />
      
      <ReadingMaterials />
      
      <NewsletterSignup />
    </div>
  );
}