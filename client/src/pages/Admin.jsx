// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { 
//   Plus, 
//   Edit, 
//   Trash2, 
//   FileText, 
//   Calendar, 
//   Video, 
//   BookOpen, 
//   Users,
//   Settings,
//   Eye,
//   Save,
//   X
// } from "lucide-react";
// import { apiRequest } from "@/lib/queryClient";
// import { useToast } from "@/hooks/use-toast";

// // Component for managing admin functions

// export default function Admin() {
//   const [activeTab, setActiveTab] = useState("resources");
//   const [editingItem, setEditingItem] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const queryClient = useQueryClient();
//   const { toast } = useToast();

//   // Fetch all content types
//   const { data: resources = [] } = useQuery({ queryKey: ["/api/resources"] });
//   const { data: events = [] } = useQuery({ queryKey: ["/api/events"] });
//   const { data: webinars = [] } = useQuery({ queryKey: ["/api/webinars"] });
//   const { data: materials = [] } = useQuery({ queryKey: ["/api/materials"] });

//   // CRUD Operations
//   const createMutation = useMutation({
//     mutationFn: async ({ type, data }) => {
//       return await apiRequest("POST", `/api/${type}`, data);
//     },
//     onSuccess: (_, { type }) => {
//       queryClient.invalidateQueries({ queryKey: [`/api/${type}`] });
//       toast({ title: "Success", description: "Item created successfully" });
//       setShowForm(false);
//       setEditingItem(null);
//     },
//     onError: () => {
//       toast({ title: "Error", description: "Failed to create item", variant: "destructive" });
//     }
//   });

//   const updateMutation = useMutation({
//     mutationFn: async ({ type, id, data }) => {
//       return await apiRequest("PATCH", `/api/${type}/${id}`, data);
//     },
//     onSuccess: (_, { type }) => {
//       queryClient.invalidateQueries({ queryKey: [`/api/${type}`] });
//       toast({ title: "Success", description: "Item updated successfully" });
//       setEditingItem(null);
//     },
//     onError: () => {
//       toast({ title: "Error", description: "Failed to update item", variant: "destructive" });
//     }
//   });

//   const deleteMutation = useMutation({
//     mutationFn: async ({ type, id }) => {
//       return await apiRequest("DELETE", `/api/${type}/${id}`);
//     },
//     onSuccess: (_, { type }) => {
//       queryClient.invalidateQueries({ queryKey: [`/api/${type}`] });
//       toast({ title: "Success", description: "Item deleted successfully" });
//     },
//     onError: () => {
//       toast({ title: "Error", description: "Failed to delete item", variant: "destructive" });
//     }
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Admin Dashboard
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Manage content, users, and platform settings
//           </p>
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="resources" className="flex items-center gap-2">
//               <FileText className="w-4 h-4" />
//               Resources
//             </TabsTrigger>
//             <TabsTrigger value="events" className="flex items-center gap-2">
//               <Calendar className="w-4 h-4" />
//               Events
//             </TabsTrigger>
//             <TabsTrigger value="webinars" className="flex items-center gap-2">
//               <Video className="w-4 h-4" />
//               Webinars
//             </TabsTrigger>
//             <TabsTrigger value="materials" className="flex items-center gap-2">
//               <BookOpen className="w-4 h-4" />
//               Materials
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="resources" className="space-y-6">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-semibold">Resources Management</h3>
//                 <Button onClick={() => { setShowForm(true); setActiveTab("resources"); }}>
//                   <Plus className="w-4 h-4 mr-2" />
//                   Add Resource
//                 </Button>
//               </div>
              
//               <div className="grid gap-4">
//                 {resources?.map((resource) => (
//                   <Card key={resource.id} className="p-4">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-lg mb-2">{resource.title}</h4>
//                         <p className="text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
//                         <div className="flex gap-2 mb-2">
//                           <Badge>{resource.category}</Badge>
//                           <Badge variant="outline">{resource.language}</Badge>
//                           <Badge variant="secondary">{resource.downloadCount} downloads</Badge>
//                         </div>
//                         <p className="text-sm text-gray-500">Section: {resource.section}</p>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button 
//                           size="sm" 
//                           variant="outline"
//                           onClick={() => setEditingItem({ ...resource, type: 'resources' })}
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <Button 
//                           size="sm" 
//                           variant="destructive"
//                           onClick={() => deleteMutation.mutate({ type: 'resources', id: resource.id })}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="events" className="space-y-6">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-semibold">Events Management</h3>
//                 <Button onClick={() => { setShowForm(true); setActiveTab("events"); }}>
//                   <Plus className="w-4 h-4 mr-2" />
//                   Add Event
//                 </Button>
//               </div>
              
