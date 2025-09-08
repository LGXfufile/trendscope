# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TrendScope is an AI-powered SEO keyword analysis tool built with Next.js 15, TypeScript, and modern React patterns. It provides keyword research, trend analysis, and data visualization for content creators and indie developers.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

The dev server typically runs on http://localhost:3001 if port 3000 is occupied.

## Architecture Overview

### Core Data Flow
- **Mock Data**: Currently uses `mockKeywords` array in `src/app/page.tsx` for demonstration
- **State Management**: Local React state with plans for future API integration
- **Search Flow**: SearchBar → handleSearch → mockKeywords filter → KeywordResults display

### Component Architecture

#### UI Components (`src/components/ui/`)
- **Button**: Standard button with variants (default, secondary, outline, ghost, destructive) and sizes
- **Card**: Container component with glassmorphism styling and hover effects
- **Input**: Enhanced input with label, error states, and icon support

#### Feature Components (`src/components/`)
- **Header**: Navigation with dark mode toggle and branding
- **SearchBar**: Keyword input with real-time suggestions dropdown
- **KeywordResults**: Displays analyzed keywords with trend visualizations and metrics
- **Charts**: Recharts-based components (TrendChart, CompetitionMeter, MetricCard)

### Type System (`src/types/index.ts`)

Key interfaces:
- `KeywordData`: Core keyword metrics (volume, difficulty, CPC, trends, search intent)
- `SearchResult`: API response structure for keyword searches
- `UserHistory`: Search history tracking
- `ContentSuggestion`: AI-generated content recommendations (future feature)

### Styling System

- **Tailwind CSS 4** with custom animations and keyframes
- **Dark mode**: Class-based with localStorage persistence
- **Design tokens**: Custom gradients, glassmorphism effects, and consistent spacing
- **Animations**: Custom keyframes for fade-in, fade-up, scale-in, slide-down, and shimmer effects

### Mock Data Structure

Keywords include:
- Basic metrics: volume, difficulty, competition, CPC
- Trend data: 7-day array of relative values
- Search intent classification: Informational, Commercial, Transactional, Navigational
- Related keywords and seasonality (optional fields)

## Key Integration Points

### Future API Integration
- Replace `mockKeywords` filtering in `handleSearch` function
- Add API service layer in `src/lib/` or `src/services/`
- Implement proper loading states and error handling

### Theming
- Dark mode state managed in main page component
- Theme persistence via localStorage
- CSS custom properties defined in `globals.css`

### Deployment
- Vercel deployment configured with `vercel.json`
- GitHub Actions ready for CI/CD pipeline
- Uses Turbopack for faster builds

## Development Notes

- Uses Next.js 15 App Router with TypeScript
- Framer Motion for animations (limited usage due to build complexity)
- Recharts for data visualization
- Lucide React for consistent iconography
- All components use forwardRef pattern for proper ref handling
- Responsive design with mobile-first approach