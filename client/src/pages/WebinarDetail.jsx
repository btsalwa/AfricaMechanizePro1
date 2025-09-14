import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Calendar, 
  Clock, 
  Users, 
  Play, 
  Download, 
  FileText, 
  Lock,
  Video,
  ExternalLink,
  ArrowLeft
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";

export default function WebinarDetail() {
  const [match, params] = useRoute("/webinars/:slug");
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  
  const { data: webinar, isLoading } = useQuery({
    queryKey: [`/api/webinars/${params?.slug}`],
    enabled: !!params?.slug
  });

  // Mutation for joining meeting (getting meeting URL)
  const joinMeetingMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest(`/api/webinars/${params?.slug}/meeting-url`, {
        method: 'GET'
      });
      return response;
    },
    onSuccess: (data) => {
      // Open meeting URL in new tab
      window.open(data.meetingUrl, '_blank');
      toast({
        title: "Joining Meeting",
        description: `Opening ${data.webinarTitle} meeting in new tab`,
      });
    },
    onError: (error) => {
      if (error.message.includes('must be registered')) {
        toast({
          title: "Registration Required",
          description: "You must register for this webinar to access the meeting link",
          variant: "destructive",
        });
      } else if (error.message.includes('Authentication required')) {
        toast({
          title: "Login Required",
          description: "Please log in to access the meeting link",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Access Error",
          description: error.message || "Failed to access meeting link",
          variant: "destructive",
        });
      }
    }
  });

  if (!match) {
    return <div>Webinar not found</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-24">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Webinar Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The webinar you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/webinars">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Webinars
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (date) => format(new Date(date), "EEEE, MMMM dd, yyyy");
  const formatTime = (date) => format(new Date(date), "h:mm a");

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "live": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cancelled": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`/api/webinars/${webinar.slug}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        // Refresh the data
        window.location.reload();
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleResourceDownload = async (resourceId) => {
    try {
      const response = await fetch(`/api/webinars/${webinar.slug}/resources/${resourceId}/download`);
      const data = await response.json();
      
      if (response.ok && data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        {webinar.bannerImage && (
          <div className="h-96 overflow-hidden">
            <img 
              src={webinar.bannerImage} 
              alt={webinar.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        )}
        
        <div className="container mx-auto px-6 py-12 relative">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" size="sm" className="mb-6 text-gray-600 hover:text-gray-900" asChild>
              <Link href="/webinars">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Webinars
              </Link>
            </Button>

            {/* Status and Category */}
            <div className="flex items-center space-x-2 mb-4">
              <Badge className={getStatusColor(webinar.status)}>
                {webinar.status === "upcoming" && "Upcoming"}
                {webinar.status === "live" && "Live Now"}
                {webinar.status === "completed" && "Completed"}
                {webinar.status === "cancelled" && "Cancelled"}
              </Badge>
              {webinar.category && (
                <Badge variant="outline">{webinar.category}</Badge>
              )}
              {webinar.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title and Description */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {webinar.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {webinar.description}
            </p>

            {/* Date, Time, Duration */}
            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 space-x-6 mb-8">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {formatDate(webinar.scheduledDate)}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {formatTime(webinar.scheduledDate)}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {webinar.duration} minutes
              </div>
              {webinar.maxAttendees && (
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {webinar.currentAttendees || 0} / {webinar.maxAttendees} attendees
                </div>
              )}
            </div>

            {/* Speaker Info */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={webinar.speakerImage} alt={webinar.speakerName} />
                    <AvatarFallback>
                      {webinar.speakerName?.split(' ').map(n => n[0]).join('') || 'S'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {webinar.speakerName}
                    </h3>
                    {webinar.speakerTitle && (
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {webinar.speakerTitle}
                      </p>
                    )}
                    {webinar.speakerBio && (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {webinar.speakerBio}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              {webinar.status === "upcoming" && webinar.registrationRequired && (
                <Button 
                  size="lg" 
                  onClick={handleRegister}
                  disabled={!isAuthenticated || webinar.isRegistered}
                  className="bg-primary hover:bg-primary/90"
                  data-testid="button-register"
                >
                  {!isAuthenticated ? (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Login to Register
                    </>
                  ) : webinar.isRegistered ? (
                    "Already Registered"
                  ) : (
                    "Register Now"
                  )}
                </Button>
              )}
              
              {webinar.status === "live" && (
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  <Play className="w-5 h-5 mr-2" />
                  Join Live Session
                </Button>
              )}

              {/* Join Meeting Button - only show if meeting URL is available */}
              {webinar.hasMeetingUrl && (
                <Button 
                  size="lg" 
                  onClick={() => joinMeetingMutation.mutate()}
                  disabled={!isAuthenticated || joinMeetingMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                  data-testid="button-join-meeting"
                >
                  {!isAuthenticated ? (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Login to Join Meeting
                    </>
                  ) : joinMeetingMutation.isPending ? (
                    "Joining..."
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Join Meeting
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="resources">Resources & Downloads</TabsTrigger>
              <TabsTrigger value="recordings">Recordings</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-8">
              <div className="space-y-6">
                {/* Public Resources */}
                {webinar.resources?.public?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Presentation Materials</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {webinar.resources.public.map((resource) => (
                          <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  {resource.title}
                                </p>
                                {resource.description && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleResourceDownload(resource.id)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Auth-Required Resources */}
                {isAuthenticated && webinar.resources?.authenticated?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Exclusive Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {webinar.resources.authenticated.map((resource) => (
                          <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  {resource.title}
                                </p>
                                {resource.description && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleResourceDownload(resource.id)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* No Resources Message */}
                {(!webinar.resources?.public?.length && !webinar.resources?.authenticated?.length) && (
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      Resources for this webinar will be available soon.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            {/* Recordings Tab */}
            <TabsContent value="recordings" className="mt-8">
              <div className="space-y-6">
                {isAuthenticated ? (
                  webinar.recordings?.length > 0 ? (
                    <div className="space-y-4">
                      {webinar.recordings.map((recording) => (
                        <Card key={recording.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                  <Video className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    {recording.title}
                                  </h3>
                                  {recording.description && (
                                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                                      {recording.description}
                                    </p>
                                  )}
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                                    <span>Duration: {recording.duration} min</span>
                                    <span>Views: {recording.viewCount || 0}</span>
                                  </div>
                                </div>
                              </div>
                              <Button onClick={() => window.open(recording.recordingUrl, '_blank')}>
                                <Play className="w-4 h-4 mr-2" />
                                Watch
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <Video className="h-4 w-4" />
                      <AlertDescription>
                        Recordings for this webinar are not yet available.
                      </AlertDescription>
                    </Alert>
                  )
                ) : (
                  <Alert>
                    <Lock className="h-4 w-4" />
                    <AlertDescription>
                      Please <Link href="/login" className="text-primary hover:underline">log in</Link> to access webinar recordings.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            {/* Discussion Tab */}
            <TabsContent value="discussion" className="mt-8">
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  Discussion papers and community feedback will be available here.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}