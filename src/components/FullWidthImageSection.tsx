"use client";

import React from 'react';
import AnimatedText from './AnimatedText';
import AnimatedSection from './AnimatedSection';

interface FullWidthImageSectionProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  height?: string;
  textPosition?: 'left' | 'center' | 'right';
  textColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

const FullWidthImageSection: React.FC<FullWidthImageSectionProps> = ({
  title,
  subtitle,
  imageUrl,
  height = '80vh',
  textPosition = 'left',
  textColor = 'mono-black',
  overlayColor = 'white',
  overlayOpacity = 0.7,
  children
}) => {
  // Determine text alignment based on position
  const textAlignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }[textPosition];
  
  // If no image URL is provided, use a white background
  const backgroundStyle = imageUrl 
    ? { backgroundImage: `url(${imageUrl})` }
    : { background: '#FFFFFF' };
  
  return (
    <section 
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{ 
        ...backgroundStyle,
        height 
      }}
    >
      {/* Light overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: overlayColor, 
          opacity: overlayOpacity 
        }}
      />
      
      {/* Empty background */}
      <div className="absolute inset-0 pointer-events-none"></div>
      
      {/* Content container with asymmetric padding */}
      <div className={`relative container-custom h-full flex flex-col justify-center ${textAlignClass} ${
        textPosition === 'left' ? 'asymmetric-padding-1' : 
        textPosition === 'right' ? 'asymmetric-padding-2' : 
        'py-16 px-8'
      }`}>
        {title && (
          <AnimatedText 
            text={title} 
            tag="h2" 
            className={`text-6xl md:text-7xl font-light mb-12 text-${textColor} max-w-3xl`}
            animation="wordByWord"
            threshold={0.2}
          />
        )}
        
        {subtitle && (
          <AnimatedText 
            text={subtitle} 
            tag="p" 
            className={`text-xl md:text-2xl mb-12 max-w-xl text-mono-darkgray`}
            animation="fadeIn"
            delay={300}
            threshold={0.2}
          />
        )}
        
        {children && (
          <AnimatedSection 
            animation="fadeIn" 
            delay={500} 
            threshold={0.2}
          >
            {children}
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default FullWidthImageSection;
