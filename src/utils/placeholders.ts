// Placeholder image URLs
// These can be replaced with actual image URLs later

// Hero/Banner Images (16:9 ratio)
export const heroImages = [
  '/images/hero-1.jpg', // Replace with actual image path
  '/images/hero-2.jpg', // Replace with actual image path
  '/images/hero-3.jpg', // Replace with actual image path
];

// Project Images (4:3 ratio)
export const projectImages = [
  '/images/project-1.jpg', // Replace with actual image path
  '/images/project-2.jpg', // Replace with actual image path
  '/images/project-3.jpg', // Replace with actual image path
  '/images/project-4.jpg', // Replace with actual image path
  '/images/project-5.jpg', // Replace with actual image path
  '/images/project-6.jpg', // Replace with actual image path
];

// Profile Images (1:1 ratio)
export const profileImages = [
  '/images/profile-1.jpg', // Replace with actual image path
  '/images/profile-2.jpg', // Replace with actual image path
];

// Sample data for ImageGrid component
export const sampleProjects = [
  {
    id: 'brainextractor',
    title: 'Brain Extractor',
    description: 'A re-implementation of FSL\'s Brain Extraction Tool in Python, providing automated brain extraction for neuroimaging data',
    imageUrl: '/images/project-1.jpg',
    link: 'https://github.com/vanandrew/brainextractor'
  },
  {
    id: 'wbsurfer2',
    title: 'WB Surfer 2',
    description: 'CLI tool for making CIFTI-related movies, supporting Connectome Workbench 2.0 for visualizing brain connectivity data',
    imageUrl: '/images/project-2.jpg',
    link: 'https://github.com/vanandrew/wbsurfer2'
  },
  {
    id: 'warpkit',
    title: 'Warp Kit',
    description: 'Python library for neuroimaging transforms, implementing the Multi-Echo Distortion Correction (MEDIC) algorithm',
    imageUrl: '/images/project-3.jpg',
    link: 'https://github.com/vanandrew/warpkit'
  },
  {
    id: 'project-4',
    title: 'Deep Brain Stimulation Visual Programming',
    description: 'Led development of a visual programming application for DBS surgical procedures, enhancing lead programming for clinicians',
    imageUrl: '/images/project-4.jpg',
    link: '/projects/dbs-visual-programming'
  },
  {
    id: 'project-5',
    title: 'Neuroimaging Pipelines',
    description: 'Built cloud-based neuroimaging pipelines for clinical targeting in movement-related disorders',
    imageUrl: '/images/project-5.jpg',
    link: '/projects/neuroimaging-pipelines'
  },
  {
    id: 'project-6',
    title: 'FIRMM: Real-time Head Motion Tracking',
    description: 'Developed a real-time head motion tracking system for MRI scanners, resulting in a patented technology and successful startup',
    imageUrl: '/images/project-6.jpg',
    link: '/projects/firmm'
  }
];

// Sample data for FullWidthImageSection component
export const sampleHeroSections = [
  {
    title: 'Advancing Medical Imaging',
    subtitle: 'Developing cutting-edge algorithms for processing and analyzing medical images to aid in diagnosis and treatment',
    imageUrl: '/images/hero-1.jpg'
  },
  {
    title: 'Data-Driven Healthcare',
    subtitle: 'Leveraging advanced statistical methods and machine learning to extract meaningful insights from complex datasets',
    imageUrl: '/images/hero-2.jpg'
  },
  {
    title: 'Innovative Research',
    subtitle: 'Pushing the boundaries of what\'s possible in medical technology through rigorous research and development',
    imageUrl: '/images/hero-3.jpg'
  }
];

// Function to get a placeholder image URL based on dimensions
export const getPlaceholderImage = (width: number, height: number, text: string = 'Placeholder Image') => {
  // This uses a placeholder image service
  // In production, replace with actual images
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
};
