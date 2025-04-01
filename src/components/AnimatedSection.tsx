"use client";

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideRight' | 'slideLeft' | 'scaleIn' | 'parallax';
  delay?: number;
  duration?: number;
  threshold?: number;
  parallaxFactor?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  parallaxFactor = 0.2,
  staggerChildren = false,
  staggerDelay = 100
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Prepare the section based on animation type
    if (animation !== 'parallax') {
      section.style.opacity = '0';
    }
    
    // Create animation function
    const animate = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      
      switch (animation) {
        case 'fadeIn':
          anime({
            targets: section,
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration,
            delay
          });
          break;
          
        case 'slideUp':
          anime({
            targets: section,
            opacity: [0, 1],
            translateY: [50, 0],
            easing: 'easeOutExpo',
            duration,
            delay
          });
          break;
          
        case 'slideRight':
          anime({
            targets: section,
            opacity: [0, 1],
            translateX: [-50, 0],
            easing: 'easeOutExpo',
            duration,
            delay
          });
          break;
          
        case 'slideLeft':
          anime({
            targets: section,
            opacity: [0, 1],
            translateX: [50, 0],
            easing: 'easeOutExpo',
            duration,
            delay
          });
          break;
          
        case 'scaleIn':
          anime({
            targets: section,
            opacity: [0, 1],
            scale: [0.95, 1],
            easing: 'easeOutExpo',
            duration,
            delay
          });
          break;
      }
      
      // Stagger children animations if enabled
      if (staggerChildren) {
        const childElements = section.querySelectorAll('.animate-child');
        anime({
          targets: childElements,
          opacity: [0, 1],
          translateY: [20, 0],
          easing: 'easeOutExpo',
          duration: duration * 0.8,
          delay: anime.stagger(staggerDelay, { start: delay })
        });
      }
    };
    
    // Setup intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animate();
            
            // For parallax, we don't unobserve
            if (animation !== 'parallax') {
              observerRef.current?.unobserve(section);
            }
          }
        });
      },
      { threshold }
    );
    
    observerRef.current.observe(section);
    
    // Setup parallax effect if needed
    let cleanupParallax: (() => void) | undefined;
    
    if (animation === 'parallax') {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        const sectionTop = section.getBoundingClientRect().top + scrollTop;
        const distance = scrollTop - sectionTop;
        
        section.style.transform = `translateY(${distance * parallaxFactor}px)`;
      };
      
      window.addEventListener('scroll', handleScroll);
      cleanupParallax = () => window.removeEventListener('scroll', handleScroll);
    }
    
    return () => {
      observerRef.current?.disconnect();
      if (cleanupParallax) cleanupParallax();
    };
  }, [animation, delay, duration, threshold, parallaxFactor, staggerChildren, staggerDelay]);
  
  return (
    <div 
      ref={sectionRef} 
      className={`animated-section ${className} ${animation === 'parallax' ? 'will-change-transform' : ''}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
