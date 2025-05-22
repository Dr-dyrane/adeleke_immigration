import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if we're in a build/preview environment without Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Return mock data during build time
      return NextResponse.json({
        resources: [
          {
            id: "family-based-immigration",
            title: "Family-Based Immigration Guide",
            description: "Learn about the process, requirements, and timeline for sponsoring family members for U.S. immigration.",
            content: "Sample content goes here",
            category: "Guides",
            published: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "naturalization-process",
            title: "The Naturalization Process Explained",
            description: "A comprehensive overview of the steps to U.S. citizenship, including eligibility requirements and the application process.",
            content: "Sample content goes here",
            category: "Guides",
            published: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ]
      })
    }

    const { data: resources, error } = await supabase
      .from("resources")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    return NextResponse.json({ resources: resources || [] })
  } catch (error) {
    console.error("Error fetching resources:", error)
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Check if we're in a build/preview environment without Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Return mock response during build time
      return NextResponse.json({
        resource: {
          id: "mock-resource",
          title: "Mock Resource",
          description: "This is a mock resource for build/preview environments",
          content: "Sample content goes here",
          category: "Guide",
          published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      })
    }

    const body = await request.json()

    const { data: resource, error } = await supabase.from("resources").insert([body]).select().single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    return NextResponse.json({ resource })
  } catch (error) {
    console.error("Error creating resource:", error)
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 })
  }
}
