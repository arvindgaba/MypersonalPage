import { useEffect } from "react";

export default function ParticlesBackground() {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 10 + 's';
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 10000);
    };

    // Create initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createParticle(), i * 1000);
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 3000);

    return () => {
      clearInterval(interval);
      // Clean up existing particles
      document.querySelectorAll('.particle').forEach(particle => {
        particle.remove();
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Static particle elements for initial render */}
      <div className="particle" style={{ top: '10%', animationDelay: '0s' }}></div>
      <div className="particle" style={{ top: '20%', animationDelay: '2s' }}></div>
      <div className="particle" style={{ top: '30%', animationDelay: '4s' }}></div>
      <div className="particle" style={{ top: '40%', animationDelay: '6s' }}></div>
      <div className="particle" style={{ top: '50%', animationDelay: '8s' }}></div>
      <div className="particle" style={{ top: '60%', animationDelay: '1s' }}></div>
      <div className="particle" style={{ top: '70%', animationDelay: '3s' }}></div>
      <div className="particle" style={{ top: '80%', animationDelay: '5s' }}></div>
      <div className="particle" style={{ top: '90%', animationDelay: '7s' }}></div>
    </div>
  );
}
