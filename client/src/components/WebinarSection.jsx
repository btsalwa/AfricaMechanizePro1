import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WebinarCard } from "./WebinarCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Play, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";

export const WebinarSection = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Fetch upcoming webinars
  const { data: upcomingWebinars, isLoading: upcomingLoading } = useQuery({
    queryKey: ["/api/webinars", { status: "upcoming", limit: 3 }],
  });

  // Fetch recent completed webinars
  const { data: recentWebinars, isLoading: recentLoading } = useQuery({
    queryKey: ["/api/webinars", { status: "completed", limit: 4, recent: true }],
  });

  const isLoading = upcomingLoading || recentLoading;

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Educational Webinars
            </h2>
            <div className="flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Educational Webinars
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join our expert-led webinars featuring speakers from FAO, CGIAR, ACT Africa, and leading agricultural institutions. 
            Access current sessions plus archived content from the original platform.
          </p>
        </div>

        {/* Webinar Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Recent</span>
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Webinars */}
          <TabsContent value="upcoming" className="space-y-6">
            {upcomingWebinars && upcomingWebinars.length > 0 ? (
              <>
                {/* Featured Upcoming Webinar */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
                    Next Webinar
                  </h3>
                  <div className="max-w-2xl mx-auto">
                    <WebinarCard webinar={upcomingWebinars[0]} />
                  </div>
                </div>

                {/* Additional Upcoming Webinars */}
                {upcomingWebinars.length > 1 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
                      More Upcoming Sessions
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {upcomingWebinars.slice(1).map((webinar) => (
                        <WebinarCard key={webinar.id} webinar={webinar} variant="compact" />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  No Upcoming Webinars
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Stay tuned for our next educational sessions on agricultural mechanization.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/webinars">
                    View All Webinars
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Recent Webinars */}
          <TabsContent value="recent" className="space-y-6">
            {recentWebinars && recentWebinars.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {recentWebinars.map((webinar) => (
                  <WebinarCard key={webinar.id} webinar={webinar} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Play className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  No Recent Webinars
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Check back soon for recordings of our latest educational sessions.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/webinars">
                    View All Webinars
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-0 max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Don't Miss Out
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Subscribe to our newsletter and get notified about upcoming webinars, 
                new resources, and the latest in agricultural mechanization.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Link href="/webinars">
                  View All Webinars
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/newsletter">
                  Subscribe to Newsletter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};