"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const testimonials = [
    {
      id: 1,
      name: "Maria Rodriguez",
      role: "Family-Based Immigration",
      content:
        "Peter's expertise was invaluable in helping me navigate the complex process of bringing my parents to the U.S. His attention to detail and personalized guidance made all the difference.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "James Chen",
      role: "Naturalization",
      content:
        "After struggling with my citizenship application for months, I found Adeleke Immigration Services. Peter's knowledge and support made the process smooth and stress-free. I'm now a proud U.S. citizen!",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Sophia Patel",
      role: "Work Authorization",
      content:
        "As an international professional, I needed expert guidance for my work visa. Peter provided clear, strategic advice that helped me secure my position without delays or complications.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection("right")
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
      setTimeout(() => {
        setIsAnimating(false)
        setDirection(null)
      }, 500)
    }, 300)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection("left")
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setTimeout(() => {
        setIsAnimating(false)
        setDirection(null)
      }, 500)
    }, 300)
  }

  return (
    <div
      ref={sectionRef}
      className="py-32 min-h-screen flex items-center bg-gradient-to-b from-background/90 via-background to-background/90"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from individuals and families who have successfully navigated their immigration journey with our
            support.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="border-0 shadow-xl glass rounded-3xl overflow-hidden">
            <CardContent className="p-10 md:p-16 relative">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-primary/10 blur-3xl opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-primary/10 blur-3xl opacity-60"></div>

              <Quote className="h-20 w-20 text-primary/20 mb-10" />

              <div className="space-y-10 relative">
                <div className="relative overflow-hidden min-h-[200px]">
                  <p
                    className={cn(
                      "text-xl md:text-2xl italic transition-all duration-500 absolute inset-0",
                      direction === "left"
                        ? "translate-x-full opacity-0"
                        : direction === "right"
                          ? "-translate-x-full opacity-0"
                          : "translate-x-0 opacity-100",
                    )}
                  >
                    {testimonials[activeIndex].content}
                  </p>
                </div>

                <div className="flex items-center gap-8">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-primary/20 p-1">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[activeIndex].image || "/placeholder.svg"}
                        alt={testimonials[activeIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="relative overflow-hidden h-16">
                    <div
                      className={cn(
                        "transition-all duration-500 absolute",
                        direction === "left"
                          ? "translate-y-full opacity-0"
                          : direction === "right"
                            ? "-translate-y-full opacity-0"
                            : "translate-y-0 opacity-100",
                      )}
                    >
                      <h4 className="font-semibold text-xl">{testimonials[activeIndex].name}</h4>
                      <p className="text-md text-primary">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-12 gap-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full w-14 h-14 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-300"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex items-center gap-4">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (isAnimating || index === activeIndex) return
                    setDirection(index > activeIndex ? "right" : "left")
                    setIsAnimating(true)
                    setTimeout(() => {
                      setActiveIndex(index)
                      setTimeout(() => {
                        setIsAnimating(false)
                        setDirection(null)
                      }, 500)
                    }, 300)
                  }}
                  className={cn(
                    "w-4 h-4 p-0 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-primary scale-125" : "bg-primary/20 hover:bg-primary/40",
                  )}
                  disabled={isAnimating}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full w-14 h-14 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-300"
              disabled={isAnimating}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
