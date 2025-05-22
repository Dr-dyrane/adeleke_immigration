# Adeleke Immigration Services - Component Guide

## Overview

This guide outlines the design and implementation standards for UI components in the Adeleke Immigration Services application. Each component should reflect our design principles of authority, clarity, and trustworthiness while maintaining accessibility and usability.

## Component Architecture

### Component Structure

All components should follow a consistent structure:

```jsx
// 1. Imports
import React from "react";
import { cn } from "@/lib/utils";

// 2. Type definitions
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

// 3. Component definition
export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  ...props
}: ButtonProps) {
  // 4. Component logic
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-white text-primary border border-primary hover:bg-primary/5",
    tertiary: "bg-transparent text-primary hover:bg-primary/5"
  };
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3"
  };
  
  // 5. Render
  return (
    <button
      className={cn(
        "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        isLoading && "opacity-70 cursor-not-allowed",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <LoadingSpinner className="mr-2 h-4 w-4" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
```

### Component Organization

Organize components into the following categories:

1. **UI Components** (`components/ui/`)
   - Basic building blocks (buttons, inputs, cards)
   - Shadcn UI extended components

2. **Layout Components** (`components/layout/`)
   - Page layouts, sections, grids
   - Navigation components

3. **Section Components** (`components/sections/`)
   - Page-specific sections (hero, features, testimonials)

4. **Form Components** (`components/forms/`)
   - Form-specific components and layouts

5. **Common Components** (`components/common/`)
   - Shared components used across multiple pages

## Core UI Components

### Button

Buttons should:
- Have clear visual hierarchy based on importance
- Include appropriate feedback states (hover, focus, active)
- Support loading states and disabled states
- Maintain consistent sizing and spacing

```jsx
<Button>Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="tertiary">Tertiary Button</Button>
<Button size="lg" className="w-full">Large Full-Width Button</Button>
<Button isLoading>Loading Button</Button>
```

### Card

Cards should:
- Have consistent padding and spacing
- Include optional header and footer sections
- Support hover states for interactive cards
- Maintain consistent elevation (shadow)

```jsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input

Form inputs should:
- Have visible labels (not just placeholders)
- Include clear focus states
- Support validation states (error, success)
- Maintain consistent sizing and spacing

```jsx
<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="Enter your email"
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-sm text-red-500">
    Please enter a valid email address
  </p>
</div>
```

## Section Components

### Hero Section

The hero section should:
- Create a strong first impression
- Clearly communicate the value proposition
- Include a prominent call-to-action
- Be visually distinctive but on-brand

```jsx
<HeroSection
  title="Expert Immigration Advisory Services"
  description="Professional guidance from Peter E. Adeleke, a retired U.S. Immigration Services Officer with 27 years of experience."
  ctaText="Schedule Consultation"
  ctaLink="/contact"
  secondaryCtaText="Learn More"
  secondaryCtaLink="/services"
  backgroundImage="/images/hero-bg.jpg"
/>
```

### Services Section

The services section should:
- Clearly present the range of services offered
- Use consistent card layouts for each service
- Include relevant icons or imagery
- Provide clear next steps for each service

```jsx
<ServicesSection
  title="Our Services"
  description="Professional immigration advisory and documentation support for your unique needs."
  services={services}
  viewAllLink="/services"
/>
```

### Testimonial Section

The testimonial section should:
- Showcase authentic client experiences
- Include relevant client details (name, case type)
- Use a consistent layout and styling
- Implement a carousel for multiple testimonials

```jsx
<TestimonialSection
  title="Client Success Stories"
  testimonials={testimonials}
  carouselSettings={{
    autoplay: true,
    interval: 5000,
  }}
/>
```

## Form Components

### Contact Form

The contact form should:
- Include only essential fields
- Provide clear validation feedback
- Show submission status (loading, success, error)
- Include privacy information

```jsx
<ContactForm
  onSubmit={handleSubmit}
  services={services}
  initialValues={{
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  }}
  successMessage="Thank you for your message. We'll be in touch shortly."
