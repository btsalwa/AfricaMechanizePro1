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
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
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