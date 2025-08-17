import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users, Play, Download, FileText } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

export const WebinarCard = ({ webinar, variant = "default" }) => {
  const formatDate = (date) => {
    if (!date) return "TBD";
    try {
      return format(new Date(date), "MMM dd, yyyy");
    } catch {
      return "TBD";
    }
  };

  const formatTime = (date) => {
    if (!date) return "TBD";
    try {
      return format(new Date(date), "h:mm a");
    } catch {
      return "TBD";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "live": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cancelled": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "upcoming": return "Upcoming";
      case "live": return "Live Now";
      case "completed": return "Completed";
      case "cancelled": return "Cancelled";
      default: return "Unknown";
    }
  };

  if (variant === "compact") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            {webinar.thumbnailImage && (
              <div className="flex-shrink-0">
                <img 
                  src={webinar.thumbnailImage} 
                  alt={webinar.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={getStatusColor(webinar.status)}>
                  {getStatusText(webinar.status)}
                </Badge>
                {webinar.category && (
                  <Badge variant="outline" className="text-xs">
                    {webinar.category}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                {webinar.slug ? (
                  <Link href={`/webinars/${webinar.slug}`} className="hover:text-primary transition-colors">
                    {webinar.title}
                  </Link>
                ) : (
                  webinar.title
                )}
              </h3>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(webinar.scheduledDate)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {webinar.duration}min
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Banner Image */}
      {webinar.bannerImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={webinar.bannerImage} 
            alt={webinar.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <Badge className={getStatusColor(webinar.status)}>
              {getStatusText(webinar.status)}
            </Badge>
            {webinar.status === "live" && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white text-xs font-medium">LIVE</span>
              </div>
            )}
          </div>
          {webinar.category && (
            <Badge variant="secondary" className="absolute top-4 right-4">
              {webinar.category}
            </Badge>
          )}
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(webinar.scheduledDate)}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(webinar.scheduledDate)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4 mr-1" />
            {webinar.currentAttendees || 0}
            {webinar.maxAttendees && ` / ${webinar.maxAttendees}`}
          </div>
        </div>
        
        <CardTitle className="text-xl leading-tight text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {webinar.slug ? (
            <Link href={`/webinars/${webinar.slug}`}>
              {webinar.title}
            </Link>
          ) : (
            <span className="cursor-default">
              {webinar.title}
            </span>
          )}
        </CardTitle>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {webinar.shortDescription || webinar.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Speaker Info */}
        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Avatar className="h-10 w-10">
            <AvatarImage src={webinar.speakerImage} alt={webinar.speakerName} />
            <AvatarFallback>
              {webinar.speakerName?.split(' ').map(n => n[0]).join('') || 'S'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {webinar.speakerName || "Speaker TBA"}
            </p>
            {webinar.speakerTitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {webinar.speakerTitle}
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        {webinar.tags && webinar.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {webinar.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {webinar.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{webinar.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button asChild className="flex-1 mr-2">
            <Link href={`/webinars/${webinar.slug}`}>
              {webinar.status === "upcoming" && "View Details"}
              {webinar.status === "live" && (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Join Live
                </>
              )}
              {webinar.status === "completed" && "View Recording"}
            </Link>
          </Button>
          
          {webinar.status === "upcoming" && webinar.registrationRequired && (
            <Button variant="outline" size="sm">
              Register
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};