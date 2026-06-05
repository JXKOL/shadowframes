import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Phone } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! Our team will get back to you shortly.');
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
      <SEO 
        title="Contact Us - Support & Feedback" 
        description="Have questions or feedback? Contact the ShadowFrames team for support, feature requests, or partnership inquiries."
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black tracking-tighter mb-4">
          GET IN <span className="text-brand-purple">TOUCH</span>
        </h1>
        <p className="text-gray-400">Have questions about ShadowFrames? We're here to help.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-purple/10 rounded-xl text-brand-purple">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Email Us</h3>
              <p className="text-sm text-gray-500">support@shadowframes.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-red/10 rounded-xl text-brand-red">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Community</h3>
              <p className="text-sm text-gray-500">Join our Discord server</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-purple/10 rounded-xl text-brand-purple">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Location</h3>
              <p className="text-sm text-gray-500">Tokyo, Shinjuku District</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-colors"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-colors"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-colors resize-none"
            required
          />
          <button className="w-full py-4 bg-brand-purple text-white font-bold rounded-xl flex items-center justify-center gap-2 glow-purple hover:bg-brand-purple/80 transition-all">
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
