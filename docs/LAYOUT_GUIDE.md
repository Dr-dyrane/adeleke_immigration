# Adeleke Immigration Services - Layout Guide

## Fluid Layout System

This guide outlines our approach to creating responsive, fluid layouts without relying on Tailwind's container classes. Our system prioritizes content-driven design that adapts naturally to different screen sizes.

## Core Concepts

### 1. Content-First Approach

- Design around content needs rather than device sizes
- Allow content to determine appropriate spacing and layout
- Maintain optimal reading lengths (65-75 characters per line)

### 2. Fluid Units

- Use relative units (`rem`, `em`, `%`, `vh`, `vw`) instead of fixed pixels
- Implement `clamp()` for responsive property values
- Apply `min()` and `max()` functions for boundary constraints

### 3. CSS Grid & Flexbox

- Use CSS Grid for two-dimensional layouts (rows and columns)
- Use Flexbox for one-dimensional layouts (rows or columns)
- Combine both for complex, responsive layouts

## Layout Components

### Page Layout

Instead of a container with fixed width, use:

```jsx
// components/layout/page-layout.tsx
export function PageLayout({ children, className }) {
  return (
    <div 
      className={`
        w-full 
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 
        mx-auto 
        max-w-[90rem]
        ${className || ''}
      `}
    >
      {children}
    </div>
  );
}
```

### Content Widths

Define different content width components:

```jsx
// components/layout/content-width.tsx
export function NarrowContent({ children, className }) {
  return (
    <div className={`w-full max-w-[40rem] mx-auto ${className || ''}`}>
      {children}
    </div>
  );
}

export function MediumContent({ children, className }) {
  return (
    <div className={`w-full max-w-[65rem] mx-auto ${className || ''}`}>
      {children}
    </div>
  );
}

export function WideContent({ children, className }) {
  return (
    <div className={`w-full max-w-[90rem] mx-auto ${className || ''}`}>
      {children}
    </div>
  );
}
```

### Section Layout

For consistent vertical spacing between sections:

```jsx
// components/layout/section.tsx
export function Section({ 
  children, 
  className,
  spacing = "standard" // "compact", "standard", "generous"
}) {
  const spacingClasses = {
    compact: "py-8 md:py-12",
    standard: "py-12 md:py-16 lg:py-20",
    generous: "py-16 md:py-24 lg:py-32"
  };
  
  return (
    <section className={`w-full ${spacingClasses[spacing]} ${className || ''}`}>
      {children}
    </section>
  );
}
```

## Grid Systems

### Responsive Grid

A flexible grid system using CSS Grid:

```jsx
// components/layout/responsive-grid.tsx
export function ResponsiveGrid({ 
  children, 
  className,
  cols = { 
    default: 1,
    sm: 2,
    md: 3,
    lg: 4
  },
  gap = "standard" // "tight", "standard", "loose"
}) {
  const gapClasses = {
    tight: "gap-4",
    standard: "gap-6 md:gap-8",
    loose: "gap-8 md:gap-12"
  };
  
  const getGridCols = () => {
    return `
      grid-cols-${cols.default}
      ${cols.sm ? `sm:grid-cols-${cols.sm}` : ''}
      ${cols.md ? `md:grid-cols-${cols.md}` : ''}
      ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''}
      ${cols.xl ? `xl:grid-cols-${cols.xl}` : ''}
    `;
  };
  
  return (
    <div className={`grid ${getGridCols()} ${gapClasses[gap]} ${className || ''}`}>
      {children}
    </div>
  );
}
```

### Auto-Fit Grid

For grids that automatically adjust the number of columns:

```jsx
// CSS in globals.css
.auto-fit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min-item-width)), 1fr));
  gap: var(--grid-gap, 1.5rem);
}

// Usage in component
export function AutoFitGrid({ 
  children, 
  className,
  minItemWidth = "20rem", // Minimum width of each item
  gap = "1.5rem"
}) {
  return (
    <div 
      className={`auto-fit-grid ${className || ''}`}
      style={{ 
        "--min-item-width": minItemWidth,
        "--grid-gap": gap
      }}
    >
      {children}
    </div>
  );
}
```

