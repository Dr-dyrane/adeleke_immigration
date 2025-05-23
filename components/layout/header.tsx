"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { Logo } from "@/components/common/logo"
import { Menu, X, Shield, FileText, User, BookOpen, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { PageTransition } from "@/components/layout/page-transition"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const isMobile = useMobile()

  const navigation = [
    { name: "Home", href: "/", icon: Shield },
    { name: "Services", href: "/services", icon: FileText },
    { name: "About", href: "/about", icon: User },
    { name: "Resources", href: "/resources", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: MessageSquare },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <PageTransition>
      <motion.header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled ? "bg-background/60 backdrop-blur-xl border-b py-3 shadow-sm" : "bg-transparent py-5",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Logo variant={isMobile ? "mobile" : "default"} />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group flex items-center gap-2",
                      pathname === item.href ? "text-accent" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="relative z-10">{item.name}</span>

                    {/* Background highlight on hover */}
                    <motion.span
                      className="absolute inset-0 rounded-full -z-10 bg-accent/10"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: hoveredItem === item.name || pathname === item.href ? 1 : 0,
                        opacity: hoveredItem === item.name || pathname === item.href ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Eagle shield indicator for active item */}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1"
                        layoutId="activeNavIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <svg width="24" height="4" viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0H24L12 4L0 0Z" fill="currentColor" className="text-accent" />
                        </svg>
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  className="rounded-full px-6 hover-glow transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-accent/20 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Schedule Consultation</span>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-4">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-accent/50 transition-all duration-300"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              className="fixed inset-0 glass z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ top: "60px" }}
            >
              <div className="w-full px-4 sm:px-6 md:px-10 py-6 flex flex-col h-full">
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "px-4 py-4 rounded-2xl text-lg font-medium transition-all duration-300 flex items-center gap-3",
                          pathname === item.href
                            ? "bg-accent/10 text-accent"
                            : "text-muted-foreground hover:bg-accent/50",
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                        {pathname === item.href && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-accent absolute right-4 top-1/2 transform -translate-y-1/2"
                            layoutId="mobileActiveDot"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <motion.div
                  className="mt-auto pb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Button className="w-full rounded-full py-6 text-lg" size="lg" onClick={() => setIsMenuOpen(false)}>
                    Schedule Consultation
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </PageTransition>
  )
}
