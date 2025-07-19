import Navigation from "@/components/navigation";
import ParticlesBackground from "@/components/particles-background";
import HeroSection from "@/components/hero-section";
import AchievementsSection from "@/components/achievements-section";
import ExpertiseSection from "@/components/expertise-section";
import TimelineSection from "@/components/timeline-section";
import AwardsSection from "@/components/awards-section";
import ContactSection from "@/components/contact-section";
import AdminPanel from "@/components/admin-panel";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <title>Arvind Gaba - Technology Leader & Digital Transformation Expert</title>
      <meta name="description" content="Arvind Gaba - Technology Leader with 20+ years of experience in Digital Transformation, AI, Cloud Architecture, and Enterprise Solutions" />
      
      <ParticlesBackground />
      <Navigation />
      <AdminPanel />
      
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
                href="mailto:arvindgaba@gmail.com" 
                className="w-12 h-12 ai-gradient rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <i className="fas fa-envelope text-white text-xl"></i>
              </a>
              <a 
                href="tel:+97156345000" 
                className="w-12 h-12 tech-gradient rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <i className="fas fa-phone text-white text-xl"></i>
              </a>
            </div>
            <p className="text-slate-400 mb-4">
              © 2024 Arvind Gaba. Technology Leader & Digital Transformation Expert.
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
