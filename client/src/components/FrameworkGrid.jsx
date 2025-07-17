import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, Coins, Settings, Tractor, Lightbulb, Sprout, 
  Users, GraduationCap, Eye, Network 
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
          {elements.map((element) => {
            const IconComponent = iconMap[element.icon] || Zap;
            const isActive = activeFrameworkCard === element.id;
            const isExpanded = expandedCard === element.id;

            return (
              <Card
                key={element.number}
                className={`p-6 cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                  isActive ? "ring-2 ring-primary shadow-2xl -translate-y-2" : ""
                } ${isExpanded ? "md:col-span-2" : ""}`}
                onClick={() => handleCardClick(element.id)}
              >
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[element.number]} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      #{element.number}
                    </Badge>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                      {element.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {element.description}
                    </p>
                    
                    {isExpanded && element.detailedDescription && (
                      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {element.detailedDescription}
                        </p>
                        {element.learnMoreUrl && (
                          <a 
                            href={element.learnMoreUrl}
                            className="inline-block mt-2 text-primary hover:text-primary/80 font-medium text-sm"
                          >
                            Learn More →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
