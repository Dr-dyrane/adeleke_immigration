"use client"

import { PageHero } from "@/components/layout/page-hero"
import { ResourceCard } from "@/components/common/resource-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function ResourcesPage() {
  const resources = [
    {
      id: "family-based-immigration",
      title: "Family-Based Immigration Guide",
      description:
        "Learn about the process, requirements, and timeline for sponsoring family members for U.S. immigration.",
      date: "May 15, 2023",
      category: "Guides",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "naturalization-process",
      title: "The Naturalization Process Explained",
      description:
        "A comprehensive overview of the steps to U.S. citizenship, including eligibility requirements and the application process.",
      date: "April 22, 2023",
      category: "Guides",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "work-visas",
      title: "Understanding Work Visas and Employment-Based Immigration",
      description: "Explore the different types of work visas and pathways to permanent residency through employment.",
      date: "March 10, 2023",
      category: "Guides",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "immigration-policy-updates",
      title: "Recent Immigration Policy Updates",
      description:
        "Stay informed about the latest changes in U.S. immigration policies and how they might affect your case.",
      date: "February 5, 2023",
      category: "News",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes to Avoid in Immigration Applications",
      description:
        "Learn about frequent errors that can delay or derail your immigration process and how to avoid them.",
      date: "January 18, 2023",
      category: "Tips",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "interview-preparation",
      title: "Preparing for Your Immigration Interview",
      description: "Expert tips and guidance to help you confidently navigate your immigration interview.",
      date: "December 7, 2022",
      category: "Tips",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  const categories = ["All Resources", "Guides", "News", "Tips", "Videos"]

  return (
    <div>
      <PageHero
        title="Resources & Insights"
        subtitle="Helpful guides, news, and information to support your immigration journey"
        backgroundImage="/placeholder.svg?height=1080&width=1920"
        height="large"
      >
        <div className="flex w-full max-w-xl mx-auto">
          <Input
            placeholder="Search resources..."
            className="rounded-l-full h-14 bg-background/50 backdrop-blur-md border-primary/20 focus:border-primary text-lg"
          />
          <Button className="rounded-r-full h-14 px-6">
            <Search className="h-6 w-6" />
          </Button>
        </div>
      </PageHero>

      <div className="container mx-auto px-4 py-32 min-h-screen">
        <motion.div
          className="flex flex-wrap gap-6 mb-16 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <Button variant={index === 0 ? "default" : "outline"} className="rounded-full px-8 py-6 text-lg">
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {resources.map((resource) => (
            <motion.div key={resource.id} variants={item}>
              <ResourceCard resource={resource} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
