import React from 'react';
import { UserCheck, Heart, Phone, ClipboardCheck, Shield, Users } from 'lucide-react';

export default function WhyUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-16 md:py32"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-primary-900 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            Why Choose Beth Diprose Companion Services?
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Experience the difference of personalized, consistent care
          </p>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <UserCheck className="h-12 w-12 text-primary-600 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Consistent, Personal Care
            </h3>
            <p className="text-gray-600 mb-4">
              I personally provide all services, ensuring you'll always see the same familiar face. No rotating caregivers, just consistent, reliable care you can count on.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <ClipboardCheck className="h-12 w-12 text-primary-600 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Detailed Observation
            </h3>
            <p className="text-gray-600 mb-4">
              With regular visits from the same caregiver, changes in behavior or health are more readily noticed and documented, ensuring precise communication with family members.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <Phone className="h-12 w-12 text-primary-600 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Direct Communication
            </h3>
            <p className="text-gray-600 mb-4">
              One call is all it takes. Families get quick responses and peace of mind knowing exactly who to reach out to.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Qualities Section */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              What Sets Me Apart
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Professional Experience
                    </h3>
                    <p className="text-gray-600">
                      Well-educated with a Master's degree and extensive experience in social services and caregiving.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Heart className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Genuine Empathy
                    </h3>
                    <p className="text-gray-600">
                      An optimistic and considerate person with a natural ability to connect and make others feel comfortable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Trusted Confidant
                    </h3>
                    <p className="text-gray-600">
                      Easy to talk to and a natural confidant, building meaningful relationships with clients.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ClipboardCheck className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Reliable & Dedicated
                    </h3>
                    <p className="text-gray-600">
                      Committed to developing healthy relationships where clients feel comfortable and happy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Let's discuss how I can provide the personalized care your loved one deserves
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
}