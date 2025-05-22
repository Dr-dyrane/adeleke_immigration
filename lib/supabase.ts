import { createClient } from "@supabase/supabase-js"

// Mock Supabase client for build time and when credentials are missing
class MockSupabaseClient {
  from(table: string) {
    return {
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
      eq: () => this.from(table),
      order: () => this.from(table),
      single: () => Promise.resolve({ data: null, error: null }),
    };
  }
}

// Determine if we're in a build environment
const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined';

// Create and export the Supabase client
let supabaseInstance: any;

try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isBuildTime || !supabaseUrl || !supabaseAnonKey) {
    console.warn('Using mock Supabase client (build time or missing credentials)');
    supabaseInstance = new MockSupabaseClient();
  } else {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.warn('Error initializing Supabase client, using mock client instead:', error);
  supabaseInstance = new MockSupabaseClient();
}

export const supabase = supabaseInstance;

// Types for our database tables
export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  created_at: string
}

export interface Resource {
  id: string
  title: string
  description: string
  content: string
  category: string
  image_url?: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  featured: boolean
  created_at: string
}
