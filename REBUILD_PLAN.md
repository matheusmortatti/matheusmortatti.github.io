# Website Rebuild Plan - matheusmortatti.com

## Overview
Rebuild personal website with a modern, minimalist design embodying Catppuccin Mocha aesthetic. Focus on simplicity, readability, and cozy user experience.

## Project Goals
- Clean, professional homepage with personal information
- Dedicated blog section with archive of existing posts
- Minimalist design with Catppuccin theming
- Fast, accessible, and mobile-responsive
- Easy to maintain and update content

## Tech Stack

### Core Technology: Astro
- **Framework**: Astro 4.x (static site generator)
- **Styling**: Vanilla CSS with CSS custom properties (Catppuccin palette)
- **Content**: Markdown/MDX for blog posts
- **Deployment**: GitHub Actions → GitHub Pages
- **Domain**: matheusmortatti.com (existing CNAME)

### Why Astro?
- Zero JavaScript by default (fast, lightweight)
- Built-in content collections for blog management
- Excellent Markdown support with frontmatter
- Simple component architecture
- Native TypeScript support
- Minimal configuration needed

### Dependencies
- Astro core (~50KB runtime)
- Optional: Astro Icon for SVG icons
- No heavy frameworks (React, Vue, etc.)

## Site Structure

```
/
├── index.html              # Homepage
├── blog/
│   ├── index.html          # Blog listing
│   ├── [slug]/             # Individual posts
│   └── archive/            # Legacy posts section
├── assets/
│   ├── images/             # Profile photo, etc.
│   └── styles/             # Global CSS
└── pdf/
    └── cv.pdf              # Keep but not linked
```

## Design System

### Catppuccin Mocha Theme (Default)
```
Base Colors:
- Background: #1e1e2e (Base)
- Surface: #313244 (Surface0)
- Overlay: #45475a (Surface2)
- Text: #cdd6f4 (Text)
- Subtext: #bac2de (Subtext1)
- Accent: #89b4fa (Blue) - primary actions
- Accent2: #f5c2e7 (Pink) - highlights
```

### Catppuccin Latte Theme (Light Toggle)
```
Base Colors:
- Background: #eff1f5 (Base)
- Surface: #e6e9ef (Mantle)
- Overlay: #ccd0da (Surface0)
- Text: #4c4f69 (Text)
- Subtext: #6c6f85 (Subtext1)
- Accent: #1e66f5 (Blue)
- Accent2: #ea76cb (Pink)
```

### Typography
- **Font Family**: System font stack for performance
  - `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- **Headings**: Slightly increased weight, generous line-height
- **Body**: 16-18px base size, 1.6-1.8 line-height for readability
- **Code blocks**: Monospace with syntax highlighting (Catppuccin theme)

### Layout Principles
- **Max content width**: 680-720px for readability
- **Spacing**: Consistent 8px grid system (8, 16, 24, 32, 48, 64)
- **Responsive**: Mobile-first approach
- **White space**: Generous padding and margins for "cozy" feel
- **Border radius**: Soft corners (8-12px) for warmth

## Page Specifications

### 1. Homepage (`/`)

**Sections:**
1. **Hero/Header**
   - Profile photo (circular, 120-150px)
   - Name (H1)
   - Tagline/Current role (placeholder text)
   - Contact links (email, GitHub, Twitter, etc.)

2. **About**
   - Brief bio paragraph (placeholder text)
   - Current position/company
   - Location (optional)

3. **Background**
   - Education (placeholder)
   - Notable experience (placeholder)
   - Skills/interests (placeholder)

4. **Quick Links**
   - Blog →
   - Archive →
   - External links (GitHub, etc.)

**Features:**
- Theme toggle button (moon/sun icon) in header
- Smooth scroll navigation
- Subtle hover effects on links

### 2. Blog Listing (`/blog`)

**Layout:**
- List of blog posts (newest first)
- Each entry shows:
  - Title
  - Date (formatted: "Jan 15, 2025")
  - Optional: Brief excerpt or description
  - Read time estimate (optional)
- Simple search/filter bar at top
  - Filters posts by title (client-side JavaScript)
  - Minimal, unobtrusive design

**Design:**
- Clean, card-less design (just titles and dates)
- Hover effects to indicate clickability
- Dividers between posts (subtle lines)

### 3. Blog Post (`/blog/[slug]`)

**Layout:**
- Post title (H1)
- Date published
- Article content (Markdown rendered)
- Navigation: Back to blog, Previous/Next post
- Optional: Table of contents for longer posts

**Content Styling:**
- Headers: Clear hierarchy (H2, H3 styled consistently)
- Links: Underlined or clearly differentiated
- Code blocks: Catppuccin syntax theme
- Images: Centered, responsive, subtle border
- Quotes: Styled blockquotes with left border
- Lists: Proper spacing

### 4. Archive Section (`/blog/archive`)

**Content:**
- Legacy blog posts from current site:
  - "Wolfbit Postmortem" (2017)
  - "GDC Postmortem" (2017)
  - "First" post
- Migrated to Markdown format
- Keep original images and content
- Note indicating these are archived posts

## Content Migration

### Existing Assets to Keep
- `images/avatar.png` → profile photo (until replaced)
- `images/wolfbit.gif`, `wolfbitAnalytics.png`, `wolfbitGameplay.gif`
- `pdf/matheus-mortatti-cv.pdf` → keep in repo (not linked publicly)

### Blog Posts to Migrate
1. **Wolfbit Postmortem** (Jan 18, 2017)
   - Convert HTML to Markdown
   - Preserve images
   - Add frontmatter (title, date, tags)

2. **GDC Postmortem** (Mar 25, 2017)
   - Same conversion process

3. **First Post**
   - Archive if relevant

### Frontmatter Structure
```yaml
---
title: "Post Title"
date: 2017-01-18
description: "Brief description"
tags: ["gamedev", "postmortem"]  # optional
archived: true  # for legacy posts
---
```

## Development Workflow

### Project Setup
1. Initialize new Astro project
2. Configure for GitHub Pages deployment
3. Set up content collections for blog posts
4. Create base layout with theme toggle
5. Implement Catppuccin color system

### Implementation Phases

**Phase 1: Foundation (Core Setup)**
- Initialize Astro project
- Create base layout template
- Implement Catppuccin themes + toggle
- Set up typography and spacing system
- Create global styles

**Phase 2: Homepage**
- Build hero section with profile
- Add about section with placeholder content
- Implement contact links
- Make responsive

**Phase 3: Blog System**
- Set up Astro content collections
- Create blog listing page
- Build blog post template
- Add search/filter functionality
- Style Markdown content

**Phase 4: Content Migration**
- Convert existing blog posts to Markdown
- Migrate images to new structure
- Create archive section
- Test all links and images

**Phase 5: Polish & Deploy**
- Add theme toggle persistence (localStorage)
- Implement smooth transitions
- Add favicon and meta tags
- Test responsiveness
- Set up GitHub Actions workflow
- Deploy to GitHub Pages

### File Structure
```
matheusmortatti.github.io/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPost.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   ├── archive.astro
│   │   │   └── [slug].astro
│   ├── content/
│   │   └── blog/
│   │       ├── config.ts
│   │       ├── wolfbit-postmortem.md
│   │       ├── gdc-postmortem.md
│   │       └── ...future posts
│   ├── components/
│   │   ├── Header.astro
│   │   ├── ThemeToggle.astro
│   │   ├── BlogCard.astro
│   │   └── SearchBar.astro
│   └── styles/
│       ├── global.css
│       └── themes.css
├── public/
│   ├── images/
│   │   ├── avatar.png
│   │   ├── wolfbit.gif
│   │   └── ...
│   ├── pdf/
│   │   └── matheus-mortatti-cv.pdf
│   ├── CNAME
│   └── favicon.ico
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Deployment

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies
      - Build Astro site
      - Deploy to gh-pages branch
