import { Link } from "wouter";
import { Sprout, Twitter, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-neutral-800 dark:bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Sprout className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold">AfricaMechanize</h3>
                <p className="text-sm opacity-75">Sustainable Agriculture</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Empowering African agriculture through sustainable mechanization solutions, featuring 42 educational resources from the established Africa Mechanize platform and expert partnerships with FAO, CGIAR, and ACT Africa.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/africamechanize" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://facebook.com/africamechanize" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://linkedin.com/company/africamechanize" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://youtube.com/@africamechanize" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/framework" className="text-gray-300 hover:text-primary transition-colors">
                  F-SAMA Framework
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-primary transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="text-gray-300 hover:text-primary transition-colors">
                  Webinars
                </Link>
              </li>
            </ul>
          </div>

          {/* Framework */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Framework Elements</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/framework/farm-power" className="text-gray-300 hover:text-primary transition-colors">
                  Farm Power
                </Link>
              </li>
              <li>
                <Link href="/framework/innovative-financing" className="text-gray-300 hover:text-primary transition-colors">
                  Innovative Financing
                </Link>
              </li>
              <li>
                <Link href="/framework/sustainable-systems" className="text-gray-300 hover:text-primary transition-colors">
                  Sustainable Systems
                </Link>
              </li>
              <li>
                <Link href="/framework/social-sustainability" className="text-gray-300 hover:text-primary transition-colors">
                  Social Sustainability
                </Link>
              </li>
              <li>
                <Link href="/framework/human-resources" className="text-gray-300 hover:text-primary transition-colors">
                  Human Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="text-primary" size={16} />
                <span className="text-gray-300">info@africamechanize.org</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-primary" size={16} />
                <span className="text-gray-300">+254 20 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="text-primary" size={16} />
                <span className="text-gray-300">Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 AfricaMechanize. All rights reserved. |
            <a href="#" className="hover:text-primary transition-colors ml-1">Privacy Policy</a> |
            <a href="#" className="hover:text-primary transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};