import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
