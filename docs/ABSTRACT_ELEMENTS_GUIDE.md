# Adeleke Immigration Services - Abstract Elements & Interactions Guide

## Overview

This guide provides detailed implementation instructions for creating abstract visual elements, SVG masks, and interactive hover effects that will elevate the Adeleke Immigration Services website to a premium, modern design.

## Abstract SVG Backgrounds

### Fluid Blob Backgrounds

Organic, flowing shapes that add visual interest without overwhelming content:

```jsx
// components/abstract/FluidBlob.jsx
import { motion } from "framer-motion";

export function FluidBlob({ 
  className,
  colors = ["#0B3D91", "#F4C430"], // Federal Blue and Gold
  opacity = 0.1,
  duration = 30,
  size = "large" // "small", "medium", "large"
}) {
  const sizeClasses = {
    small: "w-64 h-64",
    medium: "w-96 h-96",
    large: "w-[40rem] h-[40rem]",
  };
  
  return (
    <div className={`absolute -z-10 ${sizeClasses[size]} ${className || ''}`}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`blob-gradient-${Math.random().toString(36).substring(7)}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity={opacity} />
            <stop offset="100%" stopColor={colors[1]} stopOpacity={opacity} />
          </linearGradient>
        </defs>
        <motion.path
          fill={`url(#blob-gradient-${Math.random().toString(36).substring(7)})`}
          d="M40.4,-62.2C52.9,-54.3,63.8,-43.2,70.2,-29.8C76.7,-16.4,78.8,-0.6,75.4,14.1C72,28.8,63.2,42.4,51.3,52.6C39.4,62.8,24.4,69.5,8.9,71.9C-6.7,74.3,-22.8,72.3,-36.5,65.2C-50.2,58.1,-61.5,45.9,-68.1,31.3C-74.7,16.7,-76.6,-0.3,-72.8,-15.8C-69,-31.3,-59.5,-45.3,-46.8,-53.2C-34.1,-61.1,-18,-62.9,-1.9,-60.1C14.3,-57.3,28.5,-50,40.4,-62.2Z"
          animate={{
            d: [
              "M40.4,-62.2C52.9,-54.3,63.8,-43.2,70.2,-29.8C76.7,-16.4,78.8,-0.6,75.4,14.1C72,28.8,63.2,42.4,51.3,52.6C39.4,62.8,24.4,69.5,8.9,71.9C-6.7,74.3,-22.8,72.3,-36.5,65.2C-50.2,58.1,-61.5,45.9,-68.1,31.3C-74.7,16.7,-76.6,-0.3,-72.8,-15.8C-69,-31.3,-59.5,-45.3,-46.8,-53.2C-34.1,-61.1,-18,-62.9,-1.9,-60.1C14.3,-57.3,28.5,-50,40.4,-62.2Z",
              "M47.3,-73.2C60.9,-67.3,71.2,-52.6,75.9,-37C80.7,-21.4,79.9,-4.9,76.1,10.5C72.3,25.9,65.5,40.2,54.6,50.9C43.7,61.6,28.7,68.7,13.1,71.9C-2.5,75.1,-18.7,74.4,-33.1,68.5C-47.5,62.6,-60.1,51.5,-67.7,37.5C-75.3,23.5,-77.9,6.6,-74.4,-8.8C-70.9,-24.2,-61.3,-38.1,-49,-47.8C-36.7,-57.5,-21.7,-63,-5.8,-65.1C10.1,-67.2,33.7,-79.1,47.3,-73.2Z",
              "M40.4,-62.2C52.9,-54.3,63.8,-43.2,70.2,-29.8C76.7,-16.4,78.8,-0.6,75.4,14.1C72,28.8,63.2,42.4,51.3,52.6C39.4,62.8,24.4,69.5,8.9,71.9C-6.7,74.3,-22.8,72.3,-36.5,65.2C-50.2,58.1,-61.5,45.9,-68.1,31.3C-74.7,16.7,-76.6,-0.3,-72.8,-15.8C-69,-31.3,-59.5,-45.3,-46.8,-53.2C-34.1,-61.1,-18,-62.9,-1.9,-60.1C14.3,-57.3,28.5,-50,40.4,-62.2Z"
            ],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: duration,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}

// Usage
<div className="relative">
  <FluidBlob 
    className="-top-20 -right-20" 
    colors={["#0B3D91", "#3B82F6"]} 
    opacity={0.07}
  />
  <FluidBlob 
    className="bottom-20 -left-40" 
    colors={["#F4C430", "#F59E0B"]} 
    opacity={0.05}
    size="medium"
    duration={25}
  />
  {/* Content */}
</div>
```

### Geometric Grid Patterns

Clean, structured patterns that convey precision and professionalism:

```jsx
// components/abstract/GeometricGrid.jsx
export function GeometricGrid({ 
  className,
  color = "currentColor",
  opacity = 0.05,
  density = "medium", // "sparse", "medium", "dense"
  animated = true
}) {
  const densityConfig = {
    sparse: { gap: 80, size: 1 },
    medium: { gap: 40, size: 1 },
    dense: { gap: 20, size: 1 }
  };
  
  const config = densityConfig[density];
  
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className || ''}`}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id={`grid-pattern-${density}`}
            width={config.gap}
            height={config.gap}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={config.gap / 2} cy={config.gap / 2} r={config.size} fill={color} />
          </pattern>
          
          {animated && (
            <pattern
              id={`grid-pattern-offset-${density}`}
              width={config.gap}
              height={config.gap}
              patternUnits="userSpaceOnUse"
              x={config.gap / 2}
              y={config.gap / 2}
            >
              <circle cx={config.gap / 2} cy={config.gap / 2} r={config.size} fill={color} />
            </pattern>
          )}
        </defs>
        
        <rect width="100%" height="100%" fill={`url(#grid-pattern-${density})`} />
        
        {animated && (
          <rect 
            width="100%" 
            height="100%" 
            fill={`url(#grid-pattern-offset-${density})`}
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
          />
        )}
      </svg>
    </div>
  );
}

