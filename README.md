# Dr. Sarah Chen - Medical Portfolio Website

A professional medical doctor portfolio website built with Next.js, TypeScript, and Tailwind CSS. Designed with a clean, clinical aesthetic featuring medical-themed UI elements like pill-shaped buttons, capsule badges, and a light/dark theme toggle.

## Features

- **Medical-Themed UI**: Pill-shaped buttons, capsule badges, rounded cards
- **Light/Dark Theme Toggle**: Pill-shaped toggle with sun/moon icons and medical cross
- **Clean Medical Aesthetic**: Soft teal primary color, professional color palette
- **Fully Responsive**: Mobile-first design that works on all devices
- **Accessibility-Friendly**: Proper semantic HTML, ARIA labels, keyboard navigation
- **Smooth Animations**: Subtle fade/slide animations on scroll
- **Fast Performance**: Static site generation with Next.js

## Sections

1. **Home/Hero**: Professional header with doctor's name, specialty, stats pills, and CTAs
2. **About**: Formal biography with timeline-style education & career
3. **Services**: Medical service cards with pill-shaped icons
4. **Qualifications**: Medical degrees, certifications, and affiliations with badge styling
5. **Clinic Info**: Address, hours with status indicators, parking, and map placeholder
6. **Contact**: Appointment request form with pill-shaped inputs and emergency notice

## Medical UI Components

### Pill Buttons (`btn-pill`)
- Primary: Gradient teal with shadow, hover lift effect
- Secondary: Bordered with hover state
- Outline: Transparent with border

### Capsule Badges (`badge-capsule`)
- Soft background with rounded-full shape
- Pulse indicator for "Accepting Patients" status

### Medical Inputs (`input-medical`)
- Fully rounded (pill-shaped) form inputs
- Focus ring with primary color

### Theme Toggle
- Pill-shaped slider with sun/moon icons
- Medical cross icon on the sliding thumb
- Smooth animated transition

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Customization Guide

### 1. Update Doctor Information

**`app/layout.tsx`** - Update metadata:
```tsx
export const metadata: Metadata = {
  title: "Dr. [Name] | [Specialty]",
  description: "[Your description here]",
};
```

**`app/sections/Hero.tsx`** - Update hero section:
- Doctor's name, specialty badge, introduction
- Statistics pills (years, patients, certifications)
- Profile photo placeholder

**`app/sections/About.tsx`** - Update biography, timeline, focus areas

### 2. Update Services

**`app/sections/Services.tsx`** - Modify services array with title, description, and icon

### 3. Update Qualifications

**`app/sections/Qualifications.tsx`** - Edit degrees, certifications, affiliations

### 4. Update Clinic Information

**`app/sections/Clinic.tsx`** - Address, hours, contact details, map link

### 5. Update Contact Form

**`app/sections/Contact.tsx`** - Form fields, contact details, emergency notice

### 6. Customize Colors

**`app/globals.css`** - Update CSS variables:
```css
:root {
  --primary: #0d9488;        /* Main teal */
  --primary-light: #14b8a6;  /* Light teal */
  --primary-dark: #0f766e;   /* Dark teal */
  /* ... */
}

[data-theme="dark"] {
  /* Dark theme colors */
}
```

### 7. Add Profile Photo

Replace the placeholder in `app/sections/Hero.tsx`:
```tsx
<Image
  src="/path-to-your-photo.jpg"
  alt="Dr. Sarah Chen"
  width={400}
  height={400}
  className="object-cover"
  priority
/>
```

### 8. Add Google Maps Embed

In `app/sections/Clinic.tsx`, replace the map placeholder with:
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
/>
```

## Project Structure

```
app/
├── components/
│   ├── Navigation.tsx    # Fixed header with theme toggle
│   ├── Footer.tsx        # Site footer with theme toggle
│   ├── ThemeProvider.tsx # Light/dark theme context
│   └── ThemeToggle.tsx   # Pill-shaped theme toggle button
├── sections/
│   ├── Hero.tsx          # Home/hero with stats pills
│   ├── About.tsx         # Bio with medical timeline
│   ├── Services.tsx      # Service cards with pill icons
│   ├── Qualifications.tsx # Credentials with badges
│   ├── Clinic.tsx        # Location with status pills
│   └── Contact.tsx       # Form with pill inputs
├── globals.css           # Medical theme CSS variables
├── layout.tsx            # Root layout with ThemeProvider
└── page.tsx              # Main page composition
```

## Medical CSS Classes

| Class | Description |
|-------|-------------|
| `btn-pill` | Base pill button style |
| `btn-pill-primary` | Primary teal gradient button |
| `btn-pill-secondary` | Secondary bordered button |
| `btn-pill-outline` | Outline style button |
| `badge-capsule` | Capsule-shaped badge |
| `input-medical` | Pill-shaped form input |
| `card-medical` | Rounded medical card style |
| `tag-pill` | Pill-shaped tag/chip |
| `dot-pulse` | Pulsing status indicator |

## Theme System

The theme system uses CSS custom properties that switch between light and dark values:

- **Light Theme**: White backgrounds, dark text, teal accents
- **Dark Theme**: Navy/dark backgrounds, light text, brighter teal accents

Theme preference is saved to localStorage and persists across sessions.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Font**: Inter (Google Fonts)
- **Theme**: CSS Custom Properties with React Context

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible indicators
- Reduced motion support
- Proper heading hierarchy
- Form labels and validation
- Color contrast compliance

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This template is provided as-is for professional use. Customize as needed for your medical practice.
