import React, { useState } from 'react';
import { Pencil, Save } from 'lucide-react';

interface Section {
  id: string;
  page_id: string;
  name: string;
  title: string;
  content: string;
  order: number;
}

interface PageSectionsProps {
  sections: Section[];
  onSave: (id: string, data: Partial<Section>) => Promise<void>;
  onRefresh: () => void;
}

export default function PageSections({ sections, onSave, onRefresh }: PageSectionsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedSections, setEditedSections] = useState<Section[]>(sections);

  if (!sections.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Page Sections</h2>
      <div className="space-y-4">
        {editedSections.map((section) => (
          <div key={section.id} className="border rounded-md p-4">
            {editingId === section.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => setEditedSections(sections.map(s => 
                      s.id === section.id ? { ...s, title: e.target.value } : s
                    ))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={section.content}
                    onChange={(e) => setEditedSections(sections.map(s => 
                      s.id === section.id ? { ...s, content: e.target.value } : s
                    ))}
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
                      onSave(section.id, {
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
                  <div>
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
                <p className="text-gray-600 whitespace-pre-wrap">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}