# Plan 5: Homepage Implementation

## Overview

Build the personal homepage with profile information, bio, background sections, and quick links. This creates the main landing page for the site using placeholder content that can be easily updated later.

## Current State Analysis

After Plans 1-4:
- Astro project with working build pipeline
- Design system and theme toggle functional
- Layout components (BaseLayout, Header, Footer) ready
- Content migrated and assets organized
- Minimal placeholder homepage exists

## Desired End State

A complete homepage featuring:
- Hero section with profile photo, name, and tagline
- About section with bio paragraph
- Background section with education and experience
- Quick links to blog, archive, and external profiles
- Fully responsive design
- All content easily updatable via component props or data file

### Verification:
- Homepage renders with all sections
- Profile photo displays correctly
- Links work to blog, archive, and external sites
- Responsive on mobile, tablet, desktop
- Theme toggle works on homepage
- No layout shifts or performance issues

## What We're NOT Doing

- Not filling in real personal information (use placeholders)
- Not implementing blog listing on homepage (separate page)
- Not adding animations beyond basic hover effects
- Not building a contact form (just links)

## Implementation Approach

Build the homepage in sections: Hero first (visual anchor), then About (context), then Background (details), then Quick Links (navigation). Use semantic HTML, keep content easily editable, and ensure responsive design at each step.

## Phase 1: Hero Section Component

### Overview
Create the top section with profile photo, name, tagline, and primary contact links.

### Changes Required:

#### 1. Create Hero Section Component
**File**: `src/components/home/HeroSection.astro`

```astro
---
interface Props {
  name: string;
  tagline: string;
  avatarUrl: string;
  links: Array<{
    label: string;
    href: string;
    icon?: string;
  }>;
}

const { name, tagline, avatarUrl, links } = Astro.props;
---

<section class="hero-section">
  <div class="hero-content">
    <div class="avatar-wrapper">
      <img
        src={avatarUrl}
        alt={`${name} profile photo`}
        class="avatar"
        width="150"
        height="150"
      />
    </div>

    <h1 class="hero-name">{name}</h1>
    <p class="hero-tagline">{tagline}</p>

    <div class="hero-links">
      {links.map(link => (
        <a
          href={link.href}
          class="hero-link"
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
</section>

<style>
  .hero-section {
    padding-top: var(--spacing-12);
    padding-bottom: var(--spacing-8);
    text-align: center;
  }

  .hero-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .avatar-wrapper {
    display: inline-block;
    margin-bottom: var(--spacing-4);
  }

  .avatar {
    width: 150px;
    height: 150px;
    border-radius: var(--radius-full);
    border: 4px solid var(--color-surface-0);
    object-fit: cover;
    transition: border-color var(--transition-base);
  }

  .avatar:hover {
    border-color: var(--color-primary);
  }

  .hero-name {
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
  }

  .hero-tagline {
    margin-bottom: var(--spacing-6);
    font-size: var(--font-size-xl);
    color: var(--color-subtext-1);
    line-height: var(--line-height-normal);
  }

  .hero-links {
    display: flex;
    gap: var(--spacing-3);
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-link {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-2) var(--spacing-4);
    background: var(--color-surface-0);
    color: var(--color-text);
    text-decoration: none;
    border-radius: var(--radius-lg);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    transition: background-color var(--transition-base),
                transform var(--transition-base);
  }

  .hero-link:hover {
    background: var(--color-surface-1);
    transform: translateY(-2px);
    text-decoration: none;
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .hero-section {
      padding-top: var(--spacing-8);
    }

    .avatar {
      width: 120px;
      height: 120px;
    }

    .hero-name {
      font-size: var(--font-size-3xl);
    }

    .hero-tagline {
      font-size: var(--font-size-lg);
    }

    .hero-links {
      gap: var(--spacing-2);
    }

    .hero-link {
      padding: var(--spacing-1) var(--spacing-3);
      font-size: var(--font-size-sm);
    }
  }
</style>
```

### Success Criteria:

#### Automated Verification:
- [ ] Component compiles without errors
- [ ] TypeScript types valid
- [ ] Build succeeds: `npm run build`

#### Manual Verification:
- [ ] Profile photo renders correctly
- [ ] Name and tagline display prominently
- [ ] Links are clickable and styled correctly
- [ ] Hover effects work smoothly
- [ ] Responsive on mobile

---

## Phase 2: About Section Component

### Overview
Create an about section with bio paragraph and current position.

### Changes Required:

#### 1. Create About Section Component
**File**: `src/components/home/AboutSection.astro`

