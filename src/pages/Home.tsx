import React from 'react';
import { ArrowRight, Heart, Clock, Home as HomeIcon, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSections, useFeatures, useTestimonials } from '../hooks/useContent';

export default function Home() {
  const { sections, loading: sectionsLoading } = useSections();
  const { features, loading: featuresLoading } = useFeatures();
  const { testimonials, loading: testimonialsLoading } = useTestimonials(true);

  return (
    <div>
      <div className="bg-primary-50 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left md:max-w-xl mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Beth Diprose<br />
              Companion Services
            </h1>
            <p className="mt-6 text-2xl md:text-3xl font-heading text-gray-700">
              Bringing Peace of Mind to Families
            </p>
            <div className="mt-10 flex space-x-4">
              <Link
                to="/services"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-medium flex items-center justify-center"
              >
                Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-white text-primary-600 hover:bg-white/90 px-8 py-3 rounded-md font-medium border border-primary-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-xl">
              <img
                src="/portrait.png"
                alt="Beth Diprose"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary-100 w-24 h-24 rounded-full flex items-center justify-center">
              <Heart className="h-12 w-12 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement Section */}
      <div className="py-24 bg-primary-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">
            {sections.mission?.title || 'Our Mission'}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            {sections.mission?.content}
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            {sections.mission_detail?.content}
          </p>
          <p className="text-xl text-gray-700 leading-relaxed">
            {sections.mission_closing?.content}
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              Why Choose Our Services?
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {!featuresLoading && features.map((feature) => {
              const Icon = feature.icon === 'Heart' ? Heart :
                         feature.icon === 'Clock' ? Clock :
                         feature.icon === 'Shield' ? Shield :
                         Heart;
              
              return (
                <div key={feature.id} className="text-center">
                  <div className="mx-auto h-12 w-12 text-primary-600">
                    <Icon className="h-12 w-12" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-secondary-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block text-primary-600 mb-4">
              <Heart className="h-12 w-12" />
            </div>
            {!testimonialsLoading && testimonials[0] && (
              <>
                <blockquote className="text-2xl font-heading text-gray-900 italic mb-8">
                  "{testimonials[0].quote}"
                </blockquote>
                <p className="text-lg font-semibold text-gray-700">
                  - {testimonials[0].author}, {testimonials[0].title}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Contact us today to learn more about our services and how we can help
            </p>
            <div className="mt-8">
              <Link
                to="/next-steps"
                className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-md font-medium inline-flex items-center"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}