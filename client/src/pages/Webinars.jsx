import { useQuery } from "@tanstack/react-query";
import { WebinarCard } from "@/components/WebinarCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Globe } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function Webinars() {
  const { t } = useApp();
  
  const { data: webinars, isLoading } = useQuery({
    queryKey: ["/api/webinars"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
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

  const upcomingWebinars = webinars?.filter(w => w.status === 'upcoming') || [];
  const recentWebinars = webinars?.filter(w => w.status === 'completed') || [];
  const ongoingWebinars = webinars?.filter(w => w.status === 'live') || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              F-SAMA Webinar Series
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Join our comprehensive webinar series featuring international experts from FAO, CGIAR, 
              ACT Africa, and leading universities. Access current sessions plus archived presentations 
              from our established educational platform to advance sustainable mechanization practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                Regular Series
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                Multi-language
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Expert Speakers
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                2-3 Hours
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Webinars Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all" data-testid="tab-all-webinars">All Webinars</TabsTrigger>
                <TabsTrigger value="upcoming" data-testid="tab-upcoming-webinars">
                  Upcoming ({upcomingWebinars.length})
                </TabsTrigger>
                <TabsTrigger value="past" data-testid="tab-past-webinars">
                  Past ({recentWebinars.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-8">
              {ongoingWebinars.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center text-red-600 dark:text-red-400">
                    🔴 Live Now
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {ongoingWebinars.map((webinar) => (
                      <WebinarCard key={webinar.id} webinar={webinar} />
                    ))}
                  </div>
                </div>
              )}

              {upcomingWebinars.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Webinars</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {upcomingWebinars.map((webinar) => (
                      <WebinarCard key={webinar.id} webinar={webinar} />
                    ))}
                  </div>
                </div>
              )}

              {recentWebinars.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">Past Webinars</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentWebinars.map((webinar) => (
                      <WebinarCard key={webinar.id} webinar={webinar} />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming">
              {upcomingWebinars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingWebinars.map((webinar) => (
                    <WebinarCard key={webinar.id} webinar={webinar} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Webinars</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Check back soon for new webinar announcements.
                  </p>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Refresh Page
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {recentWebinars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentWebinars.map((webinar) => (
                    <WebinarCard key={webinar.id} webinar={webinar} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Past Webinars</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Past webinar recordings will appear here.
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