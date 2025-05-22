# Adeleke Immigration Services - Typography & Content Guide

## Overview

Typography plays a crucial role in establishing the professional, authoritative, and trustworthy brand identity of Adeleke Immigration Services. This guide outlines the typography system and content styling principles to ensure consistency and readability across the application.

## Typography System

### Font Family

The application uses a carefully selected font stack:

```css
--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Inter** is our primary font, chosen for its:
- Professional, clean appearance
- Excellent readability at various sizes
- Strong support for multiple languages
- Comprehensive weight range
- Optimized rendering on screens

### Type Scale

Our type scale follows a harmonious progression:

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-xs` | 0.75rem (12px) | 1.5 | Legal text, footnotes |
| `--text-sm` | 0.875rem (14px) | 1.5 | Secondary text, UI elements |
| `--text-base` | 1rem (16px) | 1.6 | Body text |
| `--text-lg` | 1.125rem (18px) | 1.6 | Enhanced body text |
| `--text-xl` | 1.25rem (20px) | 1.5 | Subheadings |
| `--text-2xl` | 1.5rem (24px) | 1.4 | Section headings |
| `--text-3xl` | 1.875rem (30px) | 1.3 | Major headings |
| `--text-4xl` | 2.25rem (36px) | 1.2 | Page titles |
| `--text-5xl` | 3rem (48px) | 1.1 | Hero headings |
| `--text-6xl` | 3.75rem (60px) | 1.1 | Display headings |

### Font Weights

We use a limited set of font weights for clarity and consistency:

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, paragraphs |
| 500 | Medium | Emphasis, subheadings |
| 600 | Semibold | Section headings, important UI elements |
| 700 | Bold | Page titles, major headings |

### Fluid Typography

For responsive typography, we implement a fluid type scale using CSS `clamp()`:

```css
:root {
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);
  --text-3xl: clamp(1.875rem, 1.65rem + 1.125vw, 2.25rem);
  --text-4xl: clamp(2.25rem, 1.95rem + 1.5vw, 3rem);
  --text-5xl: clamp(3rem, 2.55rem + 2.25vw, 3.75rem);
  --text-6xl: clamp(3.75rem, 3.15rem + 3vw, 4.5rem);
}
```

### Line Height

Line heights are optimized for readability:

- **Tight (1.1-1.2)**: For large headings
- **Moderate (1.3-1.4)**: For medium headings
- **Comfortable (1.5-1.6)**: For body text and small text
- **Spacious (1.7-1.8)**: For complex content or long paragraphs

## Typography Implementation

### Heading Components

```jsx
// components/ui/typography.tsx
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({
  level = 2,
  as,
  children,
  className,
  ...props
}: HeadingProps) {
  const HeadingTag = `h${as || level}` as keyof JSX.IntrinsicElements;
  
  const sizeClasses = {
    1: "text-4xl md:text-5xl font-bold",
    2: "text-3xl md:text-4xl font-bold",
    3: "text-2xl md:text-3xl font-semibold",
    4: "text-xl md:text-2xl font-semibold",
    5: "text-lg md:text-xl font-medium",
    6: "text-base md:text-lg font-medium",
  };
  
  return (
    <HeadingTag
      className={cn(sizeClasses[level], className)}
      {...props}
    >
      {children}
    </HeadingTag>
  );
}
```

### Text Components

```jsx
// components/ui/typography.tsx (continued)
interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  variant?: "default" | "muted" | "accent";
}

export function Text({
  size = "base",
  variant = "default",
  children,
  className,
  ...props
}: TextProps) {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };
  
  const variantClasses = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    accent: "text-primary",
  };
  
  return (
    <p
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
```

### Usage Examples

```jsx
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Heading</Heading>
<Text>Regular paragraph text.</Text>
<Text size="lg" variant="muted">Larger muted text.</Text>

{/* Semantic vs. visual hierarchy */}
<Heading level={2} as={3}>Visually smaller but semantically h2</Heading>
```

## Content Styling

### Paragraphs

- Maximum width of 70-75 characters (approximately 35-40em)
- Adequate spacing between paragraphs (1.5× the line height)
- Proper text alignment (left-aligned for LTR languages)

```jsx
<div className="prose max-w-[40em]">
  <p>First paragraph of content...</p>
  <p>Second paragraph with adequate spacing...</p>
</div>
```

### Lists

- Clear visual distinction from paragraphs
- Proper indentation and spacing
- Consistent bullet or number styling
- Adequate spacing between items

```jsx
<ul className="space-y-2 my-4 ml-6 list-disc">
  <li>First list item</li>
  <li>Second list item</li>
  <li>Third list item</li>
</ul>

<ol className="space-y-2 my-4 ml-6 list-decimal">
  <li>First ordered item</li>
  <li>Second ordered item</li>
  <li>Third ordered item</li>
</ol>
```

### Links

- Clear visual distinction from surrounding text
- Consistent styling across the application
- Appropriate hover and focus states
- Underline for accessibility (can be subtle)

```jsx
<a 
  href="/services" 
  className="text-primary hover:text-primary-dark underline decoration-1 underline-offset-4 hover:decoration-2 transition-all"
>
  Learn more about our services
</a>
```

### Emphasis

