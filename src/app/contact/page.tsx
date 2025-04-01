import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Contact Section */}
      <section className="pt-32 py-24 bg-apple-darkgray text-white">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-16 text-center">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-apple-gray mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                Feel free to contact me using the form or through my social media profiles.
              </p>
              <div className="flex space-x-6 mb-8">
                <a href="https://github.com/vanandrew" className="text-apple-gray hover:text-white transition-colors">
                  <FaGithub size={24} />
                </a>
                <a href="https://www.linkedin.com/in/andrew-n-van" className="text-apple-gray hover:text-white transition-colors">
                  <FaLinkedin size={24} />
                </a>
              </div>
              <div className="space-y-3 text-apple-gray">
                <p><span className="text-white">Email:</span> vanandrew77@gmail.com</p>
                <p><span className="text-white">Phone:</span> 469-288-9022</p>
                <p><span className="text-white">Location:</span> United States</p>
              </div>
            </div>
            <div className="apple-card p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
