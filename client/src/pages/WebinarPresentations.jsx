import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, FileText, Video, Image, Calendar, Globe } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function WebinarPresentations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const { isAuthenticated } = useAuth();

  const { data: webinars, isLoading } = useQuery({
    queryKey: ["/api/webinars"],
  });

  const { data: resources, isLoading: resourcesLoading } = useQuery({
    queryKey: ["/api/resources"],
  });

  const allResources = resources || [];
  const webinarResources = webinars?.flatMap(webinar => [
    ...(webinar.resources?.public || []),
    ...(isAuthenticated ? (webinar.resources?.authenticated || []) : [])
  ]) || [];

  const combinedResources = [
    ...allResources.map(r => ({ ...r, source: 'resource' })),
    ...webinarResources.map(r => ({ ...r, source: 'webinar' }))
  ];

  const filteredResources = combinedResources.filter(resource => {
    const matchesSearch = searchTerm === "" || 
      resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "all" || resource.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const categories = [...new Set(combinedResources.map(r => r.category).filter(Boolean))];
  const languages = [...new Set(combinedResources.map(r => r.language).filter(Boolean))];

  const getResourceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video':
      case 'recording':
        return <Video className="w-5 h-5" />;
      case 'image':
      case 'photo':
        return <Image className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getResourceTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'video':
      case 'recording':
        return 'bg-red-500';
      case 'presentation':
        return 'bg-blue-500';
      case 'document':
      case 'pdf':
        return 'bg-green-500';
      case 'image':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (isLoading || resourcesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Webinar Presentations & Downloads
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Access presentations, documents, and resources from our F-SAMA webinar series. 
              Download materials to support your sustainable mechanization initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search presentations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-presentations"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48" data-testid="select-category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40" data-testid="select-language">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map(language => (
                    <SelectItem key={language} value={language}>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {language}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {filteredResources.length > 0 ? (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-600 dark:text-gray-300">
                  Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => (
                  <Card key={`${resource.source}-${resource.id || index}`} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-lg ${getResourceTypeColor(resource.type)} flex items-center justify-center text-white`}>
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex gap-2">
                          {resource.language && (
                            <Badge variant="secondary" className="text-xs">
                              <Globe className="w-3 h-3 mr-1" />
                              {resource.language}
                            </Badge>
                          )}
                          {resource.category && (
                            <Badge variant="outline" className="text-xs">
                              {resource.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                      
                      <CardDescription className="line-clamp-3">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-1" />
                          {resource.createdAt ? new Date(resource.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                        
                        {resource.downloadUrl ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(resource.downloadUrl, '_blank')}
                            data-testid={`button-download-${resource.id || index}`}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {searchTerm || selectedCategory !== "all" || selectedLanguage !== "all" 
                  ? "Try adjusting your search or filter criteria." 
                  : "No presentation resources are currently available."
                }
              </p>
              {(searchTerm || selectedCategory !== "all" || selectedLanguage !== "all") && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedLanguage("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}