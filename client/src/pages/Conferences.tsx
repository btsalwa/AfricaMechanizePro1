import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Video,
  Users,
  Clock,
  Download,
  ExternalLink,
  Globe,
  ChevronRight
} from "lucide-react";

interface Conference {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isVirtual: boolean;
  website?: string;
  theme?: string;
}

interface Webinar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  presenter: string;
  participants: number;
  maxParticipants: number;
  status: string;
  language: string;
  topics: string[];
}

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  language: string;
  downloadUrl: string;
  section: string;
}

export default function Conferences() {
  const [activeTab, setActiveTab] = useState("conferences");

  const { data: conferences = [] } = useQuery<Conference[]>({ 
    queryKey: ["/api/conferences"] 
  });
  
  const { data: webinars = [] } = useQuery<Webinar[]>({ 
    queryKey: ["/api/webinars"] 
  });
  
  const { data: resources = [] } = useQuery<Resource[]>({ 
    queryKey: ["/api/resources"] 
  });

  const webinarResources = resources.filter(r => 
    r.category === "Webinar Reports" || r.section?.includes("Webinar")
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'live': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Conferences & Webinars
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join the global conversation on sustainable agricultural mechanization through our 
            international conferences, expert webinars, and collaborative meetings.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="conferences" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Conferences
            </TabsTrigger>
            <TabsTrigger value="webinars" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              F-SAMA Webinars
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conferences" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                International Conferences
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Major gatherings bringing together experts, policymakers, and practitioners 
                to shape the future of agricultural mechanization in Africa.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {conferences.map((conference) => (
                <Card key={conference.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                          {conference.title}
                        </CardTitle>
                        {conference.theme && (
                          <Badge variant="outline" className="mb-3">
                            {conference.theme}
                          </Badge>
                        )}
                      </div>
                      {conference.isVirtual && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          <Video className="w-3 h-3 mr-1" />
                          Virtual
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {conference.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(conference.startDate)}
                          {conference.endDate !== conference.startDate && 
                            ` - ${formatDate(conference.endDate)}`
                          }
                        </span>
                      </div>
                      
                      {conference.location && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{conference.location}</span>
                        </div>
                      )}
                    </div>

                    {conference.website && (
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        asChild
                      >
                        <a href={conference.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Learn More
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="webinars" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                F-SAMA Webinar Series
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Comprehensive webinar series on the operationalization of the Framework for 
                Sustainable Agricultural Mechanization in Africa.
              </p>
            </div>

            <div className="space-y-4">
              {webinars.map((webinar) => (
                <Card key={webinar.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {webinar.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {webinar.description}
                        </p>
                      </div>
                      <Badge className={getStatusColor(webinar.status)}>
                        {webinar.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(webinar.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{webinar.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{webinar.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Globe className="w-4 h-4" />
                        <span>{webinar.language}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Presenter:</span>
                        <span>{webinar.presenter}</span>
                      </div>
                      
                      {webinar.status === 'upcoming' && (
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Register
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>

                    {webinar.topics && webinar.topics.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-2">
                          {webinar.topics.map((topic: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Webinar Presentations & Downloads
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Access comprehensive resources, presentations, and reports from our webinar series 
                and conferences in multiple languages.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {webinarResources.map((resource) => (
                <Card key={resource.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {resource.language === 'en' ? 'English' : 'Français'}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {resource.section}
                      </span>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="group-hover:bg-primary group-hover:text-white transition-colors"
                        asChild
                      >
                        <a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}