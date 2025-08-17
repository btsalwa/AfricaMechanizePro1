import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  Recycle, 
  Leaf, 
  Globe, 
  Users, 
  Target, 
  Shield, 
  Calendar, 
  ArrowRight,
  CheckCircle,
  TreePine
} from "lucide-react";

export default function SustainableSystems() {
  const { data: webinars } = useQuery({
    queryKey: ["/api/webinars"],
  });

  const sustainabilityWebinars = webinars?.filter(webinar => 
    webinar.category === 'Framework' || 
    webinar.title.toLowerCase().includes('sustainable') ||
    webinar.title.toLowerCase().includes('environment')
  ) || [];

  const options = [
    {
      number: "01",
      title: "Environmental Impact Assessment",
      description: "Comprehensive evaluation of mechanization's environmental effects on soil, water, air quality, and biodiversity.",
      details: "Including carbon footprint analysis, soil compaction studies, water usage efficiency, and ecosystem impact assessments to ensure mechanization practices protect natural resources.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      number: "02", 
      title: "Conservation Agriculture Integration",
      description: "Alignment of mechanization with conservation agriculture principles to maintain soil health and fertility.",
      details: "Implementation of no-till, minimal tillage, and precision agriculture technologies that preserve soil structure, reduce erosion, and maintain organic matter content.",
      icon: <TreePine className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Renewable Energy Adoption",
      description: "Integration of renewable energy sources to power agricultural machinery and reduce carbon emissions.",
      details: "Solar-powered irrigation systems, biofuel production from agricultural residues, and electric machinery options to create sustainable energy cycles in agriculture.",
      icon: <Leaf className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Circular Economy Practices",
      description: "Development of closed-loop systems that minimize waste and maximize resource efficiency in mechanized agriculture.",
      details: "Recycling of agricultural machinery, repurposing of equipment components, and integration of waste-to-energy systems that create value from agricultural by-products.",
      icon: <Recycle className="w-6 h-6" />
    },
    {
      number: "05",
      title: "Climate Resilience Planning",
      description: "Adaptation strategies that prepare mechanized farming systems for climate change impacts.",
      details: "Drought-resistant machinery options, flood-resilient equipment design, and flexible mechanization systems that can adapt to changing weather patterns and extreme events.",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      title: "Environmental Protection",
      description: "Reduced environmental degradation through sustainable mechanization practices",
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Long-term Viability",
      description: "Ensuring agricultural systems remain productive for future generations",
      icon: <Target className="w-5 h-5" />
    },
    {
      title: "Resource Efficiency",
      description: "Optimal use of natural resources including water, soil, and energy",
      icon: <Recycle className="w-5 h-5" />
    },
    {
      title: "Climate Adaptation",
      description: "Building resilience against climate change impacts",
      icon: <Shield className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
      {/* Breadcrumb */}
      <section className="py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/framework">SAMA Focus Areas</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Sustainable Systems</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">Element 3</Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Sustainable Systems
              </h1>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Promoting Environmentally Sustainable Agricultural Mechanization Systems
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed">
            Sustainable agricultural mechanization integrates environmental protection with productivity enhancement. 
            This element ensures that mechanization practices preserve natural resources, reduce environmental impact, 
            and maintain ecological balance while improving agricultural efficiency and food security.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Overview</h3>
            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-0">
              <CardContent className="p-0">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  The transition to mechanized agriculture must be carefully managed to avoid the environmental 
                  degradation that has characterized industrial agriculture in other regions. African countries 
                  have the opportunity to leapfrog to sustainable mechanization practices from the beginning.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  This includes adopting precision agriculture technologies, implementing conservation practices, 
                  integrating renewable energy sources, and developing circular economy approaches that minimize 
                  waste and maximize resource efficiency throughout the agricultural value chain.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Strategies */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Implementation Strategies</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Key approaches for developing sustainable mechanization systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {options.map((option, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                        {option.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-green-600 dark:text-green-400">
                          {option.icon}
                        </div>
                        <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                          {option.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        {option.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {option.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Key Benefits</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Advantages of implementing sustainable mechanization systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 border-green-100 dark:border-green-900">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Webinars */}
      {sustainabilityWebinars.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Related Webinars</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Learn more about sustainable systems through our webinar series
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sustainabilityWebinars.slice(0, 3).map((webinar) => (
                <Card key={webinar.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {new Date(webinar.scheduledDate).toLocaleDateString()}
                      </span>
                      <Badge variant={webinar.status === 'completed' ? 'secondary' : 'default'} className="ml-auto">
                        {webinar.status}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-green-600 transition-colors">
                      {webinar.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {webinar.shortDescription || webinar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                      <a href={`/webinars/${webinar.slug}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {sustainabilityWebinars.length > 3 && (
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <a href="/webinars">
                    View All Webinars
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-500/5 to-emerald-500/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Building a Sustainable Future</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Sustainable agricultural mechanization is not just an environmental imperative – it's an economic 
              opportunity that ensures long-term productivity and resilience for African agriculture.
            </p>
            <div className="flex justify-center">
              <Card className="p-8 bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <p className="text-lg font-semibold">
                      Sustainable mechanization preserves the environment while enhancing productivity
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}