# Plan 3: Layout Components & Base Templates

## Overview

Create reusable layout components and base templates that provide consistent structure across all pages. This includes the main layout wrapper, header with navigation, footer, and responsive utilities.

## Current State Analysis

After Plans 1 & 2:
- Astro project initialized with working build pipeline
- Design system and theme toggle implemented
- Global CSS and color system in place
- No layout components or page templates exist yet

## Desired End State

A complete set of layout components:
- BaseLayout component wrapping all pages
- Header component with navigation and theme toggle
- Footer component with links and info
- Responsive container utilities
- Consistent meta tags and SEO setup
- Proper semantic HTML structure

### Verification:
- All pages use BaseLayout for consistency
- Header and footer appear on all pages
- Theme toggle accessible in header
- Mobile responsive design works correctly
- Meta tags properly configured
- Accessibility features working (skip links, ARIA labels)

## What We're NOT Doing

- Not implementing page-specific content yet
- Not building blog post layout (comes in Plan 6)
- Not adding actual navigation links (minimal placeholder)
- Not implementing search functionality

## Implementation Approach

Build from the outside in: create BaseLayout first (meta, structure), then Header (nav + theme toggle), then Footer. Focus on semantic HTML, accessibility, and responsive design. Keep components simple and composable.

## Phase 1: Base Layout Component

### Overview
Create the foundational layout wrapper that all pages will use.

### Changes Required:

#### 1. Create BaseLayout Component
**File**: `src/layouts/BaseLayout.astro`

```astro
---
interface Props {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const {
  title,
  description = 'Personal website and blog of Matheus Mortatti',
  image = '/images/avatar.png',
  type = 'website'
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const socialImage = new URL(image, Astro.site);
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={type} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={socialImage} />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary" />
    <meta property="twitter:url" content={canonicalURL} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={socialImage} />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <!-- Theme initialization (prevent FOUC) -->
    <script is:inline>
      (function() {
        const stored = localStorage.getItem('theme');
        if (stored === 'mocha' || stored === 'latte') {
          document.documentElement.setAttribute('data-theme', stored);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
          document.documentElement.setAttribute('data-theme', 'latte');
        } else {
          document.documentElement.setAttribute('data-theme', 'mocha');
        }
      })();
    </script>

    <!-- Global Styles -->
    <link rel="stylesheet" href="/src/styles/global.css" />
  </head>

  <body>
    <a href="#main-content" class="skip-to-content">Skip to content</a>

    <div class="site-wrapper">
      <slot name="header" />

      <main id="main-content" class="main-content">
        <slot />
      </main>

      <slot name="footer" />
    </div>
  </body>
</html>

<style>
  .site-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    width: 100%;
  }
</style>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript types are valid
- [ ] Component renders without errors
- [ ] Build succeeds: `npm run build`

#### Manual Verification:
- [ ] Meta tags appear in page source
- [ ] Open Graph tags valid in Facebook debugger
- [ ] Theme script runs before page render
- [ ] Skip link works with keyboard navigation

---

## Phase 2: Header Component

### Overview
Create header with site branding, navigation, and theme toggle.

### Changes Required:

#### 1. Create Header Component
**File**: `src/components/Header.astro`

```astro
---
import ThemeToggle from './ThemeToggle.astro';

interface Props {
  currentPath?: string;
}

const { currentPath = Astro.url.pathname } = Astro.props;

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Archive', href: '/blog/archive' },
];

