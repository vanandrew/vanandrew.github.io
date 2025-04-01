"use client";

import React, { useState } from 'react';
import Button from './Button';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Using Formspree to handle form submissions without a backend
      const response = await fetch('https://formspree.io/f/movenorw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {submitStatus === 'success' && (
        <div className="bg-mono-offwhite border border-mono-black/20 text-mono-black px-4 py-3 rounded-lg">
          Thank you for your message! I'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-mono-offwhite border border-mono-black/20 text-mono-black px-4 py-3 rounded-lg">
          There was an error sending your message. Please try again.
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block mb-2 text-sm text-mono-black">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mono-input w-full"
          placeholder="Your Name"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-2 text-sm text-mono-black">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mono-input w-full"
          placeholder="Your Email"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block mb-2 text-sm text-mono-black">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="mono-input w-full resize-none"
          placeholder="Your Message"
          required
        ></textarea>
      </div>
      
      <button
        type="submit"
        className="mono-button-primary w-full py-3 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
