import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, Filter, ExternalLink } from "lucide-react";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const { data: events, isLoading } = useQuery({
    queryKey: ["/api/events"],
    enabled: true,
  });

  // Default events if API doesn't return data
  const defaultEvents = [
    {
      id: 1,
      title: "Sustainable Farm Power for Enhanced Productivity",
      description: "FAO & CEMA Hybrid Event exploring innovative solutions for agricultural power systems in Africa. This comprehensive event brings together experts from across the continent to discuss cutting-edge technologies and sustainable practices.",
      date: "2024-06-04",
      type: "event",
      location: "Virtual/Rome, Italy",
      registrationUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 2,
      title: "FAO Global Conference On Sustainable Agricultural Mechanization",
      description: "Global leaders discuss the future of sustainable agricultural mechanization. This landmark conference addresses challenges and opportunities in implementing mechanization strategies across different African contexts.",
      date: "2023-09-29",
      type: "conference",
      location: "Rome, Italy",
      registrationUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 3,
      title: "Uganda Regional Experience Sharing Meeting",
      description: "SAM hire service provision and regional cooperation initiatives. Focus on practical implementation strategies and lessons learned from successful mechanization projects across East Africa.",
      date: "2019-12-09",
      type: "meeting",
      location: "Kampala, Uganda",
      registrationUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 4,
      title: "Consultative Meeting on Mechanization Strategy",
      description: "New models for sustainable agricultural mechanization in sub-Saharan Africa. Strategic discussions on policy frameworks and implementation approaches for sustainable mechanization.",
      date: "2016-12-02",
      type: "meeting",
      location: "Nairobi, Kenya",
      registrationUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
  ];

  const eventsData = events || defaultEvents;

  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'event': return 'bg-primary';
      case 'conference': return 'bg-secondary';
      case 'meeting': return 'bg-accent';
      default: return 'bg-gray-500';
    }
  };

  const filterOptions = [
    { value: "all", label: "All Events" },
    { value: "event", label: "Events" },
    { value: "conference", label: "Conferences" },
    { value: "meeting", label: "Meetings" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Events & Conferences
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            Stay updated with the latest developments in agricultural mechanization across Africa
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 rounded-full"
                />
              </div>
              
              <div className="flex gap-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setFilterType(option.value)}
                    variant={filterType === option.value ? "default" : "outline"}
                    className={`rounded-full ${
                      filterType === option.value
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="w-20 h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="w-full h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="w-full h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <Card 
                  key={event.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="relative">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getTypeColor(event.type)} text-white`}>
                        {formatDate(event.date)}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                      <Calendar className="text-gray-400" size={16} />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-4">
                      {event.description}
                    </p>
                    
                    {event.location && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        📍 {event.location}
                      </p>
                    )}
                    
                    <Button 
                      variant="link" 
                      className="p-0 text-primary hover:text-primary/80 font-semibold"
                    >
                      Learn More <ExternalLink className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {!isLoading && filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No events found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
