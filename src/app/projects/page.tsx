import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
  // Sample project data
  const projects = [
    {
      title: 'Project 1',
      description: 'A responsive web application built with React and Next.js.',
      technologies: ['React', 'Next.js', 'Tailwind CSS'],
      demoUrl: '#',
      sourceUrl: '#',
    },
    {
      title: 'Project 2',
      description: 'An e-commerce platform with user authentication and payment processing.',
      technologies: ['TypeScript', 'Node.js', 'MongoDB'],
      demoUrl: '#',
      sourceUrl: '#',
    },
    {
      title: 'Project 3',
      description: 'A mobile-first dashboard for data visualization and analytics.',
      technologies: ['React', 'D3.js', 'Firebase'],
      demoUrl: '#',
      sourceUrl: '#',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Projects Section */}
      <section className="pt-32 py-24 bg-black">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-16 text-center text-white">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                demoUrl={project.demoUrl}
                sourceUrl={project.sourceUrl}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
