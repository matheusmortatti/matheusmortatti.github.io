# matheusmortatti.com

Personal website and blog built with Astro 5 and deployed to GitHub Pages.

**Live Site:** https://matheusmortatti.com

## Tech Stack

- **Framework:** Astro 5 (Static Site Generator)
- **Styling:** Custom CSS with Catppuccin color scheme
- **Deployment:** GitHub Pages
- **Content:** Markdown-based blog posts with Content Collections

## Features

- **Blog System:** Markdown-based blog posts with frontmatter metadata
- **Theme Toggle:** Dark/light mode with Catppuccin Mocha/Latte themes
- **Reading Time:** Automatic calculation for blog posts
- **SEO Optimized:** Meta tags, sitemap, and proper semantic HTML
- **Navigation:** Previous/next post links, chronological ordering
- **Archive System:** Support for archived posts
- **Fast & Lightweight:** Static site generation for optimal performance

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to view the site.

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site (with type checking) |
| `npm run preview` | Preview production build locally |
| `npm run astro ...` | Run Astro CLI commands |

## Project Structure

```
/
├── public/              # Static assets (images, PDFs, favicon)
│   ├── CNAME           # Custom domain configuration
│   └── .nojekyll       # Disable GitHub Pages Jekyll processing
├── src/
│   ├── components/     # Reusable Astro components
│   │   ├── blog/      # Blog-specific components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ThemeToggle.astro
│   ├── content/
│   │   ├── blog/      # Blog post markdown files
│   │   └── config.ts  # Content collection schemas
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Base layout with SEO
│   │   └── BlogPost.astro      # Blog post layout
│   ├── pages/         # File-based routing
│   │   ├── index.astro         # Homepage
│   │   └── blog/
│   │       ├── index.astro     # Blog listing
│   │       └── [slug].astro    # Dynamic blog posts
│   ├── scripts/       # Client-side JavaScript
│   └── styles/        # Global CSS
├── astro.config.mjs   # Astro configuration
└── CLAUDE.md          # AI assistant instructions
```

## Adding Blog Posts

1. Create a new Markdown file in `src/content/blog/`
2. Add frontmatter metadata:

```markdown
---
title: "Your Post Title"
date: 2024-01-15
description: "Optional description"
tags: ["tag1", "tag2"]
archived: false
---

Your content here...
```

3. The post will automatically appear in the blog listing at `/blog/`
4. Individual post URL: `/blog/{filename}/`

### Frontmatter Fields

- **title** (required): Post title
- **date** (required): Publication date (YYYY-MM-DD)
- **description** (optional): Post description for SEO/previews
- **tags** (optional): Array of tag strings
- **archived** (optional): Boolean to mark posts as archived

## Theme System

The site uses Catppuccin color schemes:
- **Mocha** (dark theme)
- **Latte** (light theme)

Theme preference is stored in localStorage and respects system preferences by default. Theme initialization happens inline to prevent flash of unstyled content (FOUC).

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `master` branch.

### Build Process

1. Type checking with `astro check`
2. Static site generation with `astro build`
3. Output to `./dist/` directory
4. Sitemap generation at `/sitemap-index.xml`

### Custom Domain

The site uses a custom domain configured via the `public/CNAME` file.

## License

Personal website - all rights reserved.
