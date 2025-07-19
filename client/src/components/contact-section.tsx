import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const { data: personalData } = useQuery({
    queryKey: ['/api/profile/personal'],
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your inquiry. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error Sending Message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Professional Inquiries
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Open to discussing technology leadership opportunities, strategic partnerships, and industry collaboration
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 neural-gradient rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Email</h4>
                  <p className="text-slate-400">{personalData?.email || "arvindgaba.ae+profile@gmail.com"}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 ai-gradient rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-handshake text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Available for Contact</h4>
                  <p className="text-slate-400">Professional Inquiries Welcome</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 tech-gradient rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-map-marker-alt text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Location</h4>
                  <p className="text-slate-400">{personalData?.location || "Dubai, UAE"}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 neural-gradient rounded-lg flex items-center justify-center mr-4">
                  <i className="fab fa-linkedin text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">LinkedIn</h4>
                  <a 
                    href={`https://${personalData?.linkedin || "linkedin.com/in/arvindgaba"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {personalData?.linkedin || "linkedin.com/in/arvindgaba"}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Your Name"
                            className="bg-slate-800 border-slate-600 text-slate-100 focus:border-cyan-400/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            placeholder="your@email.com"
                            className="bg-slate-800 border-slate-600 text-slate-100 focus:border-cyan-400/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100 focus:border-cyan-400/50">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 border-slate-600 text-slate-100">
                          <SelectItem value="Technology Leadership Opportunity" className="text-slate-100 focus:bg-slate-700 focus:text-cyan-400">Technology Leadership Opportunity</SelectItem>
                          <SelectItem value="Strategic Partnership Discussion" className="text-slate-100 focus:bg-slate-700 focus:text-cyan-400">Strategic Partnership Discussion</SelectItem>
                          <SelectItem value="AI Agent Development & Consulting" className="text-slate-100 focus:bg-slate-700 focus:text-cyan-400">AI Agent Development & Consulting</SelectItem>
                          <SelectItem value="Microsoft CoPilot Studio Implementation" className="text-slate-100 focus:bg-slate-700 focus:text-cyan-400">Microsoft CoPilot Studio Implementation</SelectItem>
                          <SelectItem value="Consulting Inquiry" className="text-slate-100 focus:bg-slate-700 focus:text-cyan-400">Consulting Inquiry</SelectItem>
                          <SelectItem value="Industry Collaboration" className="text-slate-100 focus:bg-slate-700 focus:text-cyan-400">Industry Collaboration</SelectItem>
                          <SelectItem value="Speaking Engagement" className="text-slate-100 focus:bg-slate-700 focus:text-cyan-400">Speaking Engagement</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4}
                          placeholder="Your message..."
                          className="bg-slate-800 border-slate-600 text-slate-100 focus:border-cyan-400/50 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full neural-gradient hover:opacity-90 rounded-lg text-white font-semibold transition-all transform hover:scale-105"
                >
                  {contactMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
