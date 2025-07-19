import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

export default function BlogSection() {
  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ['/api/blog-posts'],
    queryFn: async (): Promise<BlogPost[]> => {
      const response = await fetch('/api/blog-posts');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) {
    return (
      <section id="blog" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Latest Insights
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Technology leadership perspectives and industry insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-slate-600 rounded mb-4"></div>
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
            <i className="fas fa-rss text-cyan-400 text-4xl mb-4"></i>
            <p className="text-slate-400">
              Blog posts are currently unavailable. Please visit{" "}
              <a 
                href="https://arvindgaba.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-purple-400 transition-colors"
              >
                arvindgaba.com
              </a>{" "}
              directly for the latest insights.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const recentPosts = blogPosts?.slice(0, 5) || [];

  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Latest Insights
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Technology leadership perspectives and industry insights from my blog
          </p>
          <div className="flex items-center justify-center mt-4">
            <i className="fas fa-rss text-cyan-400 mr-2"></i>
            <span className="text-sm text-slate-500">Live from arvindgaba.com</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <Card key={index} className="glass-effect border-slate-600 hover:border-cyan-400/50 transition-all duration-300 group overflow-hidden">
              <CardContent className="p-6">
                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 neural-gradient rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="fas fa-blog text-white text-sm"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
                
                {post.description && (
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {post.description.replace(/<[^>]*>/g, '').slice(0, 120)}...
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {new Date(post.pubDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-purple-400 transition-colors text-sm font-medium flex items-center"
                  >
                    Read More
                    <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://arvindgaba.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 glass-effect hover:bg-white/10 rounded-xl text-slate-100 font-semibold transition-all transform hover:scale-105 border-slate-600"
          >
            <i className="fas fa-rss mr-2 text-cyan-400"></i>
            View All Blog Posts
          </a>
        </div>
      </div>
    </section>
  );
}