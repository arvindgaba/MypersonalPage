import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AchievementsSection() {
  const { data: achievements, isLoading } = useQuery({
    queryKey: ['/api/profile/achievements'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading achievements...</div>
          </div>
        </div>
      </section>
    );
  }

  const getIconClass = (icon: string) => {
    const iconMap: Record<string, string> = {
      'brain': 'fas fa-brain',
      'robot': 'fas fa-robot',
      'cloud': 'fas fa-cloud',
      'cogs': 'fas fa-cogs',
      'dollar-sign': 'fas fa-dollar-sign',
      'code': 'fas fa-code',
      'shield-alt': 'fas fa-shield-alt'
    };
    return iconMap[icon] || 'fas fa-star';
  };

  return (
    <section id="achievements" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            AI-Powered Achievements
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Strategic initiatives delivering measurable business impact through innovative technology solutions
          </p>
          <Link href="/projects">
            <Button className="px-6 py-3 neural-gradient hover:opacity-90 rounded-xl text-white font-semibold transition-all transform hover:scale-105 shadow-lg">
              <i className="fas fa-rocket mr-2"></i>
              View All Projects & Business Impact
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements?.map((achievement: any, index: number) => (
            <div key={index} className="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 neural-gradient rounded-lg flex items-center justify-center">
                  <i className={`${getIconClass(achievement.icon)} text-white text-xl`}></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-cyan-400">{achievement.title}</h3>
                  <p className="text-slate-400 text-sm">{achievement.subtitle}</p>
                </div>
              </div>
              <p className="text-slate-300 mb-4">
                {achievement.description}
              </p>
              <div className="flex justify-between text-sm">
                {achievement.metrics?.map((metric: string, metricIndex: number) => (
                  <span 
                    key={metricIndex} 
                    className={metricIndex === 0 ? "text-yellow-500" : "text-cyan-400"}
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
