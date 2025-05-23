"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { Logo } from "@/components/common/logo"
import { Menu, X, Shield, FileText, User, BookOpen, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
// import { useMobile } from "@/hooks/use-mobile" // We'll try to rely on Tailwind classes first
import { PageTransition } from "@/components/layout/page-transition" // Assuming this is for header's own entry
import { motion, AnimatePresence } from "framer-motion"

export const HEADER_MAX_HEIGHT_PX = 100 // Adjust as needed

const navigation = [
  { name: "Home", href: "/", icon: Shield },
  { name: "Services", href: "/services", icon: FileText },
  { name: "About", href: "/about", icon: User },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: MessageSquare },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  // const isMobile = useMobile() // Let's use Tailwind breakpoints primarily for layout

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Determine if the screen is small enough for mobile/tablet view (breakpoint `lg` = 1024px)
  // This can be useful if you need JS logic based on screen size,
  // but for hiding/showing elements, Tailwind classes are preferred.
  const [isLgScreen, setIsLgScreen] = useState(true); // Default to true for SSR, client will correct

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLgScreen(window.innerWidth >= 1024); // lg breakpoint
    };
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  return (
    <PageTransition> {/* Assuming this is for the header's own initial animation */}
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300", // Ensure left/right 0 for w-full fixed
          isScrolled ? "bg-background/80 backdrop-blur-lg py-3 shadow-xs" : "bg-transparent py-5"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.5 }}
      >
        <div className=" mx-auto px-4">
          <div className="flex items-center justify-between h-16"> {/* Added fixed height for consistency */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0" // Prevent logo from shrinking too much
            >
              {/* Conditionally render logo variant based on screen size if truly needed,
                    otherwise, a single responsive SVG logo is better.
                    For simplicity, let's assume 'default' variant is responsive.
                */}
              <Logo variant={!isLgScreen && !isScrolled ? "mobile" : "default"} />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 ml-auto mr-4"> {/* Added ml-auto to push nav right before actions */}
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group flex items-center gap-1.5",
                      // Increased gap slightly
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="relative z-10">{item.name}</span>

                    {/* Background highlight on hover/active */}
                    <motion.span
                      className="absolute inset-0 rounded-md -z-10 bg-primary/10"
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{
                        scaleY: hoveredItem === item.name || pathname === item.href ? 1 : 0,
                        opacity: hoveredItem === item.name || pathname === item.href ? 1 : 0,
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{ originY: 0.5 }}
                    />

                    {/* Active item indicator */}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeNavIndicatorDesktop"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Action Buttons & Theme Toggle */}
            <div className="hidden lg:flex items-center space-x-3">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild // Use asChild if the button itself is a Link or wraps one
                  size="sm"
                  className="rounded-full px-5 hover-glow transition-all duration-300 group"
                >
                  {/* <Link href="/schedule-consultation"> Optional if button is a link */}
                  <span className="relative z-10">Schedule Consultation</span>
                  {/* </Link> */}
                </Button>
              </motion.div>
            </div>

            {/* Mobile/Tablet Menu Trigger */}
            <div className="flex lg:hidden items-center space-x-2">
              <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <motion.button
                    className="p-2 rounded-full hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Open menu"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[340px] flex flex-col p-0 bg-background/95 dark:bg-background/25 backdrop-blur-sm rounded-l-3xl">
                  <SheetHeader className="p-6 pb-0">
                    <SheetTitle className="text-left">
                        <Logo variant="mobile" />
                    </SheetTitle>
                    {/* Optional: <SheetDescription>Make a selection</SheetDescription> */}
                  </SheetHeader>
                  <nav className="flex-grow px-4 py-4 space-y-1">
                    {navigation.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 w-full",
                            pathname === item.href
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {item.name}
                          {pathname === item.href && (
                            <motion.span
                              className="w-1.5 h-1.5 rounded-full bg-primary ml-auto"
                              layoutId="mobileActiveDot"
                            />
                          )}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="p-6">
                    <SheetClose asChild>
                      <Button className="w-full rounded-full py-3 text-base" size="lg">
                        Schedule Consultation
                      </Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </PageTransition>
  )
}