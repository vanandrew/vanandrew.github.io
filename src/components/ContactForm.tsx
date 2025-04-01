"use client";

import React, { useState } from 'react';

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
    <form className="space-y-4" onSubmit={handleSubmit}>
      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Thank you for your message! I'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          There was an error sending your message. Please try again.
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
          placeholder="Your Name"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
          placeholder="Your Email"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
          placeholder="Your Message"
          required
        ></textarea>
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium w-full disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
