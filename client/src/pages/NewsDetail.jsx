import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Eye, User, Clock } from "lucide-react";

export default function NewsDetail() {
  const { slug } = useParams();

  const { data: newsItem, isLoading, error } = useQuery({
    queryKey: ["/api/events", slug],
    queryFn: async () => {
      // Try to get by ID from events endpoint
      const eventId = slug.replace('news-', '');
      const response = await fetch(`/api/events/${eventId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch news article");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-64 w-full mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              News Article Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The news article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/news">
              <Button data-testid="link-back-news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/news">
            <Button variant="ghost" className="mb-6" data-testid="button-back-news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>

          {/* Article Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {newsItem.category && (
                    <Badge variant="secondary" data-testid="badge-category">
                      {newsItem.category}
                    </Badge>
                  )}
                  <Badge variant="outline" data-testid="badge-event-type">
                    {newsItem.eventType || "News"}
                  </Badge>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="title-news">
                  {newsItem.title}
                </h1>
                
                {newsItem.excerpt && (
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed" data-testid="text-excerpt">
                    {newsItem.excerpt}
                  </p>
                )}
              </div>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 border-t pt-6">
                {newsItem.author && (
                  <div className="flex items-center gap-2" data-testid="meta-author">
                    <User className="w-4 h-4" />
                    <span>{newsItem.author}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2" data-testid="meta-date">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(newsItem.publishedAt || newsItem.createdAt)}</span>
                </div>

                {newsItem.eventDate && (
                  <div className="flex items-center gap-2" data-testid="meta-event-date">
                    <Clock className="w-4 h-4" />
                    <span>Event: {formatDate(newsItem.eventDate)}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2" data-testid="meta-views">
                  <Eye className="w-4 h-4" />
                  <span>{newsItem.viewCount || 0} views</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          {newsItem.featuredImage && (
            <div className="mb-8">
              <img
                src={newsItem.featuredImage}
                alt={newsItem.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
                data-testid="img-featured"
              />
            </div>
          )}

          {/* Event Details */}
          {newsItem.eventType !== "news" && (newsItem.eventLocation || newsItem.eventOrganizer) && (
            <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                  Event Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {newsItem.eventLocation && (
                    <div data-testid="event-location">
                      <span className="font-medium text-blue-800 dark:text-blue-200">Location:</span>
                      <span className="ml-2 text-blue-700 dark:text-blue-300">{newsItem.eventLocation}</span>
                    </div>
                  )}
                  {newsItem.eventOrganizer && (
                    <div data-testid="event-organizer">
                      <span className="font-medium text-blue-800 dark:text-blue-200">Organizer:</span>
                      <span className="ml-2 text-blue-700 dark:text-blue-300">{newsItem.eventOrganizer}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Article Content */}
          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: newsItem.content.replace(/\n/g, '<br />') }}
                data-testid="content-article"
              />
              
              {/* Tags */}
              {newsItem.tags && newsItem.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {newsItem.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs" data-testid={`tag-${index}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}