import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Activity className="h-6 w-6 text-red-500" />
              <span className="ml-2 text-xl font-bold">
                Aurora<span className="text-red-500">: LifeLink AI</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering lives through AI-driven blood health and community connection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cancer-detection" className="text-gray-400 hover:text-white transition-colors">
                  AI Cancer Detection
                </Link>
              </li>
              <li>
                <Link to="/donor-management" className="text-gray-400 hover:text-white transition-colors">
                  Donor Management
                </Link>
              </li>
              <li>
                <Link to="/camp-locator" className="text-gray-400 hover:text-white transition-colors">
                  Blood Camp Locator
                </Link>
              </li>
              <li>
                <Link to="/blood-request" className="text-gray-400 hover:text-white transition-colors">
                  Blood Request
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-400 hover:text-white transition-colors">
                  Appointment Scheduling
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                contact@auroralifelink.ai
              </p>
              <p className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                +1 (800) 123-4567
              </p>
              <p className="text-gray-400">
                MAKAUT, <br />
                Haringhata, <br />
                West Bengal
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Aurora: LifeLink AI.2025 All rights reserved by @Boka Group👨‍💻
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
