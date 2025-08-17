import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, BarChart3, ExternalLink, Download, Globe } from "lucide-react";

export default function LegacyContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Legacy Content & Resources
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive collection of educational resources, proven projects, and 
              community expertise imported from the original Africa Mechanize platform.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Educational Resources</p>
                  <p className="text-3xl font-bold text-blue-800">10</p>
                  <p className="text-sm text-blue-600">Training materials & technical guides</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Proven Projects</p>
                  <p className="text-3xl font-bold text-purple-800">$13M</p>
                  <p className="text-sm text-purple-600">Total funding across 5 major initiatives</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Community Members</p>
                  <p className="text-3xl font-bold text-green-800">24</p>
                  <p className="text-sm text-green-600">Professional practitioners & institutions</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Educational Resources */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <FileText className="w-6 h-6 mr-3" />
              Educational Resources Library
            </CardTitle>
            <CardDescription>
              Professional training materials and technical guides from agricultural mechanization experts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Business Models for Sustainable Mechanization",
                  description: "Comprehensive guide on agri-hire business models across Sub-Saharan Africa",
                  category: "Business Development",
                  language: "English",
                  type: "Guide"
                },
                {
                  title: "Conservation Agriculture Manual",
                  description: "Complete training manual for farmers and extension workers implementing conservation agriculture",
                  category: "Technical Training",
                  language: "English", 
                  type: "Manual"
                },
                {
                  title: "Two-Wheel Tractor Operation Training",
                  description: "Operator training manual for two-wheel tractors and ancillary equipment",
                  category: "Equipment Training",
                  language: "English",
                  type: "Manual"
                },
                {
                  title: "Hire Services Business Enterprise",
                  description: "Modules on sustainable agricultural mechanization hire services as business enterprises",
                  category: "Business Training", 
                  language: "English",
                  type: "Course"
                },
                {
                  title: "Introduction à l'Agriculture de Conservation",
                  description: "Module français sur les concepts, principes, avantages et défis de l'agriculture de conservation",
                  category: "Formation Technique",
                  language: "Français",
                  type: "Module"
                },
                {
                  title: "Rural Transport & Traction Enterprises",
                  description: "Diversification guide for improved livelihoods through transport and traction services",
                  category: "Development Guide",
                  language: "English",
                  type: "Booklet"
                }
              ].map((resource, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-gray-900 flex-1">{resource.title}</h3>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{resource.category}</Badge>
                    <Badge variant="outline">{resource.language}</Badge>
                    <Badge variant="default">{resource.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Projects */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <BarChart3 className="w-6 h-6 mr-3" />
              Proven Project Portfolio
            </CardTitle>
            <CardDescription>
              Major agricultural mechanization initiatives demonstrating successful implementation across Africa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  title: "F-SAMA Framework Implementation Project",
                  description: "Comprehensive implementation of the Framework for Sustainable Agricultural Mechanization in Africa across 15 countries.",
                  budget: "$5.0M",
                  location: "Pan-African (15 countries)",
                  status: "Completed",
                  impact: "Established sustainable mechanization frameworks across multiple African regions"
                },
                {
                  title: "Agricultural Hire Services Business Development",
                  description: "Development of agricultural machinery hire services to improve farmer access to mechanization.",
                  budget: "$3.2M", 
                  location: "Nigeria, Senegal, Côte d'Ivoire",
                  status: "Ongoing",
                  impact: "Created viable business models for equipment sharing and rental services"
                },
                {
                  title: "Conservation Agriculture Mechanization Program",
                  description: "Integration of mechanization solutions with conservation agriculture practices.",
                  budget: "$1.8M",
                  location: "Ghana, Burkina Faso, Mali", 
                  status: "Completed",
                  impact: "Demonstrated successful combination of mechanization and sustainable farming practices"
                }
              ].map((project, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                    </div>
                    <Badge variant={project.status === "Ongoing" ? "default" : "outline"}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Budget</p>
                      <p className="font-semibold text-lg text-green-600">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Geographic Coverage</p>
                      <p className="font-medium">{project.location}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Project Impact</p>
                    <p className="text-gray-700">{project.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Users className="w-6 h-6 mr-3" />
              Professional Community
            </CardTitle>
            <CardDescription>
              Connect with our network of agricultural mechanization experts, institutions, and practitioners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">International Organizations</h3>
                <p className="text-gray-600 text-sm">FAO, CGIAR, CORAF, ACT Africa</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <FileText className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Academic Institutions</h3>
                <p className="text-gray-600 text-sm">Makerere University, IITA, Research Centers</p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Professional Engineers</h3>
                <p className="text-gray-600 text-sm">Agricultural & Mechanical Engineers, Equipment Specialists</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Access exclusive resources, connect with experts, and contribute to sustainable agricultural mechanization in Africa
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <a href="/register">Join Our Community</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/resources">Browse All Resources</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}