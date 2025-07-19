import { useQuery } from "@tanstack/react-query";

export default function AwardsSection() {
  const { data: awards, isLoading } = useQuery({
    queryKey: ['/api/profile/awards'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading awards...</div>
          </div>
        </div>
      </section>
    );
  }

  const getIconClass = (icon: string) => {
    const iconMap: Record<string, string> = {
      'trophy': 'fas fa-trophy',
      'robot': 'fas fa-robot',
      'lightbulb': 'fas fa-lightbulb',
      'medal': 'fas fa-medal',
      'users': 'fas fa-users',
      'award': 'fas fa-award'
    };
    return iconMap[icon] || 'fas fa-trophy';
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-yellow-500 to-cyan-400',
      'from-purple-400 to-yellow-500',
      'from-cyan-400 to-blue-600',
      'from-yellow-500 to-purple-400',
      'from-blue-600 to-cyan-400',
      'from-purple-400 to-yellow-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="awards" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Awards & Recognition
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Industry recognition for excellence in technology leadership and innovation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards?.map((award: any, index: number) => (
            <div key={index} className="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all transform hover:scale-105">
              <div className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${getGradientClass(index)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${getIconClass(award.icon)} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">{award.title}</h3>
                <p className="text-slate-400 text-sm mb-2">{award.organization}</p>
                <p className="text-slate-300 text-sm">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
