import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    // Check if we're in a build/preview environment without Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Return mock data during build time
      return NextResponse.json({
        resource: {
          id: params.slug,
          title: "Sample Resource",
          description: "This is a sample resource for build/preview environments",
          content: "Sample content goes here",
          category: "Guide",
          published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      })
    }

    const { data: resource, error } = await supabase
      .from("resources")
      .select("*")
      .eq("id", params.slug)
      .eq("published", true)
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 })
    }

    return NextResponse.json({ resource })
  } catch (error) {
    console.error("Error fetching resource:", error)
    return NextResponse.json({ error: "Failed to fetch resource" }, { status: 500 })
  }
}
