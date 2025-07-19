import { useQuery } from "@tanstack/react-query";

export default function TimelineSection() {
  const { data: timeline, isLoading } = useQuery({
    queryKey: ['/api/profile/timeline'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading timeline...</div>
          </div>
        </div>
      </section>
    );
  }

  const getIconClass = (icon: string) => {
    const iconMap: Record<string, string> = {
      'crown': 'fas fa-crown',
      'network-wired': 'fas fa-network-wired',
      'server': 'fas fa-server',
      'rocket': 'fas fa-rocket'
    };
    return iconMap[icon] || 'fas fa-briefcase';
  };

  return (
    <section id="timeline" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Technology Leadership Journey
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Two decades of progressive technology leadership across global organizations
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-yellow-500 rounded-full"></div>
          
          {/* Timeline Items */}
          <div className="space-y-16">
            {timeline?.map((item: any, index: number) => (
              <div key={index} className="relative flex items-center">
                {index % 2 === 0 ? (
                  // Left side
                  <>
                    <div className="w-1/2 pr-8 text-right">
                      <div className="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all">
                        <div className="flex items-center justify-end mb-4">
                          <div className="mr-4">
                            <h3 className="text-xl font-semibold text-cyan-400">{item.title}</h3>
                            <p className="text-slate-400">{item.company}</p>
                          </div>
                          <div className="w-12 h-12 neural-gradient rounded-lg flex items-center justify-center">
                            <i className={`${getIconClass(item.icon)} text-white`}></i>
                          </div>
                        </div>
                        <p className="text-slate-300 mb-2">{item.period}</p>
                        <p className="text-slate-400">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyan-400 rounded-full border-4 border-slate-900"></div>
                    <div className="w-1/2 pl-8"></div>
                  </>
                ) : (
                  // Right side
                  <>
                    <div className="w-1/2 pr-8"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-400 rounded-full border-4 border-slate-900"></div>
                    <div className="w-1/2 pl-8">
                      <div className="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 ai-gradient rounded-lg flex items-center justify-center mr-4">
                            <i className={`${getIconClass(item.icon)} text-white`}></i>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-cyan-400">{item.title}</h3>
                            <p className="text-slate-400">{item.company}</p>
                          </div>
                        </div>
                        <p className="text-slate-300 mb-2">{item.period}</p>
                        <p className="text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
