# Nukkad Shops - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Component Documentation](#component-documentation)
5. [Design System](#design-system)
6. [Animation Strategy](#animation-strategy)
7. [Responsive Design](#responsive-design)
8. [Routing Structure](#routing-structure)
9. [Asset Management](#asset-management)
10. [Future Maintenance Guide](#future-maintenance-guide)

---

## 🎯 Project Overview

**Project Name:** Nukkad Shops Website  
**Type:** POS Device Retail Store Website  
**Purpose:** Showcase POS devices with premium animations and user experience

### Business Goals
- Showcase three POS devices: Aspire, Pro2, and Elite-A
- Provide information about features, industries, and partnerships
- Enable demo booking and brochure downloads
- Attract potential customers with premium design
- Recruitment through careers page

### Design Philosophy
- **Inspiration:** Apple-style product showcases, Pione Labs animations
- **Color Scheme:** Consistent #2EA7E0 blue (no purple/pink)
- **Animation:** Smooth 3D effects, rotating devices, parallax scrolling
- **UX:** Premium buttons with shimmer effects and glow transitions

---

## 🛠 Technology Stack

### Core Technologies

#### React 18+ (Latest)
**Why:** 
- Component-based architecture for reusability
- Virtual DOM for performance
- Hooks for state management
- Large ecosystem and community support

#### TypeScript
**Why:**
- Type safety prevents runtime errors
- Better IDE intellisense and autocomplete
- Self-documenting code
- Easier refactoring and maintenance

#### Tailwind CSS v4.0
**Why:**
- Utility-first approach for rapid development
- Built-in responsive design utilities
- No need for CSS files (except globals)
- Consistent design tokens
- Smaller bundle size with purging

### Animation Library

#### Motion (formerly Framer Motion) - `motion/react`
**Version:** Latest  
**Why:**
- Industry-standard animation library
- Declarative animation syntax
- Spring physics for natural motion
- Gesture support (hover, tap, drag)
- Scroll-based animations
- Layout animations
- Performance optimized

**Import Syntax:**
```typescript
import { motion } from 'motion/react'
```

**Key Features Used:**
- `motion.div` - Animated containers
- `useScroll` - Scroll-based animations
- `useTransform` - Value transformations
- `useInView` - Trigger animations when in viewport
- `AnimatePresence` - Exit animations
- `whileHover`, `whileTap` - Interactive animations

### Routing

#### React Router DOM v6+
**Why:**
- Standard routing solution for React
- Declarative routing
- Nested routes support
- URL parameter handling
- Programmatic navigation

**Key Components:**
- `BrowserRouter` - Wraps entire app
- `Routes` - Container for route definitions
- `Route` - Individual route definition
- `useNavigate` - Programmatic navigation hook
- `useLocation` - Current location access

### Icon Library

#### Lucide React
**Why:**
- Beautiful, consistent icon set
- Tree-shakeable (only imports used icons)
- TypeScript support
- Regular updates
- Lightweight

**Usage:**
```typescript
import { Phone, Download, Sparkles } from 'lucide-react'
```

**Note:** Always verify icon existence before importing to avoid build errors.

### Form Library (If Used)

#### React Hook Form @7.55.0
**Version:** 7.55.0 (Fixed)  
**Import:**
```typescript
import { ... } from 'react-hook-form@7.55.0'
```

**Why:**
- Performance optimized (uncontrolled components)
- Easy validation
- TypeScript support

### Other Libraries

#### Sonner @2.0.3 (Toast Notifications)
**Import:**
```typescript
import { toast } from "sonner@2.0.3"
```

#### Re-resizable (Resizable Components)
**Note:** Use `re-resizable`, NOT `react-resizable` (doesn't work in this environment)

---

## 🏗 Project Architecture

### Directory Structure

```
/
├── App.tsx                          # Main app entry with routing
├── index.html                       # HTML entry point
├── styles/
│   └── globals.css                  # Global styles, Tailwind config
├── components/
│   ├── HomePage.tsx                 # Main landing page container
│   ├── Hero.tsx                     # Hero section with animations
│   ├── Hero_Responsive.tsx          # Fully responsive Hero version
│   ├── Navigation.tsx               # Header navigation bar
│   ├── DeviceCarousel.tsx           # 3D rotating device showcase
│   ├── AppleProductShowcase.tsx     # Product cards grid
│   ├── DeviceDetails.tsx            # Individual device page
│   ├── Features.tsx                 # Features section
│   ├── Industries.tsx               # Industries section
│   ├── Partners.tsx                 # Partners showcase
│   ├── Testimonials.tsx             # Customer testimonials
│   ├── FAQ.tsx                      # FAQ accordion
│   ├── CallToAction.tsx             # CTA section
│   ├── Footer.tsx                   # Footer section
│   ├── Careers.tsx                  # Careers page
│   ├── AnimatedButton.tsx           # Reusable animated button
│   ├── BrochurePopup.tsx            # Brochure download popup
│   ├── Metrics.tsx                  # Metrics display
│   ├── ScrollToTop.tsx              # Scroll to top on route change
│   ├── figma/
│   │   └── ImageWithFallback.tsx    # Image component with fallback
│   └── ui/                          # Shadcn UI components
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── ... (other UI components)
├── imports/                         # SVG and asset imports
└── guidelines/
    └── Guidelines.md                # Design guidelines
```

### Component Hierarchy

```
App
├── Router
    ├── HomePage
    │   ├── Navigation
    │   ├── Hero
    │   │   ├── AnimatedButton
    │   │   └── DeviceCarousel
    │   ├── AppleProductShowcase
    │   ├── Features
    │   ├── Industries
    │   ├── Partners
    │   ├── Testimonials
    │   ├── FAQ
    │   ├── CallToAction
    │   └── Footer
    ├── Careers
    │   ├── Navigation
    │   └── Footer
    └── DeviceDetails
        ├── Navigation
        └── Footer
```

---

## 📦 Component Documentation

### 1. App.tsx
**Purpose:** Main application entry point with routing configuration

**Code:**
```typescript
import { HomePage } from './components/HomePage';
import { Careers } from './components/Careers';
import { DeviceDetails } from './components/DeviceDetails';
import { ScrollToTop } from './components/ScrollToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/device/:deviceId" element={<DeviceDetails />} />
      </Routes>
    </Router>
  );
}
```

**Routes:**
- `/` - Home page with all sections
- `/careers` - Careers/jobs page
- `/device/:deviceId` - Device details page (aspire, pro2, elite-a)

**Key Features:**
- BrowserRouter for clean URLs
- ScrollToTop component ensures page starts at top on navigation
- Lazy loading can be added for performance

---

### 2. Navigation.tsx
**Purpose:** Fixed header navigation bar with responsive menu

**Key Features:**
- Fixed position header with blur backdrop
- Logo positioned at far left
- Navigation items centered
- "Book a Demo" and "English" buttons at far right
- Dropdown menu for Products
- Mobile hamburger menu
- Smooth scroll to sections
- Active section highlighting

**Props:**
```typescript
interface NavigationProps {
  activeSection: string;      // Current active section
  setActiveSection: (section: string) => void;  // Update active section
}
```

**Navigation Items:**
- Home
- Products (with dropdown: Aspire, Pro2, Elite-A)
- Industries
- Features
- Partners
- Careers (route navigation)

**Responsive Behavior:**
- **Desktop:** Horizontal nav with center alignment
- **Mobile:** Hamburger menu with slide-down drawer

**Color Theme:**
- Background: `bg-white/70 backdrop-blur-2xl`
- Active state: `text-[#2EA7E0] bg-[#2EA7E0]/15`
- Hover: `hover:text-[#2EA7E0] hover:bg-white/60`

**Why These Choices:**
- Fixed position keeps navigation accessible
- Backdrop blur creates premium glassmorphism effect
- Smooth scroll improves UX
- Mobile-first approach ensures usability

---

### 3. Hero.tsx (Responsive Version)
**Purpose:** Main hero section with headline, CTA buttons, and device carousel

**Sections:**
1. **Animated Background:** Moving gradient orbs
2. **Floating Particles:** Animated dots for depth
3. **Trust Badge:** "Trusted by 10,000+ retailers" with rotating sparkle
4. **Main Headline:** Large animated text with word-by-word reveal
5. **Description:** Subtitle text
6. **CTA Buttons:** "Call for Demo" and "Download Brochure"
7. **Metrics:** Animated counting numbers (Retailers, Transactions, Smart Minds)
8. **Device Carousel:** 3D rotating POS devices

**Responsive Breakpoints:**

| Element | Mobile (<640px) | Small (640-767px) | Medium (768-1023px) | Large (1024px+) |
|---------|----------------|-------------------|---------------------|-----------------|
| Background Orbs | 192px × 192px | 384px × 384px | 384px × 384px | 384px × 384px |
| Headline | 36px (text-4xl) | 48px (text-5xl) | 60px (text-6xl) | 72px (text-7xl) |
| Description | 16px (text-base) | 18px (text-lg) | 18px (text-lg) | 18px (text-lg) |
| Button Layout | Vertical | Horizontal | Horizontal | Horizontal |
| Metrics | 24px (text-2xl) | 30px (text-3xl) | 36px (text-4xl) | 36px (text-4xl) |
| Layout | Single column | Single column | Single column | Two columns |

**Animations:**
- **Background Orbs:** Scale, opacity, and position animations (20-25s duration)
- **Particles:** Floating animation with sine wave motion
- **Headline Words:** Staggered reveal with custom easing
- **Hover Effects:** Scale and lift on word hover
- **Metrics:** Counting animation using `AnimatedNumber` component

**AnimatedNumber Component:**
```typescript
function AnimatedNumber({ 
  value: number,      // Target number
  suffix?: string,    // Optional suffix (e.g., "+")
  duration?: number   // Animation duration in seconds
})
```

**Features:**
- Easing function: `easeOutQuart` (1 - (1 - progress)^4)
- Formats large numbers: 1,000,000 → "1M"
- Triggers when scrolled into view
- Uses `requestAnimationFrame` for smooth 60fps

**Why These Choices:**
- Large headline creates impact
- Animated numbers draw attention to metrics
- Responsive design ensures readability on all devices
- Parallax creates depth and premium feel
- Trust badge builds credibility

---

### 4. DeviceCarousel.tsx
**Purpose:** 3D rotating carousel showcasing POS devices

**Features:**
- Auto-rotating carousel
- 3D perspective transforms
- Hover pause
- Click to navigate
- Smooth transitions

**Devices:**
1. Aspire - Entry-level POS
2. Pro2 - Professional POS
3. Elite-A - Enterprise POS

**3D Transform:**
```css
transform: perspective(1200px) rotateY(angle)
```

**Rotation Logic:**
- Auto-rotates every 4 seconds
- Pauses on hover
- Click to manually switch
- Smooth spring animation

**Why These Choices:**
- 3D perspective creates premium showcase
- Auto-rotation keeps content dynamic
- Hover pause gives user control
- Spring physics feels natural

---

### 5. AppleProductShowcase.tsx
**Purpose:** Grid of product cards for three POS devices

**Layout:**
- 3-column grid on desktop
- 2-column on tablet
- Single column on mobile

**Card Structure:**
1. **Dark header with device image**
   - Gradient background
   - 3D hover rotation
   - Floating glow effect
   - ~~Sparkle badge (removed)~~

2. **White content section**
   - Device name
   - Tagline (blue color)
   - Description
   - "View Details" button

**Animations:**
- **Card Entry:** Staggered cascade with 3D rotation
- **Hover:** Lift and scale effect
- **Border Glow:** Animated border on hover
- **Floating Particles:** Rising particles on hover
- **Button Shimmer:** Animated shine effect

**Card Colors:**
- Header: `from-slate-900 to-slate-800`
- Accent: `#2EA7E0`
- Border: `border-[#2EA7E0]` on hover

**Navigation:**
- Click "View Details" → Navigate to `/device/{deviceId}`
- React Router programmatic navigation

**Why These Choices:**
- Grid layout maximizes space efficiency
- Dark header makes device images pop
- Staggered animation creates professional feel
- Hover effects encourage interaction

---

### 6. DeviceDetails.tsx
**Purpose:** Individual device details page with specifications and features

**URL Parameter:**
- `/device/aspire`
- `/device/pro2`
- `/device/elite-a`

**Sections:**
1. **Hero with Device Image**
   - Large device image
   - Device name and tagline
   - Price (if applicable)

2. **Specifications Grid**
   - Display, RAM, Storage
   - Processor, Connectivity
   - Battery, OS, Ports
   - Icon for each spec

3. **Features List**
   - Key features with icons
   - Expandable descriptions

4. **CTA Section**
   - "Book a Demo" button
   - "Download Brochure" button

**Configuration Icons Mapping:**
```typescript
const configIcons: Record<string, any> = {
  Display: Monitor,
  RAM: Cpu,
  Storage: HardDrive,
  Processor: Zap,
  Connectivity: Wifi,
  Battery: Battery,
  OS: Smartphone,
  Ports: Usb,
};
```

**Device Data Structure:**
```typescript
{
  name: string,           // "Aspire"
  tagline: string,        // "Perfect Entry-Level POS"
  description: string,
  image: string,          // Figma asset URL
  configurations: [{
    label: string,        // "Display"
    value: string,        // "10.1 inches"
    icon: string          // "Display"
  }]
}
```

**Why These Choices:**
- Clean layout focuses on product
- Icons make specs scannable
- Clear CTA drives conversions
- URL structure is SEO-friendly

---

### 7. AnimatedButton.tsx
**Purpose:** Reusable premium animated button component

**Props:**
```typescript
interface AnimatedButtonProps {
  children: ReactNode;              // Button content
  variant?: 'primary' | 'secondary'; // Button style
  onClick?: () => void;             // Click handler
}
```

**Variants:**

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | `bg-[#3DB2FF]` | White | None |
| Secondary | White | `#3DB2FF` | `border-[#3DB2FF]` |

**Animations:**
1. **Gradient Overlay:** Slides on hover
2. **Glow Effect:** Blur expands on hover
3. **Content Shift:** Moves right 4px with spring
4. **Shimmer:** Continuous shine effect
5. **Particle Burst:** 6 particles radiate on hover

**Responsive Sizing:**
- **Mobile:** `px-5 py-3 text-sm`
- **Desktop:** `px-8 py-4 text-base`

**Why These Choices:**
- Multiple animation layers create premium feel
- Shimmer effect mimics Apple style
- Particle burst adds playfulness
- Responsive sizing ensures usability
- Reusable component maintains consistency

---

### 8. Features.tsx
**Purpose:** Showcase key features of POS system

**Layout:**
- Grid of feature cards
- Icon + Title + Description
- Hover animations

**Features Include:**
- Real-time Analytics
- Inventory Management
- Multi-payment Options
- Cloud Sync
- Customer Management
- Reports & Insights

**Card Design:**
- Icon circle with gradient
- White background card
- Hover: Lift and shadow increase
- Blue accent color (#2EA7E0)

**Animations:**
- Staggered reveal on scroll
- Hover lift effect
- Icon rotation on hover

**Why These Choices:**
- Grid layout is scannable
- Icons provide visual anchors
- Hover feedback encourages exploration
- Staggered reveal feels polished

---

### 9. Industries.tsx
**Purpose:** Show industries that use Nukkad POS

**Industries:**
- Kirana Stores
- Supermarkets
- Pharmacies
- Restaurants
- Retail Chains
- Bakeries

**Card Design:**
- Image or icon
- Industry name
- Brief description
- ~~"Learn More" button (removed)~~

**Layout:**
- Grid layout
- Responsive columns
- Equal height cards

**Animations:**
- Fade in on scroll
- Hover scale effect
- ~~Scroll indicator dots (removed)~~

**Why These Choices:**
- Visual representation aids understanding
- Grid allows scanning
- Removed buttons for cleaner look
- Focus on information over navigation

---

### 10. Partners.tsx
**Purpose:** Display partner logos and testimonials

**Layout:**
- Logo grid
- Partner names
- Optional descriptions

**Features:**
- Grayscale logos
- Color on hover
- Responsive grid

**Animations:**
- Fade in stagger
- Hover color transition
- Scale on hover

**Why These Choices:**
- Builds trust through associations
- Clean presentation
- Hover interaction provides feedback

---

### 11. Testimonials.tsx
**Purpose:** Customer testimonials and reviews

**Structure:**
- Customer name
- Company/role
- Quote
- Star rating
- Photo (optional)

**Layout:**
- Carousel or grid
- Quote cards
- Blue accent highlights

**Animations:**
- Slide transition
- Fade in on view
- Hover lift

**Why These Choices:**
- Social proof increases conversions
- Carousel saves space
- Clean design maintains focus

---

### 12. FAQ.tsx
**Purpose:** Frequently asked questions with accordion

**Component:** Shadcn UI Accordion

**Features:**
- Expandable questions
- Smooth animations
- Chevron icon rotation
- Single or multiple open items

**Styling:**
- Blue accent for active items
- Clean typography
- ~~Removed purple/pink button styling~~
- Consistent #2EA7E0 color

**Questions Cover:**
- Product features
- Pricing
- Support
- Implementation
- Integrations

**Why These Choices:**
- Accordion saves vertical space
- Progressive disclosure reduces overwhelm
- Common pattern users understand
- Search-friendly content

---

### 13. CallToAction.tsx
**Purpose:** Final conversion section

**Elements:**
- Compelling headline
- Supporting text
- "Book a Demo" button
- "Contact Sales" button
- Background effects

**Design:**
- Gradient background
- Large typography
- Centered layout
- Premium button animations

**Why These Choices:**
- Clear next step for users
- Visual hierarchy guides attention
- Multiple CTAs give options
- Premium design reinforces brand

---

### 14. Footer.tsx
**Purpose:** Site footer with links and information

**Sections:**
1. **Company Info**
   - Logo
   - Tagline
   - Social links

2. **Quick Links**
   - Products
   - Features
   - Industries
   - Careers

3. **Resources**
   - Documentation
   - Support
   - Blog
   - FAQ

4. **Contact**
   - Email
   - Phone
   - Address

5. **Legal**
   - Privacy Policy
   - Terms of Service
   - Copyright

**Design:**
- Multi-column layout
- Blue links (#2EA7E0)
- Dark background
- Responsive stacking

**Why These Choices:**
- Comprehensive navigation
- SEO benefits
- Professional presentation
- Accessibility (clear links)

---

### 15. Careers.tsx
**Purpose:** Job listings and company culture page

**Sections:**
1. **Hero**
   - Headline: "Join Our Team"
   - Description
   - CTA

2. **Why Join Us**
   - Benefits
   - Culture highlights
   - Perks

3. **Open Positions**
   - Job cards
   - Apply buttons

4. **CTA**
   - Encouragement to apply

**Design:**
- Clean layout
- Blue accents
- Card-based job listings
- Engaging imagery

**Why These Choices:**
- Attracts talent
- Showcases company culture
- Clear application process
- Mobile-friendly

---

### 16. ScrollToTop.tsx
**Purpose:** Scroll to top on route change

**Code:**
```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

**Why:**
- New page should start at top
- Better UX for navigation
- Standard web behavior
- Simple implementation

---

### 17. BrochurePopup.tsx
**Purpose:** Modal for brochure download

**Features:**
- Form for user details
- Email validation
- Download trigger
- Close button

**Fields:**
- Name
- Email
- Phone
- Company

**Animations:**
- Fade in backdrop
- Scale in modal
- Smooth transitions

**Why These Choices:**
- Captures leads
- Provides value (brochure)
- Non-intrusive design
- Mobile-friendly form

---

## 🎨 Design System

### Color Palette

**Primary Color: #2EA7E0 (Blue)**
- Used for: Buttons, links, accents, hover states, active states
- Variations:
  - `#2EA7E0` - Primary
  - `#2596c9` - Gradient end
  - `#3DB2FF` - Lighter blue for headlines

**Secondary Colors:**
- `#1e293b` - Dark text
- `#64748b` - Muted text (slate-600)
- `#f8fafc` - Light backgrounds (slate-50)

**Gradients:**
```css
bg-gradient-to-r from-[#2EA7E0] to-[#2596c9]
bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50
bg-gradient-to-br from-slate-900 to-slate-800
```

**No Purple or Pink:**
- Explicitly avoided per requirements
- Consistent blue theme throughout

### Typography

**Font Family:**
- **Headlines:** 'Bebas Neue', sans-serif
- **Body:** System font stack (default)

**Font Sizes (Responsive):**

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 (Hero) | 36px | 48px | 72px |
| H2 | 28px | 32px | 40px |
| H3 | 24px | 28px | 32px |
| Body | 16px | 16px | 18px |
| Small | 12px | 14px | 14px |

**Line Heights:**
- Headlines: `leading-tight`
- Body: Default (1.5)
- Controlled in `/styles/globals.css`

**Font Weights:**
- Headlines: 400-700
- Body: 400-600
- Controlled in `/styles/globals.css`

**Important:** Do not override typography with Tailwind classes unless specifically requested. Global styles are configured in `globals.css`.

### Spacing

**Tailwind Scale:**
- `gap-3` = 12px (mobile)
- `gap-4` = 16px
- `gap-6` = 24px (desktop)
- `gap-8` = 32px
- `gap-12` = 48px

**Container Padding:**
- Mobile: `px-4` (16px)
- Desktop: `px-6` (24px)
- Max width: `max-w-7xl` (1280px)

### Shadows

**Elevation Levels:**
```css
shadow-sm    - Subtle
shadow-md    - Medium
shadow-lg    - Large
shadow-xl    - Extra large
shadow-2xl   - Maximum
```

**Custom Shadows:**
```css
shadow-[#2EA7E0]/25  - Blue shadow with 25% opacity
hover:shadow-xl hover:shadow-[#2EA7E0]/35
```

### Border Radius

```css
rounded-md    - 6px (buttons)
rounded-lg    - 8px (cards)
rounded-xl    - 12px (large cards)
rounded-2xl   - 16px (sections)
rounded-3xl   - 24px (hero elements)
rounded-full  - 9999px (pills, circles)
```

### Glassmorphism

```css
bg-white/70 backdrop-blur-2xl border border-white/30
bg-white/80 backdrop-blur-xl
```

**Why:**
- Modern, premium aesthetic
- Depth without heaviness
- Trending design pattern

---

## ✨ Animation Strategy

### Animation Principles

1. **Purpose:** Every animation serves a function
2. **Subtlety:** Avoid overwhelming users
3. **Performance:** Use transform and opacity only when possible
4. **Consistency:** Similar elements animate similarly
5. **Responsiveness:** Reduce motion on mobile if needed

### Animation Types

#### 1. Entrance Animations
**Used for:** Initial page load, scroll reveals

```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

**Staggered Reveals:**
```typescript
transition={{ duration: 0.6, delay: index * 0.2 }}
```

#### 2. Hover Animations
**Used for:** Interactive elements

```typescript
whileHover={{ scale: 1.05, y: -5 }}
```

**With Glow:**
```typescript
hover:shadow-xl hover:shadow-[#2EA7E0]/35
```

#### 3. Scroll Animations
**Used for:** Parallax effects

```typescript
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"]
});

const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
```

#### 4. 3D Transforms
**Used for:** Product showcases

```typescript
style={{ 
  perspective: "1000px",
  transformStyle: "preserve-3d"
}}
whileHover={{ 
  rotateY: 8,
  rotateZ: 2,
  scale: 1.1
}}
```

#### 5. Infinite Loops
**Used for:** Background elements

```typescript
animate={{
  scale: [1, 1.2, 1],
  opacity: [0.3, 0.5, 0.3],
}}
transition={{
  duration: 20,
  repeat: Infinity,
  ease: "easeInOut"
}}
```

#### 6. Number Counting
**Used for:** Metrics display

```typescript
<AnimatedNumber value={12000} suffix="+" duration={2} />
```

**Implementation:**
- Uses `requestAnimationFrame`
- Easing: `easeOutQuart`
- Triggers on `useInView`

### Performance Considerations

**GPU Acceleration:**
```css
will-change-transform
```

**Use only when necessary (avoid overuse).**

**Efficient Properties:**
- ✅ `transform` (translate, scale, rotate)
- ✅ `opacity`
- ❌ `width`, `height` (triggers layout)
- ❌ `margin`, `padding` (triggers layout)

**Debouncing:**
- Scroll events use Motion's optimized hooks
- Resize listeners should be debounced if added

---

## 📱 Responsive Design

### Breakpoints (Tailwind Default)

| Breakpoint | Min Width | Device |
|-----------|-----------|---------|
| `sm` | 640px | Small tablets, large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

### Mobile-First Approach

**Philosophy:**
- Design for mobile first
- Enhance for larger screens
- Progressive enhancement

**Example:**
```css
text-base sm:text-lg md:text-xl lg:text-2xl
```

Means:
- Default (mobile): 16px
- Small (640px+): 18px
- Medium (768px+): 20px
- Large (1024px+): 24px

### Responsive Patterns

#### Text Centering
```css
text-center lg:text-left
```
- Mobile: Centered
- Desktop: Left-aligned

#### Grid Columns
```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

#### Flexbox Direction
```css
flex-col sm:flex-row
```
- Mobile: Vertical stack
- Desktop: Horizontal row

#### Spacing
```css
gap-3 sm:gap-6
px-4 sm:px-6 lg:px-8
py-12 sm:py-16 lg:py-20
```

#### Visibility
```css
hidden md:block    - Show on desktop only
block md:hidden    - Show on mobile only
```

### Testing Checklist

- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1280px+)
- [ ] Ultra-wide (1920px+)

---

## 🗺 Routing Structure

### Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage` | Main landing page |
| `/careers` | `Careers` | Jobs and careers page |
| `/device/aspire` | `DeviceDetails` | Aspire device details |
| `/device/pro2` | `DeviceDetails` | Pro2 device details |
| `/device/elite-a` | `DeviceDetails` | Elite-A device details |

### Navigation Methods

#### 1. Programmatic Navigation
```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/careers');
navigate('/device/aspire');
```

#### 2. Link Component
```typescript
import { Link } from 'react-router-dom';

<Link to="/careers">Careers</Link>
```

#### 3. Smooth Scroll (Same Page)
```typescript
const element = document.getElementById('features');
element.scrollIntoView({ behavior: 'smooth' });
```

### URL Parameters

**Reading Params:**
```typescript
import { useParams } from 'react-router-dom';

const { deviceId } = useParams();
// deviceId = "aspire" | "pro2" | "elite-a"
```

### Location Detection

```typescript
import { useLocation } from 'react-router-dom';

const location = useLocation();
if (location.pathname === '/careers') {
  // Do something
}
```

### Scroll Restoration

**ScrollToTop Component:**
- Scrolls to top on every route change
- Improves UX
- Essential for SPA behavior

---

## 🖼 Asset Management

### Image Types

#### 1. Raster Images (PNG, JPG)
**Import Method:**
```typescript
import imgName from "figma:asset/HASH.png"
```

**Important Rules:**
- ❌ Never use `./` or `../` with `figma:asset`
- ✅ `figma:asset` is a virtual module scheme
- ✅ Correct: `import img from "figma:asset/abc123.png"`
- ❌ Incorrect: `import img from "../imports/figma:asset/abc123.png"`

**Usage:**
```typescript
<img src={imgName} alt="Description" />
```

**For New Images:**
```typescript
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src={imageUrl} 
  alt="Description"
  className="w-full h-auto"
/>
```

#### 2. SVG Files
**Import Method:**
```typescript
import svgPaths from "./imports/svg-HASH";
```

**Usage:**
```typescript
<svg>
  <path d={svgPaths.path1} />
</svg>
```

**Rules:**
- SVGs are stored as files in `/imports` directory
- Use relative paths from component location
- Do not recreate SVGs manually
- Always use imported versions

### Device Images

**Current Devices:**
```typescript
import aspireDevice from "figma:asset/7e5a0d773e030f89c9cb9f50ebe9cbda78da3375.png";
import eliteDevice from "figma:asset/a5691bc636441d98a5602dd32223137bbce2c24d.png";
import pro2Device from "figma:asset/a2985326283c12930faf706c73cf99bebe320387.png";
```

### Logo

```typescript
import logoImage from 'figma:asset/21bc1105efae8f57474cf092cd942ae0e9854f61.png';
```

**Usage in Navigation:**
```typescript
<img 
  src={logoImage} 
  alt="Nukkad Shops Logo" 
  className="h-10 w-auto object-contain"
/>
```

---

## 🔧 Future Maintenance Guide

### Adding New Devices

1. **Add Device Image:**
```typescript
import newDevice from "figma:asset/HASH.png";
```

2. **Add to Device Data:**
```typescript
// In AppleProductShowcase.tsx or DeviceDetails.tsx
const devicesData = {
  // ... existing devices
  newdevice: {
    name: "New Device",
    tagline: "Device Tagline",
    description: "Device description",
    image: newDevice,
    configurations: [
      { label: "Display", value: "15.6 inches", icon: "Display" },
      // ... more specs
    ]
  }
};
```

3. **Update Routes (if needed):**
```typescript
// In App.tsx - routes auto-handle via :deviceId param
// No changes needed if using dynamic routing
```

### Adding New Sections

1. **Create Component:**
```typescript
// /components/NewSection.tsx
export function NewSection() {
  return (
    <section id="newsection" className="py-20">
      {/* Content */}
    </section>
  );
}
```

2. **Add to HomePage:**
```typescript
// In HomePage.tsx
import { NewSection } from './NewSection';

// Add to component tree
<NewSection />
```

3. **Update Navigation:**
```typescript
// In Navigation.tsx
const navItems = [
  // ... existing items
  { id: 'newsection', label: 'New Section' },
];
```

### Updating Colors

**Global Color Change:**

1. **Search and Replace:**
   - Find: `#2EA7E0`
   - Replace: `#NEW_COLOR`

2. **Also Update:**
   - `#2596c9` (gradient end)
   - `#3DB2FF` (headline blue)

3. **Test All Components:**
   - Buttons
   - Links
   - Hover states
   - Active states
   - Gradients

**Using CSS Variables (Future Improvement):**

```css
/* In globals.css */
:root {
  --primary-color: #2EA7E0;
  --primary-gradient-end: #2596c9;
  --primary-light: #3DB2FF;
}
```

```typescript
// In components
className="bg-[var(--primary-color)]"
```

### Performance Optimization

#### 1. Lazy Loading Routes
```typescript
import { lazy, Suspense } from 'react';

const Careers = lazy(() => import('./components/Careers'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/careers" element={<Careers />} />
  </Routes>
</Suspense>
```

#### 2. Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading for images
- Use appropriate image sizes

```typescript
<img 
  src={image} 
  loading="lazy"
  srcSet={`${imageSmall} 640w, ${imageLarge} 1280w`}
/>
```

#### 3. Code Splitting
- Split by route (already implemented with React Router)
- Split large components if needed
- Use dynamic imports

#### 4. Animation Performance
- Use `will-change` sparingly
- Prefer `transform` and `opacity`
- Disable animations on low-end devices

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
/>
```

### Accessibility Improvements

#### 1. Keyboard Navigation
```typescript
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
/>
```

#### 2. ARIA Labels
```typescript
<button aria-label="Book a demo">
  <Phone className="w-5 h-5" />
</button>
```

#### 3. Focus States
```css
focus:outline-none focus:ring-2 focus:ring-[#2EA7E0] focus:ring-offset-2
```

#### 4. Alt Text
```typescript
<img src={device} alt="Aspire POS device with touchscreen display" />
```

### SEO Enhancements

#### 1. Meta Tags (Add to index.html)
```html
<head>
  <title>Nukkad Shops - Smart POS Systems for Modern Retail</title>
  <meta name="description" content="Premium Android POS systems for kirana stores, supermarkets, and retail chains. Aspire, Pro2, and Elite-A devices." />
  <meta name="keywords" content="POS system, retail POS, Android POS, Nukkad Shops" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Nukkad Shops - Smart POS Systems" />
  <meta property="og:description" content="Premium Android POS systems for modern retail" />
  <meta property="og:image" content="/og-image.png" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
</head>
```

#### 2. Semantic HTML
```typescript
<article>
  <header>
    <h1>Device Name</h1>
  </header>
  <section>
    <h2>Specifications</h2>
  </section>
</article>
```

#### 3. Structured Data
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Aspire POS",
  "description": "Entry-level POS system",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

### Testing Strategy

#### 1. Visual Regression Testing
- Use Percy, Chromatic, or similar
- Test all breakpoints
- Test all states (hover, active, focus)

#### 2. E2E Testing
- Use Playwright or Cypress
- Test user journeys:
  - Home → Product Details
  - Home → Careers
  - Form submissions
  - Navigation

#### 3. Performance Testing
- Lighthouse scores (aim for 90+)
- Core Web Vitals:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

#### 4. Cross-Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Deployment Checklist

- [ ] Run `npm run build`
- [ ] Check for console errors
- [ ] Test all routes
- [ ] Test on mobile device
- [ ] Verify images load
- [ ] Test forms
- [ ] Check analytics
- [ ] Verify GTM/tracking
- [ ] Test SEO meta tags
- [ ] Check performance scores
- [ ] Validate HTML
- [ ] Check accessibility (WAVE, axe)

---

## 📚 Library Versions Reference

### Required Version Pins

```typescript
// These MUST use specific versions
import { ... } from 'react-hook-form@7.55.0'
import { toast } from "sonner@2.0.3"
```

### Standard Imports (Latest)

```typescript
// These use latest versions
import { motion } from 'motion/react'
import { Routes, Route } from 'react-router-dom'
import { Phone } from 'lucide-react'
```

### Library Compatibility Notes

| Library | Version | Notes |
|---------|---------|-------|
| react-hook-form | 7.55.0 | Must pin version |
| sonner | 2.0.3 | Must pin version |
| motion/react | Latest | Formerly framer-motion |
| lucide-react | Latest | Verify icons exist |
| react-router-dom | Latest (v6+) | Uses new API |
| re-resizable | Latest | Use instead of react-resizable |

### Avoiding Common Errors

❌ **Wrong:**
```typescript
import { toast } from "sonner"  // Missing version
import { ... } from 'react-resizable'  // Doesn't work
import { MotionIcon } from 'lucide-react'  // Icon doesn't exist
```

✅ **Correct:**
```typescript
import { toast } from "sonner@2.0.3"
import { Resizable } from 're-resizable'
import { Menu } from 'lucide-react'  // Verified icon
```

---

## 🎯 Key Design Decisions

### Why Motion over Other Libraries?
- Industry standard
- Best documentation
- Declarative syntax
- Performance optimized
- Large community

### Why Tailwind CSS?
- Rapid development
- Consistency
- Responsive utilities
- Purging reduces bundle size
- No context switching

### Why React Router?
- Standard routing solution
- Declarative routing
- Great TypeScript support
- Active maintenance

### Why Lucide Icons?
- Beautiful, consistent design
- Tree-shakeable
- Regular updates
- TypeScript support

### Why Component-Based Architecture?
- Reusability
- Maintainability
- Testability
- Separation of concerns
- Team collaboration

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📞 Support & Resources

### Internal Documentation
- `/guidelines/Guidelines.md` - Design guidelines
- `/BACKEND_IMPLEMENTATION_GUIDE.md` - Backend setup
- `/Attributions.md` - Asset credits

### External Resources
- [Motion Docs](https://motion.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)

---

## ✅ Final Checklist for Developers

Before making changes:
- [ ] Read this documentation
- [ ] Understand component hierarchy
- [ ] Review design system
- [ ] Check responsive breakpoints
- [ ] Verify library versions

Before committing:
- [ ] Test on mobile
- [ ] Test on desktop
- [ ] Check console for errors
- [ ] Verify animations work
- [ ] Ensure color consistency (#2EA7E0)
- [ ] Test navigation
- [ ] Verify images load
- [ ] Check accessibility

---

**Document Version:** 1.0  
**Last Updated:** December 29, 2025  
**Maintained By:** Nukkad Shops Development Team

---

*This documentation is a living document and should be updated as the project evolves.*
