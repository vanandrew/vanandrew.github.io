"use client";

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  animation?: 'fadeIn' | 'slideUp' | 'letterByLetter' | 'wordByWord';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  immediate?: boolean; // Add immediate prop to force animation without observer
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  tag = 'div',
  animation = 'fadeIn',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  once = true,
  immediate = false
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Create animation function
    const animate = () => {
      if (hasAnimatedRef.current && once) return;
      
      hasAnimatedRef.current = true;
      
      switch (animation) {
        case 'fadeIn':
          anime({
            targets: element,
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration,
            delay
          });
          break;
          
        case 'slideUp':
          anime({
            targets: element,
            opacity: [0, 1],
            translateY: [50, 0],
            easing: 'easeOutExpo',
            duration,
            delay
          });
          break;
          
        case 'letterByLetter':
          anime({
            targets: `${element.tagName.toLowerCase()}.${element.className.split(' ')[0]} .letter`,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: duration / 2,
            delay: (el, i) => delay + 30 * i
          });
          break;
          
        case 'wordByWord':
          anime({
            targets: `${element.tagName.toLowerCase()}.${element.className.split(' ')[0]} .word`,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: "easeOutExpo",
            duration: duration / 2,
            delay: (el, i) => delay + 100 * i
          });
          break;
      }
    };
    
    // Prepare the element based on animation type
    if (animation === 'letterByLetter') {
      element.innerHTML = text.replace(/\S/g, "<span class='letter inline-block opacity-0'>$&</span>");
    } else if (animation === 'wordByWord') {
      element.innerHTML = text
        .split(' ')
        .map(word => `<span class='word inline-block opacity-0'>${word}</span>`)
        .join(' ');
    } else {
      element.innerHTML = text;
    }
    
    // Force animation to start immediately if immediate prop is true or for hero elements
    if (immediate || element.tagName === 'H1' || element.classList.contains('hero-text')) {
      // Use requestAnimationFrame to ensure the animation starts after the component is mounted
      requestAnimationFrame(() => {
        setTimeout(() => {
          animate();
        }, 100);
      });
    } else {
      // Setup intersection observer for other elements
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animate();
              if (once) {
                observerRef.current?.unobserve(element);
              }
            }
          });
        },
        { threshold }
      );
      
      observerRef.current.observe(element);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [text, animation, delay, duration, threshold, once, immediate]);
  
  const Tag = tag;
  
  return (
    <Tag 
      ref={elementRef as React.RefObject<any>} 
      className={`animated-text ${className}`}
      style={{ opacity: 0 }} // Set initial opacity to 0
    >
      {text}
    </Tag>
  );
};

export default AnimatedText;
