'use client'
import Image from "next/image";
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const calculateDuration = (startDate) => {
  const start = new Date(startDate);
  const today = new Date();
  
  // Ajustamos las fechas al inicio del día
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  // Calculamos años completos
  const years = today.getFullYear() - start.getFullYear();
  const monthDiff = today.getMonth() - start.getMonth();
  const dayDiff = today.getDate() - start.getDate();
  
  // Ajustamos los meses si estamos antes del día del mes
  let months = monthDiff;
  if (dayDiff < 0) {
    months--;
  }
  
  // Ajustamos los años si los meses son negativos
  let finalYears = years;
  if (months < 0) {
    finalYears--;
    months += 12;
  }
  
  // Formateamos el resultado
  if (finalYears >= 1) {
    return `${finalYears} ${finalYears === 1 ? 'año' : 'años'} juntos`;
  } else {
    return `${months} ${months === 1 ? 'mes' : 'meses'} juntos`;
  }
};

export default function Hero() {
  const [duration, setDuration] = useState('Calculando...');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const startDate = '2024-08-30';
  
  useEffect(() => {
    const updateDuration = () => {
      setDuration(calculateDuration(startDate));
    };
    
    updateDuration();
    const timer = setInterval(updateDuration, 1000 * 60);
    
    return () => clearInterval(timer);
  }, []);
  
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  return (
    <section
      className="relative min-h-screen w-full"
      role="banner"
      id="inicio"
      aria-label="Sección principal del fotógrafo de bodas"
    >
      <div 
        className="absolute inset-0 bg-gray-900 animate-pulse"
        style={{ display: isImageLoaded ? 'none' : 'block' }}
      />
      
      <Image
        src="/images/ImageHero.jpg"
        alt="Una pareja de novios junto al océano con un arco floral, capturando un momento íntimo en su día especial"
        fill
        priority
        className={`object-cover transition-opacity duration-700 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        quality={90}
        onLoadingComplete={() => setIsImageLoaded(true)}
      />
      
      <div
        className="absolute inset-0 z-20 flex items-center justify-center bg-black/70"
        aria-hidden="true"
      >
        <div className="max-w-3xl mx-auto text-center text-cream px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight animate-fade-in">
          <p>Feliz día Mi Vida</p>
          <p>{duration}</p>
          </h1>
          <p className="text-sm md:text-base tracking-wider font-light max-w-xl mx-auto mb-6">
            Gracias por estar siempre
          </p>
        </div>
      </div>
      
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20
                  hidden md:flex flex-col items-center gap-2
                  text-cream hover:text-white transition-colors
                  focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-2
                  animate-bounce cursor-pointer"
        aria-label="Desplazarse a la siguiente sección"
      >
        <span className="sr-only">Desplazarse hacia abajo</span>
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}