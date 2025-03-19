import React, { useState } from 'react';
import { Pencil, Save, Phone } from 'lucide-react';

interface ContactDetail {
  id: string;
  type: string;
  value: string;
  display_order: number;
  visible: boolean;
}

interface ContactManagerProps {
  contactDetails: ContactDetail[];
  onSave: (id: string, data: Partial<ContactDetail>) => Promise<void>;
  onRefresh: () => void;
}

export default function ContactManager({ contactDetails, onSave, onRefresh }: ContactManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContacts, setEditedContacts] = useState<ContactDetail[]>(contactDetails);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Phone className="h-6 w-6 text-primary-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Contact Details</h2>
        </div>
      </div>
      <div className="space-y-4">
        {editedContacts.map((contact) => (
          <div key={contact.id} className="border rounded-md p-4">
            {editingId === contact.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <input
                    type="text"
                    value={contact.type}
                    onChange={(e) => setEditedContacts(contacts => 
                      contacts.map(c => c.id === contact.id ? { ...c, type: e.target.value } : c)
                    )}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Value</label>
                  <input
                    type="text"
                    value={contact.value}
                    onChange={(e) => setEditedContacts(contacts => 
                      contacts.map(c => c.id === contact.id ? { ...c, value: e.target.value } : c)
                    )}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Display Order</label>
                  <input
                    type="number"
                    value={contact.display_order}
                    onChange={(e) => setEditedContacts(contacts => 
                      contacts.map(c => c.id === contact.id ? { ...c, display_order: parseInt(e.target.value) } : c)
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
                      onSave(contact.id, {
                        type: contact.type,
                        value: contact.value,
                        display_order: contact.display_order,
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
                    <h3 className="text-lg font-medium text-gray-900">{contact.type}</h3>
                    <p className="text-gray-600">{contact.value}</p>
                    <p className="text-sm text-gray-500">Order: {contact.display_order}</p>
                  </div>
                  <button
                    onClick={() => setEditingId(contact.id)}
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