```astro
---
interface Props {
  bio: string;
  position?: string;
  company?: string;
  location?: string;
}

const { bio, position, company, location } = Astro.props;
---

<section class="about-section">
  <div class="section-content">
    <h2 class="section-title">About</h2>

    <div class="bio-content">
      <p class="bio-text">{bio}</p>

      {(position || company || location) && (
        <div class="current-info">
          {position && company && (
            <p class="info-item">
              <span class="info-label">Currently:</span>
              {position} at {company}
            </p>
          )}
          {location && (
            <p class="info-item">
              <span class="info-label">Location:</span>
              {location}
            </p>
          )}
        </div>
      )}
    </div>
  </div>
</section>

<style>
  .about-section {
    padding-top: var(--spacing-8);
    padding-bottom: var(--spacing-8);
  }

  .section-content {
    max-width: 680px;
    margin: 0 auto;
  }

  .section-title {
    margin-bottom: var(--spacing-4);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .bio-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  .bio-text {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-subtext-1);
    margin: 0;
  }

  .current-info {
    padding: var(--spacing-4);
    background: var(--color-surface-0);
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--color-primary);
  }

  .info-item {
    margin: 0;
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-base);
    color: var(--color-text);
  }

  .info-item:last-child {
    margin-bottom: 0;
  }

  .info-label {
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
    margin-right: var(--spacing-1);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .section-title {
      font-size: var(--font-size-xl);
    }

    .bio-text {
      font-size: var(--font-size-base);
    }
  }
</style>
```

### Success Criteria:

#### Automated Verification:
- [ ] Component compiles without errors
- [ ] Build succeeds

#### Manual Verification:
- [ ] Bio text is readable and well-formatted
- [ ] Current info box stands out visually
- [ ] Optional fields handled correctly
- [ ] Responsive layout works

---

## Phase 3: Background Section Component

### Overview
Create a background section with education and experience highlights.

### Changes Required:

#### 1. Create Background Section Component
**File**: `src/components/home/BackgroundSection.astro`

```astro
---
interface BackgroundItem {
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
}

interface Props {
  education: BackgroundItem[];
  experience: BackgroundItem[];
  skills?: string[];
}

const { education, experience, skills } = Astro.props;
---

<section class="background-section">
  <div class="section-content">
    <h2 class="section-title">Background</h2>

    {education && education.length > 0 && (
      <div class="background-category">
        <h3 class="category-title">Education</h3>
        <div class="items-list">
          {education.map(item => (
            <div class="background-item">
              <div class="item-header">
                <h4 class="item-title">{item.title}</h4>
                {item.period && (
                  <span class="item-period">{item.period}</span>
                )}
              </div>
              {item.subtitle && (
                <p class="item-subtitle">{item.subtitle}</p>
              )}
              {item.description && (
                <p class="item-description">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {experience && experience.length > 0 && (
      <div class="background-category">
        <h3 class="category-title">Experience</h3>
        <div class="items-list">
          {experience.map(item => (
            <div class="background-item">
              <div class="item-header">
                <h4 class="item-title">{item.title}</h4>
                {item.period && (
                  <span class="item-period">{item.period}</span>
                )}
              </div>
              {item.subtitle && (
                <p class="item-subtitle">{item.subtitle}</p>
              )}
              {item.description && (
                <p class="item-description">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {skills && skills.length > 0 && (
      <div class="background-category">
        <h3 class="category-title">Skills & Interests</h3>
        <div class="skills-list">
          {skills.map(skill => (
            <span class="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    )}
  </div>
</section>

<style>
  .background-section {
    padding-top: var(--spacing-8);
    padding-bottom: var(--spacing-8);
    background: var(--color-mantle);
  }

  .section-content {
    max-width: 680px;
    margin: 0 auto;
  }

  .section-title {
    margin-bottom: var(--spacing-6);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .background-category {
    margin-bottom: var(--spacing-6);
  }

  .background-category:last-child {
    margin-bottom: 0;
  }

  .category-title {
    margin-bottom: var(--spacing-3);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  .background-item {
    padding: var(--spacing-4);
    background: var(--color-base);
    border-radius: var(--radius-lg);
    border-left: 3px solid var(--color-surface-1);
    transition: border-color var(--transition-base);
  }

  .background-item:hover {
    border-left-color: var(--color-primary);
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-1);
  }

  .item-title {
    margin: 0;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .item-period {
    font-size: var(--font-size-sm);
    color: var(--color-subtext-1);
    white-space: nowrap;
  }

  .item-subtitle {
    margin: 0;
    margin-bottom: var(--spacing-1);
    font-size: var(--font-size-sm);
    color: var(--color-subtext-1);
  }

  .item-description {
    margin: 0;
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    color: var(--color-subtext-0);
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }

  .skill-tag {
    padding: var(--spacing-1) var(--spacing-3);
    background: var(--color-surface-0);
    color: var(--color-text);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .item-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .item-period {
      font-size: var(--font-size-xs);
    }
  }
</style>
```