//               <div className="grid gap-4">
//                 {events?.map((event) => (
//                   <Card key={event.id} className="p-4">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <img 
//                             src={event.imageUrl} 
//                             alt={event.title}
//                             className="w-16 h-12 object-cover rounded"
//                           />
//                           <div>
//                             <h4 className="font-semibold text-lg">{event.title}</h4>
//                             <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
//                           </div>
//                         </div>
//                         <p className="text-gray-600 mb-2 line-clamp-2">{event.description}</p>
//                         <div className="flex gap-2">
//                           <Badge>{event.type}</Badge>
//                           <Badge variant="secondary">{event.participants || 0} participants</Badge>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button 
//                           size="sm" 
//                           variant="outline"
//                           onClick={() => setEditingItem({ ...event, type: 'events' })}
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <Button 
//                           size="sm" 
//                           variant="destructive"
//                           onClick={() => deleteMutation.mutate({ type: 'events', id: event.id })}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="webinars" className="space-y-6">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-semibold">Webinars Management</h3>
//                 <Button onClick={() => { setShowForm(true); setActiveTab("webinars"); }}>
//                   <Plus className="w-4 h-4 mr-2" />
//                   Add Webinar
//                 </Button>
//               </div>
              
//               <div className="grid gap-4">
//                 {webinars?.map((webinar) => (
//                   <Card key={webinar.id} className="p-4">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-lg mb-2">{webinar.title}</h4>
//                         <p className="text-gray-600 mb-2 line-clamp-2">{webinar.description}</p>
//                         <div className="flex gap-2 mb-2">
//                           <Badge>{webinar.status}</Badge>
//                           <Badge variant="outline">{webinar.language}</Badge>
//                           <Badge variant="secondary">{webinar.participants} / {webinar.maxParticipants}</Badge>
//                         </div>
//                         <div className="text-sm text-gray-500 space-y-1">
//                           <p>Date: {new Date(webinar.date).toLocaleDateString()}</p>
//                           <p>Time: {webinar.time} ({webinar.duration})</p>
//                           <p>Presenter: {webinar.presenter}</p>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button 
//                           size="sm" 
//                           variant="outline"
//                           onClick={() => setEditingItem({ ...webinar, type: 'webinars' })}
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <Button 
//                           size="sm" 
//                           variant="destructive"
//                           onClick={() => deleteMutation.mutate({ type: 'webinars', id: webinar.id })}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="materials" className="space-y-6">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-semibold">Reading Materials Management</h3>
//                 <Button onClick={() => { setShowForm(true); setActiveTab("materials"); }}>
//                   <Plus className="w-4 h-4 mr-2" />
//                   Add Material
//                 </Button>
//               </div>
              
//               <div className="grid gap-4">
//                 {materials?.map((material) => (
//                   <Card key={material.id} className="p-4">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <img 
//                             src={material.coverImage} 
//                             alt={material.title}
//                             className="w-16 h-12 object-cover rounded"
//                           />
//                           <div>
//                             <h4 className="font-semibold text-lg">{material.title}</h4>
//                             <p className="text-sm text-gray-500">{material.author}</p>
//                           </div>
//                         </div>
//                         <p className="text-gray-600 mb-2 line-clamp-2">{material.description}</p>
//                         <div className="flex gap-2 mb-2">
//                           <Badge>{material.category}</Badge>
//                           <Badge variant="outline">{material.difficulty}</Badge>
//                           <Badge variant="secondary">{material.readTime}</Badge>
//                         </div>
//                         <p className="text-sm text-gray-500">Downloads: {material.downloadCount} | Rating: {material.rating}</p>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button 
//                           size="sm" 
//                           variant="outline"
//                           onClick={() => setEditingItem({ ...material, type: 'materials' })}
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <Button 
//                           size="sm" 
//                           variant="destructive"
//                           onClick={() => deleteMutation.mutate({ type: 'materials', id: material.id })}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }