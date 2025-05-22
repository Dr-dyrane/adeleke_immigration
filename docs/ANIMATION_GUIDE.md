# Adeleke Immigration Services - Animation & Interaction Guide

## Overview

This guide outlines the animation and interaction principles for the Adeleke Immigration Services application. Well-designed animations enhance the user experience by providing feedback, guiding attention, and creating a polished, professional feel that reinforces trust and authority.

## Animation Principles

### 1. Purpose-Driven

Every animation should serve a specific purpose:
- **Guide Attention**: Direct users to important elements
- **Provide Feedback**: Confirm user actions
- **Create Continuity**: Connect related elements and states
- **Express Brand**: Reinforce the professional, trustworthy brand identity

### 2. Subtle & Refined

Animations should be subtle and professional, never flashy or distracting:
- **Understated**: Avoid excessive movement or dramatic effects
- **Appropriate**: Match the serious nature of immigration services
- **Consistent**: Use similar timing and easing across the application

### 3. Performance-Optimized

Animations should perform well across all devices:
- **GPU-Accelerated**: Use transform and opacity for smooth animations
- **Minimal DOM Changes**: Avoid animations that cause layout recalculations
- **Reduced Motion Support**: Respect user preferences for reduced motion

## Animation Timing

### Duration Guidelines

| Type | Duration | Usage |
|------|----------|-------|
| **Micro** | 100-150ms | Immediate feedback (button clicks, toggles) |
| **Small** | 200-300ms | UI element changes (hover states, focus) |
| **Medium** | 300-500ms | Content transitions (cards appearing, accordion) |
| **Large** | 500-800ms | Page transitions, major layout changes |

### Easing Functions

| Type | Function | Usage |
|------|----------|-------|
| **Standard** | `cubic-bezier(0.4, 0.0, 0.2, 1)` | Most transitions |
| **Decelerate** | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Elements entering the screen |
| **Accelerate** | `cubic-bezier(0.4, 0.0, 1, 1)` | Elements exiting the screen |
| **Sharp** | `cubic-bezier(0.4, 0.0, 0.6, 1)` | Emphasis animations |

## Animation Types

### 1. State Transitions

Smooth transitions between component states:

```jsx
// CSS Approach
.button {
  background-color: var(--color-primary);
  transition: background-color 0.2s var(--ease-standard);
}

.button:hover {
  background-color: var(--color-primary-dark);
}

// Framer Motion Approach
<motion.button
  initial={{ backgroundColor: "var(--color-primary)" }}
  whileHover={{ backgroundColor: "var(--color-primary-dark)" }}
  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
>
  Click Me
</motion.button>
```

### 2. Entrance Animations

Animations for elements entering the viewport:

```jsx
// Fade In
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
>
  Content
</motion.div>

// Staggered Children
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item) => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
    >
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### 3. Page Transitions

Smooth transitions between pages:

```jsx
// Layout component with page transitions
export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={router.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
```

### 4. Micro-Interactions

Subtle animations for interactive elements:

```jsx
// Button with micro-interactions
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2 }}
>
  Click Me
</motion.button>

// Card with hover effect
<motion.div
  className="card"
  whileHover={{ 
    y: -5,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
  }}
  transition={{ duration: 0.3 }}
>
  Card Content
</motion.div>
```

### 5. Loading States

Animations for loading and processing states:

```jsx
// Loading spinner
<motion.div
  className="spinner"
  animate={{ rotate: 360 }}
  transition={{ 
    duration: 1.5,
    repeat: Infinity,
    ease: "linear"
  }}
/>

// Loading button
<Button isLoading>
  {isLoading ? (
    <motion.span
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="loading-indicator"
    />
  ) : "Submit"}
</Button>
```

### 6. Scroll-Based Animations

Animations triggered by scroll position:

```jsx
// Fade in on scroll
export function FadeInOnScroll({ children }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Parallax effect
export function ParallaxSection({ backgroundImage, children }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <div className="parallax-container">
      <motion.div 
        className="parallax-background"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          y
        }}
      />
      <div className="parallax-content">
        {children}
      </div>
    </div>
  );
}
```

## Component-Specific Animations

### Navigation

```jsx
// Mobile menu animation
<AnimatePresence>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="mobile-menu"
    >
      {/* Menu content */}
    </motion.div>
  )}
</AnimatePresence>

// Dropdown menu
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      className="dropdown-menu"
    >
      {/* Dropdown content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Form Elements

```jsx
// Form validation feedback
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ 
    opacity: error ? 1 : 0,
    height: error ? "auto" : 0
  }}
  transition={{ duration: 0.2 }}
  className="error-message"
>
  {error}
</motion.div>

// Form submission success
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
  className="success-message"
>
  <CheckIcon className="success-icon" />
  <p>Form submitted successfully!</p>
</motion.div>
```

### Content Sections

```jsx
// Accordion
<motion.div
  initial={{ height: 0 }}
  animate={{ height: isOpen ? "auto" : 0 }}
  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
  className="accordion-content"
>
  {content}
</motion.div>

// Tabs
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="tab-content"
  >
    {tabContent}
  </motion.div>
</AnimatePresence>
```

## Accessibility Considerations

### Respecting User Preferences

Always respect the user's motion preferences:

```jsx
// Hook to check for reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);
    
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);
  
  return prefersReducedMotion;
}

// Using the hook in a component
function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={{ 
        x: 100,
        transition: { 
          duration: prefersReducedMotion ? 0 : 0.5 
        }
      }}
    >
      Content
    </motion.div>
  );
}
```

### Animation Guidelines for Accessibility

1. **Avoid Flashing Content**: No more than three flashes in one second
2. **Provide Alternatives**: Ensure functionality works without animations
3. **Limit Motion**: Minimize large, sweeping movements
4. **Control Duration**: Keep animations brief (under 500ms for most UI elements)
5. **Allow Pausing**: Provide a way to pause or stop animations when possible

## Performance Optimization

### Best Practices

1. **Use GPU-Accelerated Properties**:
   - `transform` (translate, scale, rotate)
   - `opacity`
   - Avoid animating properties that trigger layout (width, height, top, left)

2. **Debounce Scroll Animations**:
   ```jsx
   const debounce = (fn, delay) => {
     let timeoutId;
     return (...args) => {
       clearTimeout(timeoutId);
       timeoutId = setTimeout(() => fn(...args), delay);
     };
   };
   
   const handleScroll = debounce(() => {
     // Animation logic
   }, 20);
   ```

3. **Use `will-change` Sparingly**:
   ```css
   .element-to-animate:hover {
     will-change: transform;
   }
   
   /* Remove after animation completes */
   .element-to-animate:not(:hover) {
     will-change: auto;
   }
   ```

4. **Batch DOM Updates**:
   ```jsx
   // Use React's batch updating
   const updateMultipleStates = () => {
     setIsVisible(true);
     setPosition({ x: 100, y: 100 });
     setScale(1.2);
   };
   ```

## Implementation Examples

### Hero Section Animation

```jsx
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <Section className="relative overflow-hidden">
      {/* Background with subtle parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: prefersReducedMotion ? 0 : useTransform(scrollYProgress, [0, 1], [0, 100])
        }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </motion.div>
      
      {/* Content with staggered animation */}
      <motion.div
        className="relative z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
          Expert Immigration Advisory Services
        </motion.h1>
        
        <motion.p
          className="text-xl text-muted-foreground mb-8"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
          Professional guidance from Peter E. Adeleke, a retired U.S. Immigration Services Officer with 27 years of experience.
        </motion.p>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
          <Button size="lg">Schedule Consultation</Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
```
