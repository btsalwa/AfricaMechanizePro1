import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  Factory, 
  Package, 
  Truck, 
  Wrench, 
  Shield, 
  TrendingUp, 
  Calendar, 
  ArrowRight,
  CheckCircle,
  Cog
} from "lucide-react";

export default function Mechanization() {
  const { data: webinars } = useQuery({
    queryKey: ["/api/webinars"],
  });

  const mechanizationWebinars = webinars?.filter(webinar => 
    webinar.category === 'Framework' || 
    webinar.title.toLowerCase().includes('mechanization') ||
    webinar.title.toLowerCase().includes('value chain')
  ) || [];

  const valueChainAreas = [
    {
      number: "01",
      title: "Production Mechanization",
      description: "Land preparation, planting, crop management, and harvesting operations across diverse agrifood systems.",
      details: "Including tractors, implements, precision agriculture tools, and automated systems for efficient crop production from land preparation through harvest.",
      icon: <Factory className="w-6 h-6" />
    },
    {
      number: "02", 
      title: "Post-Harvest Handling",
      description: "Mechanized solutions for cleaning, sorting, grading, and packaging agricultural products.",
      details: "Equipment for post-harvest processing, storage preparation, quality control, and packaging that reduces losses and maintains product quality.",
      icon: <Package className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Processing and Value Addition",
      description: "Mechanized processing equipment for transforming raw agricultural products into value-added goods.",
      details: "Mills, processors, food processing equipment, and agro-industrial machinery that enable farmers and entrepreneurs to add value to agricultural products.",
      icon: <Cog className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Storage and Preservation",
      description: "Mechanized storage systems and preservation technologies to reduce post-harvest losses.",
      details: "Silos, cold storage, drying equipment, and preservation technologies that maintain product quality and extend shelf life.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      number: "05",
      title: "Transportation and Logistics",
      description: "Mechanized transportation solutions for moving products efficiently through value chains.",
      details: "Vehicles, loading equipment, and logistics systems that ensure timely and cost-effective movement of agricultural products from farm to market.",
      icon: <Truck className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      title: "Reduced Losses",
      description: "Minimize post-harvest losses through efficient handling and processing",
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: "Value Addition",
      description: "Transform raw products into higher-value processed goods",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: "Quality Improvement",
      description: "Maintain and enhance product quality throughout the value chain",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      title: "Market Access",
      description: "Improve access to higher-value markets through quality products",
      icon: <Package className="w-5 h-5" />
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
                <BreadcrumbPage>Sustainable Mechanization</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Factory className="w-8 h-8 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">Element 4</Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Sustainable Mechanization
              </h1>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Sustainable Mechanization Across Agrifood Value Chains
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed">
            This element extends mechanization beyond primary production to encompass the entire agrifood value chain. 
            By mechanizing post-harvest handling, processing, storage, and distribution, African agriculture can 
            significantly reduce losses, add value, and improve food security while creating employment opportunities 
            throughout the value chain.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Overview</h3>
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0">
              <CardContent className="p-0">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  Africa loses approximately 30-40% of its agricultural production due to inadequate post-harvest 
                  handling, processing, and storage infrastructure. This represents not only a massive economic 
                  loss but also a missed opportunity for food security and rural development.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  Sustainable mechanization across agrifood value chains addresses these challenges by introducing 
                  appropriate technologies and systems that span from farm to fork. This comprehensive approach 
                  ensures that the benefits of mechanization extend beyond production to encompass the entire food system.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  The focus is on developing integrated solutions that are environmentally sustainable, economically 
                  viable, and socially inclusive, creating value and employment opportunities at every stage of the agrifood chain.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Chain Areas */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Value Chain Mechanization Areas</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Key areas for implementing mechanization across the agrifood value chain
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {valueChainAreas.map((area, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                        {area.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-blue-600 dark:text-blue-400">
                          {area.icon}
                        </div>
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                          {area.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        {area.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {area.details}
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
            <h3 className="text-3xl font-bold mb-4">Value Chain Benefits</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Advantages of comprehensive value chain mechanization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 border-blue-100 dark:border-blue-900">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
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

      {/* Impact Statistics */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Potential Impact</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Expected outcomes from comprehensive value chain mechanization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">30-40%</div>
                <h4 className="text-lg font-semibold mb-2">Reduction in Post-Harvest Losses</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Through improved handling and processing mechanization
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">2-3x</div>
                <h4 className="text-lg font-semibold mb-2">Value Addition Potential</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Increased product value through processing and value addition
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50%</div>
                <h4 className="text-lg font-semibold mb-2">Employment Creation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  New jobs in mechanized value chain operations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Webinars */}
      {mechanizationWebinars.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Related Webinars</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Learn more about value chain mechanization through our webinar series
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mechanizationWebinars.slice(0, 3).map((webinar) => (
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
                    <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {webinar.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {webinar.shortDescription || webinar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <a href={`/webinars/${webinar.slug}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {mechanizationWebinars.length > 3 && (
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
      <section className="py-16 bg-gradient-to-r from-blue-500/5 to-indigo-500/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Transforming African Agrifood Systems</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Comprehensive value chain mechanization is the key to reducing losses, adding value, 
              and creating sustainable livelihoods throughout African agrifood systems.
            </p>
            <div className="flex justify-center">
              <Card className="p-8 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 justify-center">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                    <p className="text-lg font-semibold">
                      From farm to fork: mechanization that creates value at every step
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