import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="h-48 bg-gray-300 relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-600">
            Project Image
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span key={tech} className="bg-gray-200 px-2 py-1 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-3">
          {demoUrl && (
            <a href={demoUrl} className="text-blue-600 hover:text-blue-800">
              View Demo
            </a>
          )}
          {sourceUrl && (
            <a href={sourceUrl} className="text-blue-600 hover:text-blue-800">
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