## Responsive Patterns

### Two-Column Layout

For common side-by-side layouts that stack on mobile:

```jsx
// components/layout/two-column.tsx
export function TwoColumn({ 
  left, 
  right,
  className,
  leftWidth = "1fr", // Can be "1fr", "2fr", "500px", etc.
  rightWidth = "1fr",
  reverseOnMobile = false,
  gap = "standard" // "tight", "standard", "loose"
}) {
  const gapClasses = {
    tight: "gap-4",
    standard: "gap-6 md:gap-8",
    loose: "gap-8 md:gap-12"
  };
  
  const mobileOrderClass = reverseOnMobile ? "flex-col-reverse" : "flex-col";
  
  return (
    <div 
      className={`
        flex ${mobileOrderClass} md:flex-row
        ${gapClasses[gap]}
        ${className || ''}
      `}
      style={{
        "--left-width": leftWidth,
        "--right-width": rightWidth
      }}
    >
      <div className="w-full md:w-[var(--left-width)]">{left}</div>
      <div className="w-full md:w-[var(--right-width)]">{right}</div>
    </div>
  );
}
```

### Responsive Spacing

For content that needs different spacing at different breakpoints:

```jsx
// CSS in globals.css
.responsive-spacing {
  --space-mobile: var(--space-mobile, 1rem);
  --space-tablet: var(--space-tablet, 1.5rem);
  --space-desktop: var(--space-desktop, 2rem);
  
  padding: var(--space-mobile);
}

@media (min-width: 640px) {
  .responsive-spacing {
    padding: var(--space-tablet);
  }
}

@media (min-width: 1024px) {
  .responsive-spacing {
    padding: var(--space-desktop);
  }
}

// Usage in component
export function ResponsiveSpace({ 
  children, 
  className,
  mobile = "1rem",
  tablet = "1.5rem",
  desktop = "2rem"
}) {
  return (
    <div 
      className={`responsive-spacing ${className || ''}`}
      style={{ 
        "--space-mobile": mobile,
        "--space-tablet": tablet,
        "--space-desktop": desktop
      }}
    >
      {children}
    </div>
  );
}
```

## Implementation Examples

### Hero Section

```jsx
// components/sections/hero-section.tsx
export function HeroSection() {
  return (
    <Section spacing="generous" className="relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
          <Image
            src="/images/hero-bg.jpg"
            alt="Immigration Services"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <NarrowContent>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Expert Immigration Advisory Services
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-[40rem] mx-auto">
            Professional guidance from Peter E. Adeleke, a retired U.S. Immigration Services Officer with 27 years of experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-6 text-lg">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </NarrowContent>
      </div>
    </Section>
  );
}
```

### Services Grid

```jsx
// components/sections/services-section.tsx
export function ServicesSection() {
  return (
    <Section spacing="standard">
      <MediumContent className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
        <p className="text-xl text-muted-foreground">
          Professional immigration advisory and documentation support for your unique needs.
        </p>
      </MediumContent>
      
      <WideContent>
        <ResponsiveGrid 
          cols={{ default: 1, sm: 2, lg: 4 }}
          gap="standard"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ResponsiveGrid>
      </WideContent>
    </Section>
  );
}
```

## Best Practices

1. **Avoid Fixed Widths**
   - Use relative units and max-width constraints
   - Let content determine appropriate sizing

2. **Progressive Enhancement**
   - Start with mobile layout and enhance for larger screens
   - Use feature queries for advanced CSS features

3. **Maintain Consistent Spacing**
   - Use the spacing scale defined in the design system
   - Apply spacing consistently across components

4. **Optimize for Reading**
   - Ensure optimal line lengths for text (65-75 characters)
   - Increase font size and line height on larger screens

5. **Test Across Viewports**
   - Regularly test layouts across different screen sizes
   - Check for layout shifts and overflow issues
