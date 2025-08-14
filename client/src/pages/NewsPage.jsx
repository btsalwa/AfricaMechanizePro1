import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Search, Filter } from "lucide-react";
import { format } from "date-fns";

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock news data - replace with actual API call
  const newsItems = [
    {
      id: 1,
      title: "New Agricultural Mechanization Initiative Launched in Kenya",
      excerpt: "A comprehensive program to modernize farming practices across East Africa has been officially launched with support from international partners.",
      content: "The new initiative aims to transform agricultural practices through modern mechanization techniques, training programs, and technology transfer.",
      category: "Initiative",
      author: "Dr. Sarah Johnson",
      publishedAt: new Date("2025-01-10"),
      imageUrl: "/api/placeholder/400/250",
      tags: ["Kenya", "Mechanization", "Technology"]
    },
    {
      id: 2,
      title: "F-SAMA Framework Implementation Shows Promising Results",
      excerpt: "Early results from pilot programs across three countries demonstrate significant improvements in agricultural productivity and sustainability.",
      content: "The Framework for Sustainable Agricultural Mechanization in Africa (F-SAMA) continues to show positive impacts on farming communities.",
      category: "Research",
      author: "Prof. Michael Chen",
      publishedAt: new Date("2025-01-08"),
      imageUrl: "/api/placeholder/400/250",
      tags: ["F-SAMA", "Research", "Sustainability"]
    },
    {
      id: 3,
      title: "International Conference on Agricultural Mechanization Announced",
      excerpt: "The 2025 African Agricultural Mechanization Conference will bring together experts from across the continent to share best practices.",
      content: "This year's conference will focus on innovative solutions for smallholder farmers and sustainable mechanization practices.",
      category: "Event",
      author: "Conference Committee",
      publishedAt: new Date("2025-01-05"),
      imageUrl: "/api/placeholder/400/250",
      tags: ["Conference", "Networking", "Innovation"]
    }
  ];

  const categories = ["all", "Initiative", "Research", "Event", "Technology"];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Latest News & Updates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed about the latest developments in African agricultural mechanization, 
            research findings, and upcoming events in our community.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {filteredNews.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-white/90 text-green-700 hover:bg-white">
                  {article.category}
                </Badge>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-2 group-hover:text-green-600 transition-colors">
                  {article.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{format(article.publishedAt, "MMM dd, yyyy")}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full group-hover:bg-green-50 group-hover:border-green-200 transition-colors">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredNews.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              Load More Articles
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}