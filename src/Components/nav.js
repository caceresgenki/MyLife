'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-cream/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <a 
            href="#inicio" 
            onClick={(e) => handleScroll(e, 'inicio')}
            className="font-serif text-2xl text-dark font-bold">
            G♡G
          </a>
          
          {/* Menú de escritorio */}
          <div className="hidden md:flex gap-8">
            <Link 
              href="#inicio" 
              onClick={(e) => handleScroll(e, 'inicio')}
              className="text-dark hover:text-copper transition"
            >
              Inicio
            </Link>
            <Link 
              href="#about" 
              onClick={(e) => handleScroll(e, 'about')}
              className="text-dark hover:text-copper transition"
            >
              Nosotros
            </Link>
            <Link 
              href="#portfolio" 
              onClick={(e) => handleScroll(e, 'portfolio')}
              className="text-dark hover:text-copper transition"
            >
              Galería
            </Link>
          </div>

          {/* Botón de menú móvil */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-dark hover:text-copper transition"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-cream/80 backdrop-blur-sm py-4 shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <a 
                href="#inicio" 
                onClick={(e) => handleScroll(e, 'inicio')}
                className="text-dark hover:text-copper transition w-full text-center py-2"
              >
                Inicio
              </a>
              <a 
                href="#about" 
                onClick={(e) => handleScroll(e, 'about')}
                className="text-dark hover:text-copper transition w-full text-center py-2"
              >
                Nosotros
              </a>
              <a 
                href="#portfolio" 
                onClick={(e) => handleScroll(e, 'portfolio')}
                className="text-dark hover:text-copper transition w-full text-center py-2"
              >
                Galería
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}