### Success Criteria:

#### Automated Verification:
- [ ] Component compiles without errors
- [ ] TypeScript interfaces valid
- [ ] Build succeeds

#### Manual Verification:
- [ ] Education and experience items display correctly
- [ ] Skills tags render nicely
- [ ] Background color differentiates section
- [ ] Hover effects on items work
- [ ] Mobile layout stacks properly

---

## Phase 4: Quick Links Section Component

### Overview
Create a quick links section for navigation to key pages and external profiles.

### Changes Required:

#### 1. Create Quick Links Component
**File**: `src/components/home/QuickLinksSection.astro`

```astro
---
interface Link {
  title: string;
  description: string;
  href: string;
  external?: boolean;
}

interface Props {
  links: Link[];
}

const { links } = Astro.props;
---

<section class="quick-links-section">
  <div class="section-content">
    <h2 class="section-title">Quick Links</h2>

    <div class="links-grid">
      {links.map(link => (
        <a
          href={link.href}
          class="link-card"
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
        >
          <div class="link-content">
            <h3 class="link-title">
              {link.title}
              {link.external && (
                <span class="external-icon" aria-label="Opens in new tab">
                  ↗
                </span>
              )}
            </h3>
            <p class="link-description">{link.description}</p>
          </div>
          <div class="link-arrow">→</div>
        </a>
      ))}
    </div>
  </div>
</section>

<style>
  .quick-links-section {
    padding-top: var(--spacing-8);
    padding-bottom: var(--spacing-12);
  }

  .section-content {
    max-width: 680px;
    margin: 0 auto;
  }

  .section-title {
    margin-bottom: var(--spacing-4);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-3);
  }

  .link-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-4);
    background: var(--color-surface-0);
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: background-color var(--transition-base),
                border-color var(--transition-base),
                transform var(--transition-base);
  }

  .link-card:hover {
    background: var(--color-surface-1);
    border-color: var(--color-primary);
    transform: translateX(4px);
    text-decoration: none;
  }

  .link-content {
    flex: 1;
  }

  .link-title {
    margin: 0;
    margin-bottom: var(--spacing-1);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
  }

  .external-icon {
    font-size: var(--font-size-sm);
    color: var(--color-subtext-1);
  }

  .link-description {
    margin: 0;
    font-size: var(--font-size-sm);
    color: var(--color-subtext-1);
    line-height: var(--line-height-normal);
  }

  .link-arrow {
    font-size: var(--font-size-xl);
    color: var(--color-primary);
    transition: transform var(--transition-base);
  }

  .link-card:hover .link-arrow {
    transform: translateX(4px);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .links-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

### Success Criteria:

#### Automated Verification:
- [ ] Component compiles without errors
- [ ] Build succeeds

#### Manual Verification:
- [ ] Link cards display in responsive grid
- [ ] Hover effects work smoothly
- [ ] External links open in new tab
- [ ] Arrow animates on hover
- [ ] Mobile shows single column

---

## Phase 5: Assemble Homepage

### Overview
Combine all sections into the final homepage with placeholder data.

### Changes Required:

#### 1. Update Homepage
**File**: `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import HeroSection from '../components/home/HeroSection.astro';
import AboutSection from '../components/home/AboutSection.astro';
import BackgroundSection from '../components/home/BackgroundSection.astro';
import QuickLinksSection from '../components/home/QuickLinksSection.astro';

// Placeholder data - easily replaceable
const heroData = {
  name: 'Matheus Mortatti',
  tagline: 'Game Developer & Programmer',
  avatarUrl: '/images/avatar.png',
  links: [
    { label: 'GitHub', href: 'https://github.com/matheusmortatti' },
    { label: 'Twitter', href: 'https://twitter.com/matheusmortatti' },
    { label: 'Email', href: 'mailto:matheusmortatti@gmail.com' },
  ],
};

const aboutData = {
  bio: 'Passionate about creating engaging interactive experiences and solving complex technical challenges. Currently exploring new opportunities in game development and software engineering.',
  position: 'Software Engineer',
  company: '[Your Company]',
  location: 'San Francisco, CA',
};

const backgroundData = {
  education: [
    {
      title: 'Bachelor of Science in Computer Science',
      subtitle: '[Your University]',
      period: '2014-2018',
      description: 'Focus on game development, computer graphics, and software engineering.',
    },
  ],
  experience: [
    {
      title: 'Senior Game Developer',
      subtitle: '[Company Name]',
      period: '2020-Present',
      description: 'Leading development of gameplay systems and tools.',
    },
    {
      title: 'Software Engineer',
      subtitle: '[Previous Company]',
      period: '2018-2020',
      description: 'Developed backend services and game server infrastructure.',
    },
  ],
  skills: [
    'Game Development',
    'C++',
    'Unity',
    'Unreal Engine',
    'TypeScript',
    'System Design',
    'Graphics Programming',
  ],
};

