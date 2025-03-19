import React, { useEffect } from 'react';
import { GraduationCap as GraduateCap, Heart, MapPin, Users } from 'lucide-react';
import { useSections } from '../hooks/useContent';

export default function About() {
  const { sections, loading, error } = useSections('about');

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
      {/* Header Section */}
      <div 
        className="relative bg-cover bg-center py-16 md:py32"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-primary-900 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            {sections.introduction?.title}
          </h1>
        </div>
      </div>

      {/* Personal Introduction */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-10 w-10 text-primary-600" />
          </div>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            {sections.introduction?.content}
          </p>
        </div>

        {/* Career Timeline */}
        <div className="space-y-12">
          <div className="flex items-start">
            <Users className="h-8 w-8 text-primary-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {sections.career_experience?.title}
              </h3>
              <p className="text-gray-600">
                {sections.career_experience?.content}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <GraduateCap className="h-8 w-8 text-primary-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {sections.education?.title}
              </h3>
              <p className="text-gray-600">
                {sections.education?.content}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-8 w-8 text-primary-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {sections.vancouver_island?.title}
              </h3>
              <p className="text-gray-600">
                {sections.vancouver_island?.content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
            {sections.cta?.title}
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            {sections.cta?.content}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}