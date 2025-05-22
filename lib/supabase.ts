import { createClient } from "@supabase/supabase-js"

// Use empty strings as fallbacks during build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a dummy client if credentials are missing (for build time)
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client during build time or when credentials are missing
    console.warn('Supabase credentials missing, using mock client')
    return {
      from: () => ({
        select: () => ({ data: null, error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
        eq: () => ({ data: null, error: null }),
        order: () => ({ data: null, error: null }),
        single: () => ({ data: null, error: null }),
      }),
    } as any
  }

  // Create a real client when credentials are available
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()

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
