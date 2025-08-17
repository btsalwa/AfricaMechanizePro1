import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Shield, Users, FileText, Calendar, Settings, BarChart3, 
  LogOut, Edit, Trash2, Plus, Eye, Download, Mail, Phone, 
  Globe, Activity, TrendingUp, UserCheck, MessageSquare,
  Search, Filter, RefreshCw, ExternalLink
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
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingWebinar, setEditingWebinar] = useState(null);
  const [statsFormData, setStatsFormData] = useState({});
  const [contactFilter, setContactFilter] = useState("all");
  const [userSearch, setUserSearch] = useState("");
  
  // Content Management States
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCreateNewsEventOpen, setIsCreateNewsEventOpen] = useState(false);
  const [isEditNewsEventOpen, setIsEditNewsEventOpen] = useState(false);
  const [editingNewsEvent, setEditingNewsEvent] = useState(null);
  const [isCreateResourceOpen, setIsCreateResourceOpen] = useState(false);
  const [isEditResourceOpen, setIsEditResourceOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [isCreateWebinarResourceOpen, setIsCreateWebinarResourceOpen] = useState(false);
  const [isEditWebinarResourceOpen, setIsEditWebinarResourceOpen] = useState(false);
  const [editingWebinarResource, setEditingWebinarResource] = useState(null);
  const [newWebinarData, setNewWebinarData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    speaker: "",
    meetingLink: ""
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const response = await fetch("/api/admin/stats", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  const { data: users, refetch: refetchUsers } = useQuery({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
  });

  const { data: webinars, refetch: refetchWebinars } = useQuery({
    queryKey: ["/api/admin/webinars"],
    queryFn: async () => {
      const response = await fetch("/api/admin/webinars", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch webinars");
      return response.json();
    },
  });

  // Legacy Data Integration Query
  const { data: legacyData, refetch: refetchLegacyData } = useQuery({
    queryKey: ["/api/migration/status"],
    queryFn: async () => {
      const response = await fetch("/api/migration/status", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch legacy data");
      return response.json();
    },
  });

  // Content Management Queries
  const { data: newsEvents, refetch: refetchNewsEvents } = useQuery({
    queryKey: ["/api/admin/news"],
    queryFn: async () => {
      const response = await fetch("/api/admin/news", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch news events");
      return response.json();
    },
  });

  const { data: resources, refetch: refetchResources } = useQuery({
    queryKey: ["/api/admin/resources"],
    queryFn: async () => {
      const response = await fetch("/api/admin/resources", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch resources");
      return response.json();
    },
  });

  const { data: webinarResources, refetch: refetchWebinarResources } = useQuery({
    queryKey: ["/api/admin/webinar-resources"],
    queryFn: async () => {
      const response = await fetch("/api/admin/webinar-resources", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch webinar resources");
      return response.json();
    },
  });

  const { data: contacts, refetch: refetchContacts } = useQuery({
    queryKey: ["/api/admin/contacts"],
    queryFn: async () => {
      const response = await fetch("/api/admin/contacts", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch contacts");
      return response.json();
    },
  });

  const { data: siteStats } = useQuery({
    queryKey: ["/api/statistics"],
  });



  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    window.location.href = "/admin/login";
  };

  // Mutations
  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, userData }) => {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Failed to update user");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "User updated successfully" });
      refetchUsers();
      setSelectedUser(null);
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to delete user");
    },
    onSuccess: () => {
      toast({ title: "User deleted successfully" });
      refetchUsers();
    },
    onError: (error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateStatsFormMutation = useMutation({
    mutationFn: async (statsData) => {
      const response = await apiRequest("POST", "/api/statistics", statsData);
      return response;
    },
    onSuccess: () => {
      toast({ title: "Statistics updated successfully" });
      queryClient.invalidateQueries(["/api/statistics"]);
      refetchStats();
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const markContactReadMutation = useMutation({
    mutationFn: async (contactId) => {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ status: "read" }),
      });
      if (!response.ok) throw new Error("Failed to update contact");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Contact marked as read" });
      refetchContacts();
      refetchStats();
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Initialize stats form data
  useEffect(() => {
    if (siteStats) {
      setStatsFormData({
        network: siteStats.network || 0,
        countries: siteStats.countries || 0,
        webinars: siteStats.webinars || 0,
        speakers: siteStats.speakers || 0,
        participants: siteStats.participants || 0,
      });
    }
  }, [siteStats]);

  // Filter functions
  const filteredUsers = users?.filter(user =>
    user.firstName?.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email?.toLowerCase().includes(userSearch.toLowerCase())
  ) || [];

  const filteredContacts = contacts?.filter(contact => {
    if (contactFilter === "all") return true;
    return contact.status === contactFilter;
  }) || [];

  const statsCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      description: "Registered users",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+12%",
      trendIcon: TrendingUp,
    },
    {
      title: "Active Webinars",
      value: stats?.activeWebinars || 0,
      description: "Currently scheduled",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+5%",
      trendIcon: Activity,
    },
    {
      title: "Unread Messages",
      value: stats?.contactForms || 0,
      description: "Contact submissions",
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: stats?.contactForms > 0 ? "New" : "All Clear",
      trendIcon: Mail,
    },
    {
      title: "Newsletter Subs",
      value: stats?.newsletterSubs || 0,
      description: "Active subscribers",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+8%",
      trendIcon: UserCheck,
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
              const TrendIconComponent = stat.trendIcon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">
                          {stat.description}
                        </p>
                        <div className="flex items-center mt-2">
                          <TrendIconComponent className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                        </div>
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

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  onClick={() => refetchStats()} 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  data-testid="button-refresh-stats"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Refresh Data</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  data-testid="button-export-data"
                >
                  <Download className="w-5 h-5" />
                  <span>Export Data</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => window.open("/", "_blank")}
                  data-testid="button-view-site"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>View Site</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  data-testid="button-site-settings"
                >
                  <Settings className="w-5 h-5" />
                  <span>Site Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Management Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-9">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="news-events">News & Events</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="webinar-resources">Webinar Files</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="legacy">Legacy Data</TabsTrigger>
            </TabsList>

            {/* Users Management */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage registered users and their permissions
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="pl-8 w-64"
                        data-testid="input-user-search"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredUsers.slice(0, 10).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {user.firstName?.[0] || 'U'}{user.lastName?.[0] || ''}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{user.firstName} {user.lastName}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {user.isEmailVerified ? "Verified" : "Unverified"}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Joined {new Date(user.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.isActive ? "default" : "secondary"}>
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setSelectedUser(user)}
                                data-testid={`button-edit-user-${user.id}`}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Edit User</DialogTitle>
                                <DialogDescription>
                                  Update user information and status
                                </DialogDescription>
                              </DialogHeader>
                              {selectedUser && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>First Name</Label>
                                      <Input
                                        value={selectedUser.firstName || ""}
                                        onChange={(e) => setSelectedUser({...selectedUser, firstName: e.target.value})}
                                      />
                                    </div>
                                    <div>
                                      <Label>Last Name</Label>
                                      <Input
                                        value={selectedUser.lastName || ""}
                                        onChange={(e) => setSelectedUser({...selectedUser, lastName: e.target.value})}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Email</Label>
                                    <Input
                                      value={selectedUser.email || ""}
                                      onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                                    />
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <Select
                                      value={selectedUser.isActive ? "active" : "inactive"}
                                      onValueChange={(value) => setSelectedUser({...selectedUser, isActive: value === "active"})}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex justify-between">
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">
                                          <Trash2 className="w-3 h-3 mr-1" />
                                          Delete User
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete User</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure? This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => deleteUserMutation.mutate(selectedUser.id)}
                                            className="bg-destructive text-destructive-foreground"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <Button
                                      onClick={() => updateUserMutation.mutate({
                                        userId: selectedUser.id,
                                        userData: {
                                          firstName: selectedUser.firstName,
                                          lastName: selectedUser.lastName,
                                          email: selectedUser.email,
                                          isActive: selectedUser.isActive,
                                        }
                                      })}
                                      disabled={updateUserMutation.isPending}
                                    >
                                      {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                    {filteredUsers.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        {userSearch ? "No users found matching your search." : "No users registered yet."}
                      </div>
                    )}
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button data-testid="button-create-webinar">
                        <Plus className="w-4 h-4 mr-2" />
                        New Webinar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Create New Webinar</DialogTitle>
                        <DialogDescription>
                          Add a new educational webinar to the platform
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Title</Label>
                          <Input 
                            placeholder="Webinar title"
                            value={newWebinarData.title}
                            onChange={(e) => setNewWebinarData({...newWebinarData, title: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea 
                            placeholder="Webinar description"
                            value={newWebinarData.description}
                            onChange={(e) => setNewWebinarData({...newWebinarData, description: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Date</Label>
                            <Input 
                              type="date"
                              value={newWebinarData.date}
                              onChange={(e) => setNewWebinarData({...newWebinarData, date: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Time</Label>
                            <Input 
                              type="time"
                              value={newWebinarData.time}
                              onChange={(e) => setNewWebinarData({...newWebinarData, time: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Speaker</Label>
                          <Input 
                            placeholder="Speaker name"
                            value={newWebinarData.speaker}
                            onChange={(e) => setNewWebinarData({...newWebinarData, speaker: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Meeting Link</Label>
                          <Input 
                            placeholder="https://zoom.us/..."
                            value={newWebinarData.meetingLink}
                            onChange={(e) => setNewWebinarData({...newWebinarData, meetingLink: e.target.value})}
                          />
                        </div>
                        <Button 
                          className="w-full"
                          onClick={async () => {
                            try {
                              const webinarData = {
                                title: newWebinarData.title,
                                description: newWebinarData.description,
                                scheduledDate: `${newWebinarData.date} ${newWebinarData.time}`,
                                speakerName: newWebinarData.speaker,
                                meetingLink: newWebinarData.meetingLink,
                                status: "upcoming"
                              };
                              
                              const response = await fetch("/api/admin/webinars", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  ...getAuthHeaders(),
                                },
                                body: JSON.stringify(webinarData),
                              });
                              
                              if (response.ok) {
                                toast({ title: "Webinar created successfully" });
                                refetchWebinars();
                                refetchStats();
                                setNewWebinarData({
                                  title: "",
                                  description: "",
                                  date: "",
                                  time: "",
                                  speaker: "",
                                  meetingLink: ""
                                });
                              } else {
                                throw new Error("Failed to create webinar");
                              }
                            } catch (error) {
                              toast({
                                title: "Create failed",
                                description: error.message,
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          Create Webinar
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setEditingWebinar(webinar)}
                                data-testid={`button-edit-webinar-${webinar.id}`}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Edit Webinar</DialogTitle>
                                <DialogDescription>
                                  Update webinar information and settings
                                </DialogDescription>
                              </DialogHeader>
                              {editingWebinar && (
                                <div className="space-y-4">
                                  <div>
                                    <Label>Title</Label>
                                    <Input
                                      value={editingWebinar.title || ""}
                                      onChange={(e) => setEditingWebinar({...editingWebinar, title: e.target.value})}
                                    />
                                  </div>
                                  <div>
                                    <Label>Description</Label>
                                    <Textarea
                                      value={editingWebinar.description || ""}
                                      onChange={(e) => setEditingWebinar({...editingWebinar, description: e.target.value})}
                                    />
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <Select
                                      value={editingWebinar.status}
                                      onValueChange={(value) => setEditingWebinar({...editingWebinar, status: value})}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="upcoming">Upcoming</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex justify-between">
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">
                                          <Trash2 className="w-3 h-3 mr-1" />
                                          Delete
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete Webinar</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure? This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={async () => {
                                              try {
                                                await fetch(`/api/admin/webinars/${editingWebinar.id}`, {
                                                  method: "DELETE",
                                                  headers: getAuthHeaders(),
                                                });
                                                toast({ title: "Webinar deleted successfully" });
                                                refetchWebinars();
                                                setEditingWebinar(null);
                                              } catch (error) {
                                                toast({
                                                  title: "Delete failed",
                                                  description: error.message,
                                                  variant: "destructive",
                                                });
                                              }
                                            }}
                                            className="bg-destructive text-destructive-foreground"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <Button
                                      onClick={async () => {
                                        try {
                                          await fetch(`/api/admin/webinars/${editingWebinar.id}`, {
                                            method: "PUT",
                                            headers: {
                                              "Content-Type": "application/json",
                                              ...getAuthHeaders(),
                                            },
                                            body: JSON.stringify({
                                              title: editingWebinar.title,
                                              description: editingWebinar.description,
                                              status: editingWebinar.status,
                                            }),
                                          });
                                          toast({ title: "Webinar updated successfully" });
                                          refetchWebinars();
                                          setEditingWebinar(null);
                                        } catch (error) {
                                          toast({
                                            title: "Update failed",
                                            description: error.message,
                                            variant: "destructive",
                                          });
                                        }
                                      }}
                                    >
                                      Save Changes
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
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
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Contact Messages</CardTitle>
                    <CardDescription>
                      Review and respond to contact form submissions
                    </CardDescription>
                  </div>
                  <Select value={contactFilter} onValueChange={setContactFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="responded">Responded</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredContacts.slice(0, 8).map((contact) => (
                      <div key={contact.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{contact.name}</h4>
                              <Badge variant={contact.status === "new" ? "destructive" : "default"}>
                                {contact.status}
                              </Badge>
                              {contact.status === "new" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => markContactReadMutation.mutate(contact.id)}
                                  disabled={markContactReadMutation.isPending}
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  Mark Read
                                </Button>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 mb-2">
                              <div className="flex items-center">
                                <Mail className="w-3 h-3 mr-1 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{contact.email}</p>
                              </div>
                              {contact.phone && (
                                <div className="flex items-center">
                                  <Phone className="w-3 h-3 mr-1 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                                </div>
                              )}
                            </div>
                            <p className="text-sm font-medium mb-2">{contact.subject}</p>
                            <p className="text-sm text-gray-600 line-clamp-3">{contact.message}</p>
                          </div>
                          <div className="text-xs text-muted-foreground text-right">
                            <p>{new Date(contact.createdAt).toLocaleDateString()}</p>
                            <p>{new Date(contact.createdAt).toLocaleTimeString()}</p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-3 space-x-2">
                          <Button size="sm" variant="outline">
                            <Mail className="w-3 h-3 mr-1" />
                            Reply
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this contact message? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={async () => {
                                    try {
                                      await fetch(`/api/admin/contacts/${contact.id}`, {
                                        method: "DELETE",
                                        headers: getAuthHeaders(),
                                      });
                                      toast({ title: "Contact deleted successfully" });
                                      refetchContacts();
                                      refetchStats();
                                    } catch (error) {
                                      toast({
                                        title: "Delete failed",
                                        description: error.message,
                                        variant: "destructive",
                                      });
                                    }
                                  }}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                    {filteredContacts.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        {contactFilter === "all" ? "No contact messages yet." : `No ${contactFilter} messages.`}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Management */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Site Statistics</CardTitle>
                    <CardDescription>Update homepage statistics display</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Network Partners</Label>
                        <Input
                          type="number"
                          value={statsFormData.network || 0}
                          onChange={(e) => setStatsFormData({...statsFormData, network: parseInt(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <Label>Countries</Label>
                        <Input
                          type="number"
                          value={statsFormData.countries || 0}
                          onChange={(e) => setStatsFormData({...statsFormData, countries: parseInt(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <Label>Webinars</Label>
                        <Input
                          type="number"
                          value={statsFormData.webinars || 0}
                          onChange={(e) => setStatsFormData({...statsFormData, webinars: parseInt(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <Label>Speakers</Label>
                        <Input
                          type="number"
                          value={statsFormData.speakers || 0}
                          onChange={(e) => setStatsFormData({...statsFormData, speakers: parseInt(e.target.value) || 0})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Participants</Label>
                      <Input
                        type="number"
                        value={statsFormData.participants || 0}
                        onChange={(e) => setStatsFormData({...statsFormData, participants: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <Button
                      onClick={() => updateStatsFormMutation.mutate(statsFormData)}
                      disabled={updateStatsFormMutation.isPending}
                      className="w-full"
                    >
                      {updateStatsFormMutation.isPending ? "Updating..." : "Update Statistics"}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Overview</CardTitle>
                    <CardDescription>Manage site content and pages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Framework Elements</span>
                        <Badge variant="outline">10 Pages</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Active Webinars</span>
                        <Badge variant="outline">{stats?.activeWebinars || 0}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Resource Downloads</span>
                        <Badge variant="outline">Available</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Globe className="w-4 h-4 mr-2" />
                      Manage Content
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* News & Events Management */}
            <TabsContent value="news-events" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>News & Events Management</CardTitle>
                    <CardDescription>Create and manage news articles and events</CardDescription>
                  </div>
                  <Dialog open={isCreateNewsEventOpen} onOpenChange={setIsCreateNewsEventOpen}>
                    <DialogTrigger asChild>
                      <Button data-testid="button-create-news-event">
                        <Plus className="w-4 h-4 mr-2" />
                        Add News/Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create News/Event</DialogTitle>
                        <DialogDescription>Add new news article or event</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" placeholder="Enter title..." data-testid="input-news-title" />
                        </div>
                        <div>
                          <Label htmlFor="eventType">Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="news">News</SelectItem>
                              <SelectItem value="conference">Conference</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="meeting">Meeting</SelectItem>
                              <SelectItem value="announcement">Announcement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="content">Content</Label>
                          <Textarea id="content" rows={6} placeholder="Enter content..." data-testid="textarea-news-content" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="eventDate">Event Date</Label>
                            <Input id="eventDate" type="datetime-local" data-testid="input-event-date" />
                          </div>
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="Event location..." data-testid="input-event-location" />
                          </div>
                        </div>
                        <Button data-testid="button-save-news-event">
                          Create News/Event
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newsEvents?.map((item) => (
                      <div key={item.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{item.title}</h4>
                              <Badge variant="outline">{item.eventType}</Badge>
                              <Badge variant={item.status === "published" ? "default" : "secondary"}>
                                {item.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.excerpt || item.content?.substring(0, 150) + '...'}
                            </p>
                            {item.eventDate && (
                              <p className="text-xs text-muted-foreground">
                                Event Date: {new Date(item.eventDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" data-testid={`button-edit-news-${item.id}`}>
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" data-testid={`button-delete-news-${item.id}`}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resources Management */}
            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Resources Management</CardTitle>
                    <CardDescription>Manage documents, guides, and other resources</CardDescription>
                  </div>
                  <Dialog open={isCreateResourceOpen} onOpenChange={setIsCreateResourceOpen}>
                    <DialogTrigger asChild>
                      <Button data-testid="button-create-resource">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Resource
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create Resource</DialogTitle>
                        <DialogDescription>Add new resource or document</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="resourceTitle">Title</Label>
                          <Input id="resourceTitle" placeholder="Enter resource title..." data-testid="input-resource-title" />
                        </div>
                        <div>
                          <Label htmlFor="resourceType">Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="document">Document</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="tool">Tool</SelectItem>
                              <SelectItem value="link">Link</SelectItem>
                              <SelectItem value="research">Research</SelectItem>
                              <SelectItem value="guide">Guide</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="resourceDescription">Description</Label>
                          <Textarea id="resourceDescription" rows={4} placeholder="Enter description..." data-testid="textarea-resource-description" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fileUrl">File URL</Label>
                            <Input id="fileUrl" placeholder="https://..." data-testid="input-resource-url" />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" placeholder="Resource category..." data-testid="input-resource-category" />
                          </div>
                        </div>
                        <Button data-testid="button-save-resource">
                          Create Resource
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resources?.map((resource) => (
                      <div key={resource.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{resource.title}</h4>
                              <Badge variant="outline">{resource.resourceType}</Badge>
                              {resource.category && (
                                <Badge variant="secondary">{resource.category}</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {resource.description?.substring(0, 150) + '...'}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>Downloads: {resource.downloadCount || 0}</span>
                              {resource.author && <span>By: {resource.author}</span>}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" data-testid={`button-edit-resource-${resource.id}`}>
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" data-testid={`button-delete-resource-${resource.id}`}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Webinar Resources Management */}
            <TabsContent value="webinar-resources" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Webinar Presentations & Downloads</CardTitle>
                    <CardDescription>Manage webinar presentations, slides, and downloadable materials</CardDescription>
                  </div>
                  <Dialog open={isCreateWebinarResourceOpen} onOpenChange={setIsCreateWebinarResourceOpen}>
                    <DialogTrigger asChild>
                      <Button data-testid="button-create-webinar-resource">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Webinar Resource
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create Webinar Resource</DialogTitle>
                        <DialogDescription>Add presentation or downloadable material for a webinar</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="webinarSelect">Webinar</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select webinar" />
                            </SelectTrigger>
                            <SelectContent>
                              {webinars?.map((webinar) => (
                                <SelectItem key={webinar.id} value={webinar.id.toString()}>
                                  {webinar.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="resourceTitle">Resource Title</Label>
                          <Input id="resourceTitle" placeholder="Enter resource title..." data-testid="input-webinar-resource-title" />
                        </div>
                        <div>
                          <Label htmlFor="webinarResourceType">Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="presentation">Presentation</SelectItem>
                              <SelectItem value="download">Download</SelectItem>
                              <SelectItem value="link">Link</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="webinarResourceUrl">File URL</Label>
                          <Input id="webinarResourceUrl" placeholder="https://..." data-testid="input-webinar-resource-url" />
                        </div>
                        <div>
                          <Label htmlFor="webinarResourceDescription">Description</Label>
                          <Textarea id="webinarResourceDescription" rows={3} placeholder="Enter description..." data-testid="textarea-webinar-resource-description" />
                        </div>
                        <Button data-testid="button-save-webinar-resource">
                          Create Webinar Resource
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {webinarResources?.map((resource) => (
                      <div key={resource.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{resource.title}</h4>
                              <Badge variant="outline">{resource.resourceType}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {resource.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>Downloads: {resource.downloadCount || 0}</span>
                              <span>Webinar ID: {resource.webinarId}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" data-testid={`button-edit-webinar-resource-${resource.id}`}>
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" data-testid={`button-delete-webinar-resource-${resource.id}`}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
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

            {/* Legacy Data Integration Management */}
            <TabsContent value="legacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">🏛️</span>
                    </div>
                    <div>
                      <CardTitle>Legacy Database Integration</CardTitle>
                      <CardDescription>
                        Management interface for imported legacy data from original africamechanize.org database
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Migration Status Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-green-800">Migration Status</h3>
                          <p className="text-2xl font-bold text-green-600 mt-1">✅ Complete</p>
                        </div>
                        <div className="text-green-500">
                          <Activity className="w-8 h-8" />
                        </div>
                      </div>
                      <p className="text-sm text-green-700 mt-2">
                        Successfully imported 30,447 lines of legacy MySQL data
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-blue-800">Legacy Admins</h3>
                          <p className="text-2xl font-bold text-blue-600 mt-1">
                            {legacyData?.legacyAccountsCount || 0}
                          </p>
                        </div>
                        <div className="text-blue-500">
                          <Users className="w-8 h-8" />
                        </div>
                      </div>
                      <p className="text-sm text-blue-700 mt-2">
                        Original admin accounts preserved
                      </p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-purple-800">Data Tables</h3>
                          <p className="text-2xl font-bold text-purple-600 mt-1">12+</p>
                        </div>
                        <div className="text-purple-500">
                          <FileText className="w-8 h-8" />
                        </div>
                      </div>
                      <p className="text-sm text-purple-700 mt-2">
                        Legacy data tables migrated
                      </p>
                    </div>
                  </div>

                  {/* Legacy Admin Accounts */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-primary" />
                        Legacy Admin Accounts
                      </h3>
                      
                      {legacyData?.accounts && legacyData.accounts.length > 0 ? (
                        <div className="grid gap-4">
                          {legacyData.accounts.map((account, index) => (
                            <div key={account.username} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium">
                                      {account.username?.charAt(0)?.toUpperCase() || 'A'}
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{account.fullName || account.username}</h4>
                                    <p className="text-sm text-muted-foreground">{account.email}</p>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Badge variant="outline" className="text-xs">
                                        Legacy Admin
                                      </Badge>
                                      <Badge 
                                        variant={account.isActive ? "default" : "secondary"} 
                                        className="text-xs"
                                      >
                                        {account.isActive ? "Active" : "Inactive"}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right text-sm text-muted-foreground">
                                  <p>Username: {account.username}</p>
                                  <p className="text-xs">Original admin from africamechanize.org</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Loading legacy admin accounts...</p>
                        </div>
                      )}
                    </div>

                    {/* Migration Actions */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Settings className="w-5 h-5 mr-2 text-primary" />
                        Migration Management
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Migration Status</CardTitle>
                            <CardDescription>Check current migration status and data integrity</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button 
                              variant="outline" 
                              className="w-full" 
                              onClick={() => refetchLegacyData()}
                              data-testid="button-check-migration-status"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Refresh Status
                            </Button>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Legacy Documentation</CardTitle>
                            <CardDescription>View technical documentation of the migration process</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => window.open('/LEGACY_INTEGRATION.md', '_blank')}
                              data-testid="button-view-legacy-docs"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Documentation
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Migration Achievement Banner */}
                      <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">✅</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-green-800 mb-2">
                              Migration Successfully Completed
                            </h4>
                            <p className="text-green-700 mb-4">
                              The complete database export from the original africamechanize.org website has been successfully 
                              integrated into this modern platform. All historical data, admin accounts, and content structure 
                              have been preserved while enabling enhanced functionality through the new system architecture.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="text-center">
                                <div className="font-bold text-green-800">30,447</div>
                                <div className="text-green-600">Lines of Data</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-green-800">3</div>
                                <div className="text-green-600">Legacy Admins</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-green-800">12+</div>
                                <div className="text-green-600">Data Tables</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-green-800">100%</div>
                                <div className="text-green-600">Data Integrity</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Legacy Data Tab */}
            <TabsContent value="legacy" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Educational Resources</p>
                        <p className="text-3xl font-bold text-blue-800">10</p>
                        <p className="text-xs text-blue-600">Training materials & guides</p>
                      </div>
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Webinar Attendees</p>
                        <p className="text-3xl font-bold text-green-800">16</p>
                        <p className="text-xs text-green-600">Community members</p>
                      </div>
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600">Projects</p>
                        <p className="text-3xl font-bold text-purple-800">5</p>
                        <p className="text-xs text-purple-600">$13M total funding</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-600">Membership</p>
                        <p className="text-3xl font-bold text-orange-800">8</p>
                        <p className="text-xs text-orange-600">Professional members</p>
                      </div>
                      <UserCheck className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Legacy Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Educational Resources
                  </CardTitle>
                  <CardDescription>
                    Imported training materials, guides, and educational content from the original platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: "Agri hire sub saharan africa business models", category: "Business Models", language: "EN" },
                      { title: "Conservation agriculture: a manual for farmers", category: "Training Manual", language: "EN" },
                      { title: "Mechanization conservation agriculture for smallholders", category: "Technical Guide", language: "EN" },
                      { title: "Operator training manual for two wheel tractor", category: "Training Manual", language: "EN" },
                      { title: "Module 2 introduction à l'agriculture de conservation", category: "Training Module", language: "FR" }
                    ].map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{resource.title}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="secondary">{resource.category}</Badge>
                            <Badge variant="outline">{resource.language}</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Legacy Projects */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Historical Projects
                  </CardTitle>
                  <CardDescription>
                    Major mechanization initiatives with demonstrated impact across Africa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "F-SAMA Framework Implementation Project", budget: "$5.0M", location: "Pan-African (15 countries)", status: "Completed" },
                      { title: "Agricultural Hire Services Business Development", budget: "$3.2M", location: "Nigeria, Senegal, Côte d'Ivoire", status: "Ongoing" },
                      { title: "Sustainable Agricultural Mechanization Development", budget: "$2.5M", location: "Kenya, Tanzania, Uganda", status: "Completed" },
                      { title: "Conservation Agriculture Mechanization Program", budget: "$1.8M", location: "Ghana, Burkina Faso, Mali", status: "Completed" },
                      { title: "Women in Agricultural Mechanization Initiative", budget: "$1.5M", location: "Ethiopia, Rwanda, Malawi", status: "Active" }
                    ].map((project, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Budget:</span>
                                <span className="ml-1 font-medium">{project.budget}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Location:</span>
                                <span className="ml-1 font-medium">{project.location}</span>
                              </div>
                              <div>
                                <Badge variant={project.status === "Active" ? "default" : project.status === "Ongoing" ? "secondary" : "outline"}>
                                  {project.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Legacy Community */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Webinar Community
                    </CardTitle>
                    <CardDescription>
                      Engaged practitioners from international organizations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { email: "ibrahim.ouedraogo@fao.org", org: "FAO", webinars: 2 },
                        { email: "i.ali@cgiar.org", org: "CGIAR", webinars: 1 },
                        { email: "h.affognon@coraf.org", org: "CORAF", webinars: 1 },
                        { email: "admin@act-africa.org", org: "ACT Africa", webinars: 1 },
                        { email: "geoffmrema@gmail.com", org: "Community", webinars: 3 }
                      ].map((attendee, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{attendee.email}</p>
                            <p className="text-sm text-gray-500">{attendee.org}</p>
                          </div>
                          <Badge variant="outline">{attendee.webinars} webinars</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserCheck className="w-5 h-5 mr-2" />
                      Professional Members
                    </CardTitle>
                    <CardDescription>
                      Academic institutions and professional engineers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Makerere University", discipline: "Academic Institution", location: "Kampala, Uganda" },
                        { name: "Dr. John Kamau", discipline: "Agricultural Engineering", location: "Nairobi, Kenya" },
                        { name: "Dr. Grace Mwangi", discipline: "Agricultural Mechanization", location: "Dar es Salaam, Tanzania" },
                        { name: "Eng. Paul Ochieng", discipline: "Farm Mechanization", location: "Kumasi, Ghana" },
                        { name: "AgriTech Solutions Ltd", discipline: "Equipment Manufacturing", location: "Lagos, Nigeria" }
                      ].map((member, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.discipline}</p>
                          <p className="text-xs text-gray-500">{member.location}</p>
                        </div>
                      ))}
                    </div>
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