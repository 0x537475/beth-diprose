import React from 'react';
import { Mail, Phone, Calendar, Heart, ArrowRight, MessageCircle, CheckCircle2, Clock } from 'lucide-react';

export default function NextSteps() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-16 md:py32"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-primary-900 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            What Do I Do Next?
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Taking the first step towards compassionate care is easy
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <Heart className="h-16 w-16 text-primary-600" />
          </div>
          <p className="text-xl text-gray-700 text-center leading-relaxed mb-6">
            Now that you want to explore having services provided by me, or you just want more information, 
            know that I am very approachable.
          </p>
          <p className="text-xl text-gray-700 text-center leading-relaxed">
            Whatever you need to know, I will answer your queries and try to allay any fears.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-6">
              <MessageCircle className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              1. Reach Out
            </h3>
            <p className="text-gray-600 mb-6">
              Contact me via email, text, or phone. I'll respond to your questions as quickly as possible.
            </p>
            <div className="space-y-4">
              <a href="mailto:beth.diprose@gmail.com" className="flex items-center justify-center text-primary-600 hover:text-primary-700">
                <Mail className="h-5 w-5 mr-2" />
                <span>Email Me</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center justify-center text-primary-600 hover:text-primary-700">
                <Phone className="h-5 w-5 mr-2" />
                <span>Call Me</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-6">
              <Calendar className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              2. Initial Meeting
            </h3>
            <p className="text-gray-600 mb-6">
              We'll schedule an initial appointment so we can meet and begin to get to know one another.
            </p>
            <div className="flex justify-center">
              <CheckCircle2 className="h-5 w-5 text-primary-600 mr-2" />
              <span className="text-gray-600">No obligation consultation</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-6">
              <Clock className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              3. Customize Care
            </h3>
            <p className="text-gray-600 mb-6">
              If you're ready, we'll discuss the details of your companion care service. You decide what you want and when you want it!
            </p>
            <div className="flex justify-center">
              <CheckCircle2 className="h-5 w-5 text-primary-600 mr-2" />
              <span className="text-gray-600">Flexible scheduling available</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Let's start a conversation about how I can help your loved one
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="mailto:beth.diprose@gmail.com"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
            >
              Contact Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}