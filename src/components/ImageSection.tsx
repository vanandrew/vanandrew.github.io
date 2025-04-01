"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import anime from 'animejs';

export interface ImageSectionProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fullWidth?: boolean;
  parallax?: boolean;
  parallaxFactor?: number;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  src,
  alt,
  width = 1920,
  height = 1080,
  className = '',
  fullWidth = false,
  parallax = false,
  parallaxFactor = 0.2,
  animation = 'fadeIn',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  overlay = false,
  overlayColor = 'black',
  overlayOpacity = 0.3,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);
  
  useEffect(() => {
    const container = containerRef.current;
    const imageContainer = imageRef.current;
    if (!container || !imageContainer) return;
    
    // Prepare the element based on animation type
    if (animation !== 'none') {
      container.style.opacity = '0';
    }
    
    // Create animation function
    const animate = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      
      switch (animation) {
        case 'fadeIn':
          anime({
            targets: container,
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration,
            delay
          });
          break;
          
        case 'slideUp':
          anime({
            targets: container,
            opacity: [0, 1],
            translateY: [50, 0],
            easing: 'easeOutExpo',
            duration,
            delay
          });
          break;
          
        case 'scaleIn':
          anime({
            targets: container,
            opacity: [0, 1],
            scale: [0.95, 1],
            easing: 'easeOutExpo',
            duration,
            delay
          });
          break;
      }
    };
    
    // Setup intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animate();
            
            // For parallax, we don't unobserve
            if (!parallax) {
              observerRef.current?.unobserve(container);
            }
          }
        });
      },
      { threshold }
    );
    
    observerRef.current.observe(container);
    
    // Setup parallax effect if needed
    let cleanupParallax: (() => void) | undefined;
    
    if (parallax) {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        const containerTop = container.getBoundingClientRect().top + scrollTop;
        const distance = scrollTop - containerTop;
        
        imageContainer.style.transform = `translateY(${distance * parallaxFactor}px)`;
      };
      
      window.addEventListener('scroll', handleScroll);
      cleanupParallax = () => window.removeEventListener('scroll', handleScroll);
    }
    
    return () => {
      observerRef.current?.disconnect();
      if (cleanupParallax) cleanupParallax();
    };
  }, [animation, delay, duration, threshold, parallax, parallaxFactor]);
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${fullWidth ? 'w-full' : 'container-custom mx-auto'} ${className}`}
      style={{ opacity: animation !== 'none' ? 0 : 1 }}
    >
      <div 
        ref={imageRef} 
        className={`relative ${parallax ? 'will-change-transform' : ''}`}
      >
        <Image 
          src={src} 
          alt={alt} 
          width={width} 
          height={height} 
          className="w-full h-auto object-cover"
          priority
        />
        
        {overlay && (
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundColor: overlayColor, 
              opacity: overlayOpacity 
            }}
          />
        )}
        
        {children && (
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
