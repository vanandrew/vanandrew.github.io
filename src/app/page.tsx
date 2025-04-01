"use client";

import { useEffect, useRef } from 'react';
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
              <Button href="/projects" variant="outline" size="large">View My Work</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div 
              ref={profileRef} 
              className="relative w-80 h-80 rounded-full overflow-hidden border-2 border-white/20 backdrop-blur-sm opacity-0"
            >
              {/* Replace with your profile image */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg">
                Profile Image
              </div>
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
          
          <div className="grid md:grid-cols-3 gap-10 mt-20">
            <AnimatedSection 
              className="p-8 apple-card" 
              animation="fadeIn" 
              delay={100} 
              threshold={0.2}
            >
              <AnimatedText 
                text="Neuroimaging" 
                tag="h3" 
                className="text-3xl mb-4" 
                animation="slideUp"
                threshold={0.2}
              />
              <AnimatedText 
                text="Expert in MRI and fMRI techniques with extensive experience in developing novel algorithms for brain extraction, distortion correction, and functional connectivity analysis." 
                tag="p" 
                className="text-gray-300" 
                animation="fadeIn"
                delay={200}
                threshold={0.2}
              />
            </AnimatedSection>
            
            <AnimatedSection 
              className="p-8 apple-card" 
              animation="fadeIn" 
              delay={200} 
              threshold={0.2}
            >
              <AnimatedText 
                text="Machine Learning" 
                tag="h3" 
                className="text-3xl mb-4" 
                animation="slideUp"
                threshold={0.2}
              />
              <AnimatedText 
                text="Proficient in developing deep learning models using PyTorch and TensorFlow for medical image segmentation, data augmentation, and computer vision applications." 
                tag="p" 
                className="text-gray-300" 
                animation="fadeIn"
                delay={200}
                threshold={0.2}
              />
            </AnimatedSection>
            
            <AnimatedSection 
              className="p-8 apple-card" 
              animation="fadeIn" 
              delay={300} 
              threshold={0.2}
            >
              <AnimatedText 
                text="Software Engineering" 
                tag="h3" 
                className="text-3xl mb-4" 
                animation="slideUp"
                threshold={0.2}
              />
              <AnimatedText 
                text="Skilled in Python, C++, JavaScript, and Rust with expertise in building containerized applications, CI/CD pipelines, and cloud-based infrastructure for research and clinical applications." 
                tag="p" 
                className="text-gray-300" 
                animation="fadeIn"
                delay={200}
                threshold={0.2}
              />
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Full-width Image Section */}
      <FullWidthImageSection
        title="Advancing Medical Imaging"
        subtitle="Developing cutting-edge algorithms for processing and analyzing medical images to aid in diagnosis and treatment"
        imageUrl={getPlaceholderImage(1920, 1080, "Medical Imaging")}
        height="90vh"
        textPosition="left"
        overlayOpacity={0.5}
      >
        <Button href="/about" variant="primary" size="large">Learn More</Button>
      </FullWidthImageSection>

      {/* Featured Project Section */}
      <AnimatedSection 
        className="py-32 relative" 
        animation="slideUp" 
        threshold={0.1}
      >
        <div className="container-custom">
          <div className="mb-16">
            <AnimatedText 
              text="Featured Project" 
              tag="h2" 
              className="text-6xl mb-6" 
              animation="slideUp"
              threshold={0.2}
            />
            <AnimatedText 
              text="The culmination of years of research and development" 
              tag="p" 
              className="text-xl text-gray-300" 
              animation="fadeIn"
              delay={200}
              threshold={0.2}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div 
              ref={featuredImageRef}
              className="rounded-lg overflow-hidden"
            >
              <ImageSection
                src={getPlaceholderImage(800, 600, "Brain Network Analysis")}
                alt="Brain Network Analysis"
                width={800}
                height={600}
                animation="fadeIn"
                parallax={true}
                className="rounded-lg overflow-hidden"
              />
            </div>
            
            <AnimatedSection 
              className="" 
              animation="fadeIn" 
              delay={200} 
              threshold={0.2}
            >
              <AnimatedText 
                text="Multi-Echo Distortion Correction (MEDIC)" 
                tag="h3" 
                className="text-4xl mb-6" 
                animation="slideUp"
                threshold={0.2}
              />
              <AnimatedText 
                text="Developed a novel algorithm for correcting distortion in echo planar imaging, significantly improving the accuracy and reliability of functional MRI data. Implemented in the Warpkit Python library for neuroimaging transforms." 
                tag="p" 
                className="text-gray-300 mb-8" 
                animation="fadeIn"
                delay={200}
                threshold={0.2}
              />
              <Button href="https://github.com/vanandrew/warpkit" variant="primary" size="large">View on GitHub</Button>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

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
            items={sampleProjects.map(project => ({
              ...project,
              imageUrl: getPlaceholderImage(800, 600, project.title)
            }))}
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
        imageUrl={getPlaceholderImage(1920, 1080, "Collaboration")}
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
