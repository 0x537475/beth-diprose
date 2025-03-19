import React, { useEffect } from 'react';
import { Home, Guitar as Hospital, Clock, MapPin, Book, Heart, Users, Utensils, Calendar, Car, Pill as Pills, Camera, Scaling as Walking } from 'lucide-react';
import { useSections } from '../hooks/useContent';

export default function Services() {
  const { sections, loading, error } = useSections('services');

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500">Please reload the page. Error loading content: {error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-16 md:py32"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-primary-900 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            {sections.hero?.title}
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            {sections.hero?.content}
          </p>
        </div>
      </div>

      {/* Home Care Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-primary-50 rounded-full mb-4">
            <Home className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">
            {sections.home_care_intro?.title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {sections.home_care_intro?.content}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Book className="h-6 w-6" />,
              title: sections.engagement_activities?.title || "",
              items: sections.engagement_activities?.content.split('\n') || []
            },
            {
              icon: <Walking className="h-6 w-6" />,
              title: sections.social_physical?.title || "",
              items: sections.social_physical?.content.split('\n') || []
            },
            {
              icon: <Utensils className="h-6 w-6" />,
              title: sections.daily_living?.title || "",
              items: sections.daily_living?.content.split('\n') || []
            }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-primary-600 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <ul className="space-y-2">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Care Section */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-white rounded-full mb-4">
              <Hospital className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              {sections.hospital_care?.title}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {sections.hospital_care?.content}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.hospital_services?.content.split('\n').map((service, index) => (
                <div key={index} className="flex items-start">
                  <Heart className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <span className="text-gray-600">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Locations */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary-50 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              {sections.locations?.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.locations?.content.split('\n').map((location, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-lg text-gray-900">{location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-3 bg-white rounded-full mb-4">
            <Clock className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            {sections.availability?.title}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {sections.availability?.content}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  );
}