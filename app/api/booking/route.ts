import { NextResponse } from "next/server"
import { z } from "zod"

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string(),
  date: z.string(),
  time: z.string(),
  notes: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = bookingSchema.parse(body)

    // Here you would typically:
    // 1. Check availability for the requested date/time
    // 2. Store the booking in a database
    // 3. Send confirmation emails

    // For now, we'll just simulate a successful booking
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Validation error", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
  }
}
