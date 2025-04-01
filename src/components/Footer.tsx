import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-mono-white text-mono-black border-t border-mono-lightgray relative overflow-hidden">
      {/* Empty background */}
      <div className="absolute inset-0 pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        {/* Asymmetric grid layout with increased negative space */}
        <div className="grid md:grid-cols-12 gap-16">
          {/* About - spans 4 columns with offset */}
          <div className="md:col-span-4 md:col-start-2">
            <h3 className="text-xl font-light mb-6 relative inline-block">
              Andrew Van
            </h3>
            <p className="text-mono-gray text-base mb-8 leading-relaxed max-w-xs">
              Innovative Data Scientist with 9 years of experience in developing advanced medical applications.
            </p>
            <div className="flex space-x-8">
              <a href="https://github.com/vanandrew" className="text-mono-gray hover:text-mono-black transition-colors">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/andrew-n-van" className="text-mono-gray hover:text-mono-black transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Spacer column for negative space */}
          <div className="md:col-span-2"></div>
          
          {/* Quick Links - spans 2 columns */}
          <div className="md:col-span-2 md:col-start-8">
            <h3 className="text-xl font-light mb-6 relative inline-block">
              Links
            </h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/" className="text-mono-gray hover:text-mono-black transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-mono-gray hover:text-mono-black transition-colors">About</Link></li>
              {/* <li><Link href="/projects" className="text-mono-gray hover:text-mono-black transition-colors">Projects</Link></li> */}
              <li><Link href="/contact" className="text-mono-gray hover:text-mono-black transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-mono-lightgray mt-16 pt-8 text-center">
          <p className="text-mono-gray text-base">© {new Date().getFullYear()} Andrew Van. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
