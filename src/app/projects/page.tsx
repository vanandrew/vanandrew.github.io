import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
  // Project and publication data
  const projects = [
    {
      title: 'Framewise multi-echo distortion correction for superior functional MRI',
      description: 'Research paper published in bioRxiv (2023) on novel off-resonance distortion correction methods for echo planar imaging.',
      technologies: ['MRI', 'Medical Imaging', 'Python', 'MATLAB'],
      demoUrl: '#',
      sourceUrl: '#',
    },
    {
      title: 'Using synthetic MR images for distortion correction',
      description: 'Research paper published in Developmental Cognitive Neuroscience (2023) on using synthetic MR images for distortion correction.',
      technologies: ['Deep Learning', 'Medical Imaging', 'Python', 'PyTorch'],
      demoUrl: '#',
      sourceUrl: '#',
    },
    {
      title: 'FIRMM: Framewise Integrated Real-Time MRI Monitor',
      description: 'A real-time head motion tracking system for MRI scanners, culminating in a patented technology and a successful spin-off startup.',
      technologies: ['Python', 'JavaScript', 'Docker', 'AWS'],
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
          <h2 className="text-5xl font-medium mb-16 text-center text-white">My Projects & Publications</h2>
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
