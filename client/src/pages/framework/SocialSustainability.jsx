import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  Users, 
  Heart, 
  UserCheck, 
  Home, 
  GraduationCap, 
  Handshake, 
  Calendar, 
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

export default function SocialSustainability() {
  const { data: webinars } = useQuery({
    queryKey: ["/api/webinars"],
  });

  const socialWebinars = webinars?.filter(webinar => 
    webinar.category === 'Framework' || 
    webinar.title.toLowerCase().includes('social') ||
    webinar.title.toLowerCase().includes('women') ||
    webinar.title.toLowerCase().includes('youth') ||
    webinar.title.toLowerCase().includes('gender')
  ) || [];

  const focusAreas = [
    {
      number: "01",
      title: "Gender Equality and Women's Empowerment",
      description: "Ensuring equal access to mechanization benefits for women farmers and promoting their leadership in agricultural innovation.",
      details: "Addressing barriers that prevent women from accessing machinery, providing gender-sensitive training programs, and creating women-led mechanization service enterprises.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      number: "02", 
      title: "Youth Engagement and Employment",
      description: "Creating attractive opportunities for young people in mechanized agriculture and agribusiness.",
      details: "Developing youth-focused training programs, supporting young entrepreneurs in mechanization services, and leveraging technology to make agriculture appealing to the next generation.",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Inclusive Access and Participation",
      description: "Ensuring mechanization benefits reach all farmer categories, including smallholders and marginalized communities.",
      details: "Developing inclusive business models, providing accessible financing options, and creating community-based mechanization sharing systems that benefit all farmers regardless of farm size.",
      icon: <Handshake className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Capacity Building and Skills Development",
      description: "Building human capital through comprehensive training and education programs in mechanized agriculture.",
      details: "Technical training for equipment operation and maintenance, business skills for service providers, and extension services that support sustainable mechanization adoption.",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      number: "05",
      title: "Community Development and Rural Livelihoods",
      description: "Strengthening rural communities through mechanization that enhances livelihoods and social cohesion.",
      details: "Supporting community-based organizations, creating local employment opportunities, and ensuring mechanization contributes to overall rural development and poverty reduction.",
      icon: <Home className="w-6 h-6" />
    }
  ];

  const socialBenefits = [
    {
      title: "Gender Equality",
      description: "Equal participation of women and men in mechanization benefits",
      icon: <Heart className="w-5 h-5" />,
      color: "pink"
    },
    {
      title: "Youth Employment",
      description: "Attractive career opportunities for young people in agriculture",
      icon: <Users className="w-5 h-5" />,
      color: "blue"
    },
    {
      title: "Inclusive Development",
      description: "Benefits reaching all farmer categories and communities",
      icon: <Handshake className="w-5 h-5" />,
      color: "green"
    },
    {
      title: "Skill Enhancement",
      description: "Improved technical and business capabilities in rural areas",
      icon: <Star className="w-5 h-5" />,
      color: "purple"
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
                <BreadcrumbPage>Social Sustainability</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">Element 7</Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Social Sustainability
              </h1>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Enhancing Social Sustainability and Roles of Women and Youth
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed">
            Social sustainability in agricultural mechanization ensures that technological advancement benefits 
            all members of society, particularly women and youth. This element focuses on creating inclusive 
            mechanization systems that promote gender equality, youth engagement, and community development 
            while respecting cultural values and traditional knowledge systems.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Overview</h3>
            <Card className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-0">
              <CardContent className="p-0">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  Mechanization should not exacerbate existing social inequalities but rather serve as a tool 
                  for social transformation and empowerment. Women, who constitute a significant portion of 
                  the agricultural workforce in Africa, often face barriers in accessing mechanization services.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  Similarly, rural youth increasingly view agriculture as unattractive due to its association 
                  with drudgery and low returns. Socially sustainable mechanization addresses these challenges 
                  by creating inclusive systems that benefit all stakeholders.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  This involves targeted interventions to ensure women's participation, youth engagement 
                  strategies, capacity building programs, and community-based approaches that strengthen 
                  social cohesion while advancing mechanization goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Key Focus Areas</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Strategic approaches for achieving social sustainability in mechanization
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {focusAreas.map((area, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                        {area.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-pink-600 dark:text-pink-400">
                          {area.icon}
                        </div>
                        <CardTitle className="text-xl group-hover:text-pink-600 transition-colors">
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

      {/* Social Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Social Benefits</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Positive impacts of socially sustainable mechanization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialBenefits.map((benefit, index) => {
              const colorClasses = {
                pink: "from-pink-500 to-pink-600 border-pink-100 dark:border-pink-900",
                blue: "from-blue-500 to-blue-600 border-blue-100 dark:border-blue-900",
                green: "from-green-500 to-green-600 border-green-100 dark:border-green-900",
                purple: "from-purple-500 to-purple-600 border-purple-100 dark:border-purple-900"
              };
              
              return (
                <Card key={index} className={`text-center p-6 hover:shadow-lg transition-all duration-300 border-2 ${colorClasses[benefit.color]}`}>
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[benefit.color]} rounded-lg flex items-center justify-center text-white mx-auto mb-4`}>
                      {benefit.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Webinars */}
      {socialWebinars.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Related Webinars</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Learn more about social sustainability through our webinar series
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {socialWebinars.slice(0, 3).map((webinar) => (
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
                    <CardTitle className="line-clamp-2 group-hover:text-pink-600 transition-colors">
                      {webinar.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {webinar.shortDescription || webinar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-pink-600 hover:bg-pink-700">
                      <a href={`/webinars/${webinar.slug}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {socialWebinars.length > 3 && (
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

      {/* Key Message */}
      <section className="py-16 bg-gradient-to-r from-pink-500/5 to-purple-500/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Inclusive Mechanization for All</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Social sustainability ensures that the benefits of agricultural mechanization reach everyone, 
              creating a more equitable and prosperous rural society where women and youth are empowered 
              to lead agricultural transformation.
            </p>
            <div className="flex justify-center">
              <Card className="p-8 bg-white dark:bg-gray-800 border-2 border-pink-200 dark:border-pink-800">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 justify-center">
                    <CheckCircle className="w-8 h-8 text-pink-600" />
                    <p className="text-lg font-semibold">
                      Empowering women and youth through inclusive mechanization creates sustainable change
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