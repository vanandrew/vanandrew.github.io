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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 
              ref={heroTitleRef} 
              className="text-7xl font-medium mb-6 leading-tight opacity-0"
            >
              Andrew Van
            </h1>
            <p 
              ref={heroSubtitleRef} 
              className="text-2xl text-gray-300 mb-10 opacity-0"
            >
              Senior Machine Learning Scientist specializing in Neuroimaging and Medical Applications
            </p>
            <div 
              ref={buttonsRef} 
              className="flex space-x-6 opacity-0"
            >
              <Button href="/contact" variant="primary" size="large">Contact Me</Button>
              <Button href="/about" variant="outline" size="large">About Me</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div 
              ref={profileRef} 
              className="relative w-80 h-80 rounded-full overflow-hidden border-2 border-white/20 backdrop-blur-sm opacity-0"
            >
              <Image
                src="/images/profile.jpeg"
                alt="Andrew Van"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          ref={scrollIndicatorRef} 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center opacity-0"
        >
          <p className="text-sm mb-2">Scroll to discover</p>
          <div className="w-0.5 h-10 bg-white/30 mx-auto"></div>
        </div>
      </section>

      {/* Skills Section */}
      <AnimatedSection 
        className="py-32 relative" 
        animation="slideUp" 
        threshold={0.1}
      >
        <div className="container-custom">
          <div className="mb-16 text-center">
            <AnimatedText 
              text="Fast. Precise. Innovative." 
              tag="h2" 
              className="text-6xl" 
              animation="wordByWord"
              threshold={0.2}
            />
          </div>
          
          {/* Timeline container */}
          <div className="relative max-w-3xl mx-auto mt-20">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/10"></div>
            
            {/* Neuroimaging Card - Left side */}
            <AnimatedSection 
              className="relative mb-24" 
              animation="fadeIn" 
              delay={100} 
              threshold={0.2}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 rounded-full bg-apple-blue border-4 border-black z-10"></div>
              
              {/* Card - positioned to the left */}
              <div className="ml-0 mr-auto md:ml-0 md:mr-[calc(50%+2rem)] md:pr-8 w-full md:w-[calc(50%-2rem)]">
                <div className="p-8 apple-card relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/10 hover:border-apple-blue/50">
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-apple-blue to-apple-green"></div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-apple-blue/20 flex items-center justify-center text-apple-blue">
                      <FaBrain size={32} className="animate-pulse" />
                    </div>
                  </div>
                  
                  <AnimatedText 
                    text="Neuroimaging" 
                    tag="h3" 
                    className="text-3xl mb-4 text-center font-bold" 
                    animation="slideUp"
                    threshold={0.2}
                  />
                  
                  <AnimatedText 
                    text="Expert in MRI and fMRI techniques with extensive experience in developing novel algorithms for brain extraction, distortion correction, and functional connectivity analysis." 
                    tag="p" 
                    className="text-gray-300 mb-6" 
                    animation="fadeIn"
                    delay={200}
                    threshold={0.2}
                  />
                  
                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    <span className="bg-apple-blue/20 text-apple-blue px-3 py-1.5 rounded-full text-sm font-medium">fMRI Analysis</span>
                    <span className="bg-apple-blue/20 text-apple-blue px-3 py-1.5 rounded-full text-sm font-medium">Brain Extraction</span>
                    <span className="bg-apple-blue/20 text-apple-blue px-3 py-1.5 rounded-full text-sm font-medium">Distortion Correction</span>
                    <span className="bg-apple-blue/20 text-apple-blue px-3 py-1.5 rounded-full text-sm font-medium">Functional Connectivity</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Machine Learning Card - Right side */}
            <AnimatedSection 
              className="relative mb-24" 
              animation="fadeIn" 
              delay={200} 
              threshold={0.2}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 rounded-full bg-apple-orange border-4 border-black z-10"></div>
              
              {/* Card - positioned to the right */}
              <div className="ml-auto mr-0 md:ml-[calc(50%+2rem)] md:pl-8 w-full md:w-[calc(50%-2rem)]">
                <div className="p-8 apple-card relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/10 hover:border-apple-orange/50">
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-apple-orange to-apple-red"></div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-apple-orange/20 flex items-center justify-center text-apple-orange">
                      <FaRobot size={32} />
                    </div>
                  </div>
                  
                  <AnimatedText 
                    text="Machine Learning" 
                    tag="h3" 
                    className="text-3xl mb-4 text-center font-bold" 
                    animation="slideUp"
                    threshold={0.2}
                  />
                  
                  <AnimatedText 
                    text="Proficient in developing deep learning models using PyTorch and TensorFlow for medical image segmentation, data augmentation, and computer vision applications." 
                    tag="p" 
                    className="text-gray-300 mb-6" 
                    animation="fadeIn"
                    delay={200}
                    threshold={0.2}
                  />
                  
                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    <span className="bg-apple-orange/20 text-apple-orange px-3 py-1.5 rounded-full text-sm font-medium">PyTorch</span>
                    <span className="bg-apple-orange/20 text-apple-orange px-3 py-1.5 rounded-full text-sm font-medium">TensorFlow</span>
                    <span className="bg-apple-orange/20 text-apple-orange px-3 py-1.5 rounded-full text-sm font-medium">Computer Vision</span>
                    <span className="bg-apple-orange/20 text-apple-orange px-3 py-1.5 rounded-full text-sm font-medium">Deep Learning</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Software Engineering Card - Left side */}
            <AnimatedSection 
              className="relative" 
              animation="fadeIn" 
              delay={300} 
              threshold={0.2}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 rounded-full bg-apple-green border-4 border-black z-10"></div>
              
              {/* Card - positioned to the left */}
              <div className="ml-0 mr-auto md:ml-0 md:mr-[calc(50%+2rem)] md:pr-8 w-full md:w-[calc(50%-2rem)]">
                <div className="p-8 apple-card relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/10 hover:border-apple-green/50">
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-apple-green to-apple-blue"></div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-apple-green/20 flex items-center justify-center text-apple-green">
                      <FaCode size={32} />
                    </div>
                  </div>
                  
                  <AnimatedText 
                    text="Software Engineering" 
                    tag="h3" 
                    className="text-3xl mb-4 text-center font-bold" 
                    animation="slideUp"
                    threshold={0.2}
                  />
                  
                  <AnimatedText 
                    text="Skilled in Python, C++, JavaScript, and Rust with expertise in building containerized applications, CI/CD pipelines, and cloud-based infrastructure for research and clinical applications." 
                    tag="p" 
                    className="text-gray-300 mb-6" 
                    animation="fadeIn"
                    delay={200}
                    threshold={0.2}
                  />
                  
                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    <span className="bg-apple-green/20 text-apple-green px-3 py-1.5 rounded-full text-sm font-medium">Python</span>
                    <span className="bg-apple-green/20 text-apple-green px-3 py-1.5 rounded-full text-sm font-medium">C++</span>
                    <span className="bg-apple-green/20 text-apple-green px-3 py-1.5 rounded-full text-sm font-medium">JavaScript</span>
                    <span className="bg-apple-green/20 text-apple-green px-3 py-1.5 rounded-full text-sm font-medium">Rust</span>
                  </div>
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
