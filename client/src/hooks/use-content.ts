import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useProfileContent(section?: string) {
  const queryKey = section ? [`/api/profile/${section}`] : ['/api/profile'];
  
  return useQuery({
    queryKey,
    enabled: true,
  });
}

export function useUpdateContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ section, content }: { section: string; content: any }) => {
      return apiRequest('PUT', `/api/profile/${section}`, content);
    },
    onSuccess: (_, { section }) => {
      // Invalidate both specific section and all profile data
      queryClient.invalidateQueries({ queryKey: [`/api/profile/${section}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/profile'] });
    },
  });
}

export function useContactSubmission() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
    },
  });
}
