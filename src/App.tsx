import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Zap } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import ResultsSection from './ResultsSection';

function App() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1.8,
        stagger: 0.5,
        ease: "power4.out"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // --- UPGRADED: Smart Smooth Scrolling Logic with Mobile Detection ---
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      // Get the absolute Y position of the section on the page
      let targetY = element.getBoundingClientRect().top + window.scrollY;

      // Special rule for the Services/HUD section
      if (id === 'pinned-hud-section') {
        const isMobile = window.innerWidth < 768;
        // On mobile, the landing spot is much closer (0.4x) because we shortened the section
        // On desktop, we still skip the 1.2x text transition
        targetY += isMobile ? window.innerHeight * 0.4 : window.innerHeight * 1.2;
      }

      // Smooth scroll to the precisely calculated coordinate
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    // min-h-[100dvh] for mobile browser bar stability
    <div className="relative min-h-[100dvh] bg-slate-950 text-slate-50 selection:bg-emerald-500/30 overflow-hidden">
      {/* 3D Interactive Canvas Layer */}
      <HeroCanvas />

      {/* Navigation */}
      {/* flex-col on mobile so the logo and links stack if the screen is too narrow */}
      <nav className="relative z-10 pointer-events-none flex flex-col md:flex-row items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto gap-4 md:gap-0">

        {/* LOGO */}
        <div className="text-xl font-bold tracking-tighter uppercase pointer-events-auto text-center md:text-left">
          Jeevan.S <span className="text-emerald-400 mx-1">|</span> <span className="text-slate-400 font-medium text-sm tracking-widest">Portfolio</span>
        </div>

        {/* LINKS WITH SMART SMOOTH SCROLL */}
        <div className="flex gap-4 md:gap-8 text-xs md:text-sm font-medium text-slate-400 pointer-events-auto">
          <a href="#" onClick={(e) => scrollToSection(e, 'top')} className="hover:text-emerald-400 transition-colors text-white">Home</a>
          <a href="#case-studies-section" onClick={(e) => scrollToSection(e, 'case-studies-section')} className="hover:text-emerald-400 transition-colors">Case Studies</a>
          <a href="#pinned-hud-section" onClick={(e) => scrollToSection(e, 'pinned-hud-section')} className="hover:text-emerald-400 transition-colors">Services</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main ref={heroRef} className="relative z-10 hero-content pointer-events-none flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 md:px-8 pt-20 md:pt-32 pb-32 min-h-[80dvh]">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
          <Zap size={14} /> Performance Marketing Specialist
        </div>

        {/* Responsive text sizing for mobile */}
        <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] mb-8 tracking-tight">
          Strategic Growth <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Partner</span> for Brands.
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed px-4 md:px-0">
          Scale with Substance. I build data-driven growth systems for D2C brands that turn paid media into long-term customer loyalty, without compromising your brand truth.
        </p>

        {/* HERO BUTTONS WITH SMART SMOOTH SCROLL */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full pointer-events-auto px-4 sm:px-0">
          <button
            onClick={(e) => scrollToSection(e, 'case-studies-section')}
            className="px-8 md:px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] w-full sm:w-auto"
          >
            View Impact Case Studies <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={(e) => scrollToSection(e, 'contact-section')}
            className="px-8 md:px-10 py-4 bg-slate-900/50 backdrop-blur-md border border-slate-800 hover:bg-slate-800 font-bold rounded-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto text-white"
          >
            Let's Talk Growth
          </button>
        </div>
      </main>

      {/* Results Section */}
      <ResultsSection />
    </div>
  );
}

export default App;