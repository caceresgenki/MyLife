'use client'
import Link from 'next/link';

export default function Nav() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-cream/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <a 
            href="#inicio" 
            onClick={(e) => handleScroll(e, 'inicio')}
            className="font-serif text-2xl text-dark font-bold"
          >
            G♡G
          </a>
          <div className="hidden md:flex gap-8">
            <a 
              href="#inicio" 
              onClick={(e) => handleScroll(e, 'inicio')}
              className="text-dark hover:text-copper transition"
            >
              Inicio
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleScroll(e, 'about')}
              className="text-dark hover:text-copper transition"
            >
              Nosotros
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => handleScroll(e, 'portfolio')}
              className="text-dark hover:text-copper transition"
            >
              Galería
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}