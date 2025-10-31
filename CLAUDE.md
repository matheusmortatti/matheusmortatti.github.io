# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website and blog built with Astro 5 (Static Site Generator). The site is deployed to GitHub Pages at https://matheusmortatti.com.

## Development Commands

All commands are run from the root of the project:

- `npm install` - Install dependencies
- `npm run dev` - Start local dev server at `localhost:4321`
- `npm run build` - Build production site (runs `astro check` then `astro build`)
- `npm run preview` - Preview production build locally
- `npm run astro ...` - Run Astro CLI commands (e.g., `npm run astro add`)

## Architecture

### Content Collections

The site uses Astro Content Collections for blog posts:

- **Content Schema**: Defined in `src/content/config.ts` with Zod validation
- **Blog Posts**: Stored as Markdown files in `src/content/blog/`
- **Frontmatter Fields**:
  - `title` (required): Post title
  - `date` (required): Publication date
  - `description` (optional): Post description
  - `tags` (optional): Array of tag strings
  - `archived` (optional): Boolean flag for archived posts

### Site Structure

```
src/
├── components/         # Reusable Astro components
│   ├── blog/          # Blog-specific components (BlogCard, PostNavigation)
│   ├── Header.astro   # Site header with navigation
│   ├── Footer.astro   # Site footer
│   └── ThemeToggle.astro  # Dark/light theme switcher
├── content/
│   ├── blog/          # Blog post markdown files
│   └── config.ts      # Content collection schemas
├── layouts/
│   ├── BaseLayout.astro   # Base layout with SEO meta tags
│   └── BlogPost.astro     # Blog post layout
├── pages/             # File-based routing
│   ├── index.astro    # Homepage
│   └── blog/
│       ├── index.astro    # Blog listing page
│       └── [slug].astro   # Dynamic blog post pages
├── scripts/           # Client-side JavaScript
└── styles/            # Global CSS (using Catppuccin theme)
```

### Theme System

The site uses a Catppuccin color scheme with two themes:
- `mocha` (dark theme)
- `latte` (light theme)

Theme selection is stored in localStorage and initialized inline in `BaseLayout.astro` to prevent FOUC (Flash of Unstyled Content). The theme respects system preferences by default.

### Blog Post Rendering

Blog posts (`src/pages/blog/[slug].astro`) are dynamically generated using:
- `getCollection('blog')` to fetch all posts
- Posts are sorted by date (newest first)
- Reading time is calculated at 200 words/minute
- Previous/next post navigation is automatically generated based on chronological order

### Configuration

**astro.config.mjs** settings:
- Site URL: `https://matheusmortatti.com`
- Build output: `./dist/`
- Assets directory: `assets`
- Integrations: Sitemap generation enabled

### Static Assets

- `public/` - Static files served as-is (images, PDFs, favicon, robots.txt)
- `.nojekyll` file present to prevent GitHub Pages Jekyll processing
- `CNAME` file for custom domain configuration

## Adding New Blog Posts

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter with required fields (title, date)
3. Write content in Markdown below frontmatter
4. Post will be automatically included in blog listing and have a URL at `/blog/{filename}/`

## Production Build Notes

- Type checking (`astro check`) runs automatically before build
- Sitemap is generated automatically at `/sitemap-index.xml`
- Build outputs to `./dist/` directory
- GitHub Pages deployment uses the `dist/` directory
