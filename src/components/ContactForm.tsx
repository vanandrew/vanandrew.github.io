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
      // In a real application, you would send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {submitStatus === 'success' && (
        <div className="bg-apple-green/10 border border-apple-green/20 text-apple-green px-4 py-3 rounded-lg">
          Thank you for your message! I'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-apple-red/10 border border-apple-red/20 text-apple-red px-4 py-3 rounded-lg">
          There was an error sending your message. Please try again.
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block mb-2 text-sm text-apple-lightgray">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="apple-input w-full"
          placeholder="Your Name"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-2 text-sm text-apple-lightgray">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="apple-input w-full"
          placeholder="Your Email"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block mb-2 text-sm text-apple-lightgray">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="apple-input w-full resize-none"
          placeholder="Your Message"
          required
        ></textarea>
      </div>
      
      <button
        type="submit"
        className="apple-button-primary w-full py-3 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
