"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResourceCardProps {
  resource: {
    id: string
    title: string
    description: string
    date: string
    category: string
    image: string
  }
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Handle mouse move for parallax effect on image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const moveX = (x - centerX) / 20
    const moveY = (y - centerY) / 20

    imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`
  }

  const handleMouseLeave = () => {
    if (!imageRef.current) return
    imageRef.current.style.transform = "translate(0, 0) scale(1.05)"
    setIsHovered(false)
  }

  return (
    <Card
      ref={cardRef}
      className={cn(
        "border-0 shadow-lg overflow-hidden fluid-card transition-all duration-500 group h-full",
        isHovered ? "shadow-xl" : "",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="relative h-60 w-full overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0 transition-transform duration-500"
          style={{ transform: "scale(1.05)" }}
        >
          <Image src={resource.image || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />
        </div>

        {/* Gradient overlay that appears on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-500",
            isHovered && "opacity-100",
          )}
        />

        <div className="absolute top-4 left-4 z-10">
          <Badge
            variant="secondary"
            className={cn(
              "transition-all duration-300 backdrop-blur-sm text-md px-4 py-1.5",
              isHovered ? "bg-primary/80 text-white" : "bg-background/80",
            )}
          >
            {resource.category}
          </Badge>
        </div>

        {/* Title preview that appears on hover */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-6 transform translate-y-full transition-transform duration-500 z-10",
            isHovered && "translate-y-0",
          )}
        >
          <h3 className="text-xl font-semibold text-white drop-shadow-md line-clamp-1">{resource.title}</h3>
        </div>
      </div>

      <CardContent
        className={cn(
          "p-8 transition-all duration-500",
          isHovered && "bg-gradient-to-b from-background/50 to-background",
        )}
      >
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          {resource.date}
        </div>

        <h3 className={cn("text-2xl font-semibold mb-3 transition-all duration-300", isHovered && "text-primary")}>
          {resource.title}
        </h3>

        <p className="text-muted-foreground line-clamp-2 text-lg">{resource.description}</p>
      </CardContent>

      <CardFooter className="p-8 pt-0">
        <Button
          variant="ghost"
          className={cn("p-0 h-auto group transition-all duration-300", isHovered ? "text-primary" : "")}
          asChild
        >
          <Link href={`/resources/${resource.id}`} className="flex items-center">
            <span className="relative text-lg">
              Read More
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300",
                  isHovered && "w-full",
                )}
              ></span>
            </span>
            <ArrowRight className={cn("ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-2")} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
