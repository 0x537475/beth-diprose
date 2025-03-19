import React, { useState, useEffect } from 'react';
import { Clock, Car, Shield, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RateCard {
  duration: string;
  price: string;
  note: string | null;
  order: number;
}

export default function Rates() {
  const [rates, setRates] = useState<RateCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        const { data, error } = await supabase
          .from('rates')
          .select('*')
          .order('order');

        if (error) throw error;
        setRates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch rates');
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500">Please reload the page. Error loading rates: {error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-bold text-white text-center">
            Service Rates
          </h1>
          <p className="mt-4 text-xl text-primary-100 text-center max-w-3xl mx-auto">
            Transparent pricing for quality companion care
          </p>
        </div>
      </div>

      {/* Rates Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rates.map((rate) => (
            <div
              key={rate.id}
              className="bg-white rounded-lg shadow-sm p-6 text-center transform hover:scale-105 transition-transform duration-200"
            >
              <Clock className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {rate.duration}
              </h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">
                {rate.price}
              </p>
              {rate.note && (
                <p className="text-sm text-gray-600">{rate.note}</p>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-700 mt-8 italic">
          Daily rates are negotiable for more than 2 visits per week
        </p>
      </div>

      {/* Additional Information */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="flex items-start">
              <Car className="h-8 w-8 text-primary-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Transportation
                </h3>
                <p className="text-gray-600">
                  Travel time to and from clients is free within 20 km. Beyond that, and for client transportation, 
                  a rate of $0.65/km applies.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Shield className="h-8 w-8 text-primary-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Insurance Coverage
                </h3>
                <p className="text-gray-600">
                  I maintain comprehensive business insurance, including $5 million liability coverage for client transportation.
                  Some extended medical insurance plans may cover companion care - please check your policy for details.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CreditCard className="h-8 w-8 text-primary-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Payment Methods
                </h3>
                <p className="text-gray-600">
                  Payment can be made via e-transfer or cheque. Billing frequency can be arranged to suit your needs - 
                  either monthly or after each visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}