```

### Astro Configuration
```js
// astro.config.mjs
export default defineConfig({
  site: 'https://matheusmortatti.com',
  base: '/',
  // ... other config
});
```

### Domain Setup
- Keep existing `CNAME` file with `matheusmortatti.com`
- Ensure DNS settings point to GitHub Pages
- Enable HTTPS in GitHub repo settings

## Features Breakdown

### Core Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Theme toggle (Mocha ↔ Latte)
- ✅ Blog post listing with dates
- ✅ Markdown blog posts with frontmatter
- ✅ Search/filter by post title
- ✅ Archive section for old posts
- ✅ Fast page loads (no heavy JS)

### Optional/Future Enhancements
- RSS feed (built into Astro)
- Tags/categories for posts
- Reading time estimates
- View counter (privacy-friendly)
- Open Graph meta tags for social sharing
- Syntax highlighting for code blocks
- Table of contents for long posts

## Performance Targets
- **Lighthouse Score**: 95+ (all categories)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: < 100KB total (excluding images)

## Accessibility Goals
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)
- Alt text for all images
- Skip to content link

## Browser Support
- Modern browsers (last 2 versions)
- Chrome, Firefox, Safari, Edge
- Mobile Safari, Chrome Mobile
- Graceful degradation for older browsers

## Testing Checklist
- [ ] Homepage renders correctly
- [ ] Theme toggle works and persists
- [ ] Blog listing shows all posts
- [ ] Search filter works
- [ ] Individual blog posts render
- [ ] Images load correctly
- [ ] Links work (internal and external)
- [ ] Mobile responsive on all pages
- [ ] Archive section accessible
- [ ] CV file exists but not linked
- [ ] Fast load times
- [ ] No console errors

## Timeline Estimate
- **Phase 1** (Foundation): 2-3 hours
- **Phase 2** (Homepage): 2 hours
- **Phase 3** (Blog System): 3-4 hours
- **Phase 4** (Content Migration): 1-2 hours
- **Phase 5** (Polish & Deploy): 1-2 hours

**Total**: ~10-13 hours (can be done in 1-2 sessions)

## Success Criteria
1. ✅ Clean, professional homepage with personal info
2. ✅ Working blog with search functionality
3. ✅ All old content preserved in archive
4. ✅ Catppuccin theme with working toggle
5. ✅ Fast load times and good performance
6. ✅ Mobile responsive design
7. ✅ Successfully deployed to matheusmortatti.com
8. ✅ Easy to add new blog posts (just add .md file)

## Maintenance
- **Adding new posts**: Create new `.md` file in `src/content/blog/`
- **Updating info**: Edit `src/pages/index.astro`
- **Theme changes**: Modify `src/styles/themes.css`
- **Deployment**: Automatic on push to main branch

## Notes
- Keep design minimal and content-focused
- Prioritize readability and user experience
- Use subtle animations/transitions (avoid flashy effects)
- Embrace "cozy" aesthetic: warm colors, soft edges, generous spacing
- Make it personal - this is YOUR space on the web

## Resources
- [Astro Documentation](https://docs.astro.build)
- [Catppuccin Palette](https://catppuccin.com/palette)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
