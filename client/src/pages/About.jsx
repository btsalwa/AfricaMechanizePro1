import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Globe, Award } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To promote sustainable agricultural mechanization practices that enhance productivity while preserving environmental resources.",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "Vision",
      description: "A transformed African agriculture sector powered by sustainable mechanization technologies and practices.",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a network of stakeholders committed to advancing agricultural mechanization across Africa.",
      color: "text-accent"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering high-quality resources, research, and support to drive meaningful change in agriculture.",
      color: "text-success"
    },
  ];

  const achievements = [
    { number: "250+", label: "Network Partners", description: "Organizations collaborating on mechanization initiatives" },
    { number: "54", label: "Countries", description: "African nations participating in our programs" },
    { number: "12,500+", label: "Farmers Reached", description: "Agricultural producers benefiting from our initiatives" },
    { number: "24", label: "Webinars Conducted", description: "Educational sessions on mechanization topics" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About AfricaMechanize
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            Empowering African agriculture through sustainable mechanization solutions
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
              Who We Are
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              AfricaMechanize is a collaborative platform dedicated to advancing sustainable 
              agricultural mechanization across Africa. We bring together governments, private 
              sector organizations, development partners, and farming communities to create 
              innovative solutions that transform agricultural practices.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Our work is guided by the Framework for Sustainable Agricultural Mechanization 
              in Africa (F-SAMA), which provides a comprehensive roadmap for implementing 
              mechanization strategies that are environmentally sustainable, economically 
              viable, and socially inclusive.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide our work and shape our approach to agricultural transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card 
                  key={index}
                  className="text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className={value.color} size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Measurable results from our commitment to sustainable agricultural mechanization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card 
                key={index}
                className="text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {achievement.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {achievement.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of the transformation of African agriculture. Together, we can create 
            a sustainable and prosperous future for farmers across the continent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all duration-300">
              Get Involved
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-semibold transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
