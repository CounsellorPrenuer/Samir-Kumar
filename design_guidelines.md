# Careerskope Career Guidance Website - Design Guidelines

## Design Approach: Reference-Based (LinkedIn Learning + Modern SaaS)
Drawing inspiration from professional development platforms with emphasis on vibrant visual hierarchy and trust-building through strategic color use.

**Core Principle**: Create energy and optimism through bright, confident typography while maintaining professional credibility through structured layouts and balanced color application.

---

## Color System

**Primary Brand Colors** (Space-separated HSL):
- **Primary Blue**: 217 91% 60% (trust, professionalism)
- **Energetic Red**: 355 78% 56% (urgency, action)
- **Growth Green**: 142 71% 45% (progress, success)

**Supporting Palette**:
- Dark backgrounds: 220 26% 14%
- Light backgrounds: 210 20% 98%
- Text on dark: 210 20% 98%
- Text on light: 220 26% 14%

**Gradient Applications**:
- Hero gradient: Blue to Purple (217 91% 60% → 270 70% 60%)
- Section accents: Green to Blue diagonal gradients
- CTA buttons: Red to orange gradient (355 78% 56% → 25 95% 53%)

---

## Typography Strategy

**Font Families** (Google Fonts):
- Headlines: "Space Grotesk" (700, 600) - geometric, modern
- Body: "Inter" (400, 500, 600) - readable, professional

**Eye-Catching Text Treatment**:
- Hero headline: 4xl-6xl font size, font-bold, gradient text effect (blue to green)
- Section headers: 3xl-4xl, text-white or gradient overlay on dark backgrounds
- Feature titles: 2xl, font-semibold with vibrant primary colors
- Body text: lg size minimum, increased line-height (1.7), proper contrast ratios
- CTAs: xl font size, uppercase tracking-wide, bold weight

**Paragraph Alignment**:
- Left-align all body text for readability
- Center-align headlines and section headers for impact
- Max-width prose (65ch) for long-form content
- Consistent vertical rhythm with mb-6 between paragraphs

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-20 desktop, py-12 mobile
- Container max-width: max-w-7xl
- Grid gaps: gap-8 to gap-12

**Viewport Strategy**:
- Hero: 85vh with content-driven overflow
- Content sections: Natural height with consistent py-20
- No forced 100vh sections

---

## Component Library

### Navigation
- Fixed transparent navbar with blur backdrop on scroll
- Logo left, navigation center, CTA button (gradient red) right
- Mobile: Hamburger menu with slide-in overlay

### Hero Section
- Full-width gradient background (blue to purple)
- Large headline with gradient text treatment
- Subheadline in bright white, lg size
- Dual CTA buttons (primary gradient red, secondary outline white with blur background)
- Hero image: Professional career consultation photo, positioned right on desktop
- Background pattern: Subtle grid or geometric shapes

### Feature Showcase
- 3-column grid (responsive to 1 column mobile)
- Icon cards with bright colored backgrounds (blue, red, green rotation)
- White text on colored cards with generous padding
- Hover lift effect (subtle)

### Benefits Section
- Alternating 2-column layouts (image-text, text-image)
- Bright numbered badges (gradient backgrounds)
- Benefits text in vibrant primary colors as highlights
- Supporting images showing career success scenarios

### Testimonials
- 2-column grid with photo testimonials
- Gradient card backgrounds (subtle blue to transparent)
- Bright star ratings in green
- Client photos in circular frames

### Pricing/Service Tiers
- 3-tier comparison cards
- Featured tier with gradient border (red)
- Bright pricing numbers in primary blue, xl-2xl size
- CTA buttons matching tier importance

### Call-to-Action Section
- Full-width gradient background (green to blue)
- Oversized headline in white
- Bright supporting text
- High-contrast CTA button (red gradient)

### Footer
- Dark background (220 26% 14%)
- Bright link colors (primary blue with hover green)
- Newsletter signup with gradient button
- Multi-column layout: Navigation, Resources, Social, Contact
- Trust badges and certifications

---

## Images

**Required Images**:
1. **Hero Image**: Professional career counselor with client in bright, modern office - positioned right side, taking 50% width on desktop
2. **Feature Icons**: Custom illustrations of career paths (designer can use Undraw or similar)
3. **Benefit Images**: Success scenarios - professional headshots, graduation moments, workplace victories
4. **Testimonial Photos**: Real client headshots, diverse professionals
5. **Background Patterns**: Abstract geometric shapes, dot grids in subtle gradients

**Image Treatment**:
- Sharp, high-quality photography
- Bright, well-lit settings
- Rounded corners (lg-xl)
- Subtle shadow effects for depth

---

## Visual Enhancements

**Bright Text Effects**:
- Gradient text on dark backgrounds using CSS gradients
- Text shadows for depth on vibrant headlines (subtle)
- Bright link hover states with underline animations
- Icon colors matching text vibrance

**Card Treatments**:
- Bright borders (2px) using gradient colors
- White backgrounds with colored accents
- Hover states with brightness increase

**Animations** (Minimal):
- Fade-in on scroll for sections
- Button hover glow effects using primary colors
- Navigation menu slide animations

---

## Accessibility & Polish

- Minimum contrast ratio 4.5:1 for bright text
- Focus states with bright blue outlines (3px)
- Clear hover states on all interactive elements
- Consistent dark mode: Dark backgrounds (220 26% 14%) with bright text (210 20% 98%)

**Quality Indicators**:
- Social proof in header ("Trusted by 15,000+ professionals")
- Trust badges in footer
- Clear value propositions with bright numerical highlights
- Professional certifications displayed prominently