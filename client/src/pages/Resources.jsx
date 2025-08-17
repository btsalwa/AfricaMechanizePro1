import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  FileText, 
  BookOpen, 
  Video, 
  ExternalLink, 
  Search, 
  Calendar,
  Globe,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const { data: webinars } = useQuery({
    queryKey: ["/api/webinars"],
  });

  // Sample resources based on actual africamechanize.org content
  const resources = [
    {
      id: 1,
      title: "Sustainable Agricultural Mechanization - A Framework for Africa",
      description: "The framework presents a menu of priority elements to be considered by African countries to develop sustainable agricultural mechanization programs.",
      type: "Framework Document",
      language: "English",
      category: "Webinar 1",
      downloadUrl: "https://africamechanize.org/resource/sustainable-agricultural-mechanization-a-framework-for-africa",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 2,
      title: "La Mécanisation Agricole Durable. Cadre Stratégique pour l'Afrique",
      description: "La mécanisation agricole durable peut sauver l'Afrique de la faim et de la pauvreté rurale.",
      type: "Framework Document",
      language: "French",
      category: "Webinar 1",
      downloadUrl: "https://africamechanize.org/resource/la-mecanisation-agricole-durable-cadre-strategique-pour-lafrique",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 3,
      title: "AfricaMechanize Newsletter - Issue 02 (2024)",
      description: "This is the second quarterly newsletter of the AfricaMechanize Platform, with updates on activities, events, and developments in agricultural mechanization.",
      type: "Newsletter",
      language: "English",
      category: "Magazine",
      downloadUrl: "https://africamechanize.org/resource/africamechanize-newsletter-issue-02",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Concept Note: AfricaMechanize Webinar No12",
      description: "The Objective of Webinar 12 is to initiate collaboration between African countries for revamping manufacturing of agricultural machinery in Africa.",
      type: "Concept Note",
      language: "English",
      category: "Upcoming Webinars",
      downloadUrl: "https://africamechanize.org/resource/concept-note-africamechanize-webinar-no12",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 5,
      title: "Note conceptuelle: AfricaMechanize Webinaire 12",
      description: "L'objectif du webinaire 12 est d'initier une collaboration entre les pays africains pour relancer la fabrication des machines agricoles en Afrique.",
      type: "Concept Note",
      language: "French",
      category: "Upcoming Webinars",
      downloadUrl: "https://africamechanize.org/resource/note-conceptuelle-africamechanize-webinaire-12",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 6,
      title: "Webinar 12: Revamping Manufacturing of Agricultural Machinery in Africa",
      description: "WEBINAR No. 12: Revamping Manufacturing of Agricultural Machinery in Africa",
      type: "Webinar Announcement",
      language: "English",
      category: "Upcoming Webinars",
      downloadUrl: "https://africamechanize.org/resource/webinar-12-announcement",
      icon: <Video className="w-5 h-5" />
    }
  ];

  // Additional resource categories
  const resourceCategories = [
    {
      name: "Framework Documents",
      count: resources.filter(r => r.type === "Framework Document").length,
      description: "Core documents outlining the F-SAMA framework and strategic guidelines"
    },
    {
      name: "Webinar Materials",
      count: resources.filter(r => r.type.includes("Webinar")).length,
      description: "Presentations, recordings, and materials from AfricaMechanize webinars"
    },
    {
      name: "Publications",
      count: resources.filter(r => r.type === "Newsletter").length,
      description: "Newsletters, reports, and research publications"
    },
    {
      name: "Policy Documents",
      count: resources.filter(r => r.type === "Concept Note").length,
      description: "Policy briefs, concept notes, and strategic documents"
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = selectedLanguage === "all" || resource.language === selectedLanguage;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesLanguage && matchesType;
  });

  const languages = [...new Set(resources.map(r => r.language))];
  const types = [...new Set(resources.map(r => r.type))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Resources
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Access comprehensive resources on sustainable agricultural mechanization including 
              framework documents, webinar presentations, research publications, and policy materials. 
              All resources are available in multiple languages to support the Pan-African community.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Resource Categories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Explore our comprehensive collection of mechanization resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {resourceCategories.map((category, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">{category.count}</div>
                  <h4 className="font-semibold mb-2">{category.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-resources"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48" data-testid="select-language">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map(language => (
                    <SelectItem key={language} value={language}>{language}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48" data-testid="select-type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
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
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="all" data-testid="tab-all-resources">
                  All Resources ({filteredResources.length})
                </TabsTrigger>
                <TabsTrigger value="featured" data-testid="tab-featured-resources">
                  Featured Downloads
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-8">
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredResources.map((resource) => (
                    <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{resource.language}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="text-primary flex-shrink-0 mt-1">
                            {resource.icon}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                              {resource.title}
                            </CardTitle>
                          </div>
                        </div>
                        
                        <CardDescription className="line-clamp-3 mt-3">
                          {resource.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Section: {resource.category}
                          </span>
                          <Button 
                            size="sm"
                            onClick={() => window.open(resource.downloadUrl, '_blank')}
                            data-testid={`button-download-${resource.id}`}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Access
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {searchTerm || selectedLanguage !== "all" || selectedType !== "all" 
                      ? "Try adjusting your search or filter criteria." 
                      : "No resources are currently available."
                    }
                  </p>
                  {(searchTerm || selectedLanguage !== "all" || selectedType !== "all") && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedLanguage("all");
                        setSelectedType("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="w-8 h-8 text-primary" />
                      <CardTitle className="text-2xl">F-SAMA Framework</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      The complete Framework for Sustainable Agricultural Mechanization in Africa. 
                      Available in English and French.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      <Button 
                        onClick={() => window.open("https://africamechanize.org/resource/sustainable-agricultural-mechanization-a-framework-for-africa", '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        English
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => window.open("https://africamechanize.org/resource/la-mecanisation-agricole-durable-cadre-strategique-pour-lafrique", '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Français
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-8 bg-gradient-to-br from-secondary/5 to-primary/5 border-2 border-secondary/20">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-8 h-8 text-secondary" />
                      <CardTitle className="text-2xl">Latest Newsletter</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      Stay updated with the latest developments in agricultural mechanization 
                      across Africa through our quarterly newsletter.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Button 
                      onClick={() => window.open("https://africamechanize.org/resource/africamechanize-newsletter-issue-02", '_blank')}
                      className="w-full bg-secondary hover:bg-secondary/90"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Issue 02 (2024)
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Webinars */}
      {webinars && webinars.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Related Webinars</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Access webinar recordings and presentations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {webinars.slice(0, 3).map((webinar) => (
                <Card key={webinar.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {new Date(webinar.scheduledDate).toLocaleDateString()}
                      </span>
                      <Badge variant={webinar.status === 'completed' ? 'secondary' : 'default'} className="ml-auto">
                        {webinar.status}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {webinar.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {webinar.shortDescription || webinar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <a href={`/webinars/${webinar.slug}`}>
                        View Resources
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <a href="/webinars">
                  View All Webinars
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}