"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Send, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  service: z.string({
    required_error: "Please select a service.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Format WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `Hello, my name is ${data.name}. I'm interested in ${data.service} services. ${data.message}`,
      )

      // Show success state
      setIsSuccess(true)

      // Show success toast
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })

      // Reset form after delay
      setTimeout(() => {
        form.reset()
        setIsSuccess(false)
      }, 3000)

      // Redirect to WhatsApp
      setTimeout(() => {
        window.open(`https://wa.me/1234567890?text=${whatsappMessage}`, "_blank")
      }, 1000)
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <motion.div
          className="space-y-8 transition-all duration-500 glass rounded-3xl p-8"
          style={{
            opacity: isSuccess ? 0.6 : 1,
            filter: isSuccess ? "blur(2px)" : "none",
            pointerEvents: isSuccess ? "none" : "auto",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 text-lg">Name</FormLabel>
                <FormControl>
                  <motion.div whileFocus={{ scale: 1.02 }} whileHover={{ scale: 1.01 }}>
                    <Input
                      placeholder="Your full name"
                      {...field}
                      className={cn(
                        "rounded-xl border-muted bg-background/50 focus:border-primary/50 transition-all duration-300 h-14 text-lg",
                        focusedField === "name" && "border-primary shadow-md shadow-primary/20",
                      )}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </motion.div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-lg">Email</FormLabel>
                  <FormControl>
                    <motion.div whileFocus={{ scale: 1.02 }} whileHover={{ scale: 1.01 }}>
                      <Input
                        placeholder="Your email address"
                        {...field}
                        className={cn(
                          "rounded-xl border-muted bg-background/50 focus:border-primary/50 transition-all duration-300 h-14 text-lg",
                          focusedField === "email" && "border-primary shadow-md shadow-primary/20",
                        )}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-lg">Phone</FormLabel>
                  <FormControl>
                    <motion.div whileFocus={{ scale: 1.02 }} whileHover={{ scale: 1.01 }}>
                      <Input
                        placeholder="Your phone number"
                        {...field}
                        className={cn(
                          "rounded-xl border-muted bg-background/50 focus:border-primary/50 transition-all duration-300 h-14 text-lg",
                          focusedField === "phone" && "border-primary shadow-md shadow-primary/20",
                        )}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 text-lg">Service of Interest</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <motion.div whileFocus={{ scale: 1.02 }} whileHover={{ scale: 1.01 }}>
                      <SelectTrigger
                        className={cn(
                          "rounded-xl border-muted bg-background/50 focus:border-primary/50 transition-all duration-300 h-14 text-lg",
                          focusedField === "service" && "border-primary shadow-md shadow-primary/20",
                        )}
                        onFocus={() => setFocusedField("service")}
                        onBlur={() => setFocusedField(null)}
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </motion.div>
                  </FormControl>
                  <SelectContent className="rounded-xl border-muted bg-background/90 backdrop-blur-xl">
                    {[
                      "Consultation & Advisory",
                      "Application Assistance",
                      "Document Review & Case Evaluation",
                      "Work Authorization & Residency Support",
                      "Naturalization Support",
                      "Waiver Guidance",
                      "Family-Based Petition Filing",
                    ].map((service) => (
                      <SelectItem
                        key={service.toLowerCase().replace(/\s+/g, "-")}
                        value={service.toLowerCase().replace(/\s+/g, "-")}
                        className="cursor-pointer hover:bg-primary/10 transition-colors"
                      >
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 text-lg">Message</FormLabel>
                <FormControl>
                  <motion.div whileFocus={{ scale: 1.02 }} whileHover={{ scale: 1.01 }}>
                    <Textarea
                      placeholder="Please describe your immigration needs or questions"
                      className={cn(
                        "min-h-[150px] rounded-xl border-muted bg-background/50 focus:border-primary/50 transition-all duration-300 text-lg",
                        focusedField === "message" && "border-primary shadow-md shadow-primary/20",
                      )}
                      {...field}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </motion.div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <div className="relative">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className={cn(
                "w-full rounded-full py-8 transition-all duration-500 overflow-hidden group text-lg shadow-lg",
                isSuccess ? "bg-green-500 hover:bg-green-600 shadow-green-500/20" : "shadow-primary/20",
              )}
              size="lg"
              disabled={isSubmitting || isSuccess}
            >
              <AnimatePresence mode="wait">
                {isSubmitting && (
                  <motion.span
                    className="flex items-center justify-center absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Sending...
                  </motion.span>
                )}

                {!isSubmitting && !isSuccess && (
                  <motion.span
                    className="flex items-center justify-center absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Send className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                    Send Message
                  </motion.span>
                )}

                {isSuccess && (
                  <motion.span
                    className="flex items-center justify-center absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="mr-3 h-6 w-6" />
                    Message Sent!
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Success overlay */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm rounded-full"></div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <CheckCircle className="h-20 w-20 text-green-500" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </Form>
  )
}
