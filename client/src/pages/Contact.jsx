import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Send, 
  Clock,
  Users,
  MessageSquare,
  ExternalLink
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    country: "",
    subject: "",
    category: "",
    message: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data) => {
      return apiRequest("/api/contacts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({
        name: "",
        email: "",
        organization: "",
        country: "",
        subject: "",
        category: "",
        message: ""
      });
      queryClient.invalidateQueries(["/api/contacts"]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "info@africamechanize.org",
      description: "General inquiries and information",
      action: "mailto:info@africamechanize.org"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Visit Our Website",
      details: "africamechanize.org",
      description: "Access resources and latest updates",
      action: "https://africamechanize.org"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Join Our Network",
      details: "Connect with stakeholders",
      description: "Participate in webinars and events",
      action: "/webinars"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Follow Us",
      details: "Social Media",
      description: "Stay updated on social platforms",
      action: "#"
    }
  ];

  const inquiryTypes = [
    "General Information",
    "Partnership Opportunities",
    "Webinar Participation",
    "Framework Implementation",
    "Technical Support",
    "Policy Development",
    "Research Collaboration",
    "Media Inquiries"
  ];

  const faqItems = [
    {
      question: "How can I participate in AfricaMechanize webinars?",
      answer: "You can register for upcoming webinars through our webinars page. All webinars are free and open to anyone interested in agricultural mechanization."
    },
    {
      question: "Is the F-SAMA framework available for download?",
      answer: "Yes, the complete F-SAMA framework is available in our Resources section in both English and French versions."
    },
    {
      question: "How can our organization become a partner?",
      answer: "Please contact us through this form selecting 'Partnership Opportunities' as your inquiry type, and we'll provide information about partnership possibilities."
    },
    {
      question: "Do you provide technical assistance for mechanization projects?",
      answer: "We can provide guidance and connect you with relevant experts. Please describe your specific needs in your message."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Get in touch with the AfricaMechanize team. We're here to support your journey 
              in sustainable agricultural mechanization, answer your questions, and explore 
              partnership opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Multiple ways to connect with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    onClick={() => {
                      if (info.action.startsWith('http') || info.action.startsWith('mailto:')) {
                        window.open(info.action, '_blank');
                      } else {
                        window.location.href = info.action;
                      }
                    }}>
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{info.title}</h4>
                  <p className="text-sm font-medium mb-1">{info.details}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                      data-testid="input-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      placeholder="Your organization"
                      data-testid="input-organization"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      placeholder="Your country"
                      data-testid="input-country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Message subject"
                      required
                      data-testid="input-subject"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Inquiry Type</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Please describe your inquiry or message in detail..."
                    rows={6}
                    required
                    data-testid="textarea-message"
                  />
                </div>

                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {contactMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Find quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg text-primary">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Response Time</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We typically respond to all inquiries within 2-3 business days. For urgent matters 
              related to ongoing webinars or events, please mention this in your message subject line.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Business hours: Monday - Friday, 9:00 AM - 5:00 PM (various time zones across Africa)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}