- Use semantic HTML elements for emphasis
- Consistent styling for emphasized text
- Don't rely solely on color for emphasis

```jsx
<p>
  This is a paragraph with <em className="italic">emphasized text</em> and 
  <strong className="font-semibold">strongly emphasized text</strong>.
</p>
```

### Blockquotes

- Clear visual distinction from regular text
- Proper attribution when applicable
- Consistent styling across the application

```jsx
<blockquote className="border-l-4 border-primary pl-4 py-2 my-6 italic text-muted-foreground">
  <p>"Mr. Adeleke's expertise and guidance were invaluable throughout my immigration process."</p>
  <footer className="mt-2 text-sm font-medium">— John Doe, Naturalization Client</footer>
</blockquote>
```

## Rich Text Content

For content managed through a CMS or Markdown:

```jsx
// components/ui/prose.tsx
import { cn } from "@/lib/utils";

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div 
      className={cn(
        "prose prose-slate dark:prose-invert",
        "prose-headings:font-semibold prose-headings:text-foreground",
        "prose-p:text-muted-foreground",
        "prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary-dark",
        "prose-strong:font-semibold prose-strong:text-foreground",
        "prose-li:text-muted-foreground",
        "prose-blockquote:border-primary prose-blockquote:text-muted-foreground",
        "max-w-none",
        className
      )}
    >
      {children}
    </div>
  );
}
```

## Typographic Hierarchy

### Page Structure

1. **Page Title (H1)**
   - One per page
   - Largest text size
   - Clearly communicates page purpose

2. **Section Headings (H2)**
   - Divide page into logical sections
   - Clear visual distinction from page title
   - Consistent spacing above and below

3. **Subsection Headings (H3-H4)**
   - Further divide sections as needed
   - Maintain clear hierarchy
   - Proportional size reduction from section headings

4. **Body Text**
   - Optimal size for readability
   - Consistent line height and paragraph spacing
   - Clear contrast with background

### Visual Hierarchy Techniques

- **Size**: Larger elements draw more attention
- **Weight**: Bolder elements appear more important
- **Color**: Higher contrast elements stand out
- **Spacing**: Strategic whitespace creates focus
- **Position**: Elements higher on the page get more attention

## Responsive Typography

### Mobile Considerations

- Increase font size slightly for better readability
- Increase line height for comfortable reading
- Reduce heading sizes proportionally
- Ensure touch targets are at least 44×44px

```css
@media (max-width: 640px) {
  :root {
    --text-base: 1.0625rem; /* Slightly larger for mobile */
    --line-height-body: 1.7; /* Increased line height */
  }
  
  h1, h2, h3, h4, h5, h6 {
    /* Reduce heading sizes by ~10-15% */
    font-size: calc(var(--heading-size) * 0.85);
  }
}
```

### Print Considerations

- Use serif fonts for printed content
- Increase contrast for better printing
- Remove unnecessary background colors
- Ensure links are underlined and include URLs

```css
@media print {
  body {
    font-family: Georgia, serif;
    color: black;
    background: white;
  }
  
  a {
    text-decoration: underline;
  }
  
  a[href^="http"]:after {
    content: " (" attr(href) ")";
  }
}
```

## Accessibility Guidelines

### Text Contrast

- Maintain minimum contrast ratios:
  - 4.5:1 for normal text
  - 3:1 for large text (18pt or 14pt bold)
  - 3:1 for UI components and graphical objects

### Font Size

- Base font size should be at least 16px
- Allow text to be resized up to 200% without loss of content
- Avoid using absolute units (px) for font sizes

### Line Height

- Minimum line height of 1.5 for body text
- Minimum spacing between paragraphs of 1.5 times the font size

### Text Spacing

Support text spacing overrides:
- Line height: at least 1.5 times font size
- Letter spacing: at least 0.12 times font size
- Word spacing: at least 0.16 times font size

```css
/* Support for users who override text spacing */
p, h1, h2, h3, h4, h5, h6, li, blockquote {
  max-width: 100%;
  white-space: break-spaces;
}
```

## Content Guidelines

### Writing Style

- **Clear and Direct**: Use simple, straightforward language
- **Professional but Approachable**: Balance authority with accessibility
- **Consistent Terminology**: Use the same terms for the same concepts
- **Active Voice**: Prefer active voice over passive voice
- **Concise**: Be brief but complete

### Content Structure

- **Scannable**: Use headings, lists, and short paragraphs
- **Progressive Disclosure**: Start with key information, then provide details
- **Consistent Format**: Maintain consistent structure across similar content
- **Logical Flow**: Organize content in a logical sequence

### Legal Content

- **Accurate**: Ensure all legal information is accurate and up-to-date
- **Disclaimer**: Include appropriate disclaimers for legal content
- **Citations**: Provide references to relevant laws and regulations
- **Plain Language**: Translate legal jargon into understandable terms when possible

## Implementation in Tailwind

Configure Tailwind to support our typography system:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground'),
            maxWidth: '65ch',
            '[class~="lead"]': {
              color: theme('colors.muted.foreground'),
            },
            a: {
              color: theme('colors.primary'),
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              '&:hover': {
                color: theme('colors.primary.dark'),
              },
            },
            strong: {
              color: theme('colors.foreground'),
              fontWeight: '600',
            },
            // Additional typography customizations...
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```
