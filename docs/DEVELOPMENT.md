# Development Guide

This document provides detailed information for developers working on the Adeleke Immigration Services PWA.

## Development Environment Setup

### Prerequisites

- Node.js v18.17 or newer
- npm, yarn, or pnpm (pnpm recommended)
- Git
- Code editor (VS Code recommended)
- Basic knowledge of Next.js, React, TypeScript, and Tailwind CSS

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- PostCSS Language Support

### Initial Setup

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

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required values for Supabase and other services

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Project Structure Details

### App Router Structure

The project uses Next.js App Router for routing:

- `app/page.tsx` - Homepage
- `app/about/page.tsx` - About page
- `app/services/page.tsx` - Services page
- `app/contact/page.tsx` - Contact page
- `app/resources/page.tsx` - Resources listing page
- `app/resources/[slug]/page.tsx` - Individual resource page

### Component Organization

Components are organized by function:

- `components/ui/` - Shadcn UI components
- `components/layout/` - Layout components (Header, Footer, etc.)
- `components/sections/` - Page sections (HeroSection, ServicesSection, etc.)
- `components/common/` - Shared components (Logo, ThemeToggle, etc.)
- `components/forms/` - Form components (ContactForm, BookingForm, etc.)

### API Routes

API routes are defined in the `app/api/` directory:

- `app/api/contact/route.ts` - Contact form submission
- `app/api/booking/route.ts` - Appointment booking
- `app/api/resources/route.ts` - Resource listing and creation
- `app/api/resources/[slug]/route.ts` - Individual resource retrieval
- `app/api/services/route.ts` - Services listing

## Styling Guidelines

### Tailwind CSS Usage

- Use Tailwind utility classes for styling
- Follow the project's color scheme defined in `tailwind.config.ts`
- Use the `cn()` utility from `lib/utils.ts` for conditional class names

### Component Styling

- Use the `className` prop for styling components
- For complex components, consider using Tailwind's `@apply` directive in CSS modules
- Follow the Shadcn UI component styling patterns

### Dark Mode

- The application uses Next Themes for dark mode support
- Dark mode is the default theme
- Ensure all components look good in both light and dark modes
- Use Tailwind's dark mode variant for dark-mode-specific styling

## State Management

- Use React's built-in state management (useState, useContext) for simple state
- For more complex state, consider using Zustand or React Query
- For form state, use React Hook Form

## API Integration

### Supabase

- Supabase client is initialized in `lib/supabase.ts`
- Use the exported `supabase` instance for database operations
- Follow the defined types for database tables

### API Routes

- Use Next.js API routes for server-side operations
- Validate input data using Zod schemas
- Return appropriate status codes and error messages

## Testing

### Unit Testing

- Use Jest for unit testing
- Test components using React Testing Library
- Place test files next to the files they test with a `.test.ts` or `.test.tsx` extension

### E2E Testing

- Use Cypress for end-to-end testing
- Place Cypress tests in the `cypress/` directory
- Test critical user flows (contact form submission, navigation, etc.)

## Performance Optimization

- Use Next.js Image component for optimized images
- Implement code splitting with dynamic imports
- Optimize component rendering with React.memo and useMemo
- Use Lighthouse to identify and fix performance issues

## Accessibility

- Ensure all components are accessible
- Use semantic HTML elements
- Add appropriate ARIA attributes
- Test with screen readers and keyboard navigation
- Aim for WCAG 2.1 AA compliance

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy with the default settings

### Manual Deployment

1. Build the application:
```bash
npm run build
# or
yarn build
# or
pnpm build
```

2. Start the production server:
```bash
npm start
# or
yarn start
# or
pnpm start
```

## Continuous Integration

- Set up GitHub Actions for CI/CD
- Run linting, type checking, and tests on pull requests
- Automatically deploy to staging environment on merge to development branch
- Automatically deploy to production on merge to main branch

## Git Workflow

1. Create a new branch for each feature or bug fix
2. Make changes and commit with descriptive messages
3. Push to the remote repository
4. Create a pull request for review
5. Merge to main branch after approval

## Code Style

- Follow the ESLint and Prettier configurations
- Use TypeScript for type safety
- Write descriptive variable and function names
- Add comments for complex logic
- Follow the project's component patterns