function isActive(path: string): boolean {
  if (path === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(path);
}
---

<header class="site-header">
  <div class="container header-content">
    <div class="header-left">
      <a href="/" class="site-logo">
        <span class="logo-text">MM</span>
      </a>
    </div>

    <nav class="site-nav" aria-label="Main navigation">
      <ul class="nav-list">
        {navItems.map(item => (
          <li class="nav-item">
            <a
              href={item.href}
              class:list={['nav-link', { active: isActive(item.href) }]}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <div class="header-right">
      <ThemeToggle />
    </div>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    background-color: var(--color-base);
    border-bottom: 1px solid var(--color-surface-0);
    backdrop-filter: blur(8px);
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
  }

  .header-left,
  .header-right {
    display: flex;
    align-items: center;
  }

  .site-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--color-text);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xl);
    transition: color var(--transition-base);
  }

  .site-logo:hover {
    color: var(--color-primary);
    text-decoration: none;
  }

  .logo-text {
    font-family: var(--font-mono);
  }

  .site-nav {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .nav-list {
    display: flex;
    gap: var(--spacing-4);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-item {
    margin: 0;
  }

  .nav-link {
    display: block;
    padding: var(--spacing-1) var(--spacing-2);
    color: var(--color-subtext-1);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: color var(--transition-base),
                background-color var(--transition-base);
  }

  .nav-link:hover {
    color: var(--color-text);
    background-color: var(--color-surface-0);
    text-decoration: none;
  }

  .nav-link.active {
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .header-content {
      flex-wrap: wrap;
      gap: var(--spacing-2);
    }

    .site-nav {
      order: 3;
      width: 100%;
      justify-content: flex-start;
    }

    .nav-list {
      gap: var(--spacing-2);
    }

    .nav-link {
      padding: var(--spacing-1);
      font-size: var(--font-size-sm);
    }
  }
</style>
```

### Success Criteria:

#### Automated Verification:
- [ ] Component compiles without errors
- [ ] TypeScript types valid
- [ ] Build succeeds

#### Manual Verification:
- [ ] Header appears at top of page
- [ ] Navigation links highlight current page
- [ ] Theme toggle button visible and functional
- [ ] Header is sticky on scroll
- [ ] Mobile layout works correctly
- [ ] Logo links to homepage

---

## Phase 3: Footer Component

### Overview
Create footer with copyright, links, and additional information.

### Changes Required:

#### 1. Create Footer Component
**File**: `src/components/Footer.astro`

```astro
---
const currentYear = new Date().getFullYear();

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/matheusmortatti', icon: 'github' },
  { label: 'Twitter', href: 'https://twitter.com/matheusmortatti', icon: 'twitter' },
  { label: 'Email', href: 'mailto:matheus@mortatti.com', icon: 'email' },
];
---

<footer class="site-footer">
  <div class="container footer-content">
    <div class="footer-section">
      <p class="footer-text">
        © {currentYear} Matheus Mortatti. Built with <a href="https://astro.build" target="_blank" rel="noopener">Astro</a>.
      </p>
    </div>

    <div class="footer-section">
      <ul class="social-links">
        {socialLinks.map(link => (
          <li class="social-item">
            <a
              href={link.href}
              class="social-link"
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    width: 100%;
    border-top: 1px solid var(--color-surface-0);
    background-color: var(--color-base);
    margin-top: var(--spacing-8);
  }

  .footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: var(--spacing-6);
    padding-bottom: var(--spacing-6);
    gap: var(--spacing-4);
  }

  .footer-section {
    display: flex;
    align-items: center;
  }

  .footer-text {
    margin: 0;
    font-size: var(--font-size-sm);
    color: var(--color-subtext-1);
  }

  .footer-text a {
    color: var(--color-primary);
    text-decoration: none;
  }

  .footer-text a:hover {
    text-decoration: underline;
  }

  .social-links {
    display: flex;
    gap: var(--spacing-3);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .social-item {
    margin: 0;
  }

  .social-link {
    display: block;
    padding: var(--spacing-1);
    color: var(--color-subtext-1);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: color var(--transition-base);
  }

  .social-link:hover {
    color: var(--color-primary);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
    }

    .social-links {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
```

### Success Criteria:

#### Automated Verification:
- [ ] Component compiles without errors
- [ ] Build succeeds

#### Manual Verification:
- [ ] Footer appears at bottom of page
- [ ] Social links open in new tabs
- [ ] Copyright year is current
- [ ] Mobile layout stacks correctly
- [ ] External links have proper rel attributes

---

## Phase 4: Update Index Page with Layouts

### Overview
Update the placeholder index page to use the new layout components.

### Changes Required:

#### 1. Update Index Page
**File**: `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout
  title="Matheus Mortatti"
  description="Personal website and blog of Matheus Mortatti"
>
  <Header slot="header" />

  <div class="container">
    <div class="hero">
      <h1>Matheus Mortatti</h1>
      <p class="subtitle">Site under construction - Coming soon!</p>
    </div>
  </div>

  <Footer slot="footer" />
</BaseLayout>

<style>
  .hero {
    padding-top: var(--spacing-12);
    padding-bottom: var(--spacing-12);
    text-align: center;
  }

  .hero h1 {
    margin-bottom: var(--spacing-2);
  }

  .subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-subtext-1);
  }
</style>
```

### Success Criteria:

#### Automated Verification:
- [ ] Page compiles without errors
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors

#### Manual Verification:
- [ ] Homepage renders with header and footer
- [ ] Theme toggle works
- [ ] Navigation highlights "Home"
- [ ] Responsive layout works on mobile
- [ ] All links functional

---

## Phase 5: Responsive Utilities

### Overview
Add CSS utilities for responsive design and common layout patterns.

### Changes Required:

#### 1. Create Utilities CSS File
**File**: `src/styles/utilities.css`

```css
/* Responsive utilities */
.container {
  max-width: var(--container-content);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
}

.container-wide {
  max-width: var(--container-lg);
}

/* Spacing utilities */
.mt-0 { margin-top: var(--spacing-0); }
.mt-1 { margin-top: var(--spacing-1); }
.mt-2 { margin-top: var(--spacing-2); }
.mt-3 { margin-top: var(--spacing-3); }
.mt-4 { margin-top: var(--spacing-4); }
.mt-6 { margin-top: var(--spacing-6); }
.mt-8 { margin-top: var(--spacing-8); }

.mb-0 { margin-bottom: var(--spacing-0); }
.mb-1 { margin-bottom: var(--spacing-1); }
.mb-2 { margin-bottom: var(--spacing-2); }
.mb-3 { margin-bottom: var(--spacing-3); }
.mb-4 { margin-bottom: var(--spacing-4); }
.mb-6 { margin-bottom: var(--spacing-6); }
.mb-8 { margin-bottom: var(--spacing-8); }

/* Text utilities */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-muted { color: var(--color-subtext-1); }

/* Display utilities */
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.block { display: block; }
.inline-block { display: inline-block; }
.hidden { display: none; }

.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }

.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }

