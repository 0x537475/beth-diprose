import React, { useState } from 'react';
import { Pencil, Save } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  featured: boolean;
}

interface TestimonialManagerProps {
  testimonials: Testimonial[];
  onSave: (id: string, data: Partial<Testimonial>) => Promise<void>;
  onRefresh: () => void;
}

export default function TestimonialManager({ testimonials, onSave, onRefresh }: TestimonialManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTestimonials, setEditedTestimonials] = useState<Testimonial[]>(testimonials);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Testimonials</h2>
      <div className="space-y-4">
        {editedTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="border rounded-md p-4">
            {editingId === testimonial.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quote</label>
                  <textarea
                    value={testimonial.quote}
                    onChange={(e) => setEditedTestimonials(testimonials.map(t => 
                      t.id === testimonial.id ? { ...t, quote: e.target.value } : t
                    ))}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                      type="text"
                      value={testimonial.author}
                      onChange={(e) => setEditedTestimonials(testimonials.map(t => 
                        t.id === testimonial.id ? { ...t, author: e.target.value } : t
                      ))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={testimonial.title}
                      onChange={(e) => setEditedTestimonials(testimonials.map(t => 
                        t.id === testimonial.id ? { ...t, title: e.target.value } : t
                      ))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={testimonial.featured}
                    onChange={(e) => setEditedTestimonials(testimonials.map(t => 
                      t.id === testimonial.id ? { ...t, featured: e.target.checked } : t
                    ))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Featured testimonial
                  </label>
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
                      onSave(testimonial.id, {
                        quote: testimonial.quote,
                        author: testimonial.author,
                        title: testimonial.title,
                        featured: testimonial.featured,
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
                    <p className="text-gray-600 italic mb-2">"{testimonial.quote}"</p>
                    <p className="text-sm font-medium text-gray-900">
                      {testimonial.author} - {testimonial.title}
                    </p>
                    {testimonial.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-2">
                        Featured
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setEditingId(testimonial.id)}
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
  );
}