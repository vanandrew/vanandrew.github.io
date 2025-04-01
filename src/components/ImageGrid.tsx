"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

interface ImageGridItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
}

interface ImageGridProps {
  items: ImageGridItem[];
  columns?: 2 | 3 | 4;
  gap?: string;
  aspectRatio?: string;
  className?: string;
  imageClassName?: string;
  showOverlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  showTitle?: boolean;
  showDescription?: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  items,
  columns = 3,
  gap = 'gap-8',
  aspectRatio = 'aspect-video',
  className = '',
  imageClassName = '',
  showOverlay = true,
  overlayColor = 'black',
  overlayOpacity = 0.5,
  showTitle = true,
  showDescription = false
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }[columns];
  
  return (
    <div className={`grid grid-cols-1 ${gridCols} ${gap} ${className}`}>
      {items.map((item, index) => (
        <AnimatedSection
          key={item.id}
          animation="fadeIn"
          delay={100 * index}
          threshold={0.1}
          className="group"
        >
          <div className={`relative overflow-hidden rounded-lg ${aspectRatio} ${imageClassName}`}>
            {/* Image */}
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay */}
            {showOverlay && (
              <div 
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
                style={{ 
                  backgroundColor: overlayColor, 
                  opacity: overlayOpacity 
                }}
              />
            )}
            
            {/* Content */}
            {(showTitle || showDescription) && (
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                {showTitle && (
                  <h3 className="text-xl font-medium mb-2 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                    {item.title}
                  </h3>
                )}
                
                {showDescription && item.description && (
                  <p className="text-sm text-gray-200 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {item.description}
                  </p>
                )}
              </div>
            )}
            
            {/* Link wrapper */}
            {item.link && (
              <Link href={item.link} className="absolute inset-0 z-10" aria-label={`View ${item.title}`} />
            )}
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
};

export default ImageGrid;
