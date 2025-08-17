import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  Globe, 
  Users, 
  Lightbulb, 
  Handshake, 
  Award, 
  ArrowRight,
  CheckCircle,
  MapPin,
  Calendar,
  ExternalLink
} from "lucide-react";

export default function About() {
  const objectives = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Enhance Food Security",
      description: "Improve agricultural productivity through sustainable mechanization to achieve food security and nutrition goals across Africa."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Empower Farmers",
      description: "Enable farmers of all scales to access appropriate mechanization technologies and services that reduce drudgery and increase efficiency."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Promote Sustainability",
      description: "Ensure mechanization development follows environmentally sustainable practices and contributes to climate resilience."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Foster Innovation",
      description: "Encourage research, development, and innovation in agricultural mechanization technologies appropriate for African conditions."
    }
  ];

  const keyFeatures = [
    {
      title: "Framework for Sustainable Agricultural Mechanization in Africa (F-SAMA)",
      description: "A comprehensive 10-element framework providing strategic guidance for sustainable mechanization development.",
      icon: <Award className="w-5 h-5" />
    },
    {
      title: "Knowledge Sharing Platform",
      description: "Regular webinars, conferences, and resource sharing to facilitate learning and best practice exchange.",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Multi-stakeholder Network",
      description: "Bringing together governments, private sector, development partners, and research institutions.",
      icon: <Handshake className="w-5 h-5" />
    },
    {
      title: "Policy and Strategy Support",
      description: "Assisting African countries in developing appropriate mechanization policies and strategies.",
      icon: <Lightbulb className="w-5 h-5" />
    }
  ];

  const partners = [
    {
      name: "Food and Agriculture Organization (FAO)",
      role: "Lead Technical Partner",
      description: "Providing technical expertise and global mechanization knowledge"
    },
    {
      name: "African Union Commission (AUC)",
      role: "Strategic Partner",
      description: "Ensuring alignment with continental agricultural development priorities"
    },
    {
      name: "Regional Economic Communities",
      role: "Implementation Partners",
      description: "Facilitating regional cooperation and implementation"
    },
    {
      name: "National Governments",
      role: "Policy Partners",
      description: "Developing and implementing national mechanization strategies"
    }
  ];

  const timeline = [
    {
      year: "2016",
      event: "Consultative Meeting on Mechanization Strategy",
      description: "Initial consultative meeting on new models for sustainable agricultural mechanization in sub-Saharan Africa"
    },
    {
      year: "2018",
      event: "F-SAMA Framework Launch",
      description: "Official launch of the Framework for Sustainable Agricultural Mechanization in Africa"
    },
    {
      year: "2019",
      event: "Platform Establishment",
      description: "AfricaMechanize platform officially established to support framework implementation"
    },
    {
      year: "2020-2024",
      event: "Webinar Series & Knowledge Sharing",
      description: "Regular webinar series and knowledge sharing activities across the continent"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About AfricaMechanize
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              AfricaMechanize is a continental platform dedicated to promoting sustainable agricultural 
              mechanization across Africa. We bring together stakeholders to share knowledge, develop 
              strategies, and accelerate the adoption of appropriate mechanization technologies that 
              enhance productivity while preserving environmental sustainability.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <a href="/framework">
                  Explore F-SAMA Framework
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/webinars">
                  Join Our Webinars
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-primary" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  To accelerate sustainable agricultural mechanization across Africa by providing 
                  a collaborative platform for knowledge sharing, capacity building, and strategic 
                  guidance that enables all farmers to access appropriate mechanization technologies 
                  and services.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-secondary/5 to-primary/5 border-2 border-secondary/20">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-8 h-8 text-secondary" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  An Africa where sustainable agricultural mechanization drives food security, 
                  rural prosperity, and economic transformation while preserving environmental 
                  sustainability and promoting social equity across all farming systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Objectives */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Objectives</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Core objectives driving our work in sustainable agricultural mechanization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((objective, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                    {objective.icon}
                  </div>
                  <h4 className="font-semibold mb-3">{objective.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {objective.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              What makes AfricaMechanize unique in supporting agricultural mechanization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Collaborating with key stakeholders across Africa and globally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <Badge variant="outline">{partner.role}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Key milestones in the development of AfricaMechanize
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                      {item.year}
                    </div>
                  </div>
                  <Card className="flex-1 p-6 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="p-0 mb-3">
                      <CardTitle className="text-lg">{item.event}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Movement</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Be part of Africa's agricultural transformation through sustainable mechanization. 
              Connect with us, participate in our programs, and contribute to building a more 
              food-secure and prosperous continent.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <a href="/contact">
                  Get Involved
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/news">
                  Latest Updates
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}