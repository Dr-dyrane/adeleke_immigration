# Adeleke Immigration Services - Progressive Web Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-black.svg?logo=shadcn-ui&logoColor=white)](https://ui.shadcn.com/)
[![React 19](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E.svg?logo=supabase&logoColor=white)](https://supabase.com/)

Welcome to the official repository for the Adeleke Immigration Services Progressive Web Application (PWA). This application aims to be a professional, trustworthy, and user-friendly platform for individuals and families navigating U.S. immigration processes.

---

## Table of Contents

1.  [Project Overview](#1-project-overview)
    *   [Business Vision](#business-vision)
    *   [Target Audience](#target-audience)
    *   [Core Values](#core-values)
2.  [Key Features](#2-key-features)
3.  [Tech Stack](#3-tech-stack)
4.  [Project Structure](#4-project-structure)
5.  [Getting Started](#5-getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Environment Variables](#environment-variables)
    *   [Running the Development Server](#running-the-development-server)
6.  [Available Scripts](#6-available-scripts)
7.  [Branding & Theming](#7-branding--theming)
    *   [Visual Theme](#visual-theme)
    *   [Logo Inspiration](#logo-inspiration)
    *   [Color Palette](#color-palette)
    *   [Typography](#typography)
8.  [Color Scheme Implementation](#8-color-scheme-implementation)
    *   [CSS Custom Properties](#css-custom-properties)
    *   [Gradient Text Effects](#gradient-text-effects)
    *   [Usage Guidelines](#usage-guidelines)
9.  [PWA Configuration](#9-pwa-configuration)
10. [Supabase Integration](#10-supabase-integration)
    *   [Database Tables](#database-tables)
11. [API Endpoints](#11-api-endpoints)
12. [Form Handling & Validation](#12-form-handling--validation)
13. [Deployment](#13-deployment)
14. [Future Enhancements](#14-future-enhancements)
15. [Contributing](#15-contributing)
16. [License](#16-license)

---

## 1. Project Overview

**Adeleke Immigration Services**, founded by Peter E. Adeleke, a retired U.S. Immigration Services Officer with 27 years of experience, is a professional advisory and documentation support firm. This PWA serves as the digital forefront of the business, providing information, resources, and a direct line of contact.

### Business Vision
To become the most trusted and approachable immigration advisory brand for immigrants across the United States and abroad by simplifying and humanizing the immigration process.

### Target Audience
*   Family-based immigrants
*   Employment-based immigrants
*   Naturalization seekers
*   Students and visitors seeking adjustments of status
*   Employers and corporate petitioners

### Core Values
*   **Integrity:** Transparency and honesty.
*   **Empathy:** Respecting the emotional journey.
*   **Excellence:** Accurate, professional guidance.
*   **Confidentiality:** Safeguarding client information.

---

## 2. Key Features

The application includes:

*   **Responsive Landing Website:** Clear service offerings and direct Call-to-Actions (CTAs).
*   **Service Pages:** Detailed descriptions of services offered:
    *   Consultation & Advisory
    *   Application Assistance
    *   Document Review & Case Evaluation
    *   Work Authorization & Residency Permit Support
    *   Naturalization Support
    *   Waiver Guidance
    *   Family-Based Petition Filing
*   **About Page:** Founder's bio, mission, and credentials.
*   **Contact Page & Form:**
    *   Integrated contact form using React Hook Form + Zod for validation.
    *   Form data is stored in Supabase.
*   **Online Appointment Booking:** Integration with booking system.
*   **Testimonial Section:** Displaying client success stories and quotes.
*   **Resources Section:** Blog posts, FAQs, guides, and checklists.
*   **Theme Toggle:** Light/Dark mode support with dark mode as default.
*   **PWA Capabilities:** Installable, basic offline support for cached content.

---

## 3. Tech Stack

*   **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for validation
*   **Database/Backend:** [Supabase](https://supabase.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **PWA Support:** Manifest and service worker configuration
*   **React:** [React 19](https://react.dev/)

---

## 4. Project Structure

```
adeleke_immigration/
├── app/                      # Next.js App Router
│   ├── (main)/               # Main site routes
│   │   ├── page.tsx          # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   ├── contact/
│   │   └── resources/
│   ├── api/                  # API Routes
│   │   ├── contact/route.ts
│   │   ├── booking/route.ts
│   │   ├── resources/route.ts
│   │   └── services/route.ts
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Shadcn UI components
│   ├── layout/               # Layout components (Header, Footer, etc.)
│   ├── sections/             # Page-specific sections
│   ├── common/               # Shared components
│   └── forms/                # Form components
├── lib/                      # Utility functions, helpers
│   └── supabase.ts           # Supabase client and types
├── hooks/                    # Custom React hooks
├── public/                   # Static assets
│   ├── icons/                # PWA icons
│   └── manifest.json         # PWA manifest
├── styles/                   # Additional styles
├── types/                    # TypeScript type definitions
├── next.config.mjs           # Next.js configuration
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 5. Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18.17 or newer)
*   [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/adeleke_immigration.git
cd adeleke_immigration
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=info@adelekevisa.com
NEXT_PUBLIC_CONTACT_PHONE=(123) 456-7890
NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 6. Available Scripts

*   `npm run dev` - Start the development server
*   `npm run build` - Build the application for production
*   `npm start` - Start a production server
*   `npm run lint` - Run ESLint to check for code issues

---

## 7. Branding & Theming

### Visual Theme
Inspired by U.S. government immigration websites (DHS/USCIS) but with a modern, clean, and user-friendly aesthetic. Dark mode is the default, with a light mode option.

### Logo Inspiration
Based on the DHS eagle emblem, simplified and adapted for civil use, designed to instill trust and professionalism.

### Color Palette
The application uses a carefully selected color palette configured in Tailwind CSS with **Gold as Primary** and **Blue as Accent**:

#### **Primary Colors (Gold)**
*   **Light Mode Primary:** Dark Goldenrod (#B8860B) - `HSL(43, 65%, 45%)`
*   **Dark Mode Primary:** Golden Bronze (#C09A5D) - `HSL(43, 42%, 56%)`
*   **Usage:** Main CTAs, active navigation states, form focus indicators, service card hovers

#### **Accent Colors (Blue)**
*   **Light Mode Accent:** Federal Blue (#3B82F6) - `HSL(221, 83%, 53%)`
*   **Dark Mode Accent:** Bright Blue (#60A5FA) - `HSL(217, 91%, 60%)`
*   **Usage:** Secondary interactive elements, informational states, complementary design

#### **Background & Foreground**
*   **Background (Dark):** #0E1117
*   **Foreground (Dark):** #F5F7FA
*   **Background (Light):** #FFFFFF
*   **Foreground (Light):** #0F172A

#### **Eagle-inspired Colors (Legacy)**
*   **Eagle Blue:** #3B82F6 (now used as accent)
*   **Eagle Gold:** #F59E0B (enhanced to primary gold)
*   **Eagle Red:** #EF4444 (destructive actions)

#### **Design Philosophy**
- **Gold Primary:** Conveys trust, authority, and premium service quality
- **Blue Accent:** Provides professional contrast and complements patriotic themes
- **Accessibility:** All color combinations meet WCAG contrast requirements
- **Consistency:** Uses CSS custom properties for theme-wide color management

### Typography
*   **Font Family:** Inter (Google Font)
*   **Headings:** Bold, sizes from 2xl to 5xl
*   **Body:** Medium, sizes from base to lg
*   **Advanced Typography Features:** Ligatures, kerning, and stylistic sets enabled

---

## 8. Color Scheme Implementation

### CSS Custom Properties
The color scheme is implemented using CSS custom properties in `app/globals.css`:

```css
:root {
  /* Light Mode */
  --primary: 43 65% 45%;          /* Dark Goldenrod */
  --primary-foreground: 0 0% 100%; /* White */
  --accent: 221 83% 53%;           /* Federal Blue */
  --accent-foreground: 210 40% 98%; /* Light Blue */
}

.dark {
  /* Dark Mode */
  --primary: 43 42% 56%;           /* Golden Bronze */
  --primary-foreground: 0 0% 0%;   /* Black */
  --accent: 217 91% 60%;           /* Bright Blue */
  --accent-foreground: 222 47% 11%; /* Dark Blue */
}
```

### Gradient Text Effects
Special gradient text effects are used for branding elements:

```tsx
// Logo and CTA headings use animated gradients
backgroundImage: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary) / 0.8), hsl(var(--primary)))"
backgroundClip: "text"
color: "transparent"
```

### Usage Guidelines
- **Primary Gold:** Use for main CTAs, active states, and primary interactions
- **Accent Blue:** Use for secondary actions, informational elements, and complementary design
- **Consistent Implementation:** Always use CSS custom properties instead of hardcoded hex values
- **Accessibility:** All color combinations maintain WCAG AA contrast ratios

---

## 9. PWA Configuration

The application is configured as a Progressive Web App (PWA), allowing users to install it on their devices and access content offline.

*   **Manifest:** Located at `/public/manifest.json`, defines app name, icons, colors, and display mode
*   **Icons:** PWA icons in various sizes located in `/public/icons/`
*   **Offline Support:** Basic caching for static assets and pages
*   **Installation:** Users can add the app to their home screen

---

## 10. Supabase Integration

The application uses Supabase as its backend service for data storage and retrieval.

### Database Tables

*   **services:** Stores information about immigration services offered
    *   Fields: id, title, description, icon, featured, created_at
*   **resources:** Stores blog posts, guides, and other resources
    *   Fields: id, title, description, content, category, image_url, published, created_at, updated_at
*   **contact_submissions:** Stores contact form submissions
    *   Fields: id, name, email, phone, service, message, created_at

---

## 11. API Endpoints

*   **GET /api/services:** Retrieve all services
*   **GET /api/resources:** Retrieve all published resources
*   **GET /api/resources/[slug]:** Retrieve a specific resource by ID
*   **POST /api/contact:** Submit contact form data
*   **POST /api/booking:** Submit appointment booking data

---

## 12. Form Handling & Validation

Forms are built using React Hook Form with Zod schema validation:

*   **Contact Form:** Validates name, email, phone, service selection, and message
*   **Booking Form:** Validates name, email, phone, service selection, date, and time

Form submissions are processed through API routes and stored in Supabase.

---

## 13. Deployment

The application is designed to be deployed on Vercel or similar platforms:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy with the default settings

---

## 14. Future Enhancements

*   **Client Portal:** Secure login area for clients to track their cases
*   **Document Upload:** Secure document sharing functionality
*   **Payment Integration:** Online payment for consultation fees
*   **Multilingual Support:** Content in multiple languages
*   **Advanced Analytics:** Track user behavior and conversion rates
*   **Email Notifications:** Automated email system for form submissions and appointments

---

## 15. Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 16. License

This project is licensed under the MIT License - see the LICENSE file for details.