const quickLinksData = {
  links: [
    {
      title: 'Blog',
      description: 'Read my latest posts and thoughts',
      href: '/blog',
      external: false,
    },
    {
      title: 'Archive',
      description: 'Explore older posts and projects',
      href: '/blog/archive',
      external: false,
    },
    {
      title: 'GitHub',
      description: 'Check out my open source work',
      href: 'https://github.com/matheusmortatti',
      external: true,
    },
    {
      title: 'itch.io',
      description: 'Play games I\'ve created',
      href: 'https://matheusmortatti.itch.io',
      external: true,
    },
  ],
};
---

<BaseLayout
  title="Matheus Mortatti - Game Developer & Programmer"
  description="Personal website and blog of Matheus Mortatti, game developer and programmer"
>
  <Header slot="header" />

  <div class="container">
    <HeroSection {...heroData} />
  </div>

  <div class="container">
    <AboutSection {...aboutData} />
  </div>

  <BackgroundSection {...backgroundData} />

  <div class="container">
    <QuickLinksSection {...quickLinksData} />
  </div>

  <Footer slot="footer" />
</BaseLayout>

<style>
  /* Additional page-specific styles if needed */
</style>
```

### Success Criteria:

#### Automated Verification:
- [ ] Page compiles without errors
- [ ] All components render
- [ ] Build succeeds: `npm run build`
- [ ] TypeScript types valid

#### Manual Verification:
- [ ] Homepage renders all sections in order
- [ ] All links work correctly
- [ ] Profile photo loads
- [ ] Theme toggle works
- [ ] Responsive on all screen sizes
- [ ] No console errors
- [ ] Smooth scrolling between sections
- [ ] Consistent spacing throughout

---

## Testing Strategy

### Unit Tests:
Not applicable for page components.

### Integration Tests:
- Test all sections render together correctly
- Verify links navigate properly
- Test responsive behavior at breakpoints

### Manual Testing Steps:
1. Visit homepage in development server
2. Verify all sections appear in correct order
3. Test theme toggle (Mocha ↔ Latte)
4. Click all internal links (blog, archive)
5. Click all external links (open in new tabs)
6. Test on mobile (320px, 375px, 414px)
7. Test on tablet (768px, 1024px)
8. Test on desktop (1280px, 1920px)
9. Verify profile photo loads and displays correctly
10. Check spacing and alignment on all screen sizes
11. Test keyboard navigation (tab through links)
12. Verify ARIA labels with screen reader
13. Check hover effects on all interactive elements
14. Measure page load time (should be fast)

## Performance Considerations

- Optimize profile photo (resize to exact display size)
- Use lazy loading for below-fold images if needed
- Keep components lightweight (no heavy JavaScript)
- Minimize layout shifts with proper sizing
- Use efficient CSS (avoid expensive selectors)

## Migration Notes

The placeholder data in the homepage is intentionally generic and marked with `[Your Company]`, `[Your University]` etc. to make it obvious what needs to be updated.

**To update personal information later:**
1. Edit the data objects in `src/pages/index.astro`
2. Replace placeholder text with real information
3. Update links to actual profiles
4. Replace avatar photo if needed

**Consider extracting to data file:**
For easier maintenance, could move data to `src/data/homepage.ts` in the future.

## References

- Original plan: `REBUILD_PLAN.md`
- Design system: `plan2-design-system-theme.md`
- Layout components: `plan3-layout-components-templates.md`

## Dependencies

**Required before starting:**
- Plan 1: Project Foundation (must be complete)
- Plan 2: Design System (must be complete)
- Plan 3: Layout Components (must be complete)

**Blocks these plans:**
- None (homepage is independent)

**Can run in parallel with:**
- Plan 6: Blog System (different pages)
- Plan 7: Archive Section (different pages)

## Estimated Time

2-3 hours including responsive testing and refinement

## Notes

- Keep placeholder data obvious so it's clear what needs updating
- Focus on structure and design, not actual content
- Make data easily replaceable (consider data file extraction)
- Ensure all sections are optional (handle empty arrays gracefully)
- Test thoroughly on multiple devices and screen sizes
- Hero section is the most important - ensure it looks great
- Background section differentiates visually with alternate background
- Quick links provide easy navigation to key pages
- Consider adding a "Latest Posts" section in future iteration (not this plan)
