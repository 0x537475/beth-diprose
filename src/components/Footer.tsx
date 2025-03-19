import React, { useEffect } from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContactDetails, useBusinessHours } from '../hooks/useContent';

export default function Footer() {
  const { contactDetails, loading: contactLoading } = useContactDetails();
  const { businessHours, loading: hoursLoading } = useBusinessHours();

  const getContactValue = (type: string) => {
    const detail = contactDetails.find(d => d.type === type);
    return detail ? detail.value : '';
  };

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary-300" />
              <span className="ml-2 text-xl font-heading font-semibold">
                Beth Diprose
              </span>
            </div>
            <p className="mt-4 text-primary-100">
              Providing families with compassion and respect, caring for your loved one
              in their home or during a hospital stay.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-primary-100 hover:text-white">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-100 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-100 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-100 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              {!contactLoading && (
                <>
                  {getContactValue('phone') && (
                    <li className="flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-primary-300" />
                      <span>{getContactValue('phone')}</span>
                    </li>
                  )}
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary-300" />
                    <a href={`mailto:${getContactValue('email')}`} className="hover:text-primary-300 transition-colors">
                      {getContactValue('email')}
                    </a>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary-300" />
                    <span>{getContactValue('address')}</span>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <ul className="space-y-2">
              {!hoursLoading && businessHours.map((hour) => (
                <li key={hour.id}>{hour.day}: {hour.hours}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-700 text-center">
          <p className="text-primary-100">
            © {new Date().getFullYear()} Beth Diprose Companion Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}