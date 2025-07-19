import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-gradient">
          Arvind Gaba
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('about')}
            className="hover:text-cyan-400 transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('achievements')}
            className="hover:text-cyan-400 transition-colors"
          >
            Achievements
          </button>
          <button 
            onClick={() => scrollToSection('expertise')}
            className="hover:text-cyan-400 transition-colors"
          >
            Expertise
          </button>
          <button 
            onClick={() => scrollToSection('timeline')}
            className="hover:text-cyan-400 transition-colors"
          >
            Timeline
          </button>
          <Link
            href="/projects"
            className="hover:text-cyan-400 transition-colors"
          >
            Projects
          </Link>
          <button 
            onClick={() => scrollToSection('contact')}
            className="hover:text-cyan-400 transition-colors"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-slate-700">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left hover:text-cyan-400 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('achievements')}
              className="block w-full text-left hover:text-cyan-400 transition-colors"
            >
              Achievements
            </button>
            <button 
              onClick={() => scrollToSection('expertise')}
              className="block w-full text-left hover:text-cyan-400 transition-colors"
            >
              Expertise
            </button>
            <button 
              onClick={() => scrollToSection('timeline')}
              className="block w-full text-left hover:text-cyan-400 transition-colors"
            >
              Timeline
            </button>
            <Link
              href="/projects"
              className="block w-full text-left hover:text-cyan-400 transition-colors"
            >
              Projects
            </Link>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left hover:text-cyan-400 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
