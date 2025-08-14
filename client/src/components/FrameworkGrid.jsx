import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tractor, 
  Users, 
  Cog, 
  DollarSign, 
  Leaf, 
  GraduationCap, 
  TrendingUp, 
  Shield, 
  Building2, 
  BarChart3 
} from "lucide-react";

export const FrameworkGrid = () => {
  const frameworkElements = [
    {
      id: 1,
      title: "Farm Power",
      shortTitle: "Power",
      icon: <Tractor className="w-8 h-8" />,
      description: "Mechanization technologies and equipment for enhanced agricultural productivity.",
      details: "Includes tractors, implements, and power systems tailored for African farming conditions.",
      color: "from-green-500 to-emerald-600",
      category: "Technology"
    },
    {
      id: 2,
      title: "Machinery & Equipment",
      shortTitle: "Equipment", 
      icon: <Cog className="w-8 h-8" />,
      description: "Agricultural machinery and tools suited for various farming systems.",
      details: "Combines, harvesters, tillage equipment, and precision agriculture tools.",
      color: "from-blue-500 to-cyan-600",
      category: "Technology"
    },
    {
      id: 3,
      title: "Innovative Financing",
      shortTitle: "Finance",
      icon: <DollarSign className="w-8 h-8" />,
      description: "Financial mechanisms to improve access to mechanization services.",
      details: "Micro-finance, leasing schemes, and innovative payment models for farmers.",
      color: "from-purple-500 to-indigo-600",
      category: "Economic"
    },
    {
      id: 4,
      title: "Human Resources",
      shortTitle: "Workforce",
      icon: <Users className="w-8 h-8" />,
      description: "Capacity building and skills development for sustainable mechanization.",
      details: "Training programs for farmers, technicians, and service providers.",
      color: "from-orange-500 to-red-600",
      category: "Social"
    },
    {
      id: 5,
      title: "Research & Development",
      shortTitle: "R&D",
      icon: <GraduationCap className="w-8 h-8" />,
      description: "Innovation and technological advancement in agricultural mechanization.",
      details: "Research institutions, technology transfer, and innovation hubs.",
      color: "from-teal-500 to-green-600",
      category: "Innovation"
    },
    {
      id: 6,
      title: "Business & Service Models",
      shortTitle: "Business",
      icon: <Building2 className="w-8 h-8" />,
      description: "Sustainable business models for mechanization service provision.",
      details: "Service centers, custom hiring, and equipment sharing models.",
      color: "from-yellow-500 to-orange-600",
      category: "Economic"
    },
    {
      id: 7,
      title: "Environmental Sustainability",
      shortTitle: "Environment",
      icon: <Leaf className="w-8 h-8" />,
      description: "Climate-smart and environmentally responsible mechanization practices.",
      details: "Conservation agriculture, carbon footprint reduction, and soil health.",
      color: "from-green-600 to-lime-600",
      category: "Environmental"
    },
    {
      id: 8,
      title: "Social Sustainability",
      shortTitle: "Social",
      icon: <Shield className="w-8 h-8" />,
      description: "Inclusive mechanization that benefits all stakeholders equitably.",
      details: "Gender inclusion, youth engagement, and community development.",
      color: "from-pink-500 to-rose-600",
      category: "Social"
    },
    {
      id: 9,
      title: "Value Chain Development",
      shortTitle: "Value Chain",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Mechanization across the entire agricultural value chain.",
      details: "Post-harvest processing, storage, transportation, and marketing.",
      color: "from-indigo-500 to-purple-600",
      category: "Economic"
    },
    {
      id: 10,
      title: "Monitoring & Evaluation",
      shortTitle: "M&E",
      icon: <BarChart3 className="w-8 h-8" />,
      description: "Data-driven assessment of mechanization impacts and outcomes.",
      details: "Performance indicators, impact assessment, and adaptive management.",
      color: "from-gray-500 to-slate-600",
      category: "Management"
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          F-SAMA Framework Elements
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          The Framework for Sustainable Agricultural Mechanization in Africa comprises 
          10 interconnected elements designed to transform farming practices across the continent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {frameworkElements.map((element) => (
          <Card 
            key={element.id} 
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${element.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <CardHeader className="text-center pb-4 relative z-10">
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${element.color} rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                {element.icon}
              </div>
              <div className="space-y-2">
                <Badge variant="secondary" className="text-xs">
                  {element.category}
                </Badge>
                <CardTitle className="text-lg leading-tight text-gray-800 dark:text-gray-200">
                  {element.title}
                </CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="text-center pt-0 relative z-10">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {element.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {element.details}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className={`w-full group-hover:bg-gradient-to-r group-hover:${element.color} group-hover:text-white group-hover:border-transparent transition-all duration-300`}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Framework Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-0">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Integrated Approach
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            These 10 elements work together to create a holistic framework that addresses 
            technical, economic, social, and environmental aspects of agricultural mechanization.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
              <Cog className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Technical Excellence
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Advanced machinery, power systems, and innovative technologies
            </p>
          </div>
          
          <div className="p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
              <Users className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Social Impact
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Inclusive development, capacity building, and community engagement
            </p>
          </div>
          
          <div className="p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white">
              <Leaf className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Sustainability
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Environmental stewardship and long-term viability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};