/>
```

### Booking Form

The booking form should:
- Guide users through the booking process
- Include service selection and date/time picker
- Provide clear confirmation steps
- Allow for special requests or notes

```jsx
<BookingForm
  onSubmit={handleBooking}
  services={services}
  availableTimes={availableTimes}
  initialValues={{
    name: "",
    email: "",
    phone: "",
    service: "",
    date: null,
    time: null,
    notes: ""
  }}
/>
```

## Navigation Components

### Header

The header should:
- Be sticky or fixed for easy access
- Include the logo and primary navigation
- Collapse to a mobile menu on smaller screens
- Highlight the current page/section

```jsx
<Header
  logo="/images/logo.svg"
  navigation={[
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" }
  ]}
  ctaButton={{
    label: "Book Consultation",
    href: "/contact"
  }}
/>
```

### Footer

The footer should:
- Include essential links and information
- Display contact details and social media links
- Include copyright and legal information
- Be responsive across all screen sizes

```jsx
<Footer
  logo="/images/logo.svg"
  navigation={[
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" }
  ]}
  contactInfo={{
    email: "info@adelekevisa.com",
    phone: "(123) 456-7890",
    address: "123 Immigration Ave, Suite 100, Washington, DC 20001"
  }}
  socialLinks={[
    { platform: "facebook", url: "https://facebook.com/adelekeimmigration" },
    { platform: "twitter", url: "https://twitter.com/adelekeimmigration" },
    { platform: "linkedin", url: "https://linkedin.com/company/adelekeimmigration" }
  ]}
  legalLinks={[
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ]}
/>
```

## Component States

All interactive components should support the following states:

1. **Default**: The normal, resting state
2. **Hover**: When the user hovers over the component
3. **Focus**: When the component receives keyboard focus
4. **Active**: When the component is being activated (clicked/tapped)
5. **Disabled**: When the component is not interactive
6. **Loading**: When the component is processing an action
7. **Error**: When there's an error related to the component
8. **Success**: When an action has completed successfully

## Animation Guidelines

Use animations purposefully to enhance the user experience:

1. **Transitions**: Use for state changes (hover, focus, etc.)
   ```css
   transition: all 0.2s ease;
   ```

2. **Micro-interactions**: Subtle feedback for user actions
   ```jsx
   <motion.button
     whileHover={{ scale: 1.05 }}
     whileTap={{ scale: 0.95 }}
   >
     Click Me
   </motion.button>
   ```

3. **Page Transitions**: Smooth transitions between pages
   ```jsx
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     exit={{ opacity: 0, y: -20 }}
     transition={{ duration: 0.3 }}
   >
     {children}
   </motion.div>
   ```

4. **Loading States**: Indicate processing without blocking the UI
   ```jsx
   <Button isLoading loadingText="Processing...">
     Submit
   </Button>
   ```

## Accessibility Requirements

All components must meet these accessibility requirements:

1. **Keyboard Navigation**: All interactive elements must be keyboard accessible
2. **Screen Reader Support**: Use appropriate ARIA attributes and semantic HTML
3. **Focus Management**: Visible focus indicators for all interactive elements
4. **Color Contrast**: Meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
5. **Text Alternatives**: Alt text for images and descriptions for complex components
6. **Reduced Motion**: Support prefers-reduced-motion media query

## Component Documentation

Document each component with:

1. **Purpose**: What the component is for
2. **Props**: All available props and their types
3. **Examples**: Common usage examples
4. **Accessibility**: Specific accessibility considerations
5. **Variants**: Available visual variants

Example documentation format:

```jsx
/**
 * Button Component
 * 
 * A versatile button component that supports multiple variants and sizes.
 * 
 * @component
 * @example
 * <Button variant="primary" size="md">Click Me</Button>
 * 
 * @accessibility
 * - Uses native button element for keyboard and screen reader support
 * - Maintains 4.5:1 color contrast in all states
 * - Includes focus visible styles
 */
```

## Testing Guidelines

Test components for:

1. **Functionality**: All interactive features work as expected
2. **Responsiveness**: Displays correctly across screen sizes
3. **Accessibility**: Meets all accessibility requirements
4. **Visual Regression**: Maintains consistent appearance
5. **Performance**: Renders efficiently without unnecessary re-renders
