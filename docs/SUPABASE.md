# Supabase Integration Guide

This document provides detailed information about the Supabase integration in the Adeleke Immigration Services PWA.

## Overview

The application uses [Supabase](https://supabase.com/) as its backend service for:

- Database storage and retrieval
- Authentication (future implementation)
- Storage for files and images (future implementation)

## Setup

### Creating a Supabase Project

1. Sign up for a Supabase account at [supabase.com](https://supabase.com/)
2. Create a new project
3. Note your project URL and anon key (public API key)
4. Add these credentials to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Schema

Create the following tables in your Supabase database:

#### `services` Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Service title |
| description | text | Service description |
| icon | text | Icon name (from Lucide icons) |
| featured | boolean | Whether the service is featured |
| created_at | timestamp | Creation timestamp |

#### `resources` Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Resource title |
| description | text | Resource description |
| content | text | Resource content (markdown) |
| category | text | Resource category (Guide, FAQ, etc.) |
| image_url | text | Optional image URL |
| published | boolean | Whether the resource is published |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Update timestamp |

#### `contact_submissions` Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Contact name |
| email | text | Contact email |
| phone | text | Contact phone |
| service | text | Service of interest |
| message | text | Contact message |
| created_at | timestamp | Submission timestamp |

## Client Integration

### Supabase Client Setup

The Supabase client is initialized in `lib/supabase.ts`:

```typescript
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
```

### Using the Supabase Client

Import the Supabase client in your components or API routes:

```typescript
import { supabase } from "@/lib/supabase"
```

### Example: Fetching Services

```typescript
async function fetchServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    console.error("Error fetching services:", error)
    return []
  }
  
  return data
}
```

### Example: Submitting Contact Form

```typescript
async function submitContactForm(formData) {
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert([formData])
    .select()
  
  if (error) {
    console.error("Error submitting form:", error)
    throw error
  }
  
  return data
}
```

## API Routes Integration

### Services API

The services API route (`app/api/services/route.ts`) fetches services from Supabase:

```typescript
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data: services, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ services })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
```

### Resources API

The resources API routes fetch and create resources:

```typescript
// GET /api/resources
export async function GET() {
  try {
    const { data: resources, error } = await supabase
      .from("resources")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ resources })
  } catch (error) {
    console.error("Error fetching resources:", error)
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 })
  }
}

// POST /api/resources
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data: resource, error } = await supabase
      .from("resources")
      .insert([body])
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ resource })
  } catch (error) {
    console.error("Error creating resource:", error)
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 })
  }
}
```

## Future Enhancements

### Authentication

Implement user authentication for:

- Admin dashboard access
- Client portal access
- Secure document sharing

### Storage

Implement Supabase Storage for:

- Document uploads
- Profile images
- Resource images

### Real-time Updates

Implement Supabase real-time subscriptions for:

- Live chat support
- Real-time status updates
- Notification system

## Security Considerations

- Use Row Level Security (RLS) policies to secure your data
- Keep your service role key secure and never expose it to the client
- Validate all user input before inserting into the database
- Use prepared statements to prevent SQL injection
- Implement proper error handling to avoid exposing sensitive information
