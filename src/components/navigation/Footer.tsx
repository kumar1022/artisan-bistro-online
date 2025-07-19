import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Coffee className="h-8 w-8" />
              <span className="font-bold text-xl">Artisan Bistro</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Crafting exceptional coffee experiences since 2010. We source the finest beans 
              and create memorable moments for our community.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 hover:text-gold cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 hover:text-gold cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Coffee Street, Downtown
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-primary-foreground/80 text-sm">
                  (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-primary-foreground/80 text-sm">
                  hello@artisanbistro.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Artisan Bistro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-primary-foreground/60 text-sm hover:text-gold cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="text-primary-foreground/60 text-sm hover:text-gold cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;