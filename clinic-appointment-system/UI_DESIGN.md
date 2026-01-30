# UI Design Specifications - Clinic Appointment Management System

## Design Philosophy

The Clinic Appointment Management System features a modern **glassmorphic design** with a dark theme, smooth animations, and an intuitive user experience.

## Color Palette

### Primary Colors
```css
Indigo:    #6366f1 (rgb(99, 102, 241))
Purple:    #764ba2 (rgb(118, 75, 162))
Deep Blue: #667eea (rgb(102, 126, 234))
```

### Secondary Colors
```css
Pink:      #f093fb (rgb(240, 147, 251))
Red:       #f5576c (rgb(245, 87, 108))
Cyan:      #4facfe (rgb(79, 172, 254))
Turquoise: #00f2fe (rgb(0, 242, 254))
```

### Background Colors
```css
Dark Gray:     #111928 (rgb(17, 25, 40))
Medium Gray:   #1f2937 (rgb(31, 41, 55))
Light Gray:    #374151 (rgb(55, 65, 81))
Purple-Dark:   #312e81 (rgb(49, 46, 129))
```

### Status Colors
```css
Success:   #10b981 (Green)
Warning:   #f59e0b (Amber)
Error:     #ef4444 (Red)
Info:      #3b82f6 (Blue)
```

## Typography

### Font Family
```css
Primary Font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
Code Font: 'Courier New', monospace
```

### Font Sizes
```css
h1: 3rem (48px) - Main headings
h2: 2rem (32px) - Section headings
h3: 1.5rem (24px) - Card titles
h4: 1.25rem (20px) - Subsections
body: 1rem (16px) - Regular text
small: 0.875rem (14px) - Helper text
```

## Glassmorphism Effects

### Glass Card
```css
Background: rgba(17, 25, 40, 0.75)
Backdrop Blur: 16px
Border: 1px solid rgba(255, 255, 255, 0.125)
Border Radius: 20px
Box Shadow: 0 8px 32px rgba(0, 0, 0, 0.5)
```

### Glass Input
```css
Background: rgba(255, 255, 255, 0.08)
Backdrop Blur: 10px
Border: 1px solid rgba(255, 255, 255, 0.2)
Border Radius: 12px
Padding: 12px 16px
```

### Glass Button
```css
Background: rgba(99, 102, 241, 0.3)
Backdrop Blur: 10px
Border: 1px solid rgba(99, 102, 241, 0.4)
Border Radius: 12px
Hover: background rgba(99, 102, 241, 0.5)
```

## Animation Specifications

### Fade In Animation
```css
Duration: 0.6s
Easing: ease-out
Transform: translateY(0) from translateY(20px)
Opacity: 0 to 1
```

### Hover Lift Effect
```css
Duration: 0.3s
Easing: ease
Transform: translateY(-5px)
Box Shadow: 0 10px 30px rgba(0, 0, 0, 0.3)
```

### Float Animation
```css
Duration: 20s
Easing: ease-in-out
Loop: infinite
Transform: translate and rotate
```

### Pulse Animation
```css
Duration: 2s
Easing: ease-in-out
Loop: infinite
Scale: 1 to 1.05
Opacity: 1 to 0.8
```

## Page Layouts

### 1. Home Page (Login/Register)

```
┌─────────────────────────────────────────────────────┐
│                  Floating Shapes                     │
│    ○                                      ○          │
│                                                      │
│              ╔════════════════════╗                  │
│              ║   ClinicCare      ║                  │
│              ║  (Gradient Text)  ║                  │
│              ╚════════════════════╝                  │
│          Your Health, Our Priority                   │
│                                                      │
│         ┌─────────────────────────┐                  │
│         │  [Login]  [Register]    │                  │
│         ├─────────────────────────┤                  │
│         │  Username: [________]   │                  │
│         │  Password: [________]   │                  │
│         │                         │                  │
│         │     [Login Button]      │                  │
│         └─────────────────────────┘                  │
│                                                      │
│                            ○                         │
└─────────────────────────────────────────────────────┘
```

### 2. Book Appointment Page

```
┌─────────────────────────────────────────────────────┐
│  [ClinicCare]  [Book] [Appointments] [Profile] [▼]  │
├─────────────────────────────────────────────────────┤
│                                                      │
│         ┌─────────────────────────┐                  │
│         │   Book Appointment      │                  │
│         ├─────────────────────────┤                  │
│         │ Patient Name: [_______] │                  │
│         │ Phone:        [_______] │                  │
│         │ Date & Time:  [_______] │                  │
│         │ Doctor:       [_______] │                  │
│         │ Department:   [Select▼] │                  │
│         │ Reason:       [_______] │                  │
│         │               [_______] │                  │
│         │                         │                  │
│         │  [Book Appointment]     │                  │
│         └─────────────────────────┘                  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 3. View Appointments Page

```
┌─────────────────────────────────────────────────────┐
│  [ClinicCare]  [Book] [Appointments] [Profile] [▼]  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  My Appointments                                     │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ John Doe                    [SCHEDULED]      │   │
│  │ Dr. Smith • Cardiology                       │   │
│  │ Dec 31, 2024 10:00 AM                        │   │
│  │ Phone: (555) 123-4567           [Cancel]     │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ Jane Smith                  [CONFIRMED]      │   │
│  │ Dr. Johnson • Orthopedics                    │   │
│  │ Jan 15, 2025 2:30 PM                         │   │
│  │ Phone: (555) 987-6543           [Cancel]     │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 4. User Profile Page