// Usage
<div className="relative">
  <GeometricGrid density="medium" opacity={0.03} />
  {/* Content */}
</div>
```

### Abstract Line Compositions

Dynamic line patterns that create movement and depth:

```jsx
// components/abstract/LineComposition.jsx
export function LineComposition({ 
  className,
  color = "currentColor",
  opacity = 0.1,
  variant = "diagonal" // "diagonal", "waves", "radial"
}) {
  const getPathData = () => {
    switch (variant) {
      case "waves":
        return (
          <>
            <path d="M0,50 C25,30 75,70 100,50 C125,30 175,70 200,50 C225,30 275,70 300,50 C325,30 375,70 400,50" stroke={color} strokeWidth="0.5" fill="none" />
            <path d="M0,70 C25,50 75,90 100,70 C125,50 175,90 200,70 C225,50 275,90 300,70 C325,50 375,90 400,70" stroke={color} strokeWidth="0.5" fill="none" />
            <path d="M0,90 C25,70 75,110 100,90 C125,70 175,110 200,90 C225,70 275,110 300,90 C325,70 375,110 400,90" stroke={color} strokeWidth="0.5" fill="none" />
          </>
        );
      case "radial":
        return (
          <>
            <circle cx="50%" cy="50%" r="100" stroke={color} strokeWidth="0.5" fill="none" />
            <circle cx="50%" cy="50%" r="150" stroke={color} strokeWidth="0.5" fill="none" />
            <circle cx="50%" cy="50%" r="200" stroke={color} strokeWidth="0.5" fill="none" />
            <circle cx="50%" cy="50%" r="250" stroke={color} strokeWidth="0.5" fill="none" />
            <circle cx="50%" cy="50%" r="300" stroke={color} strokeWidth="0.5" fill="none" />
          </>
        );
      case "diagonal":
      default:
        return (
          <>
            <line x1="0" y1="0" x2="100%" y2="100%" stroke={color} strokeWidth="0.5" />
            <line x1="20%" y1="0" x2="100%" y2="80%" stroke={color} strokeWidth="0.5" />
            <line x1="40%" y1="0" x2="100%" y2="60%" stroke={color} strokeWidth="0.5" />
            <line x1="60%" y1="0" x2="100%" y2="40%" stroke={color} strokeWidth="0.5" />
            <line x1="80%" y1="0" x2="100%" y2="20%" stroke={color} strokeWidth="0.5" />
            <line x1="0" y1="20%" x2="80%" y2="100%" stroke={color} strokeWidth="0.5" />
            <line x1="0" y1="40%" x2="60%" y2="100%" stroke={color} strokeWidth="0.5" />
            <line x1="0" y1="60%" x2="40%" y2="100%" stroke={color} strokeWidth="0.5" />
            <line x1="0" y1="80%" x2="20%" y2="100%" stroke={color} strokeWidth="0.5" />
          </>
        );
    }
  };
  
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className || ''}`}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
        preserveAspectRatio="none"
      >
        {getPathData()}
      </svg>
    </div>
  );
}

// Usage
<div className="relative">
  <LineComposition variant="waves" opacity={0.05} />
  {/* Content */}
</div>
```

