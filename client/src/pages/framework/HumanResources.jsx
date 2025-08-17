import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Lightbulb, 
  Award, 
  Brain, 
  Calendar, 
  ArrowRight,
  CheckCircle,
  UserCheck
} from "lucide-react";

export default function HumanResources() {
  const { data: webinars } = useQuery({
    queryKey: ["/api/webinars"],
  });

  const hrWebinars = webinars?.filter(webinar => 
    webinar.category === 'Framework' || 
    webinar.title.toLowerCase().includes('human') ||
    webinar.title.toLowerCase().includes('capacity') ||
    webinar.title.toLowerCase().includes('training') ||
    webinar.title.toLowerCase().includes('education')
  ) || [];

  const developmentAreas = [
    {
      number: "01",
      title: "Technical Skills Development",
      description: "Comprehensive training programs for equipment operation, maintenance, and repair across all mechanization technologies.",
      details: "Hands-on training in tractor operation, implement use, maintenance procedures, troubleshooting, and repair techniques for various agricultural machinery.",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      number: "02", 
      title: "Business and Entrepreneurship Training",
      description: "Building business acumen for mechanization service providers and agricultural entrepreneurs.",
      details: "Business planning, financial management, marketing strategies, customer service, and enterprise development for mechanization service businesses.",
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Extension and Advisory Services",
      description: "Strengthening extension systems to support sustainable mechanization adoption and implementation.",
      details: "Training extension agents in mechanization technologies, best practices, and farmer advisory services to facilitate technology transfer and adoption.",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Research and Innovation Capacity",
      description: "Building local research and innovation capabilities for developing appropriate mechanization solutions.",
      details: "Training researchers, engineers, and innovators in agricultural mechanization R&D, technology adaptation, and innovation systems development.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      number: "05",
      title: "Institutional Capacity Building",
      description: "Strengthening organizations and institutions involved in mechanization development and delivery.",
      details: "Capacity building for government agencies, private sector organizations, NGOs, and educational institutions in mechanization planning and implementation.",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const capacityLevels = [
    {
      title: "Individual Level",
      description: "Skills, knowledge, and competencies of farmers, technicians, and service providers",
      icon: <UserCheck className="w-5 h-5" />,
      color: "blue"
    },
    {
      title: "Organizational Level",
      description: "Capabilities of institutions, enterprises, and service organizations",
      icon: <Users className="w-5 h-5" />,
      color: "green"
    },
    {
      title: "System Level",
      description: "Overall mechanization ecosystem including policies, markets, and networks",
      icon: <Brain className="w-5 h-5" />,
      color: "purple"
    },
    {
      title: "Innovation Level",
      description: "Research, development, and innovation capabilities in mechanization",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "orange"
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
                <BreadcrumbPage>Human Resources Development</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">Element 8</Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Human Resources Development
              </h1>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Human Resources Development and Capacity Building for SAMA
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed">
            The success of sustainable agricultural mechanization depends fundamentally on human capacity. 
            This element focuses on developing the knowledge, skills, and institutional capabilities 
            necessary to implement, operate, maintain, and advance mechanization systems across Africa. 
            It encompasses technical training, business development, research capacity, and institutional strengthening.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Overview</h3>
            <Card className="p-8 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-0">
              <CardContent className="p-0">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  Human resources development is the foundation upon which all other elements of sustainable 
                  agricultural mechanization rest. Without adequate skills, knowledge, and institutional 
                  capacity, even the best technologies and financing mechanisms will fail to achieve their potential.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  Africa faces significant human capacity challenges in agricultural mechanization, including 
                  limited technical skills, weak extension systems, inadequate training institutions, and 
                  insufficient research and innovation capacity. Addressing these gaps requires comprehensive, 
                  coordinated approaches that build capacity at individual, organizational, and system levels.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  This element emphasizes practical, hands-on training combined with theoretical knowledge, 
                  entrepreneurship development, institutional strengthening, and the creation of sustainable 
                  learning systems that can adapt and evolve with changing technologies and market conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Development Areas */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Key Development Areas</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Critical areas for building human resource capacity in mechanization
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {developmentAreas.map((area, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                        {area.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-purple-600 dark:text-purple-400">
                          {area.icon}
                        </div>
                        <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
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

      {/* Capacity Building Levels */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Capacity Building Levels</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Multi-level approach to human resource development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capacityLevels.map((level, index) => {
              const colorClasses = {
                blue: "from-blue-500 to-blue-600 border-blue-100 dark:border-blue-900",
                green: "from-green-500 to-green-600 border-green-100 dark:border-green-900",
                purple: "from-purple-500 to-purple-600 border-purple-100 dark:border-purple-900",
                orange: "from-orange-500 to-orange-600 border-orange-100 dark:border-orange-900"
              };
              
              return (
                <Card key={index} className={`text-center p-6 hover:shadow-lg transition-all duration-300 border-2 ${colorClasses[level.color]}`}>
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[level.color]} rounded-lg flex items-center justify-center text-white mx-auto mb-4`}>
                      {level.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{level.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {level.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Approaches */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Training Approaches</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Diverse methods for effective human resource development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white mb-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">Formal Education</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  University programs, technical colleges, and vocational schools offering 
                  agricultural mechanization curricula and degree programs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">Practical Training</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Hands-on training centers, demonstration plots, and field schools 
                  providing practical experience with mechanization technologies.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">Certification Programs</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Professional certification and competency-based programs that 
                  validate skills and provide career advancement pathways.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Webinars */}
      {hrWebinars.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Related Webinars</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Learn more about human resource development through our webinar series
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hrWebinars.slice(0, 3).map((webinar) => (
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
                    <CardTitle className="line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {webinar.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {webinar.shortDescription || webinar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                      <a href={`/webinars/${webinar.slug}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {hrWebinars.length > 3 && (
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
      <section className="py-16 bg-gradient-to-r from-purple-500/5 to-indigo-500/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Investing in People for Sustainable Mechanization</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Human resource development is the cornerstone of sustainable agricultural mechanization. 
              By investing in people's knowledge, skills, and capabilities, we create the foundation 
              for lasting transformation in African agriculture.
            </p>
            <div className="flex justify-center">
              <Card className="p-8 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 justify-center">
                    <CheckCircle className="w-8 h-8 text-purple-600" />
                    <p className="text-lg font-semibold">
                      Skilled people are the engine of sustainable mechanization
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