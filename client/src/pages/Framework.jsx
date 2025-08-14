import { FrameworkGrid } from "../components/FrameworkGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sprout, Target, Users, Cog, BookOpen, TrendingUp } from "lucide-react";

export default function Framework() {
  const frameworkPrinciples = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Strategic Alignment",
      description: "Aligning mechanization initiatives with national agricultural development strategies and food security goals."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Inclusive Approach",
      description: "Ensuring smallholder farmers, women, and youth have equal access to mechanization opportunities and benefits."
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "Environmental Sustainability",
      description: "Promoting climate-smart mechanization that preserves soil health and reduces environmental impact."
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Appropriate Technology",
      description: "Selecting and adapting mechanization technologies that fit local conditions, crops, and farming systems."
    }
  ];

  const implementationSteps = [
    {
      step: "01",
      title: "Assessment & Planning",
      description: "Comprehensive analysis of current mechanization status, needs assessment, and strategic planning."
    },
    {
      step: "02", 
      title: "Stakeholder Engagement",
      description: "Building partnerships with farmers, private sector, government, and development organizations."
    },
    {
      step: "03",
      title: "Capacity Building",
      description: "Training programs for farmers, technicians, and service providers on equipment operation and maintenance."
    },
    {
      step: "04",
      title: "Technology Deployment",
      description: "Gradual introduction of appropriate mechanization technologies with proper support systems."
    },
    {
      step: "05",
      title: "Monitoring & Evaluation",
      description: "Continuous assessment of impacts, outcomes, and adaptive management for sustainable results."
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-6 text-center mb-20">
        <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          F-SAMA Framework
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Framework for Sustainable Agricultural Mechanization in Africa
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          A comprehensive approach to transforming African agriculture through sustainable, 
          inclusive, and climate-smart mechanization strategies that empower farmers and 
          strengthen food systems across the continent.
        </p>
      </div>

      {/* Framework Principles */}
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
          Core Principles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {frameworkPrinciples.map((principle, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                  {principle.icon}
                </div>
                <CardTitle className="text-lg text-gray-800 dark:text-gray-200">
                  {principle.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {principle.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Framework Grid */}
      <div className="mb-20">
        <FrameworkGrid />
      </div>

      {/* Implementation Process */}
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
          Implementation Process
        </h2>
        <div className="max-w-4xl mx-auto">
          {implementationSteps.map((step, index) => (
            <div key={index} className="flex items-start mb-8 last:mb-0">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="container mx-auto px-6 mb-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-0">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
            Expected Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">40%</h3>
              <p className="text-gray-600 dark:text-gray-300">Increase in Agricultural Productivity</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">2M+</h3>
              <p className="text-gray-600 dark:text-gray-300">Farmers Empowered</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                <Sprout className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">30%</h3>
              <p className="text-gray-600 dark:text-gray-300">Reduction in Environmental Impact</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Join the Agricultural Transformation
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of the movement to revolutionize African agriculture through 
            sustainable mechanization practices and innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg font-semibold">
              <BookOpen className="w-5 h-5 mr-2" />
              Download Framework Guide
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20">
              Get Involved
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}