```
┌─────────────────────────────────────────────────────┐
│  [ClinicCare]  [Book] [Appointments] [Profile] [▼]  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  My Profile                                          │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  [J]  John Doe                               │   │
│  │       john.doe@email.com                     │   │
│  │       USER                                   │   │
│  │  ────────────────────────────────────────    │   │
│  │  Phone: (555) 123-4567                       │   │
│  │  Address: 123 Main St                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  Edit Profile                    [Edit]      │   │
│  │  ─────────────────────────────────────       │   │
│  │  Full Name:    [John Doe_______]             │   │
│  │  Email:        [john@email.com_]             │   │
│  │  Phone:        [(555) 123-4567_]             │   │
│  │  Address:      [123 Main St____]             │   │
│  │                                               │   │
│  │  Change Password                              │   │
│  │  Current:      [_____________]                │   │
│  │  New:          [_____________]                │   │
│  │                                               │   │
│  │            [Save Changes]                     │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Component Specifications

### Navbar
```
Height: 64px
Background: Glass with blur
Position: Sticky top
Logo: Gradient text with animation
Links: Hover color transition (0.3s)
```

### Glass Card
```
Padding: 32px
Margin: 16px
Border Radius: 20px
Hover Effect: Lift 5px
Animation: Fade in on mount
```

### Input Fields
```
Height: 48px
Padding: 12px 16px
Border Radius: 12px
Focus: Border glow effect
Transition: 0.3s all
```

### Buttons
```
Height: 48px
Padding: 12px 24px
Border Radius: 12px
Font Weight: 600
Hover: Lift effect + brightness
Active: No lift, slight scale
Disabled: Opacity 0.5
```

### Status Badges
```
SCHEDULED: Blue background
CONFIRMED: Green background
CANCELLED: Red background
COMPLETED: Purple background
NO_SHOW: Gray background
Border Radius: Full (pill shape)
Padding: 4px 12px
Font Size: 12px
```

## Responsive Breakpoints

```css
Mobile:      max-width: 640px
Tablet:      min-width: 641px, max-width: 1024px
Desktop:     min-width: 1025px
Large:       min-width: 1280px
```

### Mobile Adjustments
- Single column layout
- Larger touch targets (min 44px)
- Simplified navigation (hamburger menu recommended)
- Reduced padding and margins
- Stacked form fields

### Tablet Adjustments
- Two column layout where appropriate
- Medium padding
- Full navigation visible

### Desktop
- Multi-column layouts
- Maximum content width: 1280px
- Centered content
- Full features visible

## Accessibility

### Color Contrast
- Text on dark background: Minimum 4.5:1 ratio
- Interactive elements: Clear focus states
- Status indicators: Not color-only (icons/text)

### Keyboard Navigation
- Tab order follows visual flow
- Focus indicators visible (2px outline)
- Escape key closes modals
- Enter submits forms

### Screen Readers
- ARIA labels on interactive elements
- Semantic HTML structure
- Alt text for decorative shapes
- Form field labels properly associated

## Loading States

### Spinner
```
Size: 40px
Border: 3px
Color: Primary gradient
Animation: 1s linear infinite spin
```

### Skeleton Loading
```
Background: Shimmer animation
Duration: 1.5s
Direction: Left to right
```

## Error States

### Form Validation
```
Border Color: Red (#ef4444)
Background: Red with 20% opacity
Message: Below field, small text
Icon: Warning icon (red)
```

### API Errors
```
Background: Red with 20% opacity
Border: Red solid
Padding: 16px
Border Radius: 8px
Dismissible: X button
Auto-hide: 5 seconds
```

## Success States

### Confirmation
```
Background: Green with 20% opacity
Border: Green solid
Icon: Checkmark (green)
Auto-hide: 3 seconds
Smooth fade out
```

## Dark Theme Specifications

### Background Gradient
```css
from: rgb(17, 25, 40)    /* Gray-900 */
via:  rgb(49, 46, 129)   /* Purple-900 */
to:   rgb(79, 70, 229)   /* Indigo-900 */
```

### Text Colors
```css
Primary:   #ffffff (White)
Secondary: #d1d5db (Gray-300)
Tertiary:  #9ca3af (Gray-400)
Disabled:  #6b7280 (Gray-500)
```

### Floating Shapes
```css
Shape 1: 300px circle, Indigo-Purple gradient
Shape 2: 250px circle, Pink-Red gradient
Shape 3: 200px circle, Cyan-Turquoise gradient
Blur: 40px
Opacity: 0.5
Animation: 20s float
```

## Icon Usage

### Recommended Icons
- User Profile: User circle icon
- Appointments: Calendar icon
- Doctors: Stethoscope icon
- Logout: Sign out icon
- Edit: Pencil icon
- Delete/Cancel: X or trash icon
- Success: Checkmark icon
- Error: Exclamation icon

### Icon Sizes
```css
Small:  16px
Medium: 24px
Large:  32px
XLarge: 48px
```

This design system ensures a consistent, modern, and accessible user interface throughout the Clinic Appointment Management System.
