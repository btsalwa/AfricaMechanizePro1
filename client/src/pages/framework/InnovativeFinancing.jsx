import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Users, 
  PiggyBank, 
  Handshake, 
  Calendar, 
  ArrowRight,
  CheckCircle,
  Target
} from "lucide-react";

export default function InnovativeFinancing() {
  const { data: webinars } = useQuery({
    queryKey: ["/api/webinars"],
  });

  const financingWebinars = webinars?.filter(webinar => 
    webinar.category === 'Framework' || webinar.title.toLowerCase().includes('financing')
  ) || [];

  const options = [
    {
      number: "01",
      title: "Credit and Loans for Equipment Purchase",
      description: "Development of appropriate credit mechanisms and loan schemes specifically designed for agricultural machinery acquisition.",
      details: "Including consideration of collateral requirements, interest rates, repayment terms aligned with agricultural cycles, and risk assessment methods suitable for smallholder farmers.",
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      number: "02", 
      title: "Leasing and Hire Purchase Schemes",
      description: "Implementation of equipment leasing and hire purchase arrangements to reduce upfront costs.",
      details: "Flexible payment structures that allow farmers to acquire machinery through manageable installments, with options for seasonal payment adjustments based on harvest cycles.",
      icon: <Handshake className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Microfinance and Group Lending",
      description: "Establishment of microfinance institutions and group lending mechanisms for machinery access.",
      details: "Community-based financing approaches, farmer cooperatives, and solidarity group lending models that leverage social capital and peer support for loan security.",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Value Chain Financing",
      description: "Integration of mechanization financing within agricultural value chain arrangements.",
      details: "Forward contracts, input supplier financing, buyer-backed credit schemes, and warehouse receipt financing that link machinery access to market opportunities.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      number: "05",
      title: "Government and Development Programs",
      description: "Strategic use of government subsidies and development partner funding for mechanization promotion.",
      details: "Targeted subsidy schemes, matching funds programs, and development project financing that leverage public resources to stimulate private sector investment in agricultural mechanization.",
      icon: <PiggyBank className="w-6 h-6" />
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
                <BreadcrumbPage>Innovative Financing</BreadcrumbPage>
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
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">Element 2</Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Innovative Financing
              </h1>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Promoting Innovative Financing Mechanisms for Agricultural Mechanization
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed">
            Access to appropriate financing is often the primary barrier preventing farmers from accessing 
            agricultural machinery and mechanization services. This element focuses on developing and implementing 
            innovative financial instruments and mechanisms that make mechanization affordable and accessible to all farmers.
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
                  Traditional financing models often fail to meet the unique needs of agricultural mechanization, 
                  particularly for smallholder farmers who face challenges with collateral requirements, seasonal 
                  income patterns, and high transaction costs.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  Innovative financing mechanisms must address these constraints through flexible products, 
                  alternative risk assessment methods, and integrated approaches that link financing to broader 
                  agricultural value chains and support systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Financing Mechanisms</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Innovative approaches to make agricultural mechanization financially accessible
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
      {financingWebinars.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Related Webinars</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Learn more about innovative financing through our webinar series
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {financingWebinars.slice(0, 3).map((webinar) => (
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
            
            {financingWebinars.length > 3 && (
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
            <h3 className="text-3xl font-bold mb-8">Key Objectives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-primary/20">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Improve Access</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Reduce financial barriers to mechanization for all farmer categories
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-primary/20">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Risk Management</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Develop appropriate risk assessment and mitigation strategies
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-primary/20">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Sustainability</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Create long-term viable financing ecosystems
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-primary/20">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Integration</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Link financing to broader agricultural value chains
                      </p>
                    </div>
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