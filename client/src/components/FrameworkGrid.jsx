import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, Coins, Settings, Tractor, Lightbulb, Sprout, 
  Users, GraduationCap, Eye, Network, ExternalLink, ArrowRight
} from "lucide-react";

const iconMap = {
  farm_power: Zap,
  innovative_financing: Coins,
  sustainable_systems: Settings,
  mechanization: Tractor,
  innovative_systems: Lightbulb,
  land_preparation: Sprout,
  social_sustainability: Users,
  human_resources: GraduationCap,
  long_term_vision: Eye,
  cooperation: Network,
};

const colorMap = {
  1: "from-primary to-secondary",
  2: "from-secondary to-warning",
  3: "from-accent to-primary",
  4: "from-success to-primary",
  5: "from-warning to-secondary",
  6: "from-primary to-accent",
  7: "from-secondary to-primary",
  8: "from-accent to-success",
  9: "from-success to-secondary",
  10: "from-warning to-accent",
};

export const FrameworkGrid = () => {
  const { activeFrameworkCard, setActiveFrameworkCard } = useApp();
  const [expandedCard, setExpandedCard] = useState(null);

  const { data: frameworkElements, isLoading } = useQuery({
    queryKey: ["/api/framework"],
    enabled: true,
  });

  if (isLoading) {
    return (
      <section id="framework" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              F-SAMA Framework
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The 10 essential elements for developing and operationalizing Sustainable Agricultural Mechanization in Africa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="w-24 h-4 bg-gray-200 rounded mx-auto mb-3"></div>
                <div className="w-full h-16 bg-gray-200 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default framework elements if API doesn't return data
  const defaultElements = [
    { number: 1, title: "Farm Power", description: "Boosting farm power through appropriate technologies and innovative business models", icon: "farm_power" },
    { number: 2, title: "Innovative Financing", description: "Promoting innovative financing mechanisms for agricultural mechanization", icon: "innovative_financing" },
    { number: 3, title: "Sustainable Systems", description: "Building sustainable systems for manufacture and distribution of agricultural mechanization inputs", icon: "sustainable_systems" },
    { number: 4, title: "Mechanization", description: "Sustainable mechanization across agrifood value chains", icon: "mechanization" },
    { number: 5, title: "Innovative Systems", description: "Innovative systems for sustainable technology development and transfer", icon: "innovative_systems" },
    { number: 6, title: "Land Preparation", description: "Sustainable transformation of land preparation and crop/animal husbandry practices", icon: "land_preparation" },
    { number: 7, title: "Social Sustainability", description: "Roles of small-scale farmers, women and youth", icon: "social_sustainability" },
    { number: 8, title: "Human Resources", description: "Human resources development and capacity building for SAMA", icon: "human_resources" },
    { number: 9, title: "Long-Term Vision", description: "Need for a long-term vision: policy and strategy issues", icon: "long_term_vision" },
    { number: 10, title: "Cooperation & Networking", description: "Creating sustainable institutions for regional cooperation and networking", icon: "cooperation" },
  ];

  const elements = frameworkElements || defaultElements;

  const handleCardClick = (elementId) => {
    setActiveFrameworkCard(activeFrameworkCard === elementId ? null : elementId);
    setExpandedCard(expandedCard === elementId ? null : elementId);
  };

  return (
    <section id="framework" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/5 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <p className="text-primary font-semibold text-sm">FOCUS AREAS</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Elements of F-SAMA Framework
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            The 10 essential elements necessary for the development and operationalization of 
            <span className="font-semibold text-primary"> Sustainable Agricultural Mechanization in Africa (SAMA)</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {elements.map((element, index) => {
            const IconComponent = iconMap[element.icon] || Zap;
            const isActive = activeFrameworkCard === element.id;
            const isExpanded = expandedCard === element.id;

            return (
              <Card
                key={element.number}
                className={`group relative p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:rotate-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 ${
                  isActive ? "ring-2 ring-primary shadow-2xl -translate-y-3 scale-105" : ""
                } ${isExpanded ? "md:col-span-2" : ""}`}
                onClick={() => handleCardClick(element.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[element.number]} rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    
                    <div className="text-center">
                      <Badge variant="outline" className="mb-2 bg-white/50 dark:bg-gray-700/50">
                        #{element.number}
                      </Badge>
                      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-primary transition-colors duration-300">
                        {element.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {element.description}
                      </p>
                      
                      {isExpanded && element.detailsEn && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-lg animate-slide-up">
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {element.detailsEn}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mt-3 p-0 h-auto font-medium text-primary hover:text-primary/80"
                          >
                            Learn More <ArrowRight className="ml-1 w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Ready to explore the complete framework?
            </p>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-full px-6">
              <ExternalLink className="mr-2 w-4 h-4" />
              View All Elements
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
