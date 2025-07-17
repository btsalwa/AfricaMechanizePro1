import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Users, Calendar, Clock, Globe, Play, ExternalLink } from "lucide-react";

export const WebinarParticipation = () => {
  const [selectedWebinar, setSelectedWebinar] = useState(null);

  const { data: webinars, isLoading } = useQuery({
    queryKey: ["/api/webinars"],
    enabled: true,
  });

  // Default webinars if API doesn't return data
  const defaultWebinars = [
    {
      id: 1,
      title: "Webinar 13: Future of Agricultural Mechanization in Africa",
      description: "Join industry leaders discussing emerging trends, technologies, and opportunities in agricultural mechanization across Africa",
      date: "2024-04-15",
      time: "14:00 UTC",
      duration: "90 minutes",
      presenter: "Dr. Sarah Johnson, FAO Agricultural Engineer",
      participants: 0,
      maxParticipants: 500,
      status: "upcoming",
      language: "English",
      registrationUrl: "#",
      topics: ["Smart Agriculture", "Precision Farming", "Digital Tools", "Sustainability"]
    },
    {
      id: 2,
      title: "Webinar 12: Revamping Manufacturing of Agricultural Machinery",
      description: "Interactive session on strategies for revitalizing agricultural machinery manufacturing in Africa",
      date: "2024-03-15",
      time: "13:00 UTC",
      duration: "120 minutes",
      presenter: "Prof. Michael Okonkwo, Agricultural Engineering",
      participants: 680,
      maxParticipants: 500,
      status: "completed",
      language: "English/French",
      registrationUrl: "#",
      topics: ["Manufacturing", "Local Production", "Quality Control", "Market Access"]
    },
    {
      id: 3,
      title: "Webinar 11: Sustainable Financing for Agricultural Machinery",
      description: "Exploring innovative financing mechanisms for smallholder farmers to access agricultural equipment",
      date: "2024-02-20",
      time: "15:00 UTC",
      duration: "90 minutes",
      presenter: "Dr. Amina Hassan, Rural Finance Expert",
      participants: 890,
      maxParticipants: 500,
      status: "completed",
      language: "English",
      registrationUrl: "#",
      topics: ["Microfinance", "Leasing Models", "Digital Payments", "Risk Management"]
    },
    {
      id: 4,
      title: "Webinar 10: Women in Agricultural Mechanization",
      description: "Empowering women entrepreneurs in agricultural mechanization with success stories and capacity building",
      date: "2024-01-18",
      time: "14:30 UTC",
      duration: "105 minutes",
      presenter: "Mrs. Grace Nakamura, Women's Cooperative Leader",
      participants: 540,
      maxParticipants: 400,
      status: "completed",
      language: "English/Swahili",
      registrationUrl: "#",
      topics: ["Gender Equality", "Entrepreneurship", "Capacity Building", "Success Stories"]
    },
    {
      id: 5,
      title: "Webinar 9: Digital Agriculture and Smart Farming",
      description: "Exploring the intersection of digital technology and agricultural mechanization for enhanced productivity",
      date: "2023-12-10",
      time: "13:30 UTC",
      duration: "110 minutes",
      presenter: "Dr. James Chen, AgTech Innovation Specialist",
      participants: 1100,
      maxParticipants: 600,
      status: "completed",
      language: "English",
      registrationUrl: "#",
      topics: ["IoT", "AI in Agriculture", "Data Analytics", "Precision Agriculture"]
    }
  ];

  const webinarsData = webinars || defaultWebinars;

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'live': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusGradient = (status) => {
    switch (status) {
      case 'upcoming': return 'from-blue-500 to-cyan-500';
      case 'completed': return 'from-green-500 to-emerald-500';
      case 'live': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Webinar Participation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join our interactive webinars and learn from industry experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="w-20 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="w-full h-6 bg-gray-200 rounded mb-3"></div>
                <div className="w-full h-16 bg-gray-200 rounded mb-4"></div>
                <div className="w-24 h-8 bg-gray-200 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-52 h-52 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-40 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full mb-4">
            <p className="text-blue-600 font-semibold text-sm">INTERACTIVE LEARNING</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Webinar Participation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Join our interactive webinars and learn from industry experts about the latest trends and innovations in 
            <span className="font-semibold text-blue-600"> agricultural mechanization</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {webinarsData.map((webinar, index) => (
            <Card 
              key={webinar.id}
              className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:rotate-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Status header */}
              <div className={`h-2 bg-gradient-to-r ${getStatusGradient(webinar.status)}`} />
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${getStatusColor(webinar.status)} text-white shadow-md capitalize`}>
                    {webinar.status}
                  </Badge>
                  <div className={`w-10 h-10 bg-gradient-to-r ${getStatusGradient(webinar.status)} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Video className="text-white" size={18} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {webinar.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                  {webinar.description}
                </p>

                <div className="space-y-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="mr-2 w-4 h-4" />
                    <span>{formatDate(webinar.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 w-4 h-4" />
                    <span>{webinar.time} ({webinar.duration})</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 w-4 h-4" />
                    <span>{webinar.participants} / {webinar.maxParticipants} participants</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="mr-2 w-4 h-4" />
                    <span>{webinar.language}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {webinar.topics.slice(0, 3).map((topic, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {webinar.presenter}
                  </p>
                  
                  <Button
                    onClick={() => setSelectedWebinar(webinar)}
                    className={`bg-gradient-to-r ${getStatusGradient(webinar.status)} hover:opacity-90 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg`}
                  >
                    {webinar.status === 'upcoming' ? (
                      <>
                        <ExternalLink className="mr-2" size={16} />
                        Register
                      </>
                    ) : webinar.status === 'live' ? (
                      <>
                        <Play className="mr-2" size={16} />
                        Join Live
                      </>
                    ) : (
                      <>
                        <Play className="mr-2" size={16} />
                        View Recording
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Participation Statistics */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Webinar Participation Impact
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {webinarsData.reduce((sum, w) => sum + w.participants, 0).toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Total Participants</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {webinarsData.length}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Webinars Conducted</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                35
              </div>
              <p className="text-gray-600 dark:text-gray-400">Countries Represented</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-2">
                95%
              </div>
              <p className="text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};