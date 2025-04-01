"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import BrainNetworkAnimation from '@/components/BrainNetworkAnimation';
import AnimatedText from '@/components/AnimatedText';
import AnimatedSection from '@/components/AnimatedSection';
import ImageSection from '@/components/ImageSection';
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
  const featuredImageRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  
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
    
    // Add floating animation to featured image
    if (featuredImageRef.current) {
      anime({
        targets: featuredImageRef.current,
        translateY: [-5, 5],
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
    
    return () => {
      cleanupParallax();
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <BrainNetworkAnimation />
      <Navbar />

      {/* Hero Section with asymmetric layout */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Additional geometric patterns specific to hero section */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="geometric-pattern geometric-circle w-48 h-48 left-1/4 top-1/4 border-apple-accent/20"></div>
          <div className="geometric-pattern geometric-square w-32 h-32 right-1/4 bottom-1/3 border-apple-secondary/20"></div>
          <div className="geometric-pattern geometric-triangle w-24 h-24 left-1/3 bottom-1/4 bg-apple-tertiary/5"></div>
        </div>
        
        <div className="container-custom grid md:grid-cols-12 gap-20 items-center">
          {/* Text content - spans 7 columns with asymmetric padding */}
          <div className="md:col-span-7 md:pr-20">
            <h1 
              ref={heroTitleRef} 
              className="text-7xl font-light mb-8 leading-tight opacity-0 relative"
            >
              Andrew Van
              <div className="absolute -bottom-3 left-0 h-0.5 w-24 bg-apple-accent"></div>
            </h1>
            <p 
              ref={heroSubtitleRef} 
              className="text-2xl text-gray-300 mb-14 opacity-0 max-w-xl"
            >
              Senior Machine Learning Scientist specializing in Neuroimaging and Medical Applications
            </p>
            <div 
              ref={buttonsRef} 
              className="flex space-x-8 opacity-0"
            >
              <Button href="/contact" variant="primary" size="large">Contact Me</Button>
              <Button href="/about" variant="outline" size="large">About Me</Button>
            </div>
          </div>
          
          {/* Profile image - spans 5 columns with offset positioning */}
          <div className="md:col-span-5 flex justify-center relative">
            {/* Decorative element behind profile */}
            <div className="absolute w-64 h-64 rounded-tr-3xl rounded-bl-3xl bg-apple-accent/5 transform rotate-12"></div>
            
            <div 
              ref={profileRef} 
              className="relative w-80 h-80 rounded-tl-3xl rounded-br-3xl overflow-hidden border border-white/20 backdrop-blur-sm opacity-0 transform -rotate-3"
            >
              <Image
                src="/images/profile.jpeg"
                alt="Andrew Van"
                fill
                className="object-cover"
                priority
              />
              
              {/* Small accent elements */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-apple-accent/20 rounded-full"></div>
              <div className="absolute -top-2 -left-2 w-8 h-8 border border-apple-secondary/30 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          ref={scrollIndicatorRef} 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center opacity-0"
        >
          <p className="text-sm mb-2 font-light">Scroll to discover</p>
          <div className="w-0.5 h-10 bg-apple-accent/30 mx-auto"></div>
        </div>
      </section>

      {/* Skills Section */}
      <AnimatedSection 
        className="py-40 relative" 
        animation="slideUp" 
        threshold={0.1}
      >
        {/* Geometric patterns for skills section */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="geometric-pattern geometric-square w-40 h-40 -left-10 top-40 border-apple-accent/10 rotate-12"></div>
          <div className="geometric-pattern geometric-triangle w-32 h-32 right-20 bottom-40 bg-apple-secondary/5"></div>
        </div>
        
        <div className="container-custom">
          <div className="mb-20 text-left max-w-3xl mx-auto">
            <AnimatedText 
              text="Fast. Precise. Innovative." 
              tag="h2" 
              className="text-6xl font-light relative inline-block" 
              animation="wordByWord"
              threshold={0.2}
            />
            <div className="h-0.5 w-32 bg-apple-accent mt-4"></div>
          </div>
          
          {/* Skills grid with asymmetric layout */}
          <div className="grid md:grid-cols-12 gap-12 mt-20">
            {/* Neuroimaging Card - spans 5 columns */}
            <AnimatedSection 
              className="md:col-span-5 md:col-start-1" 
              animation="fadeIn" 
              delay={100} 
              threshold={0.2}
            >
              <div className="p-10 bg-apple-darkgray/90 backdrop-blur-md rounded-tl-3xl rounded-br-3xl overflow-hidden border border-white/10 hover:border-apple-accent/50 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg relative group h-full">
                {/* Accent elements */}
                <div className="absolute top-0 right-0 w-24 h-1 bg-apple-accent"></div>
                <div className="absolute bottom-0 left-0 w-1 h-24 bg-apple-accent"></div>
                
                {/* Icon with asymmetric positioning */}
                <div className="flex justify-start mb-8">
                  <div className="w-16 h-16 rounded-tl-xl rounded-br-xl bg-apple-accent/20 flex items-center justify-center text-apple-accent">
                    <FaBrain size={32} className="animate-pulse" />
                  </div>
                </div>
                
                <AnimatedText 
                  text="Neuroimaging" 
                  tag="h3" 
                  className="text-3xl mb-6 font-light" 
                  animation="slideUp"
                  threshold={0.2}
                />
                
                <AnimatedText 
                  text="Expert in MRI and fMRI techniques with extensive experience in developing novel algorithms for brain extraction, distortion correction, and functional connectivity analysis." 
                  tag="p" 
                  className="text-gray-300 mb-8" 
                  animation="fadeIn"
                  delay={200}
                  threshold={0.2}
                />
                
                {/* Skill badges with asymmetric layout */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="bg-apple-accent/10 text-apple-accent px-3 py-1.5 rounded-tl-lg rounded-br-lg text-sm font-light">fMRI Analysis</span>
                  <span className="bg-apple-accent/10 text-apple-accent px-3 py-1.5 rounded-tl-lg rounded-br-lg text-sm font-light">Brain Extraction</span>
                  <span className="bg-apple-accent/10 text-apple-accent px-3 py-1.5 rounded-tl-lg rounded-br-lg text-sm font-light">Distortion Correction</span>
                  <span className="bg-apple-accent/10 text-apple-accent px-3 py-1.5 rounded-tl-lg rounded-br-lg text-sm font-light">Functional Connectivity</span>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Machine Learning Card - spans 7 columns with offset */}
            <AnimatedSection 
              className="md:col-span-7 md:col-start-6 md:mt-16" 
              animation="fadeIn" 
              delay={200} 
              threshold={0.2}
            >
              <div className="p-10 bg-apple-darkgray/90 backdrop-blur-md rounded-tr-3xl rounded-bl-3xl overflow-hidden border border-white/10 hover:border-apple-secondary/50 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg relative group h-full">
                {/* Accent elements */}
                <div className="absolute top-0 left-0 w-24 h-1 bg-apple-secondary"></div>
                <div className="absolute bottom-0 right-0 w-1 h-24 bg-apple-secondary"></div>
                
                {/* Icon with asymmetric positioning */}
                <div className="flex justify-end mb-8">
                  <div className="w-16 h-16 rounded-tr-xl rounded-bl-xl bg-apple-secondary/20 flex items-center justify-center text-apple-secondary">
                    <FaRobot size={32} />
                  </div>
                </div>
                
                <AnimatedText 
                  text="Machine Learning" 
                  tag="h3" 
                  className="text-3xl mb-6 font-light text-right" 
                  animation="slideUp"
                  threshold={0.2}
                />
                
                <AnimatedText 
                  text="Proficient in developing deep learning models using PyTorch and TensorFlow for medical image segmentation, data augmentation, and computer vision applications." 
                  tag="p" 
                  className="text-gray-300 mb-8" 
                  animation="fadeIn"
                  delay={200}
                  threshold={0.2}
                />
                
                {/* Skill badges with asymmetric layout */}
                <div className="flex flex-wrap gap-2 mt-6 justify-end">
                  <span className="bg-apple-secondary/10 text-apple-secondary px-3 py-1.5 rounded-tr-lg rounded-bl-lg text-sm font-light">PyTorch</span>
                  <span className="bg-apple-secondary/10 text-apple-secondary px-3 py-1.5 rounded-tr-lg rounded-bl-lg text-sm font-light">TensorFlow</span>
                  <span className="bg-apple-secondary/10 text-apple-secondary px-3 py-1.5 rounded-tr-lg rounded-bl-lg text-sm font-light">Computer Vision</span>
                  <span className="bg-apple-secondary/10 text-apple-secondary px-3 py-1.5 rounded-tr-lg rounded-bl-lg text-sm font-light">Deep Learning</span>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Software Engineering Card - spans 6 columns with offset */}
            <AnimatedSection 
              className="md:col-span-6 md:col-start-3 md:mt-8" 
              animation="fadeIn" 
              delay={300} 
              threshold={0.2}
            >
              <div className="p-10 bg-apple-darkgray/90 backdrop-blur-md rounded-tl-3xl rounded-tr-3xl overflow-hidden border border-white/10 hover:border-apple-tertiary/50 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg relative group h-full">
                {/* Accent elements */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-apple-tertiary"></div>
                <div className="absolute bottom-0 left-0 w-1 h-24 bg-apple-tertiary"></div>
                <div className="absolute bottom-0 right-0 w-1 h-24 bg-apple-tertiary"></div>
                
                {/* Icon with centered positioning */}
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-apple-tertiary/20 flex items-center justify-center text-apple-tertiary">
                    <FaCode size={32} />
                  </div>
                </div>
                
                <AnimatedText 
                  text="Software Engineering" 
                  tag="h3" 
                  className="text-3xl mb-6 font-light text-center" 
                  animation="slideUp"
                  threshold={0.2}
                />
                
                <AnimatedText 
                  text="Skilled in Python, C++, JavaScript, and Rust with expertise in building containerized applications, CI/CD pipelines, and cloud-based infrastructure for research and clinical applications." 
                  tag="p" 
                  className="text-gray-300 mb-8" 
                  animation="fadeIn"
                  delay={200}
                  threshold={0.2}
                />
                
                {/* Skill badges with centered layout */}
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  <span className="bg-apple-tertiary/10 text-apple-tertiary px-3 py-1.5 rounded-full text-sm font-light">Python</span>
                  <span className="bg-apple-tertiary/10 text-apple-tertiary px-3 py-1.5 rounded-full text-sm font-light">C++</span>
                  <span className="bg-apple-tertiary/10 text-apple-tertiary px-3 py-1.5 rounded-full text-sm font-light">JavaScript</span>
                  <span className="bg-apple-tertiary/10 text-apple-tertiary px-3 py-1.5 rounded-full text-sm font-light">Rust</span>
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
        overlayOpacity={0.5}
      >
        <Button href="/about" variant="primary" size="large">Learn More</Button>
      </FullWidthImageSection>


      {/* Projects Grid Section */}
      <AnimatedSection 
        className="py-32 relative bg-apple-darkgray" 
        animation="fadeIn" 
        threshold={0.1}
      >
        <div className="container-custom">
          <div className="mb-16">
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
              className="text-xl text-gray-300" 
              animation="fadeIn"
              delay={200}
              threshold={0.2}
            />
          </div>
          
          <ImageGrid 
            items={sampleProjects}
            columns={3}
            gap="gap-8"
            aspectRatio="aspect-video"
            showOverlay={true}
            showTitle={true}
            showDescription={true}
          />
        </div>
      </AnimatedSection>

      {/* Final Full-width Image Section */}
      <FullWidthImageSection
        title="Let's Work Together"
        subtitle="Have a project in mind? I'm always open to discussing new ideas and collaborations"
        imageUrl="/images/fullwidth/collaboration.jpg"
        height="80vh"
        textPosition="center"
        overlayOpacity={0.6}
      >
        <Button href="/contact" variant="primary" size="large">Get in Touch</Button>
      </FullWidthImageSection>

      <Footer />
    </div>
  );
}
