# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Goal**: Building a student assignments app that lists assignments from Canvas LMS.

**Current Status**: Starting from the "next-pwa-template" foundation. This template provides a solid base with PWA support, dark/light themes, and mobile-friendly UI. The Canvas LMS integration and assignments functionality need to be built.

The template currently has placeholder pages (rice bowl content) that will be replaced with assignments views.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

Note: This project uses `pnpm` as the package manager (pnpm-lock.yaml present).

## Architecture

### Core Stack
- **Framework**: Next.js 14 (Pages Router)
- **PWA**: next-pwa with service worker configuration in next.config.js
- **Styling**: Tailwind CSS with custom safe-area utilities for mobile devices
- **Theming**: next-themes for system/dark/light theme support
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to root)

### Project Structure
- `pages/`: Next.js pages using Pages Router
  - `_app.tsx`: Wraps app with ThemeProvider (keep - provides dark/light mode)
  - `_document.tsx`: Custom document for PWA metadata (keep - handles PWA setup)
  - `index.tsx`, `recipes.tsx`, `story.tsx`: **Template placeholder pages** (replace with assignments UI)
- `components/`: Reusable UI components from template
  - `page.tsx`: Main layout wrapper with Appbar and BottomNav (reusable for assignments pages)
  - `appbar.tsx`: Top navigation bar (can customize for app branding)
  - `bottom-nav.tsx`: Bottom navigation for mobile (can update navigation items)
  - `section.tsx`: Content section wrapper (reusable)
- `public/images/`: PWA icons and assets (replace with assignment app branding)
- `styles/globals.css`: Global styles and Tailwind imports

### Building the Canvas LMS Integration
To implement the assignments functionality:
1. **API Routes**: Create `pages/api/` directory with:
   - `courses.ts`: Fetch user's courses from Canvas
   - `assignments.ts`: Fetch assignments for selected course(s)

2. **Canvas API Setup**:
   - API documentation: https://canvas.instructure.com/doc/api/
   - Store Canvas instance URL and API token in `.env.local`:
     ```
     CANVAS_API_URL=https://your-institution.instructure.com
     CANVAS_API_TOKEN=your_token_here
     ```
   - Key endpoints:
     - List courses: `GET /api/v1/courses`
     - List assignments: `GET /api/v1/courses/:course_id/assignments`
     - Assignment details: `GET /api/v1/courses/:course_id/assignments/:id`

3. **Data Fetching**: Consider using SWR or React Query for:
   - Client-side data fetching with automatic revalidation
   - Caching for offline PWA support
   - Loading states and error handling

### Layout Pattern
All pages follow this pattern:
1. Wrap content in `<Page>` component (from components/page.tsx)
2. Page component handles:
   - Head/title management
   - Appbar (top navigation)
   - Main content area with safe-area padding
   - BottomNav (mobile navigation)

### PWA Configuration
- Service worker configured in next.config.js with `dest: 'public'`
- Auto-registration and skip-waiting enabled
- Manifest and icons in public directory

### Styling Conventions
- Uses Tailwind utility classes with dark mode variants
- Mobile-first responsive design
- Safe-area utilities for notched devices (px-safe, pb-safe)
- Custom Prettier config: tabs, single quotes, no semicolons

### Path Aliases
Import using `@/` prefix for root-relative paths:
```typescript
import Page from '@/components/page'
import '@/styles/globals.css'
```
