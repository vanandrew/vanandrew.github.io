import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-black text-white border-t border-white/10">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-medium mb-4">Andrew Van</h3>
            <p className="text-apple-gray text-sm mb-6 leading-relaxed">
              Innovative Data Scientist with 9 years of experience in developing advanced medical applications.
            </p>
            <div className="flex space-x-6">
              <a href="https://github.com/vanandrew" className="text-apple-gray hover:text-white transition-colors">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/andrew-n-van" className="text-apple-gray hover:text-white transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-apple-gray hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-apple-gray hover:text-white transition-colors">About</Link></li>
              <li><Link href="/projects" className="text-apple-gray hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="text-apple-gray hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
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
