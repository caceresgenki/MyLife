'use client'
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'about', label: 'Nosotros' },
  { id: 'portfolio', label: 'Galería' },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const handleScroll = useCallback((e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  }, []);

  // Detectar sección activa al hacer scroll
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(NAV_ITEMS[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Cerrar menú con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed w-full z-50">
      <nav
        className="bg-cream/90 backdrop-blur-sm shadow-sm"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="#inicio"
              onClick={(e) => handleScroll(e, 'inicio')}
              className="relative w-9 h-9 flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 rounded-full"
              aria-label="Ir al inicio - G&G"
            >
              <Image
                src="/images/Logo_G&G.svg"
                alt="G&G Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </a>

            {/* Menú de escritorio */}
            <ul className="hidden md:flex items-center gap-8" role="menubar">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} role="none">
                  <Link
                    href={`#${item.id}`}
                    onClick={(e) => handleScroll(e, item.id)}
                    className={`relative py-2 px-1 text-base font-medium transition-colors duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 rounded
                      ${activeSection === item.id
                        ? 'text-copper'
                        : 'text-dark hover:text-copper'
                      }`}
                    role="menuitem"
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                    {/* Indicador activo */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-copper transform origin-left transition-transform duration-300
                        ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0'}`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-dark hover:text-copper transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 rounded-lg"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute top-full left-0 w-full bg-cream/95 backdrop-blur-sm shadow-lg transform transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'opacity-100 translate-y-0 visible'
              : 'opacity-0 -translate-y-2 invisible'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="flex flex-col py-4" role="menu">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.id} role="none">
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  className={`block py-4 px-6 text-center text-base font-medium transition-colors duration-200
                    focus:outline-none focus-visible:bg-copper/10
                    ${activeSection === item.id
                      ? 'text-copper bg-copper/5'
                      : 'text-dark hover:text-copper hover:bg-copper/5'
                    }`}
                  role="menuitem"
                  tabIndex={isMenuOpen ? 0 : -1}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay para cerrar menú al hacer clic fuera */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-dark/20 -z-10"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
