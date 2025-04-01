import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* About Section */}
      <section className="pt-32 py-24 bg-apple-darkgray">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-16 text-center text-white">About Me</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-apple-gray mb-6 leading-relaxed">
                Hello! I'm an innovative Data Scientist with 9 years of experience in developing advanced medical applications.
                I specialize in machine learning, deep learning, and cloud-based solutions for medical imaging and clinical applications.
              </p>
              <p className="text-apple-gray mb-6 leading-relaxed">
                With a background in Biomedical Engineering and a Ph.D. from Washington University in St. Louis, I bring a unique perspective to every project I work on.
                I'm seeking to leverage my skills to drive impactful solutions in cutting-edge technologies.
              </p>
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4 text-white">My Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'C++', 'TypeScript', 'React', 'MATLAB', 'Docker', 'PyTorch', 'AWS', 'Bash', 'git', 'GNU/Linux', 'Data Science', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Medical Imaging', 'MRI', 'DICOMS'].map((skill) => (
                    <span key={skill} className="bg-black/30 text-apple-gray px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="apple-card p-6 mb-6">
                <h3 className="text-xl font-medium mb-3 text-white">Education</h3>
                <div className="mb-4">
                  <p className="text-apple-lightgray">Doctor of Philosophy in Biomedical Engineering</p>
                  <p className="text-apple-gray text-sm">Washington University in St. Louis, 2023 (GPA: 3.94)</p>
                </div>
                <div>
                  <p className="text-apple-lightgray">Bachelor of Science in Biomedical Engineering</p>
                  <p className="text-apple-gray text-sm">Texas A&M University, 2014 (GPA: 3.8)</p>
                </div>
              </div>
              <div className="apple-card p-6">
                <h3 className="text-xl font-medium mb-3 text-white">Experience</h3>
                <div className="mb-4">
                  <p className="text-apple-lightgray">Senior Machine Learning Scientist</p>
                  <p className="text-apple-gray text-sm">Turing Medical, November 2023 - Present</p>
                </div>
                <div className="mb-4">
                  <p className="text-apple-lightgray">Ph.D. Candidate</p>
                  <p className="text-apple-gray text-sm">Washington University in St. Louis, August 2018 - November 2023</p>
                </div>
                <div>
                  <p className="text-apple-lightgray">Neuro Imaging Research Technician</p>
                  <p className="text-apple-gray text-sm">Washington University in St. Louis, August 2016 - August 2018</p>
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
