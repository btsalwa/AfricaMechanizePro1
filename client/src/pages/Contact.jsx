import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle, 
  Users, Calendar, ExternalLink, CheckCircle 
} from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
    type: "general"
  });

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Headquarters",
      details: ["123 Agricultural Drive", "Nairobi, Kenya", "P.O. Box 12345"]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+254 20 123 4567", "+254 20 123 4568"]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@africamechanize.org", "partnerships@africamechanize.org"]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      details: ["Monday - Friday", "8:00 AM - 5:00 PM EAT"]
    }
  ];

  const contactTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "support", label: "Technical Support" },
    { value: "media", label: "Media & Press" },
    { value: "careers", label: "Career Opportunities" }
  ];

  const regionalOffices = [
    {
      region: "West Africa",
      city: "Accra, Ghana",
      email: "westafrica@africamechanize.org",
      phone: "+233 30 123 4567"
    },
    {
      region: "East Africa",
      city: "Nairobi, Kenya",
      email: "eastafrica@africamechanize.org",
      phone: "+254 20 123 4567"
    },
    {
      region: "Southern Africa",
      city: "Johannesburg, South Africa",
      email: "southernafrica@africamechanize.org",
      phone: "+27 11 123 4567"
    }
  ];

  const submitContact = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
        type: "general"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitContact.mutate(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Contact Africa Mechanize
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have questions about our programs, 
            want to explore partnerships, or need support, we're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Type */}
                  <div>
                    <Label htmlFor="type">Type of Inquiry</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange("type", e.target.value)}
                      className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      required
                    >
                      {contactTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <Label htmlFor="organization">Organization (Optional)</Label>
                    <Input
                      id="organization"
                      type="text"
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      placeholder="Your organization or company"
                      className="mt-1"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief subject of your message"
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={submitContact.isPending}
                  >
                    {submitContact.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 dark:text-gray-300 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Regional Offices */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Regional Offices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {regionalOffices.map((office, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {office.region}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {office.city}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {office.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {office.phone}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule a Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Partnership Inquiry
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Media Kit Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-left border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">How can I become a partner?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We welcome partnerships with organizations that share our mission. 
                  Please use the partnership inquiry form above or contact our partnerships team directly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-left border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer training programs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we offer various training programs on sustainable agricultural mechanization. 
                  Check our events page for upcoming workshops and webinars.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-left border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">How can I access your resources?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Most of our resources are freely available in our resource library. 
                  Some specialized materials may require registration or partnership.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-left border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Do you have job opportunities?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We regularly post job openings on our website and social media channels. 
                  You can also send your CV for future opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}