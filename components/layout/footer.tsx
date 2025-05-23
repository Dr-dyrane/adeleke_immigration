import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"
import { Logo } from "@/components/common/logo"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className=" mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo variant="footer" />
            <p className="mt-4 text-muted-foreground max-w-md">
              Professional immigration advisory and documentation support by Peter E. Adeleke, a retired U.S.
              Immigration Services Officer with 27 years of experience.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L12 3L6 6L0 3L6 0Z" fill="currentColor" className="text-primary/70" />
                  </svg>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L12 3L6 6L0 3L6 0Z" fill="currentColor" className="text-primary/70" />
                  </svg>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L12 3L6 6L0 3L6 0Z" fill="currentColor" className="text-primary/70" />
                  </svg>
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L12 3L6 6L0 3L6 0Z" fill="currentColor" className="text-primary/70" />
                  </svg>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L12 3L6 6L0 3L6 0Z" fill="currentColor" className="text-primary/70" />
                  </svg>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L12 3L6 6L0 3L6 0Z" fill="currentColor" className="text-primary/70" />
                  </svg>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-muted-foreground mb-4">Stay updated with the latest immigration news and resources.</p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="max-w-[220px] border-primary/20 focus:border-primary"
              />
              <Button
                variant="outline"
                size="icon"
                className="border-primary/20 hover:bg-primary/10 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Adeleke Immigration Services. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground mt-2 md:mt-0 flex items-center gap-2">
            <span>Designed and developed with care</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 0L10 5H16L11 8L13 14L8 11L3 14L5 8L0 5H6L8 0Z"
                fill="currentColor"
                className="text-primary/70"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  )
}
