import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-black text-white border-t border-white/10 relative overflow-hidden">
      {/* Geometric pattern for footer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="geometric-pattern geometric-circle w-64 h-64 -right-20 -bottom-20 border-apple-accent/10"></div>
        <div className="geometric-pattern geometric-square w-32 h-32 left-40 top-20 border-apple-secondary/10"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Asymmetric grid layout */}
        <div className="grid md:grid-cols-12 gap-12">
          {/* About - spans 5 columns */}
          <div className="md:col-span-5">
            <h3 className="text-lg font-light mb-4 relative inline-block">
              Andrew Van
              <div className="absolute -bottom-1 left-0 h-0.5 w-12 bg-apple-accent"></div>
            </h3>
            <p className="text-apple-gray text-sm mb-6 leading-relaxed">
              Innovative Data Scientist with 9 years of experience in developing advanced medical applications.
            </p>
            <div className="flex space-x-6">
              <a href="https://github.com/vanandrew" className="text-apple-gray hover:text-apple-accent transition-colors">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/andrew-n-van" className="text-apple-gray hover:text-apple-accent transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links - spans 3 columns */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-light mb-4 relative inline-block">
              Quick Links
              <div className="absolute -bottom-1 left-0 h-0.5 w-8 bg-apple-secondary"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-apple-gray hover:text-apple-accent transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-apple-gray hover:text-apple-accent transition-colors">About</Link></li>
              <li><Link href="/projects" className="text-apple-gray hover:text-apple-accent transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="text-apple-gray hover:text-apple-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact - spans 4 columns */}
          <div className="md:col-span-4 md:pl-8 md:border-l border-white/10">
            <h3 className="text-lg font-light mb-4 relative inline-block">
              Contact
              <div className="absolute -bottom-1 left-0 h-0.5 w-8 bg-apple-tertiary"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="text-apple-gray">Email: vanandrew77@gmail.com</li>
              <li className="text-apple-gray">Phone: 469-288-9022</li>
              <li className="text-apple-gray">Location: United States</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-apple-gray text-sm">© {new Date().getFullYear()} Andrew Van. All rights reserved.</p>
          <p className="mt-2 text-apple-gray text-xs">Built with Next.js and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