## SVG Masking Techniques

### Text Masking

Create visually striking text effects with image masks:

```jsx
// components/abstract/MaskedText.jsx
export function MaskedText({
  text,
  imageUrl,
  className,
  fontSize = "7xl", // "5xl", "6xl", "7xl", "8xl", "9xl"
  fontWeight = "black" // "bold", "extrabold", "black"
}) {
  const id = `text-mask-${Math.random().toString(36).substring(7)}`;
  
  const fontSizeClasses = {
    "5xl": "text-5xl md:text-6xl",
    "6xl": "text-6xl md:text-7xl",
    "7xl": "text-7xl md:text-8xl",
    "8xl": "text-8xl md:text-9xl",
    "9xl": "text-9xl"
  };
  
  const fontWeightClasses = {
    "bold": "font-bold",
    "extrabold": "font-extrabold",
    "black": "font-black"
  };
  
  return (
    <div className={`relative ${className || ''}`}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <mask id={id}>
            <rect width="100%" height="100%" fill="white" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="100px"
              fontWeight="bold"
              fill="black"
            >
              {text}
            </text>
          </mask>
        </defs>
      </svg>
      
      <div 
        className={`relative ${fontSizeClasses[fontSize]} ${fontWeightClasses[fontWeight]} uppercase tracking-tight leading-none`}
        style={{
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: "1px currentColor",
          color: "transparent"
        }}
      >
        {text}
      </div>
      
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: `url(#${id})`,
          WebkitMaskImage: `url(#${id})`
        }}
      />
    </div>
  );
}

// Usage
<MaskedText
  text="IMMIGRATION"
  imageUrl="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&h=800&q=80"
  fontSize="8xl"
/>
```

### Shape Masking for Images

Apply creative masks to images for visual interest:

```jsx
// components/abstract/ShapeMaskedImage.jsx
export function ShapeMaskedImage({
  src,
  alt,
  className,
  width = 600,
  height = 800,
  shape = "blob" // "blob", "diagonal", "circle", "hexagon"
}) {
  const shapes = {
    blob: "M59.5,-51.6C72.3,-34.5,74.6,-8.9,68.5,14.2C62.4,37.3,47.8,57.8,27.9,65.8C8,73.8,-17.3,69.2,-39.6,57.1C-61.9,45,-81.2,25.3,-83.8,3.1C-86.5,-19.1,-72.5,-43,-54.1,-59.8C-35.7,-76.7,-12.9,-86.5,6.4,-82.1C25.7,-77.7,46.7,-68.8,59.5,-51.6Z",
    diagonal: "M0,0 L100,0 L0,100 Z",
    circle: "M50,50 m-50,0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0",
    hexagon: "M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
  };
  
  const id = `shape-mask-${Math.random().toString(36).substring(7)}`;
  
  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path 
              d={shapes[shape]} 
              transform={shape === "blob" ? "scale(0.005, 0.005)" : "scale(0.01, 0.01)"}
            />
          </clipPath>
        </defs>
      </svg>
      
      <Image
        src={src}
        alt={alt || ""}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        style={{ clipPath: `url(#${id})` }}
      />
    </div>
  );
}

// Usage
<ShapeMaskedImage
  src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&h=1200&q=80"
  alt="Immigration concept"
  shape="blob"
  className="w-full h-[70vh]"
/>
```

## Interactive Hover Effects

### Magnetic Elements

Create elements that attract the cursor:

```jsx
// components/interactions/MagneticElement.jsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export function MagneticElement({
  children,
  className,
  strength = 40,
  damping = 15,
  stiffness = 150,
  dragElastic = 0.2,
  dragTransition = { bounceStiffness: 300, bounceDamping: 20 }
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { damping, stiffness });
  const springY = useSpring(y, { damping, stiffness });
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const maxDistance = Math.max(rect.width, rect.height) / 2;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const factor = Math.min(distance / maxDistance, 1);
    
    x.set(distanceX * factor * (strength / 100));
    y.set(distanceY * factor * (strength / 100));
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      drag={active}
      dragConstraints={ref}
      dragElastic={dragElastic}
      dragTransition={dragTransition}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
}

// Usage
<MagneticElement className="inline-block">
  <Button size="lg">Schedule Consultation</Button>
