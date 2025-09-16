import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Download, FileText, Video, ExternalLink, Calendar, User, Globe, Eye } from "lucide-react";
import { LazyImage } from "@/components/LazyImage";

export default function ResourceDetail() {
  const { id } = useParams();

  const { data: resource, isLoading, error } = useQuery({
    queryKey: ["/api/resources", id],
    queryFn: async () => {
      // Handle legacy resources differently
      if (id && id.startsWith('legacy-')) {
        const legacyId = id.replace('legacy-', '');
        const response = await fetch(`/api/legacy/resources`);
        if (!response.ok) {
          throw new Error("Failed to fetch legacy resources");
        }
        const data = await response.json();
        const legacyResource = data.data?.find(r => r.id.toString() === legacyId);
        if (!legacyResource) {
          throw new Error("Legacy resource not found");
        }
        return legacyResource;
      } else {
        // Handle regular resources
        const response = await fetch(`/api/resources/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch resource");
        }
        return response.json();
      }
    },
    enabled: !!id,
  });

  const handleDownload = async () => {
    if (!resource?.fileUrl) return;
    
    try {
      // Track download
      await fetch(`/api/resources/${resource.id}/download`, {
        method: 'POST',
      });
      
      // Open download
      window.open(resource.fileUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const getResourceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video': return Video;
      case 'document':
      case 'pdf': return FileText;
      case 'link': return ExternalLink;
      default: return FileText;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  if (error || !resource) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Resource Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The resource you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/resources">
              <Button data-testid="link-back-resources">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = getResourceIcon(resource.resourceType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/resources">
            <Button variant="ghost" className="mb-6" data-testid="button-back-resources">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Button>
          </Link>

          {/* Resource Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.category && (
                      <Badge variant="secondary" data-testid="badge-category">
                        {resource.category}
                      </Badge>
                    )}
                    {resource.resourceType && (
                      <Badge variant="outline" data-testid="badge-resource-type">
                        {resource.resourceType}
                      </Badge>
                    )}
                    {resource.language && (
                      <Badge 
                        className={`${resource.language === 'en' ? 'bg-primary' : 'bg-secondary'} text-white`}
                        data-testid="badge-language"
                      >
                        {resource.language.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="title-resource">
                    {resource.title}
                  </h1>
                  
                  {resource.description && (
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6" data-testid="text-description">
                      {resource.description}
                    </p>
                  )}

                  {/* Download/View Button */}
                  {resource.fileUrl && (
                    <Button 
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                      data-testid="button-download"
                    >
                      {resource.resourceType === 'link' ? (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Resource
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download Resource
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          {resource.featuredImage && (
            <div className="mb-8">
              <LazyImage
                src={resource.featuredImage}
                alt={resource.title}
                className="w-full h-64 md:h-96 rounded-lg shadow-lg"
                data-testid="img-featured"
              />
            </div>
          )}

          {/* Resource Details */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Resource Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {resource.author && (
                    <div className="flex items-center gap-2" data-testid="detail-author">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Author:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{resource.author}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2" data-testid="detail-published">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Published:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(resource.publishedDate || resource.createdAt)}
                    </span>
                  </div>

                  {resource.language && (
                    <div className="flex items-center gap-2" data-testid="detail-language">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Language:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {resource.language === 'en' ? 'English' : resource.language === 'fr' ? 'French' : resource.language}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2" data-testid="detail-downloads">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Downloads:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {(resource.downloadCount || 0).toLocaleString()}
                    </span>
                  </div>

                  {resource.fileSize && (
                    <div className="flex items-center gap-2" data-testid="detail-file-size">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">File Size:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatFileSize(resource.fileSize)}
                      </span>
                    </div>
                  )}

                  {resource.fileName && (
                    <div className="flex items-center gap-2" data-testid="detail-file-name">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">File Name:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {resource.fileName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs" data-testid={`tag-${index}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}