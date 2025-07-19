import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { X, Settings } from "lucide-react";

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: personalData } = useQuery({
    queryKey: ['/api/profile/personal'],
  });

  const { data: heroData } = useQuery({
    queryKey: ['/api/profile/hero'],
  });

  const { data: contactSubmissions } = useQuery({
    queryKey: ['/api/contact'],
  });

  const updateContentMutation = useMutation({
    mutationFn: async ({ section, content }: { section: string; content: any }) => {
      return apiRequest('PUT', `/api/profile/${section}`, content);
    },
    onSuccess: (_, { section }) => {
      queryClient.invalidateQueries({ queryKey: [`/api/profile/${section}`] });
      toast({
        title: "Content Updated",
        description: "Your changes have been saved successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const downloadResumeMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('GET', '/api/resume/download');
    },
    onSuccess: (response) => {
      toast({
        title: "Resume Ready",
        description: "Resume download functionality implemented.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Download Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handlePersonalInfoUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = {
      ...personalData,
      name: formData.get('name') as string,
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      location: formData.get('location') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      linkedin: formData.get('linkedin') as string,
    };
    
    updateContentMutation.mutate({ section: 'personal', content: updatedData });
  };

  const handleStatsUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedStats = {
      ...heroData,
      stats: {
        experience: formData.get('experience') as string,
        awards: formData.get('awards') as string,
        projects: formData.get('projects') as string,
      }
    };
    
    updateContentMutation.mutate({ section: 'hero', content: updatedStats });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 z-50 bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30"
        >
          <Settings size={16} className="mr-2" />
          Admin
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-slate-900 border-slate-700 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-purple-400">Content Manager</SheetTitle>
        </SheetHeader>
        
        <Tabs defaultValue="personal" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
            <TabsTrigger value="stats" className="text-xs">Stats</TabsTrigger>
            <TabsTrigger value="messages" className="text-xs">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePersonalInfoUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                    <Input
                      name="name"
                      defaultValue={personalData?.name || ""}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                    <Input
                      name="title"
                      defaultValue={personalData?.title || ""}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Subtitle</label>
                    <Input
                      name="subtitle"
                      defaultValue={personalData?.subtitle || ""}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                    <Input
                      name="location"
                      defaultValue={personalData?.location || ""}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                    <Input
                      name="email"
                      type="email"
                      defaultValue={personalData?.email || ""}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Phone</label>
                    <Input
                      name="phone"
                      defaultValue={personalData?.phone || ""}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">LinkedIn</label>
                    <Input
                      name="linkedin"
                      defaultValue={personalData?.linkedin || ""}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={updateContentMutation.isPending}
                    className="w-full neural-gradient hover:opacity-90"
                  >
                    {updateContentMutation.isPending ? "Updating..." : "Update Personal Info"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStatsUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Years of Experience</label>
                    <Input
                      name="experience"
                      defaultValue={heroData?.stats?.experience || "20+"}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Awards</label>
                    <Input
                      name="awards"
                      defaultValue={heroData?.stats?.awards || "6"}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Projects</label>
                    <Input
                      name="projects"
                      defaultValue={heroData?.stats?.projects || "50+"}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={updateContentMutation.isPending}
                    className="w-full ai-gradient hover:opacity-90"
                  >
                    {updateContentMutation.isPending ? "Updating..." : "Update Statistics"}
                  </Button>
                </form>
                
                <div className="mt-6">
                  <Button
                    onClick={() => downloadResumeMutation.mutate()}
                    disabled={downloadResumeMutation.isPending}
                    className="w-full tech-gradient hover:opacity-90"
                  >
                    <i className="fas fa-download mr-2"></i>
                    {downloadResumeMutation.isPending ? "Generating..." : "Download Resume"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Contact Messages</CardTitle>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                {contactSubmissions?.length ? (
                  <div className="space-y-4">
                    {contactSubmissions.map((submission: any) => (
                      <div key={submission.id} className="p-4 bg-slate-700 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-slate-200">{submission.name}</h4>
                          <span className="text-xs text-slate-400">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-1">{submission.email}</p>
                        <p className="text-sm text-purple-400 mb-2">{submission.subject}</p>
                        <p className="text-sm text-slate-300">{submission.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-center py-8">No messages yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
