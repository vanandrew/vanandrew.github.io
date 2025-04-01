"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'apple-blur-bg py-4 backdrop-blur-xl' : 'bg-transparent py-6'
    }`}>
      <div className="container-custom flex justify-between items-center">
        <div className="text-xl font-medium text-white">NoNonsense</div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link href="/" className="text-sm text-white/90 hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="text-sm text-white/90 hover:text-white transition-colors">About</Link></li>
            <li><Link href="/projects" className="text-sm text-white/90 hover:text-white transition-colors">Projects</Link></li>
            <li><Link href="/contact" className="text-sm text-white/90 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 apple-blur-bg border-t border-white/10">
          <nav className="container-custom py-6">
            <ul className="flex flex-col space-y-6">
              <li><Link href="/" className="block text-white/90 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link href="/about" className="block text-white/90 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link href="/projects" className="block text-white/90 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</Link></li>
              <li><Link href="/contact" className="block text-white/90 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
