import { ResourceLibrary } from "../components/ResourceLibrary";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Video, BookOpen } from "lucide-react";

export default function Resources() {
  const resourceCategories = [
    {
      icon: Video,
      title: "Webinars",
      description: "Educational webinars on agricultural mechanization topics",
      count: "24+ sessions",
      color: "text-primary"
    },
    {
      icon: FileText,
      title: "Research Papers",
      description: "Academic research and policy documents",
      count: "50+ papers",
      color: "text-secondary"
    },
    {
      icon: BookOpen,
      title: "Newsletters",
      description: "Quarterly updates and industry insights",
      count: "12+ issues",
      color: "text-accent"
    },
    {
      icon: Download,
      title: "Reports",
      description: "Comprehensive reports on mechanization progress",
      count: "30+ reports",
      color: "text-success"
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Resource Library
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            Access comprehensive resources, research papers, and educational materials
          </p>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Explore our extensive collection of resources designed to support sustainable 
            agricultural mechanization across Africa.
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              Resource Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover materials organized by type and topic for easy access
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resourceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={index}
                  className="text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className={category.color} size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <Badge variant="outline" className="text-sm">
                      {category.count}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <ResourceLibrary />

      {/* Call to Action */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We're constantly updating our resource library. Contact us if you need 
              specific materials or have suggestions for new resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300">
                Request Resource
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
