"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-6 bg-gray-800 text-white">
      <div className="container-custom flex justify-between items-center">
        <div className="text-2xl font-bold">NoNonsense</div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link href="#about" className="hover:text-gray-300">About</Link></li>
            <li><Link href="#projects" className="hover:text-gray-300">Projects</Link></li>
            <li><Link href="#contact" className="hover:text-gray-300">Contact</Link></li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 py-4 bg-gray-700">
            <ul className="flex flex-col space-y-4">
              <li><Link href="/" className="block hover:text-gray-300">Home</Link></li>
              <li><Link href="#about" className="block hover:text-gray-300">About</Link></li>
              <li><Link href="#projects" className="block hover:text-gray-300">Projects</Link></li>
              <li><Link href="#contact" className="block hover:text-gray-300">Contact</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
