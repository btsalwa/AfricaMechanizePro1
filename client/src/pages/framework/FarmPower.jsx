import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  Tractor, 
  Cog, 
  TrendingUp, 
  Users, 
  DollarSign, 
  MapPin, 
  Calendar, 
  ArrowRight,
  CheckCircle,
  Target
} from "lucide-react";

export default function FarmPower() {
  const { data: webinars } = useQuery({
    queryKey: ["/api/webinars"],
  });

  const farmPowerWebinars = webinars?.filter(webinar => 
    webinar.category === 'Framework' || webinar.title.toLowerCase().includes('farm power')
  ) || [];

  const options = [
    {
      number: "01",
      title: "National Farm Power Assessments",
      description: "National assessments of current and future farm power requirements for different agro-ecologies and farmer groups within the country.",
      details: "Assessments need to consider demographic trends (including urbanization and the ageing agricultural population), gender and youth issues, the need for transformation and improvement, and any technical support requirements.",
      icon: <Target className="w-6 h-6" />
    },
    {
      number: "02", 
      title: "Business Models for Mechanization Services",
      description: "Establishment and operation of different business models to provide mechanization services.",
      details: "Farmer-operated mechanisms and systems; and machinery hire services offered by SMEs or larger companies, including suppliers of agricultural machinery.",
      icon: <Cog className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Financing Mechanisms",
      description: "Financing of mechanisms for the acquisition of machinery for own use or hire services.",
      details: "Development of innovative financing solutions to make farm machinery accessible to farmers and service providers.",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Mechanization Requirements Studies",
      description: "Undertaking of studies to establish mechanization requirements of all farmer groups.",
      details: "Including consideration of the roles of SSFs and MSFs in the production of basic foodstuffs and higher value crops, factoring in logistics of produce handling and processing.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      number: "05",
      title: "Higher Utilization Rates",
      description: "Introduction of mechanisms to attain higher utilization rates for agricultural machinery.",
      details: "Including multi-farm use across different agro-ecologies and districts/regions to lower unit costs of tractor hire services.",
      icon: <Users className="w-6 h-6" />
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
                <BreadcrumbPage>Farm Power</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Tractor className="w-8 h-8 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">Element 1</Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Farm Power
              </h1>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Boosting Farm Power Through Appropriate Technologies And Innovative Business Models
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed">
            Countries in Africa are at different stages of development with regard to use of farm power 
            and sustainable mechanization of the agrifood system. The key objective of SAMA is to increase 
            the farm power available to all farmers through farmer owned machinery and/or through enterprises 
            offering efficient machinery hire services.
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
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  In some countries (or parts of a country), progress is rapid. It is conceivable that, 
                  in the near future, the most arduous and back-breaking tasks (e.g. primary land preparation) 
                  will cease to be undertaken with total reliance on human muscle power on a significant 
                  proportion of the cultivated land. However, for this to happen, supplementary farm power 
                  resources must be made available to most farmers at affordable prices and on a timely basis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Options to Consider */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Options to be Considered</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Strategic approaches for implementing farm power solutions across Africa
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {options.map((option, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-lg font-bold">
                        {option.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-primary">
                          {option.icon}
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
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

      {/* Related Webinars */}
      {farmPowerWebinars.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Related Webinars</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Learn more about farm power implementation through our webinar series
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {farmPowerWebinars.slice(0, 3).map((webinar) => (
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
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {webinar.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {webinar.shortDescription || webinar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <a href={`/webinars/${webinar.slug}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {farmPowerWebinars.length > 3 && (
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

      {/* Key Objectives */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Key Objective</h3>
            <Card className="p-8 bg-white dark:bg-gray-800 border-2 border-primary/20">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                      <strong>The key objective of SAMA is to increase the farm power available to all farmers</strong> 
                      {" "}through farmer owned machinery and/or through enterprises offering efficient machinery hire services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}