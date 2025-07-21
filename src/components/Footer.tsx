import React from 'react';
import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { title: 'Salary Prediction', href: '#prediction' },
    { title: 'Market Insights', href: '#insights' },
    { title: 'Company Analysis', href: '#companies' },
    { title: 'Analytics Dashboard', href: '#analytics' }
  ];

  const resources = [
    { title: 'Methodology', href: '#methodology' },
    { title: 'Data Sources', href: '#data' },
    { title: 'API Documentation', href: '#api' },
    { title: 'Research Papers', href: '#research' }
  ];

  const support = [
    { title: 'Help Center', href: '#help' },
    { title: 'Contact Support', href: '#contact' },
    { title: 'Privacy Policy', href: '#privacy' },
    { title: 'Terms of Service', href: '#terms' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' }
  ];

  return (
    <footer className="bg-primary-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2 text-2xl font-bold">
              <TrendingUp className="h-8 w-8 text-accent" />
              <span className="text-accent">Salary</span>
              <span>Scope</span>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              SalaryScope helps you get accurate salary insights using market research and data analytics 
              for the Indian employment market across diverse industries.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-accent" />
                <span>contact@salaryscope.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-accent" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Bangalore, India</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className={`p-2 bg-white/10 rounded-full transition-colors ${social.color}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Analytics</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.href} 
                    className="text-sm text-gray-300 hover:text-accent transition-colors"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Help Platform</h3>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-sm text-gray-300 hover:text-accent transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-300">
                Get the latest salary insights and market trends delivered to your inbox
              </p>
            </div>
            <div className="flex gap-2 min-w-[300px]">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="px-6 py-2 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-300">
              © 2024 SalaryScope. All rights reserved.
            </div>
            
            {/* Bottom Links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="text-gray-300 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-300 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-gray-300 hover:text-accent transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">
              Data accuracy is subject to market conditions. SalaryScope provides estimates based on available market research.
              For professional career guidance, consult with certified career advisors.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;