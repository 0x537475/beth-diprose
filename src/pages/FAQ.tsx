import React, { useEffect } from 'react';
import { useFAQs } from '../hooks/useContent';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export default function FAQ() {
  const { faqs, loading, error } = useFAQs();

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500">Please reload the page. Error loading FAQs: {error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-bold text-white text-center">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-xl text-primary-100 text-center max-w-3xl mx-auto">
            Find answers to common questions about our companion services
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                {faq.question}
              </h3>
              <div className="text-gray-600">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}