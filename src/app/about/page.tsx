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
                Hello! I'm a passionate web developer with expertise in modern technologies like React, Next.js, and TypeScript.
                I love building responsive, user-friendly applications that solve real-world problems.
              </p>
              <p className="text-apple-gray mb-6 leading-relaxed">
                With a background in [your background], I bring a unique perspective to every project I work on.
                I'm constantly learning and exploring new technologies to stay at the forefront of web development.
              </p>
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4 text-white">My Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'HTML/CSS', 'Tailwind CSS'].map((skill) => (
                    <span key={skill} className="bg-black/30 text-apple-gray px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="apple-card p-6">
                <h3 className="text-xl font-medium mb-3 text-white">Education</h3>
                <p className="text-apple-lightgray">Degree in [Your Field]</p>
                <p className="text-apple-gray text-sm">[University Name], [Year] - [Year]</p>
              </div>
              <div className="apple-card p-6">
                <h3 className="text-xl font-medium mb-3 text-white">Experience</h3>
                <p className="text-apple-lightgray">[Job Title]</p>
                <p className="text-apple-gray text-sm">[Company], [Year] - Present</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
