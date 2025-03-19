import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useContactDetails, useBusinessHours } from '../hooks/useContent';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>();
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const { contactDetails, loading: contactLoading } = useContactDetails();
  const { businessHours, loading: hoursLoading } = useBusinessHours();

  const getContactValue = (type: string) => {
    const detail = contactDetails.find(d => d.type === type);
    return detail ? detail.value : '';
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          to: 'beth.diprose@gmail.com',
          from_email: data.email,
          subject: `New Contact Form Submission from ${data.name}`,
          text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
          `.trim(),
        },
      });

      if (error) throw error;
      
      setSubmitStatus('success');
      reset();
    } catch (error: any) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      // Show the specific error message if available
      if (error.message) {
        console.error('Error details:', error.message);
      }
    }
  };

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
            Contact Us
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Let's discuss how we can help your loved one
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              {!contactLoading && (
                <div className="space-y-6">
                  {getContactValue('phone') && (
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-primary-600 mt-1 mr-4" />
                      <div>
                        <h3 className="font-medium text-gray-900">Phone</h3>
                        <p className="mt-1 text-gray-600">{getContactValue('phone')}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-primary-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="mt-1 text-gray-600">{getContactValue('email')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-primary-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-900">Location</h3>
                      <p className="mt-1 text-gray-600">{getContactValue('address')}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {!hoursLoading && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                  <ul className="space-y-2 text-gray-600">
                    {businessHours.map((hour) => (
                      <li key={hour.id}>{hour.day}: {hour.hours}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                    Thank You!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your message has been sent successfully. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } focus:border-primary-500 focus:ring-primary-500`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } focus:border-primary-500 focus:ring-primary-500`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', { required: 'Phone number is required' })}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    } focus:border-primary-500 focus:ring-primary-500`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message', { required: 'Message is required' })}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.message ? 'border-red-300' : 'border-gray-300'
                    } focus:border-primary-500 focus:ring-primary-500`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
                {submitStatus === 'error' && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          Sorry, we couldn't send your message. Please try again or email us directly at beth.diprose@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                </form>
              </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}