import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Clock, User, Eye, Star, ArrowRight } from "lucide-react";

export const ReadingMaterials = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch legacy resources to feature
  const { data: legacyResourcesData } = useQuery({
    queryKey: ["/api/legacy/resources"],
    queryFn: async () => {
      const response = await fetch("/api/legacy/resources");
      if (!response.ok) throw new Error("Failed to fetch legacy resources");
      return response.json();
    },
  });

  const readingMaterials = [
    {
      id: 1,
      title: "The F-SAMA Framework: A Comprehensive Guide",
      description: "Complete overview of the Framework for Sustainable Agricultural Mechanization in Africa, covering all 10 essential elements for transforming agricultural practices.",
      category: "framework",
      author: "FAO Agricultural Development Team",
      readTime: "45 min",
      difficulty: "Intermediate",
      downloadCount: 3200,
      rating: 4.8,
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      tags: ["F-SAMA", "Framework", "Implementation", "Guidelines"]
    },
    {
      id: 2,
      title: "Smallholder Mechanization Success Stories",
      description: "Real-world case studies from across Africa showcasing how smallholder farmers have successfully adopted agricultural mechanization technologies.",
      category: "case-study",
      author: "Dr. Sarah Mwangi, Kenya Agricultural Research Institute",
      readTime: "35 min",
      difficulty: "Beginner",
      downloadCount: 2800,
      rating: 4.9,
      coverImage: "https://images.unsplash.com/photo-1594608661623-2d8c4f7b7ef0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      tags: ["Case Studies", "Smallholder", "Success", "Implementation"]
    },
    {
      id: 3,
      title: "Agricultural Machinery Maintenance Manual",
      description: "Essential maintenance practices for agricultural equipment in African conditions, including preventive care and troubleshooting guides.",
      category: "technical",
      author: "Prof. James Okafor, Agricultural Engineering",
      readTime: "60 min",
      difficulty: "Advanced",
      downloadCount: 1950,
      rating: 4.7,
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      tags: ["Maintenance", "Technical", "Equipment", "Troubleshooting"]
    },
    {
      id: 4,
      title: "Women's Participation in Agricultural Mechanization",
      description: "Analysis of barriers and opportunities for women's increased participation in agricultural mechanization across African countries.",
      category: "policy",
      author: "Dr. Amina Hassan, Gender and Development Specialist",
      readTime: "40 min",
      difficulty: "Intermediate",
      downloadCount: 2100,
      rating: 4.8,
      coverImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      tags: ["Gender", "Policy", "Participation", "Empowerment"]
    },
    {
      id: 5,
      title: "Financing Agricultural Mechanization: A Practical Guide",
      description: "Comprehensive guide to accessing finance for agricultural mechanization, including microfinance, leasing, and government support programs.",
      category: "finance",
      author: "Financial Inclusion Team, AfDB",
      readTime: "50 min",
      difficulty: "Intermediate",
      downloadCount: 2650,
      rating: 4.6,
      coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      tags: ["Finance", "Microfinance", "Leasing", "Support"]
    },
    {
      id: 6,
      title: "Climate-Smart Agricultural Mechanization",
      description: "Strategies for implementing climate-resilient agricultural mechanization practices that enhance productivity while protecting the environment.",
      category: "sustainability",
      author: "Climate Change Adaptation Team, UNEP",
      readTime: "55 min",
      difficulty: "Advanced",
      downloadCount: 1800,
      rating: 4.7,
      coverImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      tags: ["Climate", "Sustainability", "Environment", "Adaptation"]
    },
    {
      id: 7,
      title: "Youth in Agricultural Mechanization: Opportunities and Challenges",
      description: "Exploring pathways for youth engagement in agricultural mechanization, including entrepreneurship opportunities and skills development.",
      category: "youth",
      author: "Youth Development Collective, IFAD",
      readTime: "30 min",
      difficulty: "Beginner",
      downloadCount: 1600,
      rating: 4.5,
      coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      tags: ["Youth", "Entrepreneurship", "Skills", "Opportunities"]
    },
    {
      id: 8,
      title: "Digital Agriculture: The Future of Farming",
      description: "Comprehensive overview of digital technologies transforming agriculture, including precision farming, IoT, and data analytics applications.",
      category: "technology",
      author: "Digital Agriculture Consortium",
      readTime: "45 min",
      difficulty: "Intermediate",
      downloadCount: 2400,
      rating: 4.8,
      coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      tags: ["Digital", "Technology", "IoT", "Analytics"]
    }
  ];

  const categories = [
    { key: "all", label: "All Materials", count: readingMaterials.length },
    { key: "framework", label: "F-SAMA Framework", count: readingMaterials.filter(m => m.category === "framework").length },
    { key: "case-study", label: "Case Studies", count: readingMaterials.filter(m => m.category === "case-study").length },
    { key: "technical", label: "Technical Guides", count: readingMaterials.filter(m => m.category === "technical").length },
    { key: "policy", label: "Policy & Gender", count: readingMaterials.filter(m => m.category === "policy").length },
    { key: "finance", label: "Finance & Support", count: readingMaterials.filter(m => m.category === "finance").length },
    { key: "sustainability", label: "Sustainability", count: readingMaterials.filter(m => m.category === "sustainability").length },
    { key: "youth", label: "Youth Engagement", count: readingMaterials.filter(m => m.category === "youth").length },
    { key: "technology", label: "Technology", count: readingMaterials.filter(m => m.category === "technology").length }
  ];

  const filteredMaterials = selectedCategory === "all" 
    ? readingMaterials 
    : readingMaterials.filter(material => material.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'framework': return 'from-primary to-success';
      case 'case-study': return 'from-blue-500 to-cyan-500';
      case 'technical': return 'from-purple-500 to-pink-500';
      case 'policy': return 'from-orange-500 to-red-500';
      case 'finance': return 'from-green-500 to-emerald-500';
      case 'sustainability': return 'from-teal-500 to-blue-500';
      case 'youth': return 'from-indigo-500 to-purple-500';
      case 'technology': return 'from-cyan-500 to-blue-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-52 h-52 bg-orange-400/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-40 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-amber-500/10 rounded-full mb-4">
            <p className="text-amber-600 font-semibold text-sm">LEARNING RESOURCES</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Reading Materials
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Comprehensive collection of research papers, guides, and educational materials to deepen your understanding of 
            <span className="font-semibold text-amber-600"> sustainable agricultural mechanization</span>
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              variant={selectedCategory === category.key ? "default" : "outline"}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.key
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                  : "hover:bg-amber-50 hover:border-amber-300"
              }`}
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMaterials.map((material, index) => (
            <Card 
              key={material.id}
              className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:rotate-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={material.coverImage} 
                  alt={material.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Difficulty Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={`${getDifficultyColor(material.difficulty)} text-white text-xs shadow-lg`}>
                    {material.difficulty}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="flex items-center text-yellow-400 text-xs">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {material.rating}
                  </div>
                </div>

                {/* Category gradient */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor(material.category)}`} />
              </div>
              
              <CardContent className="p-4 relative z-10">
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white line-clamp-2 group-hover:text-amber-600 transition-colors duration-300">
                  {material.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-3 text-sm leading-relaxed">
                  {material.description}
                </p>

                <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <User className="mr-1 w-3 h-3" />
                    <span className="truncate">{material.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 w-3 h-3" />
                    <span>{material.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Download className="mr-1 w-3 h-3" />
                    <span>{material.downloadCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Eye className="mr-1 w-3 h-3" />
                    <span>Popular</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {material.tags.slice(0, 3).map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs px-2 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button
                  className={`w-full bg-gradient-to-r ${getCategoryColor(material.category)} hover:opacity-90 text-white font-medium transition-all duration-300 hover:scale-105 shadow-md`}
                >
                  <BookOpen className="mr-2 w-4 h-4" />
                  Read Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reading Statistics */}
        <div className="mt-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Reading Impact
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {readingMaterials.reduce((sum, m) => sum + m.downloadCount, 0).toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Total Downloads</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {readingMaterials.length}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Reading Materials</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {categories.length - 1}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Subject Areas</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                4.7
              </div>
              <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};