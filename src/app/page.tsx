import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/ContactForm';

export default function Home() {
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container-custom grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">Hi, I'm [Your Name]</h1>
            <p className="text-xl mb-6">A passionate developer building amazing web experiences</p>
            <div className="flex space-x-4">
              <Button href="#contact" variant="primary">Contact Me</Button>
              <Button href="#projects" variant="outline">View My Work</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white">
              {/* Replace with your profile image */}
              <div className="absolute inset-0 bg-gray-600 flex items-center justify-center text-white text-lg">
                Profile Image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-4">
                Hello! I'm a passionate web developer with expertise in modern technologies like React, Next.js, and TypeScript.
                I love building responsive, user-friendly applications that solve real-world problems.
              </p>
              <p className="text-lg mb-4">
                With a background in [your background], I bring a unique perspective to every project I work on.
                I'm constantly learning and exploring new technologies to stay at the forefront of web development.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">My Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'HTML/CSS', 'Tailwind CSS'].map((skill) => (
                    <span key={skill} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-gray-700">Degree in [Your Field] - [University Name]</p>
                <p className="text-gray-500">[Year] - [Year]</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Experience</h3>
                <p className="text-gray-700">[Job Title] at [Company]</p>
                <p className="text-gray-500">[Year] - Present</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800 text-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg mb-6">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                Feel free to contact me using the form or through my social media profiles.
              </p>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="text-white hover:text-gray-300 text-2xl">
                  <FaGithub />
                </a>
                <a href="#" className="text-white hover:text-gray-300 text-2xl">
                  <FaLinkedin />
                </a>
                <a href="#" className="text-white hover:text-gray-300 text-2xl">
                  <FaTwitter />
                </a>
              </div>
              <div className="space-y-2">
                <p><span className="font-semibold">Email:</span> your.email@example.com</p>
                <p><span className="font-semibold">Location:</span> Your City, Country</p>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
