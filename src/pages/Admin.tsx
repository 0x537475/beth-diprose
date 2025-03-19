import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut, Save, Pencil, Phone, Clock } from 'lucide-react';
import PageSelector from '../components/admin/PageSelector';
import PageSections from '../components/admin/PageSections';
import TestimonialManager from '../components/admin/TestimonialManager';
import FAQManager from '../components/admin/FAQManager';
import ContactManager from '../components/admin/ContactManager';
import BusinessHoursManager from '../components/admin/BusinessHoursManager';
import RatesManager from '../components/admin/RatesManager';

interface Page {
  id: string;
  slug: string;
  title: string;
}

interface Section {
  id: string;
  page_id: string;
  name: string;
  title: string;
  content: string;
  order: number;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  featured: boolean;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface ContactDetail {
  id: string;
  type: string;
  value: string;
  display_order: number;
}

interface BusinessHour {
  id: string;
  day: string;
  hours: string;
  display_order: number;
}

interface Rate {
  id: string;
  duration: string;
  price: string;
  note: string | null;
  order: number;
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [selectedPageSlug, setSelectedPageSlug] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHour[]>([]);
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchData();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchData();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [pagesData, testimonialsData, featuresData, faqsData, contactData, hoursData, ratesData] = await Promise.all([
      supabase.from('pages').select('*'),
      supabase.from('testimonials').select('*'),
      supabase.from('features').select('*').order('order'),
      supabase.from('faqs').select('*').order('order'),
      supabase.from('contact_details').select('*').order('display_order'),
      supabase.from('business_hours').select('*').order('display_order'),
      supabase.from('rates').select('*').order('order'),
    ]);

    if (pagesData.data) {
      const pageOrder = [
        'home',
        'services',
        'why-us',
        'about',
        'faq',
        'rates',
        'next-steps',
        'testimonials'
      ];
      
      const sortedPages = pageOrder
        .map(slug => pagesData.data.find(page => page.slug === slug))
        .filter(Boolean);
      
      setPages(sortedPages);
    }
    if (testimonialsData.data) setTestimonials(testimonialsData.data);
    if (featuresData.data) setFeatures(featuresData.data);
    if (faqsData.data) setFAQs(faqsData.data);
    if (contactData.data) setContactDetails(contactData.data);
    if (hoursData.data) setBusinessHours(hoursData.data);
    if (ratesData.data) setRates(ratesData.data);
    setLoading(false);
  }

  async function fetchPageSections(pageId: string) {
    const selectedPage = pages.find(p => p.id === pageId);
    setSelectedPageSlug(selectedPage?.slug || null);

    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', pageId)
      .order('order');

    if (error) {
      alert(error.message);
    } else if (data) {
      setSections(data);
    }
  }

  useEffect(() => {
    if (selectedPage) {
      fetchPageSections(selectedPage);
    }
  }, [selectedPage]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function handleSave(table: string, id: string, data: any) {
    const { error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id);

    if (error) {
      alert(error.message);
    } else {
      fetchData();
      setEditingId(null);
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900">
            Website Content Management
          </h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>

        <PageSelector
          pages={pages}
          selectedPage={selectedPage}
          onPageSelect={(pageId) => {
            setSelectedPage(pageId);
            const page = pages.find(p => p.id === pageId);
            setSelectedPageSlug(page?.slug || null);
            fetchPageSections(pageId);
          }}
        />

        {selectedPage && (
          <PageSections
            sections={sections}
            onSave={(id, data) => handleSave('page_sections', id, data)} 
            onRefresh={() => fetchPageSections(selectedPage)}
          />
        )}

        {selectedPageSlug === 'testimonials' && (
          <TestimonialManager
            testimonials={testimonials}
            onSave={(id, data) => handleSave('testimonials', id, data)}
            onRefresh={fetchData}
          />
        )}

        {selectedPageSlug === 'faq' && (
          <FAQManager
            faqs={faqs}
            onSave={(id, data) => handleSave('faqs', id, data)}
            onRefresh={fetchData}
          />
        )}

        {selectedPageSlug === 'rates' && (
          <RatesManager
            rates={rates}
            sections={sections}
            onSave={(id, data) => handleSave('rates', id, data)}
            onSaveSection={(id, data) => handleSave('page_sections', id, data)}
            onRefresh={fetchData}
          />
        )}

        <ContactManager
          contactDetails={contactDetails}
          onSave={(id, data) => handleSave('contact_details', id, data)}
          onRefresh={fetchData}
        />

        <BusinessHoursManager
          businessHours={businessHours}
          onSave={(id, data) => handleSave('business_hours', id, data)}
          onRefresh={fetchData}
        />
      </div>
    </div>
  );
}