.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }

.gap-1 { gap: var(--spacing-1); }
.gap-2 { gap: var(--spacing-2); }
.gap-3 { gap: var(--spacing-3); }
.gap-4 { gap: var(--spacing-4); }

/* Responsive breakpoints */
@media (max-width: 640px) {
  .sm\:hidden { display: none; }
  .sm\:block { display: block; }
}

@media (min-width: 641px) and (max-width: 768px) {
  .md\:hidden { display: none; }
  .md\:block { display: block; }
}

@media (min-width: 769px) {
  .lg\:hidden { display: none; }
  .lg\:block { display: block; }
}

/* Accessibility utilities */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

#### 2. Import Utilities in Global CSS
**File**: `src/styles/global.css` (update)

```css
/* Add to imports section */
@import './utilities.css';
```

### Success Criteria:

#### Automated Verification:
- [ ] CSS validates without errors
- [ ] Build succeeds with utilities

#### Manual Verification:
- [ ] Container classes center content properly
- [ ] Spacing utilities apply correct margins
- [ ] Responsive classes hide/show at breakpoints
- [ ] Utility classes can be combined

---

## Testing Strategy

### Unit Tests:
Not applicable for layout components.

### Integration Tests:
- Test layout components render in different pages
- Verify header/footer appear consistently
- Test responsive behavior at different breakpoints

### Manual Testing Steps:
1. Create test page with BaseLayout
2. Verify header appears with working navigation
3. Test theme toggle in header
4. Check footer renders with correct links
5. Test on mobile (320px, 640px, 768px, 1024px)
6. Verify sticky header behavior on scroll
7. Test keyboard navigation (tab through nav items)
8. Verify skip link works
9. Check ARIA labels with screen reader
10. Validate HTML structure with validator

## Performance Considerations

- Keep header sticky but lightweight (no heavy JavaScript)
- Use CSS transforms for smooth scroll behavior
- Minimize layout shifts with proper sizing
- Use semantic HTML for better parsing
- Inline critical CSS for above-the-fold content

## Migration Notes

The placeholder index page will be replaced with actual content in Plan 5. These layout components will be reused across all pages.

## References

- Original plan: `REBUILD_PLAN.md`
- Plan 2: `plan2-design-system-theme.md`
- Astro layouts: https://docs.astro.build/en/core-concepts/layouts/
- Semantic HTML: https://developer.mozilla.org/en-US/docs/Glossary/Semantics

## Dependencies

**Required before starting:**
- Plan 1: Project Foundation (must be complete)
- Plan 2: Design System & Theme (must be complete)

**Blocks these plans:**
- Plan 5: Homepage Implementation (needs layouts)
- Plan 6: Blog System (needs layouts)
- Plan 7: Archive Section (needs layouts)

**Can run in parallel with:**
- Plan 4: Content Migration (independent work)

## Estimated Time

2-3 hours including responsive testing

## Notes

- Keep layouts simple and composable
- Use slots for flexibility in BaseLayout
- Header should be consistent across all pages
- Footer should be minimal but informative
- Test accessibility features thoroughly
- Ensure proper semantic HTML structure
- Mobile-first responsive design approach
- Sticky header enhances navigation experience
