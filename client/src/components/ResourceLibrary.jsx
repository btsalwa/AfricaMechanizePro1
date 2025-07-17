import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Video, Play } from "lucide-react";

export const ResourceLibrary = () => {
  const { resourceFilter, setResourceFilter } = useApp();
  const [downloadingId, setDownloadingId] = useState(null);

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
      case 'newsletter': return FileText;
      case 'research': return FileText;
      default: return FileText;
    }
  };

  const filters = [
    { key: 'all', label: 'All Resources' },
    { key: 'webinar', label: 'Webinars' },
    { key: 'newsletter', label: 'Newsletter' },
    { key: 'research', label: 'Research' },
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
    <section id="resources" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Featured Resources
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Access comprehensive resources, research papers, and educational materials
          </p>
        </div>

        {/* Resource Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              onClick={() => setResourceFilter(filter.key)}
              variant={resourceFilter === filter.key ? "default" : "outline"}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                resourceFilter === filter.key
                  ? "bg-gradient-to-r from-primary to-secondary text-white"
                  : "hover:bg-primary/10"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourcesData.map((resource) => {
            const IconComponent = getCategoryIcon(resource.category);
            const isDownloading = downloadingId === resource.id;
            
            return (
              <Card 
                key={resource.id}
                className="p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gray-50 dark:bg-gray-700"
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${getLanguageColor(resource.language)} text-white`}>
                      {resource.language.toUpperCase()}
                    </Badge>
                    <IconComponent className="text-primary" size={20} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <p>{resource.section}</p>
                      <p className="text-xs mt-1">
                        {resource.downloadCount} downloads
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => handleDownload(resource.id)}
                      disabled={isDownloading}
                      className="bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300"
                    >
                      {isDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Downloading...
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
      </div>
    </section>
  );
};
