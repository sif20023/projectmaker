# ProjectForge — AI Software Architect

## Overview

ProjectForge is an interactive SaaS web application that guides users through building software projects using a step-by-step wizard with 26 configuration steps and AI-powered blueprint generation.

## Tech Stack

- **Next.js 16** (App Router, webpack for Windows)
- **React 19** with TypeScript
- **Tailwind CSS 3** (v4 was incompatible with Windows native modules)
- **shadcn/ui** (custom components)
- **Framer Motion** (animations)
- **Zustand** (state management + persistence)
- **React Hook Form + Zod** (form validation)
- **LocalStorage** (project persistence)

## Running the Project

```bash
npm run dev      # Start dev server (webpack mode required for Windows)
npm run build    # Production build (webpack mode)
npm start        # Start production server
```

**Note:** Windows requires `--webpack` flag. Turbopack is not supported on Windows.

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout with Header, Sidebar, Footer
    page.tsx            # Landing page
    auth/page.tsx       # Authentication page
    dashboard/page.tsx  # Project dashboard
    builder/page.tsx    # 26-step project builder
    settings/page.tsx   # AI configuration page
    generate/page.tsx   # Blueprint generation output
  components/
    ui/                 # shadcn-style UI components (button, card, etc.)
    layout/             # Header, Sidebar, Footer, ProgressBar
    builder/            # StepNavigator, step renderer
    preview/            # LivePreview panel
    shared/             # Shared components
  lib/
    store.ts            # Zustand store with persistence
    schema.ts           # Zod validation schemas
    utils.ts            # Utility functions (cn, clsx)
    auth.ts             # Mock auth functions
    generator.ts        # Blueprint generation
    preview-items.ts    # Live preview data mapping
  hooks/
    use-local-storage.ts # LocalStorage hook
  types/
    index.ts            # TypeScript type definitions
```

## Key Design Decisions

1. **No Turbopack on Windows** — Uses webpack instead
2. **No Google Fonts** — Uses system fonts to avoid native module issues
3. **Custom shadcn components** — Avoids barrel file issues on Windows
4. **Zustand with persist middleware** — Saves all project data to localStorage
5. **AI settings stored in localStorage** — Never sends API keys to any server

## Configuration

- `next.config.ts` — Disabled Turbopack, set webpack mode
- `tailwind.config.ts` — Dark mode via `class` strategy
- `postcss.config.mjs` — Tailwind CSS v3 with autoprefixer
- `tsconfig.json` — Path aliases for `@/*` → `./src/*`