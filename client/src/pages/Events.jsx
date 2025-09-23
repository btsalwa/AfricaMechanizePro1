import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, ExternalLink, Video, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  // Mock events data - replace with actual API call
  const events = [
    {
      id: 1,
      title: "International Conference on Sustainable Agricultural Mechanization",
      description: "Join experts from across Africa and the globe to discuss the future of sustainable agricultural mechanization.",
      date: new Date("2025-03-15"),
      endDate: new Date("2025-03-17"),
      time: "09:00 AM",
      location: "Nairobi, Kenya",
      venue: "Kenyatta International Convention Centre",
      category: "conference",
      type: "In-Person",
      capacity: 500,
      registered: 324,
      price: "Free",
      status: "upcoming",
      organizer: "African Union Commission",
      image: "/api/placeholder/400/250",
      tags: ["Mechanization", "Sustainability", "Innovation"]
    },
    {
      id: 2,
      title: "F-SAMA Framework Implementation Workshop",
      description: "Hands-on workshop on implementing the Framework for Sustainable Agricultural Mechanization in Africa.",
      date: new Date("2025-02-28"),
      endDate: new Date("2025-02-28"),
      time: "02:00 PM",
      location: "Online",
      venue: "Virtual Event",
      category: "workshop",
      type: "Virtual",
      capacity: 200,
      registered: 156,
      price: "Free",
      status: "upcoming",
      organizer: "Africa Mechanize",
      image: "/api/placeholder/400/250",
      tags: ["F-SAMA", "Workshop", "Implementation"]
    },
    {
      id: 3,
      title: "Agricultural Technology Innovation Webinar Series",
      description: "Monthly webinar series featuring the latest innovations in agricultural technology and mechanization.",
      date: new Date("2025-02-20"),
      endDate: new Date("2025-02-20"),
      time: "11:00 AM",
      location: "Online",
      venue: "Zoom Platform",
      category: "webinar",
      type: "Virtual",
      capacity: 1000,
      registered: 743,
      price: "Free",
      status: "upcoming",
      organizer: "Tech Innovation Hub",
      image: "/api/placeholder/400/250",
      tags: ["Technology", "Innovation", "Monthly Series"]
    },
    {
      id: 4,
      title: "Youth in Agriculture Mechanization Summit",
      description: "Empowering the next generation of agricultural leaders through mechanization and technology.",
      date: new Date("2025-04-10"),
      endDate: new Date("2025-04-12"),
      time: "10:00 AM",
      location: "Accra, Ghana",
      venue: "National Theatre of Ghana",
      category: "summit",
      type: "In-Person",
      capacity: 300,
      registered: 187,
      price: "$50",
      status: "upcoming",
      organizer: "Youth Agriculture Network",
      image: "/api/placeholder/400/250",
      tags: ["Youth", "Leadership", "Future"]
    }
  ];

  const categories = [
    { id: "all", label: "All Events", count: events.length },
    { id: "conference", label: "Conferences", count: events.filter(e => e.category === "conference").length },
    { id: "workshop", label: "Workshops", count: events.filter(e => e.category === "workshop").length },
    { id: "webinar", label: "Webinars", count: events.filter(e => e.category === "webinar").length },
    { id: "summit", label: "Summits", count: events.filter(e => e.category === "summit").length }
  ];

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const upcomingEvents = filteredEvents.filter(event => event.status === "upcoming");
  const pastEvents = filteredEvents.filter(event => event.status === "past");

  const EventCard = ({ event }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-white/90 text-green-700 hover:bg-white">
            {event.category}
          </Badge>
          <Badge variant={event.type === "Virtual" ? "secondary" : "default"}>
            {event.type}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-white/90 text-gray-700">
            {event.price}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 group-hover:text-green-600 transition-colors">
          {event.title}
        </CardTitle>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>
              {format(event.date, "MMM dd, yyyy")}
              {event.endDate && event.endDate !== event.date && 
                ` - ${format(event.endDate, "MMM dd, yyyy")}`
              }
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{event.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <MapPin size={14} />
          <span>{event.location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {event.description}
        </p>
        
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            <Users size={14} />
            <span>{event.registered}/{event.capacity} registered</span>
          </div>
          <span className="text-gray-500">by {event.organizer}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button 
            asChild
            className="flex-1 group-hover:bg-green-600 transition-colors"
          >
            <Link 
              href={event.category === "webinar" ? "/webinars" : "/contact"}
              data-testid={`button-${event.category === "webinar" ? "join-webinar" : "register"}-${event.id}`}
            >
              {event.category === "webinar" ? (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Join Webinar
                </>
              ) : (
                <>
                  Register Now
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={async () => {
              try {
                if (navigator.share) {
                  await navigator.share({
                    title: event.title,
                    text: event.description,
                    url: window.location.href
                  });
                } else {
                  await navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link copied!",
                    description: "Event link has been copied to your clipboard.",
                  });
                }
              } catch (error) {
                toast({
                  title: "Error",
                  description: "Unable to share or copy link.",
                  variant: "destructive"
                });
              }
            }}
            data-testid={`button-share-${event.id}`}
            title="Share event"
            aria-label="Share event"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Progress bar for registration */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Registration Progress</span>
            <span>{Math.round((event.registered / event.capacity) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(event.registered / event.capacity) * 100}%` }}
            />
          </div>
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
            Events & Learning Opportunities
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join our community of agricultural mechanization experts through conferences, 
            workshops, webinars, and summits designed to advance sustainable farming practices across Africa.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="capitalize"
              data-testid={`filter-${category.id}`}
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past" data-testid="tab-past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  No upcoming events
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Check back soon for new events and opportunities.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  No past events
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Past events will appear here once they're completed.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Host Your Own Event
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Interested in organizing an event for the agricultural mechanization community? 
              We'd love to help you reach our global network of experts and practitioners.
            </p>
            <Button 
              asChild
              size="lg" 
              variant="secondary" 
              className="px-8 py-3 text-lg font-semibold"
            >
              <Link 
                href="/contact"
                data-testid="button-submit-event-proposal"
              >
                Submit Event Proposal
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}