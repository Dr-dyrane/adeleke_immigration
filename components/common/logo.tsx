"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "footer" | "mobile"
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isFooter = variant === "footer"
  const isMobile = variant === "mobile"

  return (
    <Link href="/" className={cn("relative group", className)}>
      <div className="flex items-center gap-2">
        <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <svg
            width={isMobile ? "32" : isFooter ? "40" : "48"}
            height={isMobile ? "32" : isFooter ? "40" : "48"}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            {/* Eagle Shield Background */}
            <path
              d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4Z"
              fill="currentColor"
              fillOpacity="0.1"
            />

            {/* Eagle Wings */}
            <motion.path
              d="M38 20C38 20 34 16 24 16C14 16 10 20 10 20C10 20 14 14 24 14C34 14 38 20 38 20Z"
              fill="currentColor"
              animate={{
                d: [
                  "M38 20C38 20 34 16 24 16C14 16 10 20 10 20C10 20 14 14 24 14C34 14 38 20 38 20Z",
                  "M40 18C40 18 34 14 24 14C14 14 8 18 8 18C8 18 14 12 24 12C34 12 40 18 40 18Z",
                  "M38 20C38 20 34 16 24 16C14 16 10 20 10 20C10 20 14 14 24 14C34 14 38 20 38 20Z",
                ],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />

            {/* Eagle Body */}
            <path d="M24 18C20.686 18 18 20.686 18 24V32H30V24C30 20.686 27.314 18 24 18Z" fill="currentColor" />

            {/* Eagle Head */}
            <path
              d="M24 16C22.895 16 22 16.895 22 18C22 19.105 22.895 20 24 20C25.105 20 26 19.105 26 18C26 16.895 25.105 16 24 16Z"
              fill="currentColor"
            />

            {/* Shield on Eagle's Chest */}
            <path d="M24 22C23.172 22 22.5 22.672 22.5 23.5V28H25.5V23.5C25.5 22.672 24.828 22 24 22Z" fill="white" />

            {/* Stars */}
            <motion.g
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <circle cx="20" cy="24" r="1" fill="white" />
              <circle cx="28" cy="24" r="1" fill="white" />
              <circle cx="24" cy="24" r="1" fill="white" />
            </motion.g>
          </svg>

          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </motion.div>

        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold tracking-tight relative z-10",
              isMobile ? "text-xl" : isFooter ? "text-2xl" : "text-2xl",
            )}
          >
            Adeleke
          </span>
          <motion.span
            className={cn(
              "font-bold tracking-tight relative z-10",
              isMobile ? "text-xl" : isFooter ? "text-2xl" : "text-2xl",
            )}
            animate={{
              backgroundImage: "linear-gradient(to right, #3b82f6, #93c5fd, #3b82f6)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            Immigration
          </motion.span>
        </div>
      </div>

      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 bg-primary"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}
