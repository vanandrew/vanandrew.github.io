import anime from 'animejs';

// Fade in from bottom animation
export const fadeInUp = (target: HTMLElement | null, delay: number = 0) => {
  if (!target) return;
  
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [50, 0],
    easing: 'easeOutExpo',
    duration: 1000,
    delay
  });
};

// Fade in animation
export const fadeIn = (target: HTMLElement | null, delay: number = 0) => {
  if (!target) return;
  
  return anime({
    targets: target,
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 800,
    delay
  });
};

// Scale in animation
export const scaleIn = (target: HTMLElement | null, delay: number = 0) => {
  if (!target) return;
  
  return anime({
    targets: target,
    opacity: [0, 1],
    scale: [0.9, 1],
    easing: 'easeOutExpo',
    duration: 1000,
    delay
  });
};

// Staggered animation for multiple elements
export const staggerItems = (targets: NodeListOf<Element> | HTMLElement[], properties: any, staggerDelay: number = 100) => {
  return anime({
    targets,
    ...properties,
    delay: anime.stagger(staggerDelay),
    easing: 'easeOutExpo'
  });
};

// Text reveal animation (letter by letter)
export const revealText = (target: HTMLElement | null, delay: number = 0) => {
  if (!target) return;
  
  // Wrap each letter in a span
  target.innerHTML = target.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");
  
  return anime.timeline({ loop: false })
    .add({
      targets: `${target.className} .letter`,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 800,
      delay: (el, i) => delay + 30 * i
    });
};

// Scroll-triggered animation setup
export const setupScrollAnimations = (selector: string = '.animate-on-scroll', threshold: number = 0.1) => {
  const elements = document.querySelectorAll(selector);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [50, 0],
          easing: 'easeOutExpo',
          duration: 800
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });
  
  elements.forEach(element => {
    observer.observe(element);
  });
  
  return observer;
};

// Continuous floating animation
export const floatingAnimation = (target: HTMLElement | null, intensity: number = 10) => {
  if (!target) return;
  
  return anime({
    targets: target,
    translateY: [`-=${intensity}`, `+=${intensity}`],
    duration: 1500,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
  });
};

// Parallax scrolling effect
export const setupParallaxEffect = (selector: string = '.parallax', factor: number = 0.2) => {
  const elements = document.querySelectorAll(selector);
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top + scrollTop;
      const distance = scrollTop - elementTop;
      
      if (element instanceof HTMLElement) {
        element.style.transform = `translateY(${distance * factor}px)`;
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
