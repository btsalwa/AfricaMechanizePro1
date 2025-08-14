import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Filter, Download, Eye, BookOpen, Video, 
  FileText, Users, Star, Calendar, Clock, ExternalLink 
} from "lucide-react";
import { format } from "date-fns";

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock resources data - replace with actual API call
  const resources = [
    {
      id: 1,
      title: "F-SAMA Framework Implementation Guide",
      description: "Comprehensive guide for implementing the Framework for Sustainable Agricultural Mechanization in Africa.",
      type: "guide",
      category: "Framework",
      format: "PDF",
      size: "2.5 MB",
      pages: 45,
      downloads: 1250,
      rating: 4.8,
      author: "African Union Commission",
      publishedAt: new Date("2024-12-15"),
      language: "English",
      tags: ["F-SAMA", "Implementation", "Guide"],
      thumbnail: "/api/placeholder/300/200",
      isFeatured: true
    },
    {
      id: 2,
      title: "Sustainable Mechanization Best Practices",
      description: "Collection of proven best practices for sustainable agricultural mechanization across different African contexts.",
      type: "report",
      category: "Best Practices",
      format: "PDF",
      size: "4.2 MB",
      pages: 78,
      downloads: 890,
      rating: 4.6,
      author: "International Food Policy Research Institute",
      publishedAt: new Date("2024-11-20"),
      language: "English",
      tags: ["Sustainability", "Best Practices", "Case Studies"],
      thumbnail: "/api/placeholder/300/200",
      isFeatured: true
    },
    {
      id: 3,
      title: "Agricultural Machinery Selection Tool",
      description: "Interactive tool to help farmers and extension agents select appropriate agricultural machinery for specific crops and conditions.",
      type: "tool",
      category: "Tools",
      format: "Web App",
      size: "Online",
      pages: null,
      downloads: 2340,
      rating: 4.9,
      author: "Africa Mechanize",
      publishedAt: new Date("2024-10-10"),
      language: "English/French",
      tags: ["Selection", "Interactive", "Decision Support"],
      thumbnail: "/api/placeholder/300/200",
      isFeatured: false
    },
    {
      id: 4,
      title: "Climate-Smart Agriculture Webinar Series",
      description: "Complete recording series of webinars on climate-smart agricultural practices and mechanization strategies.",
      type: "video",
      category: "Education",
      format: "MP4",
      size: "1.8 GB",
      pages: null,
      downloads: 567,
      rating: 4.7,
      author: "Climate Smart Agriculture Network",
      publishedAt: new Date("2024-09-15"),
      language: "English",
      tags: ["Climate Smart", "Webinar", "Video Series"],
      thumbnail: "/api/placeholder/300/200",
      isFeatured: false
    },
    {
      id: 5,
      title: "Financial Models for Mechanization Services",
      description: "Analysis of different financial models and business cases for sustainable mechanization service provision.",
      type: "report",
      category: "Finance",
      format: "PDF",
      size: "3.1 MB",
      pages: 62,
      downloads: 743,
      rating: 4.5,
      author: "World Bank Group",
      publishedAt: new Date("2024-08-30"),
      language: "English",
      tags: ["Finance", "Business Models", "Sustainability"],
      thumbnail: "/api/placeholder/300/200",
      isFeatured: false
    }
  ];

  const categories = [
    { id: "all", label: "All Resources", count: resources.length },
    { id: "Framework", label: "Framework", count: resources.filter(r => r.category === "Framework").length },
    { id: "Best Practices", label: "Best Practices", count: resources.filter(r => r.category === "Best Practices").length },
    { id: "Tools", label: "Tools", count: resources.filter(r => r.category === "Tools").length },
    { id: "Education", label: "Education", count: resources.filter(r => r.category === "Education").length },
    { id: "Finance", label: "Finance", count: resources.filter(r => r.category === "Finance").length }
  ];

  const resourceTypes = [
    { id: "guide", label: "Guides", icon: <BookOpen className="w-4 h-4" /> },
    { id: "report", label: "Reports", icon: <FileText className="w-4 h-4" /> },
    { id: "tool", label: "Tools", icon: <Users className="w-4 h-4" /> },
    { id: "video", label: "Videos", icon: <Video className="w-4 h-4" /> }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = filteredResources.filter(resource => resource.isFeatured);
  const regularResources = filteredResources.filter(resource => !resource.isFeatured);

  const getTypeIcon = (type) => {
    const typeObj = resourceTypes.find(t => t.id === type);
    return typeObj ? typeObj.icon : <FileText className="w-4 h-4" />;
  };

  const ResourceCard = ({ resource, featured = false }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden ${featured ? 'border-2 border-green-200 dark:border-green-800' : ''}`}>
      {featured && (
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-2 text-sm font-semibold">
          Featured Resource
        </div>
      )}
      
      <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-white/90 text-green-700 hover:bg-white">
            {resource.category}
          </Badge>
          <Badge variant="secondary" className="bg-white/90">
            {resource.format}
          </Badge>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white">
          {getTypeIcon(resource.type)}
          <span className="text-sm font-medium capitalize">{resource.type}</span>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 group-hover:text-green-600 transition-colors">
          {resource.title}
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>by {resource.author}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{resource.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Download size={14} />
              <span>{resource.downloads}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{format(resource.publishedAt, "MMM yyyy")}</span>
            </div>
          </div>
          <span>{resource.size}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button className="flex-1 group-hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="icon">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Resource Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access our comprehensive collection of guides, reports, tools, and educational materials 
            to advance sustainable agricultural mechanization practices across Africa.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="capitalize"
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Resource Type Filters */}
        <div className="flex justify-center gap-4 mb-12">
          {resourceTypes.map((type) => (
            <Button key={type.id} variant="outline" className="flex items-center gap-2">
              {type.icon}
              {type.label}
            </Button>
          ))}
        </div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
              Featured Resources
            </h2>
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
            All Resources
          </h2>
          {regularResources.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {regularResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No resources found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Contribute to Our Resource Library
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Share your knowledge and expertise with the global agricultural mechanization community. 
              Submit your guides, reports, tools, or case studies to help others learn and grow.
            </p>
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg font-semibold">
              Submit Resource
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}