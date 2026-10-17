import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import companyData from '../json/company.json';
import faqData from '../json/faq.json';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

const Contact: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Get in <span className="text-gradient-accent">Touch</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-sans">
            Have questions about the Creator Program or need support? We're here to help you grow.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 shadow-2xl"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">First Name</label>
                  <input type="text" className="w-full bg-dark-surface border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors shadow-inner" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Last Name</label>
                  <input type="text" className="w-full bg-dark-surface border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors shadow-inner" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Email Address</label>
                <input type="email" className="w-full bg-dark-surface border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors shadow-inner" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Message</label>
                <textarea rows={4} className="w-full bg-dark-surface border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors resize-none shadow-inner" placeholder="How can we help?" />
              </div>
              <button type="submit" className="premium-button w-full py-4 text-lg">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Company Details */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">Contact Information</h3>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/20 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <p className="text-white/60">{companyData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/20 text-secondary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <p className="text-white/60">{companyData.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/20 text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Office</h4>
                  <p className="text-white/60 leading-relaxed max-w-xs">{companyData.address}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-48 rounded-2xl bg-dark-surface border border-glass-border overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/40 font-medium">Interactive Map Placeholder</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-center text-white mb-12">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={faq.id} className="glass-card overflow-hidden">
                <button
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none hover:bg-dark-surface-2 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="text-lg font-medium text-white pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-accent flex-shrink-0"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-white/60 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
