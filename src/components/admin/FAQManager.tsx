import React, { useState } from 'react';
import { Pencil, Save } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface FAQManagerProps {
  faqs: FAQ[];
  onSave: (id: string, data: Partial<FAQ>) => Promise<void>;
  onRefresh: () => void;
}

export default function FAQManager({ faqs, onSave, onRefresh }: FAQManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedFAQs, setEditedFAQs] = useState<FAQ[]>(faqs);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {editedFAQs.map((faq) => (
          <div key={faq.id} className="border rounded-md p-4">
            {editingId === faq.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => setEditedFAQs(faqs.map(f => 
                      f.id === faq.id ? { ...f, question: e.target.value } : f
                    ))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => setEditedFAQs(faqs.map(f => 
                      f.id === faq.id ? { ...f, answer: e.target.value } : f
                    ))}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Order</label>
                  <input
                    type="number"
                    value={faq.order}
                    onChange={(e) => setEditedFAQs(faqs.map(f => 
                      f.id === faq.id ? { ...f, order: parseInt(e.target.value) } : f
                    ))}
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
                      onSave(faq.id, {
                        question: faq.question,
                        answer: faq.answer,
                        order: faq.order,
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
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    <p className="text-sm text-gray-500">Order: {faq.order}</p>
                  </div>
                  <button
                    onClick={() => setEditingId(faq.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                </div>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}