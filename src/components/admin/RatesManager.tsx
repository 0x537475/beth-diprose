import React, { useState } from 'react';
import { Pencil, Save, DollarSign, Car, Shield, CreditCard } from 'lucide-react';

interface Rate {
  id: string;
  duration: string;
  price: string;
  note: string | null;
  order: number;
}

interface Section {
  id: string;
  name: string;
  title: string;
  content: string;
  order: number;
}

interface RatesManagerProps {
  rates: Rate[];
  sections: Section[];
  onSave: (id: string, data: Partial<Rate>) => Promise<void>;
  onSaveSection: (id: string, data: Partial<Section>) => Promise<void>;
  onRefresh: () => void;
}

export default function RatesManager({ rates, sections, onSave, onSaveSection, onRefresh }: RatesManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedRates, setEditedRates] = useState<Rate[]>(rates);
  const [editedSections, setEditedSections] = useState<Section[]>(sections || []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'transportation':
        return <Car className="h-6 w-6 text-primary-600 mr-2" />;
      case 'insurance':
        return <Shield className="h-6 w-6 text-primary-600 mr-2" />;
      case 'payment':
        return <CreditCard className="h-6 w-6 text-primary-600 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Service Rates</h2>
          </div>
        </div>
        <div className="space-y-4">
          {editedRates.map((rate) => (
            <div key={rate.id} className="border rounded-md p-4">
              {editingId === rate.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <input
                      type="text"
                      value={rate.duration}
                      onChange={(e) => setEditedRates(rates => 
                        rates.map(r => r.id === rate.id ? { ...r, duration: e.target.value } : r)
                      )}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="text"
                      value={rate.price}
                      onChange={(e) => setEditedRates(rates => 
                        rates.map(r => r.id === rate.id ? { ...r, price: e.target.value } : r)
                      )}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Note (optional)</label>
                    <input
                      type="text"
                      value={rate.note || ''}
                      onChange={(e) => setEditedRates(rates => 
                        rates.map(r => r.id === rate.id ? { ...r, note: e.target.value || null } : r)
                      )}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Display Order</label>
                    <input
                      type="number"
                      value={rate.order}
                      onChange={(e) => setEditedRates(rates => 
                        rates.map(r => r.id === rate.id ? { ...r, order: parseInt(e.target.value) } : r)
                      )}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(null);
                        onRefresh();
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        onSave(rate.id, {
                          duration: rate.duration,
                          price: rate.price,
                          note: rate.note,
                          order: rate.order,
                        }).then(() => setEditingId(null));
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{rate.duration}</h3>
                      <p className="text-gray-600">{rate.price}</p>
                      {rate.note && <p className="text-sm text-gray-500 italic">{rate.note}</p>}
                      <p className="text-sm text-gray-500">Order: {rate.order}</p>
                    </div>
                    <button
                      onClick={() => setEditingId(rate.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Rate Information Sections */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Rate Information</h2>
        <div className="space-y-4">
          {editedSections?.map((section) => (
            <div key={section.id} className="border rounded-md p-4">
              {editingId === section.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => setEditedSections(sections => 
                        sections.map(s => s.id === section.id ? { ...s, title: e.target.value } : s)
                      )}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => setEditedSections(sections => 
                        sections.map(s => s.id === section.id ? { ...s, content: e.target.value } : s)
                      )}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(null);
                        onRefresh();
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        onSaveSection(section.id, {
                          title: section.title,
                          content: section.content,
                        }).then(() => setEditingId(null));
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      {getIcon(section.name)}
                      <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                    </div>
                    <button
                      onClick={() => setEditingId(section.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-600">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}