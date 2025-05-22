import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { data: resource, error } = await supabase
      .from("resources")
      .select("*")
      .eq("id", params.slug)
      .eq("published", true)
      .single()

    if (error) {
      throw error
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
