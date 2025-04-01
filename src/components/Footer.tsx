import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-gray-900 text-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">NoNonsense</h3>
            <p className="text-gray-400 mb-4">
              A personal portfolio website showcasing my projects and skills.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 text-xl">
                <FaGithub />
              </a>
              <a href="#" className="text-white hover:text-gray-300 text-xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-white hover:text-gray-300 text-xl">
                <FaTwitter />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="#about" className="hover:text-white">About</Link></li>
              <li><Link href="#projects" className="hover:text-white">Projects</Link></li>
              <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: your.email@example.com</li>
              <li>Location: Your City, Country</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} NoNonsense Portfolio. All rights reserved.</p>
          <p className="mt-2">Built with Next.js and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
