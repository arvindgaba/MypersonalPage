import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import profileImagePath from "@assets/Arvind Profile_1752863602403.png";

export default function HeroSection() {
  const { data: profileData } = useQuery({
    queryKey: ['/api/profile/personal'],
  });

  const { data: heroData } = useQuery({
    queryKey: ['/api/profile/hero'],
  });

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center circuit-pattern pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Professional headshot with AI-inspired framing */}
          <div className="relative inline-block mb-8">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden ai-border-glow animate-pulse-glow">
              <img 
                src={profileImagePath} 
                alt="Arvind Gaba - Technology Leader" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 neural-gradient rounded-full flex items-center justify-center animate-float shadow-lg">
              <i className="fas fa-brain text-white text-xl"></i>
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 ai-gradient rounded-full flex items-center justify-center animate-pulse">
              <i className="fas fa-microchip text-white text-sm"></i>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            {profileData?.name || "Arvind Gaba"}
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-slate-300 mb-6 font-light">
            {profileData?.title || "Digital Technology & AI Transformation Leader"}
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            {heroData?.description || "Accomplished IT leader with over 20 years of global experience driving digital transformation, enterprise architecture strategy, and high-performance IT operations across complex, multinational organizations."}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="glass-effect px-6 py-3 rounded-full">
              <i className="fas fa-calendar-alt text-cyan-400 mr-2"></i>
              {heroData?.stats?.experience || "20+"} Years Experience
            </div>
            <div className="glass-effect px-6 py-3 rounded-full">
              <i className="fas fa-trophy text-yellow-500 mr-2"></i>
              {heroData?.stats?.awards || "6"} Industry Awards
            </div>
            <div className="glass-effect px-6 py-3 rounded-full">
              <i className="fas fa-project-diagram text-purple-400 mr-2"></i>
              {heroData?.stats?.projects || "50+"} Digital Projects
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={scrollToContact}
              className="px-8 py-4 neural-gradient hover:opacity-90 rounded-xl text-white font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-comment-dots mr-2"></i>
              Professional Inquiry
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('#achievements', '_self')}
              className="px-8 py-4 glass-effect hover:bg-white/10 rounded-xl text-slate-100 font-semibold transition-all transform hover:scale-105 border-slate-600"
            >
              <i className="fas fa-lightbulb mr-2"></i>
              Technology Insights
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
