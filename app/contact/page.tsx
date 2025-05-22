"use client"

import { ContactForm } from "@/components/forms/contact-form"
import { PageHero } from "@/components/layout/page-hero"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["(123) 456-7890"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@adelekevisa.com"],
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Immigration Ave, Suite 100", "Washington, DC 20001"],
    },
    {
      icon: Calendar,
      title: "Office Hours",
      details: ["Monday - Friday: 9am - 5pm", "Saturday: By appointment only"],
    },
  ]

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Reach out for expert immigration assistance and personalized guidance"
        backgroundImage="/placeholder.svg?height=1080&width=1920"
        height="large"
      />

      <div className="container max-w-6xl mx-auto px-4 py-32 min-h-screen">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Get in Touch
            </h2>
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="border-0 glass hover-lift transition-all duration-500 shadow-lg">
                    <CardContent className="flex items-center gap-6 p-8">
                      <div className="bg-primary/20 p-4 rounded-full">
                        <item.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-xl mb-2">{item.title}</h3>
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-lg">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Send Us a Message
            </h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
