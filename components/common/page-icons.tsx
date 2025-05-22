"use client"

import { motion } from "framer-motion"
import {
  Home,
  Briefcase,
  User,
  BookOpen,
  MessageSquare,
  FileText,
  Users,
  Search,
  Flag,
  ShieldCheck,
} from "lucide-react"

interface PageIconProps {
  type: string
  className?: string
  animated?: boolean
}

export function PageIcon({ type, className = "h-6 w-6", animated = true }: PageIconProps) {
  const iconMap = {
    home: Home,
    services: Briefcase,
    about: User,
    resources: BookOpen,
    contact: MessageSquare,
    consultation: MessageSquare,
    application: FileText,
    "document-review": Search,
    "work-authorization": Briefcase,
    naturalization: Flag,
    waiver: ShieldCheck,
    "family-petition": Users,
  }

  const IconComponent = iconMap[type as keyof typeof iconMap] || FileText

  if (!animated) {
    return <IconComponent className={className} />
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      }}
      whileHover={{
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 },
      }}
    >
      <IconComponent className={className} />
    </motion.div>
  )
}
