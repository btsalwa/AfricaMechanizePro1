import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, Users, Globe, Sprout, Award, TrendingUp, 
  Heart, CheckCircle, ArrowRight, Linkedin, Twitter, Mail
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation",
      description: "Promoting cutting-edge agricultural technologies and sustainable mechanization solutions."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Building partnerships across governments, private sector, and farming communities."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Inclusivity",
      description: "Ensuring equal access to mechanization opportunities for all farmers, including women and youth."
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "Sustainability",
      description: "Advancing environmentally responsible practices that preserve soil health and biodiversity."
    }
  ];

  const achievements = [
    {
      number: "2M+",
      label: "Farmers Reached",
      description: "Smallholder farmers benefiting from our mechanization programs"
    },
    {
      number: "15",
      label: "Countries",
      description: "African nations implementing F-SAMA framework initiatives"
    },
    {
      number: "500+",
      label: "Partners",
      description: "Organizations collaborating on sustainable mechanization"
    },
    {
      number: "40%",
      label: "Productivity Increase",
      description: "Average improvement in agricultural productivity"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Amina Hassan",
      role: "Executive Director",
      bio: "Leading agricultural development expert with 20+ years experience in African agriculture.",
      image: "/api/placeholder/150/150",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "amina@africamechanize.org"
      }
    },
    {
      name: "Prof. John Ochieng",
      role: "Technical Director",
      bio: "Specialist in agricultural mechanization and sustainable farming systems.",
      image: "/api/placeholder/150/150",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "john@africamechanize.org"
      }
    },
    {
      name: "Sarah Nakamura",
      role: "Program Manager",
      bio: "Expert in program implementation and stakeholder engagement across Africa.",
      image: "/api/placeholder/150/150",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@africamechanize.org"
      }
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Organization Founded",
      description: "Africa Mechanize established to advance sustainable agricultural mechanization across the continent."
    },
    {
      year: "2019",
      title: "F-SAMA Framework Launch",
      description: "Launched the Framework for Sustainable Agricultural Mechanization in Africa with AU support."
    },
    {
      year: "2021",
      title: "1 Million Farmers Milestone",
      description: "Reached one million smallholder farmers through our programs and initiatives."
    },
    {
      year: "2023",
      title: "Global Recognition",
      description: "Received international award for outstanding contribution to agricultural development."
    },
    {
      year: "2025",
      title: "Expansion Initiative",
      description: "Launching new programs to reach 5 million farmers by 2030."
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-6 text-center mb-20">
        <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          About Africa Mechanize
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Transforming African Agriculture
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          We are a leading organization dedicated to advancing sustainable agricultural mechanization 
          across Africa, empowering farmers with innovative technologies and practices that enhance 
          productivity while preserving our environment for future generations.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="text-center border-0 shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
              <Target className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl mb-4 text-gray-800 dark:text-gray-200">Our Mission</CardTitle>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To accelerate the adoption of sustainable agricultural mechanization technologies 
              and practices that improve food security, enhance farmer livelihoods, and promote 
              environmental stewardship across Africa.
            </p>
          </Card>
          
          <Card className="text-center border-0 shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
              <Globe className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl mb-4 text-gray-800 dark:text-gray-200">Our Vision</CardTitle>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              A prosperous Africa where sustainable agricultural mechanization drives economic growth, 
              food security, and environmental sustainability, empowering farmers to thrive in 
              harmonious balance with nature.
            </p>
          </Card>
        </div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                  {value.icon}
                </div>
                <CardTitle className="text-lg text-gray-800 dark:text-gray-200">
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="container mx-auto px-6 mb-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-0">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {achievement.label}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
          Our Journey
        </h2>
        <div className="max-w-4xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-start mb-8 last:mb-0">
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-6">
                {milestone.year}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
          Leadership Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800" />
                </div>
                <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
                  {member.name}
                </CardTitle>
                <p className="text-green-600 font-semibold">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex justify-center gap-3">
                  <Button size="sm" variant="outline">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Together, we can transform African agriculture and create a sustainable future 
            for millions of farmers across the continent. Join us in this vital mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg font-semibold">
              Become a Partner
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Heart className="w-5 h-5 mr-2" />
              Support Our Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}