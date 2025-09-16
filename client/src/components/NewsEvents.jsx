import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export const NewsEvents = () => {
  const [, setLocation] = useLocation();
  const { data: events, isLoading } = useQuery({
    queryKey: ["/api/events"],
    enabled: true,
  });

  // Fetch legacy projects for display
  const { data: legacyProjectsData } = useQuery({
    queryKey: ["/api/legacy/projects"],
    queryFn: async () => {
      const response = await fetch("/api/legacy/projects");
      if (!response.ok) throw new Error("Failed to fetch legacy projects");
      return response.json();
    },
  });

  // Default events if API doesn't return data
  const defaultEvents = [
    {
      id: 1,
      title: "Sustainable Farm Power for Enhanced Productivity",
      description: "FAO & CEMA Hybrid Event exploring innovative solutions for agricultural power systems and mechanization technologies for African farmers",
      date: "2024-06-04",
      type: "event",
      participants: 850,
      imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 2,
      title: "FAO Global Conference On Sustainable Agricultural Mechanization",
      description: "Global leaders discuss the future of sustainable agricultural mechanization with a focus on the F-SAMA framework implementation",
      date: "2023-09-29",
      type: "conference",
      participants: 1200,
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 3,
      title: "Uganda Regional Experience Sharing Meeting",
      description: "SAM hire service provision and regional cooperation initiatives focusing on smallholder farmer access to mechanization",
      date: "2019-12-09",
      type: "meeting",
      participants: 320,
      imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 4,
      title: "Webinar 12: Revamping Manufacturing of Agricultural Machinery",
      description: "Interactive webinar featuring industry experts discussing strategies for revitalizing agricultural machinery manufacturing in Africa",
      date: "2024-03-15",
      type: "webinar",
      participants: 680,
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 5,
      title: "Women in Agricultural Mechanization Summit",
      description: "Empowering women entrepreneurs in agricultural mechanization with success stories and capacity building sessions",
      date: "2024-02-20",
      type: "conference",
      participants: 540,
      imageUrl: "https://images.unsplash.com/photo-1594608661623-2d8c4f7b7ef0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 6,
      title: "Youth Engagement in Agricultural Technology",
      description: "Engaging young entrepreneurs in agricultural mechanization through innovation challenges and mentorship programs",
      date: "2024-01-18",
      type: "workshop",
      participants: 420,
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 7,
      title: "Digital Agriculture and Smart Farming Symposium",
      description: "Exploring the intersection of digital technology and agricultural mechanization for enhanced productivity and sustainability",
      date: "2023-12-10",
      type: "conference",
      participants: 920,
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: 8,
      title: "Webinar 11: Sustainable Financing for Agricultural Machinery",
      description: "Discussion on innovative financing mechanisms for smallholder farmers to access agricultural machinery and equipment",
      date: "2024-04-22",
      type: "webinar",
      participants: 750,
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    }
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
      case 'webinar': return 'bg-blue-500';
      case 'workshop': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeGradient = (type) => {
    switch (type) {
      case 'event': return 'from-primary to-success';
      case 'conference': return 'from-secondary to-warning';
      case 'meeting': return 'from-accent to-primary';
      case 'webinar': return 'from-blue-500 to-cyan-500';
      case 'workshop': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-16 w-60 h-60 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-32 w-36 h-36 bg-accent/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
            <p className="text-secondary font-semibold text-sm">UPCOMING EVENTS</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Latest News & Events
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Stay updated with the latest developments, conferences, and networking opportunities in 
            <span className="font-semibold text-primary"> agricultural mechanization</span> across Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event, index) => (
            <Card 
              key={event.id}
              className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 hover:rotate-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${getTypeColor(event.type)} text-white shadow-lg`}>
                    <Calendar className="mr-1 w-3 h-3" />
                    {formatDate(event.date)}
                  </Badge>
                </div>

                {/* Event Type Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 bg-gradient-to-r ${getTypeGradient(event.type)} text-white text-xs font-semibold rounded-full shadow-lg capitalize`}>
                    {event.type}
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Clock className="mr-1 w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Users className="mr-1 w-4 h-4" />
                    <span>{event.participants || 0} participants</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="mr-1 w-4 h-4" />
                    <span>Global</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => setLocation("/news")}
                    className="p-0 text-primary hover:text-primary/80 font-semibold group-hover:bg-primary/10 transition-all duration-300"
                  >
                    Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Want to stay informed about upcoming events?
            </p>
            <Button className="bg-gradient-to-r from-secondary to-warning hover:from-secondary/90 hover:to-warning/90 text-white rounded-full px-6">
              <Calendar className="mr-2 w-4 h-4" />
              Subscribe to Updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
