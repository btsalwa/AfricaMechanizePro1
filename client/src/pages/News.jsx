import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ExternalLink, Search, Filter, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function News() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const { data: events, isLoading } = useQuery({
    queryKey: ["/api/events"],
  });

  const newsEvents = events || [];
  
  // Sample news data based on the actual africamechanize.org content
  const sampleNews = [
    {
      id: 109,
      title: "Sustainable Farm Power for Enhanced Productivity (FAO & CEMA Hybrid Event)",
      description: "Joint event focusing on sustainable farm power solutions and enhanced agricultural productivity through mechanization.",
      date: "2024-06-04",
      category: "Conference",
      type: "event",
      url: "https://africamechanize.org/109/sustainable-farm-power-for-enhanced-productivity-fao-cema-hybrid-event/"
    },
    {
      id: 101,
      title: "FAO Global Conference On Sustainable Agricultural Mechanization",
      description: "International conference on sustainable agricultural mechanization practices and innovations across Africa.",
      date: "2023-09-29",
      category: "Conference",
      type: "event",
      url: "https://africamechanize.org/101/fao-global-conference-sustainable-agricultural-mechanization/"
    },
    {
      id: 111,
      title: "Call for abstracts now open: Africa Conference on Sustainable Agricultural Mechanization",
      description: "Opportunity to submit abstracts for the upcoming Africa Conference on Sustainable Agricultural Mechanization.",
      date: "2024-08-15",
      category: "Call for Papers",
      type: "announcement",
      url: "https://africamechanize.org/111/call-for-abstracts-now-open-africa-conference-sustainable-agricultural-mechanization/"
    },
    {
      id: 85,
      title: "Uganda Regional experience sharing Meeting on SAM hire service provision",
      description: "Regional meeting in Uganda focused on sharing experiences in sustainable agricultural mechanization hire service provision.",
      date: "2019-12-09",
      category: "Meeting",
      type: "event",
      url: "https://africamechanize.org/85/uganda-regional-experience-sharing-meeting-sam-hire-service-provision/"
    },
    {
      id: 84,
      title: "Consultative Meeting on a Mechanization Strategy New models for sustainable agricultural mechanization in sub-Saharan Africa",
      description: "Strategic consultation on developing new models for sustainable agricultural mechanization across sub-Saharan Africa.",
      date: "2016-12-02",
      category: "Strategy Meeting",
      type: "event",
      url: "https://africamechanize.org/84/consultative-meeting-mechanization-strategy-new-models-for-sustainable-agricultural-in-sub-saharan-africa/"
    }
  ];

  const combinedNews = [
    ...newsEvents.map(event => ({ ...event, source: 'api' })),
    ...sampleNews.map(news => ({ ...news, source: 'highlight' }))
  ];

  const filteredNews = combinedNews.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesYear = selectedYear === "all" || new Date(item.date).getFullYear().toString() === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  const categories = [...new Set(combinedNews.map(item => item.category).filter(Boolean))];
  const years = [...new Set(combinedNews.map(item => new Date(item.date).getFullYear()).filter(Boolean))].sort((a, b) => b - a);

  const upcomingNews = filteredNews.filter(item => new Date(item.date) > new Date());
  const pastNews = filteredNews.filter(item => new Date(item.date) <= new Date());

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
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
              News & Events
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Stay updated with the latest developments in sustainable agricultural mechanization 
              across Africa. Discover conferences, meetings, research updates, and opportunities 
              in the F-SAMA community.
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
                placeholder="Search news and events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-news"
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

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32" data-testid="select-year">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all" data-testid="tab-all-news">All</TabsTrigger>
                <TabsTrigger value="upcoming" data-testid="tab-upcoming-news">
                  Upcoming ({upcomingNews.length})
                </TabsTrigger>
                <TabsTrigger value="past" data-testid="tab-past-news">
                  Past ({pastNews.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-8">
              {filteredNews.length > 0 ? (
                <>
                  <div className="text-center mb-8">
                    <p className="text-gray-600 dark:text-gray-300">
                      Showing {filteredNews.length} item{filteredNews.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.map((item) => (
                      <Card key={`${item.source}-${item.id}`} className="group hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="text-xs">
                              {item.category || 'Event'}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </CardTitle>
                          
                          <CardDescription className="line-clamp-3">
                            {item.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="flex justify-between items-center">
                            {item.url ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => window.open(item.url, '_blank')}
                                data-testid={`button-view-${item.id}`}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled
                              >
                                Details
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
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No News Found</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {searchTerm || selectedCategory !== "all" || selectedYear !== "all" 
                      ? "Try adjusting your search or filter criteria." 
                      : "No news items are currently available."
                    }
                  </p>
                  {(searchTerm || selectedCategory !== "all" || selectedYear !== "all") && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                        setSelectedYear("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming">
              {upcomingNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingNews.map((item) => (
                    <Card key={`upcoming-${item.id}`} className="group hover:shadow-lg transition-all duration-300 border-green-200 dark:border-green-800">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="default" className="text-xs bg-green-600">
                            {item.category || 'Upcoming Event'}
                          </Badge>
                          <div className="flex items-center text-sm text-green-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
                          {item.title}
                        </CardTitle>
                        
                        <CardDescription className="line-clamp-3">
                          {item.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        {item.url && (
                          <Button 
                            size="sm"
                            onClick={() => window.open(item.url, '_blank')}
                            className="w-full bg-green-600 hover:bg-green-700"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Learn More
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Check back soon for new events and announcements.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {pastNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastNews.map((item) => (
                    <Card key={`past-${item.id}`} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {item.category || 'Past Event'}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                        
                        <CardDescription className="line-clamp-3">
                          {item.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        {item.url && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(item.url, '_blank')}
                            className="w-full"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Past Events</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Past events and news will appear here.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}