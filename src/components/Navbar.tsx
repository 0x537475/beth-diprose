import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Why Choose Us', path: '/why-us' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Rates', path: '/rates' },
  { name: 'Next Steps', path: '/next-steps' },
  { name: 'Testimonials', path: '/testimonials' },
];

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-heading font-semibold text-gray-900">
                Beth Diprose
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } w-72 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-heading font-semibold text-gray-900">
                Beth Diprose
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md p-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 px-6 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-600 bg-primary-50 shadow-sm'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-100">
            <a
              href="/contact"
              className="flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}