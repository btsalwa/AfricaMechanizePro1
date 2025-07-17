import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Video, Play, Search, Filter, BookOpen, FileCheck, Calendar } from "lucide-react";

export const ResourceLibrary = () => {
  const { resourceFilter, setResourceFilter } = useApp();
  const [downloadingId, setDownloadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: resources, isLoading } = useQuery({
    queryKey: ["/api/resources", resourceFilter === "all" ? undefined : resourceFilter],
    enabled: true,
  });

  // Default resources if API doesn't return data
  const defaultResources = [
    {
      id: 1,
      title: "Sustainable Agricultural Mechanization - A Framework for Africa",
      description: "The framework presents a menu of priority elements to be considered for sustainable agricultural mechanization in Africa.",
      category: "research",
      language: "en",
      section: "Webinar 1",
      downloadCount: 1250
    },
    {
      id: 2,
      title: "La Mécanisation Agricole Durable",
      description: "La mécanisation agricole durable peut sauver l'Afrique. Cadre Stratégique pour l'Afrique.",
      category: "research",
      language: "fr",
      section: "Webinar 1",
      downloadCount: 890
    },
    {
      id: 3,
      title: "AfricaMechanize Newsletter - Issue 02 (2024)",
      description: "This is the second quarterly newsletter of the AfricaMechanize Platform, featuring latest developments and insights.",
      category: "newsletter",
      language: "en",
      section: "Magazine",
      downloadCount: 2100
    },
    {
      id: 4,
      title: "Webinar 12: Revamping Manufacturing of Agricultural Machinery",
      description: "WEBINAR No. 12: Revamping Manufacturing of Agricultural Machinery in Africa",
      category: "webinar",
      language: "en",
      section: "Upcoming Webinars",
      downloadCount: 750
    },
    {
      id: 5,
      title: "Webinaire 12: Relancer la fabrication des machines agricoles",
      description: "L'objectif du webinaire 12 est d'initier une collaboration entre les pays africains.",
      category: "webinar",
      language: "fr",
      section: "Upcoming Webinars",
      downloadCount: 650
    },
    {
      id: 6,
      title: "Concept Note: AfricaMechanize Webinar No12",
      description: "The Objective of Webinar 12 is to initiate collaboration between African countries in agricultural machinery manufacturing.",
      category: "research",
      language: "en",
      section: "Upcoming Webinars",
      downloadCount: 430
    },
  ];

  const resourcesData = resources || defaultResources;
  
  // Filter resources based on search term and category
  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = resourceFilter === 'all' || resource.category === resourceFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (resourceId) => {
    setDownloadingId(resourceId);
    try {
      // Increment download count
      await fetch(`/api/resources/${resourceId}/download`, {
        method: 'POST',
      });
      
      // Simulate download
      setTimeout(() => {
        setDownloadingId(null);
      }, 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadingId(null);
    }
  };

  const getLanguageColor = (language) => {
    switch (language) {
      case 'en': return 'bg-primary';
      case 'fr': return 'bg-secondary';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'webinar': return Video;
      case 'newsletter': return BookOpen;
      case 'research': return FileCheck;
      default: return FileText;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'webinar': return 'from-accent to-primary';
      case 'newsletter': return 'from-secondary to-warning';
      case 'research': return 'from-primary to-success';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const filters = [
    { key: 'all', label: 'All Resources', icon: FileText },
    { key: 'webinar', label: 'Webinars', icon: Video },
    { key: 'newsletter', label: 'Newsletter', icon: BookOpen },
    { key: 'research', label: 'Research', icon: FileCheck },
  ];

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Featured Resources
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Access comprehensive resources, research papers, and educational materials
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="w-20 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="w-full h-6 bg-gray-200 rounded mb-3"></div>
                <div className="w-full h-16 bg-gray-200 rounded mb-4"></div>
                <div className="w-24 h-8 bg-gray-200 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resources" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-52 h-52 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-40 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <p className="text-primary font-semibold text-sm">KNOWLEDGE BASE</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Resource Library
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Access comprehensive resources, research papers, webinars, and educational materials to advance 
            <span className="font-semibold text-primary"> sustainable agricultural mechanization</span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search resources, papers, and webinars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary focus:outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Resource Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => {
            const FilterIcon = filter.icon;
            return (
              <Button
                key={filter.key}
                onClick={() => setResourceFilter(filter.key)}
                variant={resourceFilter === filter.key ? "default" : "outline"}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                  resourceFilter === filter.key
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                    : "hover:bg-primary/10 hover:border-primary"
                }`}
              >
                <FilterIcon className="mr-2 w-4 h-4" />
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-primary">{filteredResources.length}</span> resources
            {searchTerm && (
              <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => {
            const IconComponent = getCategoryIcon(resource.category);
            const isDownloading = downloadingId === resource.id;
            
            return (
              <Card 
                key={resource.id}
                className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:rotate-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category header */}
                <div className={`h-2 bg-gradient-to-r ${getCategoryColor(resource.category)}`} />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${getLanguageColor(resource.language)} text-white shadow-md`}>
                      {resource.language.toUpperCase()}
                    </Badge>
                    <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(resource.category)} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-white" size={18} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center mb-1">
                        <Calendar className="mr-1 w-3 h-3" />
                        <p className="text-xs">{resource.section}</p>
                      </div>
                      <p className="text-xs flex items-center">
                        <Download className="mr-1 w-3 h-3" />
                        {(resource.downloadCount || 0).toLocaleString()} downloads
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => handleDownload(resource.id)}
                      disabled={isDownloading}
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      {isDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Loading...
                        </>
                      ) : resource.category === 'webinar' ? (
                        <>
                          <Play className="mr-2" size={16} />
                          Register
                        </>
                      ) : (
                        <>
                          <Download className="mr-2" size={16} />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filter selection
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
