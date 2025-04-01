import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  sourceUrl?: string;
  technologies: string[];
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  demoUrl,
  sourceUrl,
  technologies,
}) => {
  return (
    <div className="apple-card group transition-all duration-300 hover:scale-[1.02]">
      <div className="h-48 bg-black/50 relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-apple-gray">
            Project Image
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-medium mb-2 text-white">{title}</h3>
        <p className="text-apple-gray mb-4 text-base">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span key={tech} className="bg-black/30 text-apple-gray px-2 py-1 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-3 mt-6">
          {demoUrl && (
            <Button href={demoUrl} variant="primary" size="small">
              View Demo
            </Button>
          )}
          {sourceUrl && (
            <Button href={sourceUrl} variant="secondary" size="small">
              Source Code
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
