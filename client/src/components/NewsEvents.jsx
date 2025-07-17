import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink } from "lucide-react";

export const NewsEvents = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["/api/events"],
    enabled: true,
  });

  // Default events if API doesn't return data
  const defaultEvents = [
    {
      id: 1,
      title: "Sustainable Farm Power for Enhanced Productivity",
      description: "FAO & CEMA Hybrid Event exploring innovative solutions for agricultural power systems",
      date: "2024-06-04",
      type: "event",
      imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 2,
      title: "FAO Global Conference On Sustainable Agricultural Mechanization",
      description: "Global leaders discuss the future of sustainable agricultural mechanization",
      date: "2023-09-29",
      type: "conference",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 3,
      title: "Uganda Regional Experience Sharing Meeting",
      description: "SAM hire service provision and regional cooperation initiatives",
      date: "2019-12-09",
      type: "meeting",
      imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
  ];

  const eventsData = events || defaultEvents;

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Latest News & Events
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Stay updated with the latest developments in agricultural mechanization across Africa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
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
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
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

  return (
    <section id="events" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Latest News & Events
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest developments in agricultural mechanization across Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
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
                
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {event.description}
                </p>
                
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
      </div>
    </section>
  );
};
