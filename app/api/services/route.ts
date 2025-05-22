import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if we're in a build/preview environment without Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Return mock data during build time
      return NextResponse.json({
        services: [
          {
            id: "consultation",
            title: "Consultation & Advisory",
            description: "Expert guidance on immigration options, requirements, and procedures tailored to your specific situation.",
            icon: "MessageSquare",
            featured: true,
            created_at: new Date().toISOString(),
          },
          {
            id: "application",
            title: "Application Assistance",
            description: "Comprehensive support in preparing and submitting immigration applications with accuracy and attention to detail.",
            icon: "FileText",
            featured: true,
            created_at: new Date().toISOString(),
          },
          {
            id: "document-review",
            title: "Document Review & Case Evaluation",
            description: "Thorough assessment of your documentation and case details to identify potential issues and optimize outcomes.",
            icon: "Search",
            featured: true,
            created_at: new Date().toISOString(),
          },
          {
            id: "work-authorization",
            title: "Work Authorization & Residency",
            description: "Assistance with work permits, green cards, and other residency-related matters.",
            icon: "Briefcase",
            featured: true,
            created_at: new Date().toISOString(),
          }
        ]
      })
    }

    const { data: services, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    return NextResponse.json({ services: services || [] })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
