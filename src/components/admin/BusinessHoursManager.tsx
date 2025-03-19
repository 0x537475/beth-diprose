import React, { useState } from 'react';
import { Pencil, Save, Clock } from 'lucide-react';

interface BusinessHour {
  id: string;
  day: string;
  hours: string;
  display_order: number;
}

interface BusinessHoursManagerProps {
  businessHours: BusinessHour[];
  onSave: (id: string, data: Partial<BusinessHour>) => Promise<void>;
  onRefresh: () => void;
}

export default function BusinessHoursManager({ businessHours, onSave, onRefresh }: BusinessHoursManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedHours, setEditedHours] = useState<BusinessHour[]>(businessHours);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Clock className="h-6 w-6 text-primary-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
        </div>
      </div>
      <div className="space-y-4">
        {editedHours.map((hour) => (
          <div key={hour.id} className="border rounded-md p-4">
            {editingId === hour.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Day</label>
                  <input
                    type="text"
                    value={hour.day}
                    onChange={(e) => setEditedHours(hours => 
                      hours.map(h => h.id === hour.id ? { ...h, day: e.target.value } : h)
                    )}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hours</label>
                  <input
                    type="text"
                    value={hour.hours}
                    onChange={(e) => setEditedHours(hours => 
                      hours.map(h => h.id === hour.id ? { ...h, hours: e.target.value } : h)
                    )}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Display Order</label>
                  <input
                    type="number"
                    value={hour.display_order}
                    onChange={(e) => setEditedHours(hours => 
                      hours.map(h => h.id === hour.id ? { ...h, display_order: parseInt(e.target.value) } : h)
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
                      onSave(hour.id, {
                        day: hour.day,
                        hours: hour.hours,
                        display_order: hour.display_order,
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
                    <h3 className="text-lg font-medium text-gray-900">{hour.day}</h3>
                    <p className="text-gray-600">{hour.hours}</p>
                    <p className="text-sm text-gray-500">Order: {hour.display_order}</p>
                  </div>
                  <button
                    onClick={() => setEditingId(hour.id)}
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