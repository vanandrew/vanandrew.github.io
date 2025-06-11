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
      isScrolled ? 'navbar-light py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo with minimal styling */}
        <div className="text-2xl font-light text-mono-black relative">
          <span className="relative z-10">Andrew Van</span>
          <div className="absolute -bottom-1 left-0 h-px w-12 bg-mono-black"></div>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-mono-black focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        
        {/* Desktop Navigation - equal spacing with lots of negative space */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-24">
            <li><Link href="/" className="text-base text-mono-black hover:text-mono-darkgray transition-colors">Home</Link></li>
            <li><Link href="/about" className="text-base text-mono-black hover:text-mono-darkgray transition-colors">About</Link></li>
            <li><Link href="/demos" className="text-base text-mono-black hover:text-mono-darkgray transition-colors">Demos</Link></li>
            <li><Link href="/contact" className="text-base px-5 py-2 bg-mono-black text-mono-white hover:bg-mono-darkgray transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-mono-white border-t border-mono-lightgray">
          <nav className="container-custom py-6">
            <ul className="flex flex-col space-y-6">
              <li><Link href="/" className="block text-lg text-mono-black hover:text-mono-darkgray transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link href="/about" className="block text-lg text-mono-black hover:text-mono-darkgray transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link href="/demos" className="block text-lg text-mono-black hover:text-mono-darkgray transition-colors" onClick={() => setIsMenuOpen(false)}>Demos</Link></li>
              <li className="pt-4 border-t border-mono-lightgray">
                <Link href="/contact" className="inline-block text-lg px-5 py-2 bg-mono-black text-mono-white hover:bg-mono-darkgray transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
