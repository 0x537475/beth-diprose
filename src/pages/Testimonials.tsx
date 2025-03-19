import React, { useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import { useTestimonials, useSections } from '../hooks/useContent';

export default function Testimonials() {
  const { testimonials, loading: testimonialsLoading, error: testimonialsError } = useTestimonials();
  const { sections, loading: sectionsLoading, error: sectionsError } = useSections('testimonials');

  if (testimonialsLoading || sectionsLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>;
  }

  if (testimonialsError || sectionsError) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500">Error loading content</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-16 md:py32"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-primary-900 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            {sections.hero?.title || 'Client Testimonials'}
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            {sections.hero?.content}
          </p>
        </div>
      </div>

      {/* Featured Testimonial */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 relative">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
            <Quote className="h-16 w-16 text-primary-100" />
          </div>
          <div className="relative">
            <div className="flex space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-primary-400 fill-current" />
              ))}
            </div>
            {testimonials[0] && (
              <>
                <blockquote className="text-2xl font-heading text-gray-900 italic mb-8">
                  "{testimonials[0].quote}"
                </blockquote>
                <div className="border-l-4 border-primary-200 pl-4">
                  <p className="text-lg font-semibold text-gray-900">{testimonials[0].author}</p>
                  <p className="text-gray-600">{testimonials[0].title}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Testimonial Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.slice(1).map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-8 relative">
              <Quote className="h-8 w-8 text-primary-100 absolute top-4 right-4" />
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-l-4 border-primary-200 pl-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-600">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            {sections.cta?.title || 'Experience Our Care Firsthand'}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {sections.cta?.content}
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