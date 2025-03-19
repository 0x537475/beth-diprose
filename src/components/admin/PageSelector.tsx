import React from 'react';
import { Layout } from 'lucide-react';

interface Page {
  id: string;
  slug: string;
  title: string;
}

interface PageSelectorProps {
  pages: Page[];
  selectedPage: string | null;
  onPageSelect: (pageId: string) => void;
}

export default function PageSelector({ pages, selectedPage, onPageSelect }: PageSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Page to Edit</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onPageSelect(page.id)}
            className={`p-4 rounded-lg border-2 text-left hover:border-primary-500 transition-colors ${
              selectedPage === page.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
            }`}
          >
            <Layout className="h-5 w-5 text-primary-600 mb-2" />
            <h3 className="font-medium text-gray-900">{page.title}</h3>
            <p className="text-sm text-gray-500">{page.slug}</p>
          </button>
        ))}
      </div>
    </div>
  );
}