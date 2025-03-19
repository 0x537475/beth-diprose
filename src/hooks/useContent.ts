import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useFAQs() {
  const [faqs, setFAQs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('order');

        if (error) throw error;
        setFAQs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQs');
      } finally {
        setLoading(false);
      }
    }

    fetchFAQs();
  }, []);

  return { faqs, loading, error };
}

export function useSections(pageSlug?: string) {
  const [sections, setSections] = useState<Record<string, { title: string; content: string }>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSections() {
      try {
        let query = supabase
          .from('page_sections')
          .select(`
            name,
            title,
            content,
            pages!inner(slug)
          `);

        if (pageSlug) {
          query = query.eq('pages.slug', pageSlug);
        }

        const { data, error } = await query;

        if (error) throw error;

        const sectionsMap = data.reduce((acc, section) => ({
          ...acc,
          [section.name]: {
            title: section.title,
            content: section.content,
          },
        }), {});

        setSections(sectionsMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch sections');
      } finally {
        setLoading(false);
      }
    }

    fetchSections();
  }, [pageSlug]);

  return { sections, loading, error };
}

export function useFeatures() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const { data, error } = await supabase
          .from('features')
          .select('*')
          .order('order');

        if (error) throw error;
        setFeatures(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch features');
      } finally {
        setLoading(false);
      }
    }

    fetchFeatures();
  }, []);

  return { features, loading, error };
}

export function useTestimonials(featured = false) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        let query = supabase.from('testimonials').select('*');
        if (featured) {
          query = query.eq('featured', true);
        }

        const { data, error } = await query;
        if (error) throw error;
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, [featured]);

  return { testimonials, loading, error };
}

export function useContactDetails() {
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContactDetails() {
      try {
        const { data, error } = await supabase
          .from('contact_details')
          .select('*')
          .order('display_order');

        if (error) throw error;
        setContactDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contact details');
      } finally {
        setLoading(false);
      }
    }

    fetchContactDetails();
  }, []);

  return { contactDetails, loading, error };
}

export function useBusinessHours() {
  const [businessHours, setBusinessHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusinessHours() {
      try {
        const { data, error } = await supabase
          .from('business_hours')
          .select('*')
          .order('display_order');

        if (error) throw error;
        setBusinessHours(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch business hours');
      } finally {
        setLoading(false);
      }
    }

    fetchBusinessHours();
  }, []);

  return { businessHours, loading, error };
}