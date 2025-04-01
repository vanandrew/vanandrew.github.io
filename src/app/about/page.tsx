import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* About Section */}
      <section className="pt-32 py-24 bg-mono-white">
        <div className="container-custom">
          <h2 className="text-5xl font-medium mb-16 text-center text-mono-black">About Me</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-mono-gray mb-6 leading-relaxed">
                Hello! I'm a Senior Machine Learning Scientist specializing in neuroimaging, image science, and deep learning applications for medical imaging.
                With extensive experience in MRI and fMRI techniques, I develop cutting-edge algorithms and software solutions for complex medical challenges.
              </p>
              <p className="text-mono-gray mb-6 leading-relaxed">
                My work spans from developing novel distortion correction methods for echo planar imaging to building cloud-based neuroimaging pipelines for clinical targeting in movement-related disorders, chronic pain, and treatment-resistant depression.
                I'm passionate about creating tools that enhance medical imaging accuracy and improve patient outcomes.
              </p>
              <p className="text-mono-gray mb-6 leading-relaxed">
                With a Ph.D. in Biomedical Engineering from Washington University in St. Louis, I combine strong technical expertise with a deep understanding of clinical applications.
              </p>
              <div className="mt-8">
                <h3 className="text-2xl font-medium mb-4 text-mono-black">My Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Python', 'C++', 'JavaScript', 'TypeScript', 'Rust', 'MATLAB', 
                    'PyTorch', 'TensorFlow', 'NumPy', 'Pandas', 
                    'Docker', 'AWS', 'CI/CD', 'Git', 'Linux',
                    'Machine Learning', 'Deep Learning', 'Computer Vision', 
                    'MRI', 'fMRI', 'Neuroimaging', 'Image Processing',
                    'Functional Connectivity', 'Image Segmentation',
                    'Three.js', 'WebGL', 'React.js', 'Django'
                  ].map((skill) => (
                    <span key={skill} className="bg-mono-offwhite border border-mono-lightgray text-mono-black px-3 py-1 rounded-full text-base">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border border-mono-lightgray p-6 mb-6">
                <h3 className="text-2xl font-medium mb-3 text-mono-black">Education</h3>
                <div className="mb-4">
                  <p className="text-mono-black">Doctor of Philosophy in Biomedical Engineering</p>
                  <p className="text-mono-gray text-base">Washington University in St. Louis, 2023 (GPA: 3.94)</p>
                </div>
                <div>
                  <p className="text-mono-black">Bachelor of Science in Biomedical Engineering</p>
                  <p className="text-mono-gray text-base">Texas A&M University, 2014 (GPA: 3.8)</p>
                </div>
              </div>
              <div className="border border-mono-lightgray p-6">
                <h3 className="text-2xl font-medium mb-3 text-mono-black">Experience</h3>
                <div className="mb-4">
                  <p className="text-mono-black">Senior Machine Learning Scientist</p>
                  <p className="text-mono-gray text-base">Turing Medical, March 2025 - Present</p>
                </div>
                <div className="mb-4">
                  <p className="text-mono-black">Machine Learning Scientist</p>
                  <p className="text-mono-gray text-base">Turing Medical, November 2023 - March 2025</p>
                </div>
                <div className="mb-4">
                  <p className="text-mono-black">Visiting Scholar</p>
                  <p className="text-mono-gray text-base">University of Pennsylvania Perelman School of Medicine, June 2023 - August 2023</p>
                </div>
                <div className="mb-4">
                  <p className="text-mono-black">Ph.D. Candidate in Biomedical Engineering</p>
                  <p className="text-mono-gray text-base">Washington University in St. Louis, August 2018 - November 2023</p>
                </div>
                <div className="mb-4">
                  <p className="text-mono-black">Neuro Imaging Research Technician</p>
                  <p className="text-mono-gray text-base">Washington University School of Medicine, August 2016 - August 2018</p>
                </div>
                <div>
                  <p className="text-mono-black">Research Assistant</p>
                  <p className="text-mono-gray text-base">Texas A&M University, January 2012 - May 2014</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
