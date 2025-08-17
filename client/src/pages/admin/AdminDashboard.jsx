import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, Users, FileText, Calendar, Settings, BarChart3, 
  LogOut, Edit, Trash2, Plus, Eye, Download 
} from "lucide-react";

// Admin guard component
const AdminGuard = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    // Verify token with backend
    fetch("/api/admin/verify", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.ok) {
        setIsAuthorized(true);
      } else {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      }
    })
    .catch(() => {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    })
    .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Verifying access...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default function AdminDashboard() {
  const { toast } = useToast();

  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
    enabled: true,
  });

  const { data: users } = useQuery({
    queryKey: ["/api/admin/users"],
    enabled: true,
  });

  const { data: webinars } = useQuery({
    queryKey: ["/api/admin/webinars"],
    enabled: true,
  });

  const { data: contacts } = useQuery({
    queryKey: ["/api/admin/contacts"],
    enabled: true,
  });

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    window.location.href = "/admin/login";
  };

  const statsCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      description: "Registered users",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Webinars",
      value: stats?.activeWebinars || 0,
      description: "Currently scheduled",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Contact Forms",
      value: stats?.contactForms || 0,
      description: "Unread messages",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Newsletter Subs",
      value: stats?.newsletterSubs || 0,
      description: "Active subscribers",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                data-testid="button-admin-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">
                          {stat.description}
                        </p>
                      </div>
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Management Tabs */}
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Users Management */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage registered users and their permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users?.slice(0, 10).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {user.firstName?.[0]}{user.lastName?.[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{user.firstName} {user.lastName}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.isActive ? "default" : "secondary"}>
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Button size="sm" variant="outline" data-testid={`button-edit-user-${user.id}`}>
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Webinars Management */}
            <TabsContent value="webinars" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Webinar Management</CardTitle>
                    <CardDescription>
                      Create and manage webinars and events
                    </CardDescription>
                  </div>
                  <Button data-testid="button-create-webinar">
                    <Plus className="w-4 h-4 mr-2" />
                    New Webinar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {webinars?.slice(0, 5).map((webinar) => (
                      <div key={webinar.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{webinar.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {webinar.speakerName} • {new Date(webinar.scheduledDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={webinar.status === "completed" ? "default" : "secondary"}>
                            {webinar.status}
                          </Badge>
                          <Button size="sm" variant="outline" data-testid={`button-view-webinar-${webinar.id}`}>
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" data-testid={`button-edit-webinar-${webinar.id}`}>
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contacts Management */}
            <TabsContent value="contacts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>
                    Review and respond to contact form submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contacts?.slice(0, 8).map((contact) => (
                      <div key={contact.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{contact.name}</h4>
                              <Badge variant={contact.status === "new" ? "destructive" : "default"}>
                                {contact.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{contact.email}</p>
                            <p className="text-sm font-medium mb-1">{contact.subject}</p>
                            <p className="text-sm text-gray-600 line-clamp-2">{contact.message}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Site Statistics</CardTitle>
                    <CardDescription>Update site-wide statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" data-testid="button-update-stats">
                      <Settings className="w-4 h-4 mr-2" />
                      Update Statistics
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Export</CardTitle>
                    <CardDescription>Export data for backup or analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full" data-testid="button-export-users">
                      <Download className="w-4 h-4 mr-2" />
                      Export Users
                    </Button>
                    <Button variant="outline" className="w-full" data-testid="button-export-contacts">
                      <Download className="w-4 h-4 mr-2" />
                      Export Contacts
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminGuard>
  );
}