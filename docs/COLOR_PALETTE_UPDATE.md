# Adeleke Immigration Services - Color Palette Update

## American Flag-Inspired Color Scheme

This document outlines the updated color palette for Adeleke Immigration Services, incorporating the complete American flag color scheme of blue, red, white, and accents of gold to create a cohesive, patriotic, and professional visual identity.

## Primary Color Palette

### Federal Blue (Primary)
- **Main**: #0B3D91
- **Light**: #1E56B1
- **Dark**: #072A66
- **Usage**: Primary brand color, main buttons, key UI elements, headers

### Patriotic Red (Secondary)
- **Main**: #B22234
- **Light**: #D42D3D
- **Dark**: #8A1A28
- **Usage**: Accent color, call-to-action elements, important notifications, secondary buttons

### White/Off-White (Background)
- **Pure White**: #FFFFFF
- **Off-White**: #F5F7FA
- **Light Gray**: #E8ECF2
- **Usage**: Backgrounds, cards, text on dark colors

### Gold (Accent)
- **Main**: #F4C430
- **Light**: #F8D35E
- **Dark**: #E0B01C
- **Usage**: Highlights, decorative elements, success states

## Neutral Palette

### Dark Neutrals
- **Dark**: #0E1117
- **Medium Dark**: #1A1D24
- **Slate**: #2D323C
- **Usage**: Text, borders, dark mode backgrounds

### Light Neutrals
- **Medium Gray**: #8C92A4
- **Light Gray**: #CDD5E0
- **Lightest Gray**: #E8ECF2
- **Usage**: Muted text, borders, disabled states

## Semantic Colors

### Status Colors
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Amber)
- **Error**: #EF4444 (Red - coordinated with Patriotic Red)
- **Info**: #3B82F6 (Blue - coordinated with Federal Blue)

## Color Application

### Patriotic Color Combinations

#### Flag-Inspired Sections
Create sections with subtle nods to the American flag:

```jsx
<section className="relative overflow-hidden py-24">
  {/* Blue background */}
  <div className="absolute inset-0 bg-primary/10 -z-10"></div>
  
  {/* Red stripes as decorative elements */}
  <div className="absolute top-0 left-0 w-full h-2 bg-secondary"></div>
  <div className="absolute bottom-0 left-0 w-full h-2 bg-secondary"></div>
  
  {/* Content */}
  <div className="relative z-10">
    <h2 className="text-4xl font-bold mb-6">Immigration Services</h2>
    <p className="text-xl">Professional guidance for your immigration journey.</p>
  </div>
</section>
```

#### Patriotic Gradient
Use gradients that subtly incorporate the flag colors:

```jsx
<div 
  className="h-screen flex items-center justify-center"
  style={{
    background: "linear-gradient(135deg, rgba(11, 61, 145, 0.1) 0%, rgba(178, 34, 52, 0.05) 100%)"
  }}
>
  <h1 className="text-6xl font-bold">American Dream</h1>
</div>
```

### Red Accent Applications

#### Call-to-Action Buttons
Use red for secondary or alternative actions:

```jsx
<div className="flex gap-4">
  <Button className="bg-primary text-white hover:bg-primary-dark">
    Primary Action
  </Button>
  <Button className="bg-secondary text-white hover:bg-secondary-dark">
    Important Alternative
  </Button>
</div>
```

#### Important Notifications
Use red for critical information:

```jsx
<div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded">
  <h3 className="text-secondary font-bold">Important Notice</h3>
  <p>Please ensure all documentation is submitted before the deadline.</p>
</div>
```

#### Section Dividers
Use red lines as section dividers:

```jsx
<section className="py-16">
  <h2 className="text-3xl font-bold mb-6">Our Services</h2>
  <div className="w-24 h-1 bg-secondary mb-12"></div>
  {/* Content */}
</section>
```

### Balanced Color Usage

#### 60-30-10 Rule
Apply colors according to the 60-30-10 rule:
- 60% Primary color (Blue) and neutrals
- 30% Secondary color (White/Off-white)
- 10% Accent colors (Red and Gold)

#### Text Hierarchy with Color
Use color to enhance text hierarchy:

```jsx
<div className="space-y-4">
  <h2 className="text-4xl font-bold text-primary">Main Heading</h2>
  <h3 className="text-2xl font-semibold text-secondary">Important Subheading</h3>
  <h4 className="text-xl font-medium text-foreground">Regular Subheading</h4>
  <p className="text-muted-foreground">Body text in a muted color.</p>
</div>
```

## Color Combinations

