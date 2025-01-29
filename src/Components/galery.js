'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const ITEMS = [
  { 
    id: 1,
    image: "/images/1.jpg",
    alt: "Gallery image 1"
  },
  { 
    id: 2,
    image: "/images/2.jpg",
    alt: "Gallery image 2"
  },
  { 
    id: 3,
    image: "/images/3.jpg",
    alt: "Gallery image 3"
  },
  { 
    id: 4,
    image: "/images/4.jpg",
    alt: "Gallery image 4"
  },
  { 
    id: 5,
    image: "/images/5.jpg",
    alt: "Gallery image 5"
  },
  { 
    id: 6,
    image: "/images/6.jpg",
    alt: "Gallery image 6"
  },
  { 
    id: 7,
    image: "/images/7.jpg",
    alt: "Gallery image 7"
  },
  { 
    id: 8,
    image: "/images/8.jpg",
    alt: "Gallery image 8"
  },
  { 
    id: 9,
    image: "/images/9.jpg",
    alt: "Gallery image 9"
  },
  { 
    id: 10,
    image: "/images/10.jpg",
    alt: "Gallery image 10"
  },
  { 
    id: 11,
    image: "/images/11.jpg",
    alt: "Gallery image 11"
  }
];

const ANIMATION_SPEED = 0.15;
const GAP = 16;

export default function Gallery() {
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);
  const dragStartRef = useRef(0);
  const itemWidthRef = useRef(0);

  // Memoize displayItems to prevent unnecessary re-renders
  const displayItems = useCallback(() => [...ITEMS, ...ITEMS, ...ITEMS], []);

  const handleAnimation = useCallback(() => {
    if (!isPaused && !isDragging && containerRef.current && contentRef.current) {
      setPosition(prev => {
        const newPosition = prev - ANIMATION_SPEED;
        if (!itemWidthRef.current) {
          itemWidthRef.current = contentRef.current.children[0].offsetWidth;
        }
        const singleSetWidth = (itemWidthRef.current + GAP) * ITEMS.length;
        
        return newPosition < -singleSetWidth ? newPosition + singleSetWidth : newPosition;
      });
    }
    animationRef.current = requestAnimationFrame(handleAnimation);
  }, [isPaused, isDragging]);

  useEffect(() => {
    handleAnimation();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleAnimation]);

  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    setIsPaused(true);

    const pageX = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
    dragStartRef.current = pageX;
    setStartPosition(position);
  }, [position]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;

    const currentPosition = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
    if (e.type === "touchmove") e.preventDefault();

    const diff = currentPosition - dragStartRef.current;
    let newPosition = startPosition + diff;
    
    if (!itemWidthRef.current) {
      itemWidthRef.current = contentRef.current.children[0].offsetWidth;
    }
    const singleSetWidth = (itemWidthRef.current + GAP) * ITEMS.length;
    
    if (newPosition > 0) {
      newPosition -= singleSetWidth;
    } else if (newPosition < -singleSetWidth) {
      newPosition += singleSetWidth;
    }
    
    setPosition(newPosition);
  }, [isDragging, startPosition]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setIsPaused(false);
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-copper">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-cream/80">
            Nuestra Pequeña Gran Historia
          </p>
          <p className="font-dancing text-2xl text-cream">
            Tejiendo memorias con hilos de amor y sonrisas
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="relative h-96 overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => !isDragging && setIsPaused(false)}
        >
          <div 
            ref={contentRef}
            className="absolute flex gap-4 touch-pan-y"
            style={{ 
              transform: `translateX(${position}px)`,
              transition: isDragging ? 'none' : 'transform 50ms linear',
              willChange: 'transform'
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {displayItems().map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="w-96 h-96 flex-shrink-0 rounded-lg overflow-hidden select-none"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={384}
                  height={384}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}