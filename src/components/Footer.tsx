import React from 'react';
import { NavLink } from 'react-router-dom';
import footerData from '../json/footer.json';
import companyData from '../json/company.json';
import { Instagram, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { ANDROID_APK_URL } from '../constants';

const iconMap: Record<string, React.ReactNode> = {
  Instagram: <Instagram size={20} />,
  Facebook: <Facebook size={20} />,
  Twitter: <Twitter size={20} />,
  Linkedin: <Linkedin size={20} />,
  Youtube: <Youtube size={20} />
};

import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-dark-bg pt-24 pb-12 overflow-hidden border-t border-glass-border mt-20">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-3">
              <img src={logo} alt="Popli Logo" className="h-14 md:h-16 w-auto object-contain mix-blend-screen" />
              <div className="flex flex-col items-start justify-center">
                <span className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: '#e62484' }}>Popli</span>
                <div className="text-[0.55rem] md:text-xs font-bold tracking-widest mt-0.5">
                  <span style={{ color: '#e62484' }}>CREATE. </span>
                  <span style={{ color: '#31b7d6' }}>SHARE. </span>
                  <span style={{ color: '#fbc343' }}>EARN.</span>
                </div>
              </div>
            </NavLink>
            <p className="text-white/60 text-sm max-w-xs leading-relaxed">
              India's Next Generation Creator Platform. Create, Share, and Earn on your own terms.
            </p>
            <div className="flex space-x-4">
              {companyData.socials.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-surface flex items-center justify-center text-white hover:bg-accent transition-colors border border-glass-border shadow-sm"
                >
                  {iconMap[social.icon]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              {footerData.quickLinks.map((link, idx) => {
                const targetUrl = link.path.startsWith('http') ? ANDROID_APK_URL : link.path;
                const isExternal = link.path.startsWith('http');
                return (
                  <li key={idx}>
                    {isExternal ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors text-sm flex items-center group"
                      >
                        <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">
                          <ArrowRight size={14} className="text-accent" />
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300 block">{link.label}</span>
                      </a>
                    ) : (
                      <NavLink 
                        to={link.path}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-white/60 hover:text-white transition-colors text-sm flex items-center group"
                      >
                        <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">
                          <ArrowRight size={14} className="text-accent" />
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300 block">{link.label}</span>
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6 tracking-wide">Legal</h3>
            <ul className="space-y-4">
              {footerData.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink 
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-white/60 hover:text-white transition-colors text-sm inline-block transform hover:-translate-y-0.5 duration-300"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6 tracking-wide">{footerData.newsletter.title}</h3>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              {footerData.newsletter.description}
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-dark-surface border border-glass-border rounded-full py-3 px-6 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all shadow-inner"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 aspect-square rounded-full bg-white text-black hover:bg-gray-200 flex items-center justify-center transition-colors shadow-md"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-white/40 text-sm">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
