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
  textColor = 'white',
  overlayColor = 'black',
  overlayOpacity = 0.4,
  children
}) => {
  // Determine text alignment based on position
  const textAlignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }[textPosition];
  
  // If no image URL is provided, use a gradient background
  const backgroundStyle = imageUrl 
    ? { backgroundImage: `url(${imageUrl})` }
    : { background: 'linear-gradient(45deg, #000000, #1d1d1f)' };
  
  return (
    <section 
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{ 
        ...backgroundStyle,
        height 
      }}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: overlayColor, 
          opacity: overlayOpacity 
        }}
      />
      
      {/* Content container */}
      <div className={`relative container-custom h-full flex flex-col justify-center ${textAlignClass}`}>
        {title && (
          <AnimatedText 
            text={title} 
            tag="h2" 
            className={`text-6xl md:text-7xl font-medium mb-6 ${textColor}`}
            animation="wordByWord"
            threshold={0.2}
          />
        )}
        
        {subtitle && (
          <AnimatedText 
            text={subtitle} 
            tag="p" 
            className={`text-xl md:text-2xl mb-8 max-w-2xl ${textColor === 'white' ? 'text-gray-300' : 'text-gray-700'}`}
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