</MagneticElement>
```

### Parallax Hover Effect

Create depth with parallax movement on hover:

```jsx
// components/interactions/ParallaxCard.jsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxCard({
  children,
  className,
  depth = 30,
  backgroundImage,
  backgroundOpacity = 0.1
}) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-300, 300], [depth, -depth]);
  const rotateY = useTransform(x, [-300, 300], [-depth, depth]);
  
  const backgroundX = useTransform(x, [-300, 300], [10, -10]);
  const backgroundY = useTransform(y, [-300, 300], [10, -10]);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      className={`relative perspective-1000 ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: backgroundOpacity,
            x: backgroundX,
            y: backgroundY,
            scale: 1.2
          }}
        />
      )}
      
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

// Usage
<ParallaxCard 
  className="p-8 bg-card rounded-xl shadow-lg"
  backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&h=800&q=80"
>
  <h3 className="text-2xl font-bold mb-4">Service Title</h3>
  <p className="text-muted-foreground">Service description goes here.</p>
</ParallaxCard>
```

### Text Reveal Effect

Reveal text with a creative animation on hover:

```jsx
// components/interactions/TextReveal.jsx
import { motion } from "framer-motion";

export function TextReveal({
  text,
  revealText,
  className,
  textSize = "2xl", // "xl", "2xl", "3xl", "4xl"
  direction = "up" // "up", "down", "left", "right"
}) {
  const textSizeClasses = {
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl"
  };
  
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: "100%" };
      case "down": return { y: "-100%" };
      case "left": return { x: "100%" };
      case "right": return { x: "-100%" };
      default: return { y: "100%" };
    }
  };
  
  const getAnimatePosition = () => {
    switch (direction) {
      case "up": 
      case "down": 
        return { y: 0 };
      case "left":
      case "right":
        return { x: 0 };
      default: return { y: 0 };
    }
  };
  
  return (
    <div className={`group relative overflow-hidden ${textSizeClasses[textSize]} font-bold ${className || ''}`}>
      <span className="block transition-opacity duration-300 group-hover:opacity-0">
        {text}
      </span>
      
      <motion.span
        className="absolute inset-0 text-primary"
        initial={getInitialPosition()}
        whileHover={getAnimatePosition()}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {revealText}
      </motion.span>
    </div>
  );
}

// Usage
<TextReveal
  text="Immigration Services"
  revealText="Expert Guidance"
  textSize="3xl"
  direction="up"
/>
```

## Cursor Effects

### Custom Cursor

Create a custom cursor that follows mouse movement:

```jsx
// components/interactions/CustomCursor.jsx
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    window.addEventListener("mousemove", moveCursor);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);
  
  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-50 hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        mixBlendMode: "difference"
      }}
    />
  );
}

// Usage in _app.jsx or layout.jsx
<>
  <CustomCursor />
  {/* Rest of your app */}
</>
```

### Cursor Highlight

Create a highlight effect when hovering over interactive elements:

```jsx
// components/interactions/CursorHighlight.jsx
export function CursorHighlight({ children, className }) {
  return (
    <div 
      className={`
        relative 
        cursor-none 
        group
        ${className || ''}
      `}
    >
      <div className="
        absolute 
        -inset-4 
        rounded-full 
        bg-primary/10 
        opacity-0 
        scale-0 
        group-hover:opacity-100 
        group-hover:scale-100 
        transition-all 
        duration-300
      " />
      {children}
    </div>
  );
}

// Usage
<CursorHighlight>
  <Button>Interactive Element</Button>
</CursorHighlight>
```

## Implementation Best Practices

1. **Performance Considerations**
   - Use `will-change` property sparingly and only when needed
   - Prefer GPU-accelerated properties (transform, opacity)
   - Implement lazy loading for off-screen elements
   - Monitor frame rates during animations

2. **Accessibility Guidelines**
   - Ensure all interactive elements are keyboard accessible
   - Provide alternative experiences for users with reduced motion preferences
   - Maintain sufficient color contrast for text and UI elements
   - Test with screen readers and assistive technologies

3. **Responsive Implementation**
   - Scale effects appropriately for different screen sizes
   - Disable or simplify complex effects on mobile devices
   - Test performance on lower-end devices
   - Use media queries to adapt animations based on device capabilities

4. **Code Organization**
   - Keep animation logic separate from component logic
   - Use custom hooks for reusable animation patterns
   - Document complex animations for future reference
   - Create a library of reusable animation components
