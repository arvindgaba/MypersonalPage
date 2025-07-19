import Navigation from "@/components/navigation";
import ParticlesBackground from "@/components/particles-background";
import HeroSection from "@/components/hero-section";
import AchievementsSection from "@/components/achievements-section";
import ExpertiseSection from "@/components/expertise-section";
import TimelineSection from "@/components/timeline-section";
import AwardsSection from "@/components/awards-section";
import ContactSection from "@/components/contact-section";


export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden">
      <title>Arvind Gaba - Technology Leader & Digital Transformation Expert</title>
      <meta name="description" content="Arvind Gaba - Technology Leader with 20+ years of experience in Digital Transformation, AI, Cloud Architecture, and Enterprise Solutions" />
      
      <ParticlesBackground />
      <div className="matrix-rain">
        <div className="absolute top-10 left-10 opacity-20">01001001 01000001</div>
        <div className="absolute top-20 left-1/4 opacity-15">NEURAL NETWORK</div>
        <div className="absolute top-32 right-1/3 opacity-10">MACHINE LEARNING</div>
        <div className="absolute top-40 right-20 opacity-25">01000001 01001001</div>
        <div className="absolute top-60 left-1/2 opacity-10">DEEP LEARNING</div>
      </div>
      <Navigation />
      
      <HeroSection />
      <AchievementsSection />
      <ExpertiseSection />
      <TimelineSection />
      <AwardsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-8">
              <a 
                href="https://linkedin.com/in/arvindgaba" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 neural-gradient rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <i className="fab fa-linkedin text-white text-xl"></i>
              </a>
              <a 
                href="mailto:arvindgaba.ae+profile@gmail.com" 
                className="w-12 h-12 ai-gradient rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <i className="fas fa-envelope text-white text-xl"></i>
              </a>
              <a 
                href="#contact" 
                className="w-12 h-12 tech-gradient rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <i className="fas fa-map-marker-alt text-white text-xl"></i>
              </a>
            </div>
            <p className="text-slate-400 mb-4">
              © {new Date().getFullYear()} Arvind Gaba. Technology Leader & Digital Transformation Expert.
            </p>
            <p className="text-slate-500 text-sm">
              Building the future through innovative technology solutions.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
