"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import AnimatedText from '@/components/AnimatedText';
import AnimatedSection from '@/components/AnimatedSection';
import FullWidthImageSection from '@/components/FullWidthImageSection';
import ImageGrid from '@/components/ImageGrid';
import anime from 'animejs';
import { FaBrain, FaRobot, FaCode } from 'react-icons/fa';
import { 
  fadeInUp, 
  scaleIn, 
  floatingAnimation, 
  setupScrollAnimations, 
  setupParallaxEffect 
} from '@/utils/animations';
import { 
  getPlaceholderImage, 
  sampleProjects, 
  sampleHeroSections 
} from '@/utils/placeholders';

export default function Home() {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initial animations when page loads
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });
    
    // Hero section animations
    timeline
      .add({
        targets: heroTitleRef.current,
        opacity: [0, 1],
        duration: 1200,
        delay: 100,
        begin: (anim) => {
          // For letter by letter animation, split the text into spans
          if (heroTitleRef.current) {
            const text = heroTitleRef.current.textContent || '';
            heroTitleRef.current.innerHTML = text
              .replace(/\S/g, "<span class='letter inline-block'>$&</span>");
            
            // Animate each letter
            anime({
              targets: `${heroTitleRef.current.tagName.toLowerCase()} .letter`,
              opacity: [0, 1],
              easing: "easeOutExpo",
              duration: 600,
              delay: (el, i) => 100 + 30 * i
            });
          }
        }
      })
      .add({
        targets: heroSubtitleRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        delay: 200
      }, '-=800')
      .add({
        targets: buttonsRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 200
      }, '-=600')
      .add({
        targets: profileRef.current,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000
      }, '-=400')
      .add({
        targets: scrollIndicatorRef.current,
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 800,
        complete: () => {
          // Animate scroll indicator continuously
          floatingAnimation(scrollIndicatorRef.current, 10);
        }
      }, '-=400');
    
    // Setup scroll-triggered animations
    setupScrollAnimations();
    
    // Setup parallax effect for elements with .parallax class
    const cleanupParallax = setupParallaxEffect();
    
    // Custom cursor follower effect
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        anime({
          targets: cursorRef.current,
          left: e.clientX,
          top: e.clientY,
          duration: 300,
          easing: 'easeOutQuad'
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      cleanupParallax();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-mono-white text-mono-black overflow-hidden">
      {/* Custom cursor follower */}
      <div 
        ref={cursorRef} 
        className="fixed w-4 h-4 border border-mono-black rounded-full pointer-events-none z-50 opacity-50 hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>
      
      <Navbar />

      {/* Hero Section with centered content */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container-custom flex flex-col md:flex-row items-center justify-center gap-20">
          {/* Text content - centered with more vertical space */}
          <div className="md:w-1/2 text-center md:text-left">
            <p 
              ref={heroSubtitleRef} 
              className="text-3xl text-mono-gray mb-16 opacity-0 max-w-xl"
            >
              Senior Machine Learning Scientist specializing in Neuroimaging and Medical Applications
            </p>
            <div 
              ref={buttonsRef} 
              className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0 opacity-0 justify-center md:justify-start"
            >
              <Button href="/contact" variant="primary" size="large">Contact Me</Button>
              <Button href="/about" variant="text" size="large">About Me</Button>
            </div>
          </div>
          
          {/* Profile image */}
          <div className="md:w-1/3 flex justify-center">
            <div 
              ref={profileRef} 
              className="relative w-80 h-80 overflow-hidden border border-mono-lightgray opacity-0"
            >
              <Image
                src="/images/profile.jpeg"
                alt="Andrew Van"
                fill
                className="object-cover grayscale"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator with arrow icon */}
        <div 
          ref={scrollIndicatorRef} 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center opacity-0"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-mono-gray animate-bounce"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </section>

      {/* Skills Section with extreme minimalism */}
      <AnimatedSection 
        className="py-40 relative bg-mono-offwhite" 
        animation="slideUp" 
        threshold={0.1}
      >
        <div className="container-custom">
          <div className="mb-32 text-left max-w-3xl ml-20">
            <AnimatedText 
              text="Fast. Precise. Innovative." 
              tag="h2" 
              className="text-6xl font-light relative inline-block" 
              animation="wordByWord"
              threshold={0.2}
            />
          </div>
          
          {/* Skills with vertical staggering and same size cards */}
          <div className="space-y-40 mt-32">
            {/* Neuroimaging Card - left aligned */}
            <AnimatedSection 
              className="flex justify-start" 
              animation="slideRight" 
              delay={100} 
              threshold={0.2}
            >
              <div className="md:w-1/2 p-12 bg-mono-white border-t border-mono-black hover:border-t-2 transition-all duration-300 hover:translate-y-[-5px] relative group h-full">
                {/* Icon with asymmetric positioning */}
                <div className="flex justify-start mb-12">
                  <div className="w-16 h-16 border border-mono-black flex items-center justify-center text-mono-black">
                    <FaBrain size={32} />
                  </div>
                </div>
                
                <AnimatedText 
                  text="Neuroimaging" 
                  tag="h3" 
                  className="text-3xl mb-8 font-light" 
                  animation="slideUp"
                  threshold={0.2}
                />
                
                <AnimatedText 
                  text="Expert in MRI and fMRI techniques with extensive experience in developing novel algorithms for brain extraction, distortion correction, and functional connectivity analysis." 
                  tag="p" 
                  className="text-mono-gray mb-12" 
                  animation="fadeIn"
                  delay={200}
                  threshold={0.2}
                />
                
                {/* Skill badges with minimal styling */}
                <div className="flex flex-wrap gap-8 mt-8">
                  <span className="border-b border-mono-black px-0 py-1 text-sm font-light">fMRI Analysis</span>
                  <span className="border-b border-mono-black px-0 py-1 text-sm font-light">MRI Preprocessing</span>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Machine Learning Card - right aligned */}
            <AnimatedSection 
              className="flex justify-end" 
              animation="slideLeft" 
              delay={200} 
              threshold={0.2}
            >
              <div className="md:w-1/2 p-12 bg-mono-white border-t border-mono-black hover:border-t-2 transition-all duration-300 hover:translate-y-[-5px] relative group h-full">
                {/* Icon with asymmetric positioning */}
                <div className="flex justify-end mb-12">
                  <div className="w-16 h-16 border border-mono-black flex items-center justify-center text-mono-black">
                    <FaRobot size={32} />
                  </div>
                </div>
                
                <AnimatedText 
                  text="Machine Learning" 
                  tag="h3" 
                  className="text-3xl mb-8 font-light text-right" 
                  animation="slideUp"
                  threshold={0.2}
                />
                
                <AnimatedText 
                  text="Proficient in developing deep learning models using PyTorch and TensorFlow for medical image segmentation, data augmentation, and computer vision applications." 
                  tag="p" 
                  className="text-mono-gray mb-12" 
                  animation="fadeIn"
                  delay={200}
                  threshold={0.2}
                />
                
                {/* Skill badges with minimal styling */}
                <div className="flex flex-wrap gap-8 mt-8 justify-end">
                  <span className="border-b border-mono-black px-0 py-1 text-sm font-light">PyTorch</span>
                  <span className="border-b border-mono-black px-0 py-1 text-sm font-light">Computer Vision</span>
                  <span className="border-b border-mono-black px-0 py-1 text-sm font-light">Deep Learning</span>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Software Engineering Card - left aligned */}
            <AnimatedSection 
              className="flex justify-start" 
              animation="slideRight" 
              delay={300} 
              threshold={0.2}
            >
              <div className="md:w-1/2 p-12 bg-mono-white border-t border-mono-black hover:border-t-2 transition-all duration-300 hover:translate-y-[-5px] relative group h-full">
                {/* Icon with centered positioning */}
                <div className="flex justify-center mb-12">
                  <div className="w-16 h-16 border border-mono-black flex items-center justify-center text-mono-black">
                    <FaCode size={32} />
                  </div>
                </div>
                
                <AnimatedText 
                  text="Software Engineering" 
                  tag="h3" 
                  className="text-3xl mb-8 font-light text-center" 
                  animation="slideUp"
                  threshold={0.2}
                />
                
                <AnimatedText 
                  text="Skilled in Python, C++, JavaScript, and Rust with expertise in building containerized applications, CI/CD pipelines, and cloud-based infrastructure for research and clinical applications." 
                  tag="p" 
                  className="text-mono-gray mb-12" 
                  animation="fadeIn"
                  delay={200}
                  threshold={0.2}
                />
                
                {/* Skill badges with minimal styling */}
                <div className="flex flex-wrap gap-8 mt-8 justify-center">
                  <span className="border-b border-mono-black px-0 py-1 text-sm font-light">Python</span>
                  <span className="border-b border-mono-black px-0 py-1 text-sm font-light">C++</span>
                  <span className="border-b border-mono-black px-0 py-1 text-sm font-light">JavaScript</span>
                  <span className="border-b border-mono-black px-0 py-1 text-sm font-light">Rust</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Full-width Image Section */}
      <FullWidthImageSection
        title="Advancing Medical Imaging"
        subtitle="Developing cutting-edge algorithms for processing and analyzing medical images to aid in diagnosis and treatment"
        imageUrl="/images/fullwidth/medical-imaging.jpg"
        height="90vh"
        textPosition="left"
        overlayOpacity={0.8}
      >
        <Button href="/about" variant="primary" size="large">Learn More</Button>
      </FullWidthImageSection>

      {/* Projects Staggered Section */}
      <AnimatedSection 
        className="py-40 relative bg-mono-white" 
        animation="fadeIn" 
        threshold={0.1}
      >
        <div className="container-custom">
          <div className="mb-24 ml-20">
            <AnimatedText 
              text="Recent Projects" 
              tag="h2" 
              className="text-6xl mb-6" 
              animation="slideUp"
              threshold={0.2}
            />
            <AnimatedText 
              text="Explore my latest work in medical imaging and data science" 
              tag="p" 
              className="text-xl text-mono-gray max-w-xl mt-6" 
              animation="fadeIn"
              delay={200}
              threshold={0.2}
            />
          </div>
          
          {/* Staggered Projects */}
          <div className="space-y-32">
            {sampleProjects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                animation={index % 2 === 0 ? "slideRight" : "slideLeft"}
                delay={index * 100}
                threshold={0.1}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
              >
                {/* Project Image */}
                <div className="md:w-1/2 relative aspect-video overflow-hidden group">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Project Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <h3 className="text-3xl font-light mb-6">{project.title}</h3>
                  {project.description && (
                    <p className="text-mono-gray mb-8">{project.description}</p>
                  )}
                  <Button href={project.link || '#'} variant="text" size="medium">View Project</Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Final Full-width Image Section */}
      <FullWidthImageSection
        title="Let's Work Together"
        subtitle="Have a project in mind? I'm always open to discussing new ideas and collaborations"
        imageUrl="/images/fullwidth/collaboration.jpg"
        height="80vh"
        textPosition="right"
        overlayOpacity={0.8}
      >
        <Button href="/contact" variant="primary" size="large">Get in Touch</Button>
      </FullWidthImageSection>

      <Footer />
    </div>
  );
}