### Patriotic Combinations
1. **Classic Flag**
   - Background: White (#FFFFFF)
   - Primary Elements: Federal Blue (#0B3D91)
   - Accents: Patriotic Red (#B22234)

2. **Bold Patriotic**
   - Background: Federal Blue (#0B3D91)
   - Text: White (#FFFFFF)
   - Accents: Patriotic Red (#B22234) and Gold (#F4C430)

3. **Subtle Americana**
   - Background: Off-White (#F5F7FA)
   - Primary Elements: Dark Navy (#072A66)
   - Subtle Accents: Muted Red (#8A1A28)
   - Highlights: Gold (#F4C430)

### Professional Combinations
1. **Official Documents**
   - Background: White (#FFFFFF)
   - Text: Dark (#0E1117)
   - Headers: Federal Blue (#0B3D91)
   - Important Notes: Patriotic Red (#B22234)

2. **Digital Interface**
   - Background: Off-White (#F5F7FA)
   - UI Elements: Federal Blue (#0B3D91)
   - Buttons: Gradient from Blue to Dark Blue
   - Alerts and Notifications: Patriotic Red (#B22234)
   - Success States: Gold (#F4C430)

## Implementation in Tailwind

Update the Tailwind configuration to include the new color palette:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B3D91', // Federal Blue
          light: '#1E56B1',
          dark: '#072A66',
        },
        secondary: {
          DEFAULT: '#B22234', // Patriotic Red
          light: '#D42D3D',
          dark: '#8A1A28',
        },
        accent: {
          DEFAULT: '#F4C430', // Gold
          light: '#F8D35E',
          dark: '#E0B01C',
        },
        background: '#F5F7FA', // Off-White
        foreground: '#0E1117', // Dark
        muted: {
          DEFAULT: '#8C92A4', // Medium Gray
          foreground: '#2D323C', // Slate
        },
        card: {
          DEFAULT: '#FFFFFF', // White
          foreground: '#0E1117', // Dark
        },
        border: '#CDD5E0', // Light Gray
        success: '#10B981', // Green
        warning: '#F59E0B', // Amber
        error: '#EF4444', // Red
        info: '#3B82F6', // Blue
      },
    },
  },
};
```

## Color Accessibility

Ensure all color combinations meet WCAG 2.1 AA standards:

1. **Text on Background**
   - Dark text (#0E1117) on white/off-white: 16:1 (Excellent)
   - White text on Federal Blue (#0B3D91): 8:1 (Excellent)
   - White text on Patriotic Red (#B22234): 6:1 (Good)

2. **UI Elements**
   - Ensure buttons and interactive elements have sufficient contrast
   - Use darker shades of colors for text when needed
   - Avoid using color alone to convey information

## Red Color Application Examples

### Hero Section with Red Accents

```jsx
export function HeroWithRedAccents() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Abstract background with blue and red */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      {/* Red accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
      
      <div className="w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              Expert <span className="text-primary">Immigration</span> <span className="text-secondary">Advisory</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Professional guidance from Peter E. Adeleke, a retired U.S. Immigration Services Officer with 27 years of experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary text-white px-8 py-3 text-lg">
                Schedule Consultation
              </Button>
              <Button className="bg-secondary text-white px-8 py-3 text-lg">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/10 rounded-full"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&h=1000&q=80"
              alt="Immigration concept"
              className="rounded-xl relative z-10 w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Services Cards with Red Highlights

```jsx
export function ServicesWithRedHighlights({ services }) {
  return (
    <section className="py-24 px-6">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
      <div className="w-24 h-1 bg-secondary mb-16"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={service.id}
            className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className={`absolute top-0 left-0 w-full h-1 ${index % 3 === 0 ? 'bg-primary' : index % 3 === 1 ? 'bg-secondary' : 'bg-accent'}`}></div>
            
            <div className={`text-4xl mb-6 ${index % 3 === 0 ? 'text-primary' : index % 3 === 1 ? 'text-secondary' : 'text-accent'}`}>
              <Icon name={service.icon} />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-muted-foreground mb-6">{service.description}</p>
            
            <a 
              href={`/services/${service.id}`}
              className={`inline-flex items-center font-medium ${index % 3 === 0 ? 'text-primary' : index % 3 === 1 ? 'text-secondary' : 'text-accent'}`}
            >
              Learn More
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### Testimonial with Red Accents

```jsx
export function TestimonialWithRedAccents() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute -top-10 -left-10 text-9xl text-secondary/10 font-serif">"</div>
        
        <blockquote className="relative z-10 bg-white p-12 rounded-xl shadow-sm">
          <p className="text-2xl md:text-3xl font-light italic mb-8 text-foreground">
            Peter's expertise and guidance were invaluable throughout my immigration process. His insider knowledge of the system made a complex journey feel manageable.
          </p>
          
          <footer className="flex items-center">
            <div className="w-12 h-0.5 bg-secondary mr-4"></div>
            <div>
              <p className="font-bold text-lg">Maria Rodriguez</p>
              <p className="text-muted-foreground">Naturalization Client</p>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
```
