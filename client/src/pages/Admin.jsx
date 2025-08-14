import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Calendar, 
  Video, 
  BookOpen, 
  Users,
  Settings,
  Eye,
  Save,
  X
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("resources");
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all content types
  const { data: resources = [] } = useQuery({ queryKey: ["/api/resources"] });
  const { data: events = [] } = useQuery({ queryKey: ["/api/events"] });
  const { data: webinars = [] } = useQuery({ queryKey: ["/api/webinars"] });
  const { data: materials = [] } = useQuery({ queryKey: ["/api/materials"] });

  // CRUD Operations
  const createMutation = useMutation({
    mutationFn: async ({ type, data }) => {
      return await apiRequest(`/api/${type}`, "POST", data);
    },
    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries([`/api/${type}`]);
      toast({ title: "Success", description: "Item created successfully" });
      setShowForm(false);
      setEditingItem(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create item", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ type, id, data }) => {
      return await apiRequest(`/api/${type}/${id}`, "PATCH", data);
    },
    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries([`/api/${type}`]);
      toast({ title: "Success", description: "Item updated successfully" });
      setEditingItem(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update item", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }) => {
      return await apiRequest(`/api/${type}/${id}`, "DELETE");
    },
    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries([`/api/${type}`]);
      toast({ title: "Success", description: "Item deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete item", variant: "destructive" });
    }
  });

  const ResourcesTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Resources Management</h3>
        <Button onClick={() => { setShowForm(true); setActiveTab("resources"); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>
      
      <div className="grid gap-4">
        {resources?.map((resource) => (
          <Card key={resource.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">{resource.title}</h4>
                <p className="text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
                <div className="flex gap-2 mb-2">
                  <Badge>{resource.category}</Badge>
                  <Badge variant="outline">{resource.language}</Badge>
                  <Badge variant="secondary">{resource.downloadCount} downloads</Badge>
                </div>
                <p className="text-sm text-gray-500">Section: {resource.section}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setEditingItem({ ...resource, type: 'resources' })}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => deleteMutation.mutate({ type: 'resources', id: resource.id })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const EventsTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Events Management</h3>
        <Button onClick={() => { setShowForm(true); setActiveTab("events"); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>
      
      <div className="grid gap-4">
        {events?.map((event) => (
          <Card key={event.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{event.title}</h4>
                    <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                <div className="flex gap-2">
                  <Badge>{event.type}</Badge>
                  <Badge variant="secondary">{event.participants || 0} participants</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setEditingItem({ ...event, type: 'events' })}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => deleteMutation.mutate({ type: 'events', id: event.id })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const WebinarsTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Webinars Management</h3>
        <Button onClick={() => { setShowForm(true); setActiveTab("webinars"); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Webinar
        </Button>
      </div>
      
      <div className="grid gap-4">
        {webinars?.map((webinar) => (
          <Card key={webinar.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">{webinar.title}</h4>
                <p className="text-gray-600 mb-2 line-clamp-2">{webinar.description}</p>
                <div className="flex gap-2 mb-2">
                  <Badge>{webinar.status}</Badge>
                  <Badge variant="outline">{webinar.language}</Badge>
                  <Badge variant="secondary">{webinar.participants} / {webinar.maxParticipants}</Badge>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Date: {new Date(webinar.date).toLocaleDateString()}</p>
                  <p>Time: {webinar.time} ({webinar.duration})</p>
                  <p>Presenter: {webinar.presenter}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setEditingItem({ ...webinar, type: 'webinars' })}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => deleteMutation.mutate({ type: 'webinars', id: webinar.id })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const MaterialsTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Reading Materials Management</h3>
        <Button onClick={() => { setShowForm(true); setActiveTab("materials"); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Material
        </Button>
      </div>
      
      <div className="grid gap-4">
        {materials?.map((material) => (
          <Card key={material.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src={material.coverImage} 
                    alt={material.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{material.title}</h4>
                    <p className="text-sm text-gray-500">{material.author}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-2 line-clamp-2">{material.description}</p>
                <div className="flex gap-2 mb-2">
                  <Badge>{material.category}</Badge>
                  <Badge variant="outline">{material.difficulty}</Badge>
                  <Badge variant="secondary">{material.readTime}</Badge>
                </div>
                <p className="text-sm text-gray-500">Downloads: {material.downloadCount} | Rating: {material.rating}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setEditingItem({ ...material, type: 'materials' })}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => deleteMutation.mutate({ type: 'materials', id: material.id })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const EditForm = ({ item, onSave, onCancel }) => (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {item ? 'Edit Item' : 'Create New Item'}
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          onSave(data);
        }}>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="title"
                defaultValue={item?.title || ''}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                defaultValue={item?.description || ''}
                className="w-full px-3 py-2 border rounded-md h-24"
                required
              />
            </div>

            {activeTab === 'resources' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select name="category" defaultValue={item?.category || ''} className="w-full px-3 py-2 border rounded-md">
                      <option value="webinar">Webinar</option>
                      <option value="newsletter">Newsletter</option>
                      <option value="research">Research</option>
                      <option value="guide">Guide</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select name="language" defaultValue={item?.language || 'en'} className="w-full px-3 py-2 border rounded-md">
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Section</label>
                  <input
                    name="section"
                    defaultValue={item?.section || ''}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </>
            )}

            {activeTab === 'events' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                      name="date"
                      type="date"
                      defaultValue={item?.date || ''}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select name="type" defaultValue={item?.type || ''} className="w-full px-3 py-2 border rounded-md">
                      <option value="event">Event</option>
                      <option value="conference">Conference</option>
                      <option value="meeting">Meeting</option>
                      <option value="webinar">Webinar</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    name="imageUrl"
                    defaultValue={item?.imageUrl || ''}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </>
            )}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all content for the Africa Mechanize platform
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Resources</p>
                <p className="text-2xl font-bold text-primary">{resources?.length || 0}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Events</p>
                <p className="text-2xl font-bold text-secondary">{events?.length || 0}</p>
              </div>
              <Calendar className="h-8 w-8 text-secondary" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Webinars</p>
                <p className="text-2xl font-bold text-accent">{webinars?.length || 0}</p>
              </div>
              <Video className="h-8 w-8 text-accent" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reading Materials</p>
                <p className="text-2xl font-bold text-success">{materials?.length || 0}</p>
              </div>
              <BookOpen className="h-8 w-8 text-success" />
            </div>
          </Card>
        </div>

        {/* Edit Form */}
        {(editingItem || showForm) && (
          <div className="mb-8">
            <EditForm
              item={editingItem}
              onSave={(data) => {
                if (editingItem) {
                  updateMutation.mutate({
                    type: editingItem.type,
                    id: editingItem.id,
                    data
                  });
                } else {
                  createMutation.mutate({
                    type: activeTab,
                    data
                  });
                }
              }}
              onCancel={() => {
                setEditingItem(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        {/* Content Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="webinars" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Webinars
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Materials
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="resources">
              <ResourcesTable />
            </TabsContent>
            
            <TabsContent value="events">
              <EventsTable />
            </TabsContent>
            
            <TabsContent value="webinars">
              <WebinarsTable />
            </TabsContent>
            
            <TabsContent value="materials">
              <MaterialsTable />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}