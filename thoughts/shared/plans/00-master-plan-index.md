# Website Rebuild - Master Plan Index

## Overview

This directory contains the complete breakdown of the website rebuild plan into 8 actionable, parallel-execution implementation plans. Each plan is detailed with phases, success criteria, and dependency information.

**Source**: `REBUILD_PLAN.md` (root of repository)

**Goal**: Rebuild matheusmortatti.com with Astro, Catppuccin theme, blog system, and modern design.

## Execution Strategy

### Parallel Waves

Execute plans in waves based on dependencies:

**Wave 1** - Foundation (Start Immediately)
- Plan 1: Project Foundation & Infrastructure

**Wave 2** - Core Systems (After Wave 1)
- Plan 2: Design System & Theme Implementation
- Plan 4: Content Migration & Asset Organization
  - **These can run in parallel**

**Wave 3** - Layout Framework (After Wave 2)
- Plan 3: Layout Components & Base Templates

**Wave 4** - Content Pages (After Wave 3)
- Plan 5: Homepage Implementation
- Plan 6: Blog System Implementation
  - **These can run in parallel**

**Wave 5** - Archive (After Wave 4)
- Plan 7: Archive Section

**Wave 6** - Production (After Wave 5)
- Plan 8: Polish, Testing & Deployment

## Plan Summaries

### Plan 1: Project Foundation & Infrastructure
**File**: `plan1-foundation-infrastructure.md`
**Dependencies**: None
**Time**: 2-3 hours

Initialize Astro project, set up GitHub Actions deployment, create directory structure, and verify deployment pipeline.

**Key Phases**:
1. Astro project initialization
2. GitHub Actions workflow setup
3. Project structure creation
4. Initial deployment test

**Enables**: All other plans

---

### Plan 2: Design System & Theme Implementation
**File**: `plan2-design-system-theme.md`
**Dependencies**: Plan 1
**Parallel with**: Plan 4
**Time**: 2-3 hours

Implement Catppuccin Mocha/Latte themes, typography system, spacing system, and theme toggle component.

**Key Phases**:
1. Catppuccin color system
2. Typography system
3. Spacing & layout system
4. Global styles & reset
5. Theme toggle component

**Enables**: Plans 3, 5, 6, 7

---

### Plan 3: Layout Components & Base Templates
**File**: `plan3-layout-components-templates.md`
**Dependencies**: Plans 1, 2
**Parallel with**: Plan 4
**Time**: 2-3 hours

Create reusable layout components: BaseLayout, Header with navigation, Footer, and responsive utilities.

**Key Phases**:
1. Base layout component
2. Header component
3. Footer component
4. Update index page
5. Responsive utilities

**Enables**: Plans 5, 6, 7

---

### Plan 4: Content Migration & Asset Organization
**File**: `plan4-content-migration-assets.md`
**Dependencies**: Plan 1
**Parallel with**: Plans 2, 3
**Time**: 2-3 hours

Convert blog posts from HTML to Markdown, migrate images, organize assets, and prepare content collections.

**Key Phases**:
1. Locate original blog posts
2. Convert Wolfbit postmortem
3. Convert GDC postmortem
4. Organize images and assets
5. Validate content collections
6. Archive legacy files
7. Create welcome post

**Enables**: Plans 6, 7

---

### Plan 5: Homepage Implementation
**File**: `plan5-homepage-implementation.md`
**Dependencies**: Plans 1, 2, 3
**Parallel with**: Plan 6
**Time**: 2-3 hours

Build homepage with hero section, about, background, and quick links.

**Key Phases**:
1. Hero section component
2. About section component
3. Background section component
4. Quick links section component
5. Assemble homepage

**Enables**: None (independent)

---

### Plan 6: Blog System Implementation
**File**: `plan6-blog-system-implementation.md`
**Dependencies**: Plans 1, 2, 3, 4
**Parallel with**: Plan 5
**Time**: 3-4 hours

Build complete blog system with listing page, individual posts, search, and Markdown styling.

**Key Phases**:
1. Blog post layout
2. Dynamic blog post pages
3. Blog listing page
4. Post navigation component

**Enables**: Plan 7

---

### Plan 7: Archive Section
**File**: `plan7-archive-section.md`
**Dependencies**: Plans 1, 2, 3, 4, 6
**Time**: 1-2 hours

Create dedicated archive page for legacy posts with search and clear historical context.

**Key Phases**:
1. Archive page implementation
2. Add archive link to main blog
3. Optional: Filter archived from main blog

**Enables**: Plan 8

---

### Plan 8: Polish, Testing & Deployment
**File**: `plan8-polish-testing-deployment.md`
**Dependencies**: All plans (1-7)
**Time**: 2-4 hours

Final polish, comprehensive testing, performance optimization, and production deployment.

**Key Phases**:
1. Automated quality checks
2. Accessibility testing
3. Cross-browser testing
4. Performance optimization
5. SEO verification
6. Final polish
7. Pre-deployment checklist
8. Deployment & verification
9. Post-deployment testing

**Enables**: Production launch

---

## Dependency Graph

```
Plan 1 (Foundation)
  │
  ├─────────┬────────────┐
  │         │            │
  ▼         ▼            ▼
Plan 2    Plan 3    Plan 4
(Design)  (waiting) (Content)
  │         │            │
  ▼         │            │
Plan 3 ◄────┘            │
(Layouts)                │
  │                      │
  ├──────┬──────┐        │
  │      │      │        │
  ▼      ▼      ▼        ▼
Plan 5  Plan 6 ◄─────────┘
(Home)  (Blog)
         │
         ▼
       Plan 7
     (Archive)
         │
         ▼
       Plan 8
   (Deploy)
```

## Critical Path

The fastest path to completion (minimum time):

1. Plan 1: Foundation (2-3h)
2. Plans 2+4 in parallel: Design + Content (2-3h total)
3. Plan 3: Layouts (2-3h)
4. Plans 5+6 in parallel: Homepage + Blog (3-4h total)
5. Plan 7: Archive (1-2h)
6. Plan 8: Deploy (2-4h)

**Total minimum time**: ~12-19 hours (can be done in 2-3 sessions)

## Parallel Execution Opportunities

**Maximum Parallelization**:
- Wave 2: 2 plans in parallel (Plans 2, 4)
- Wave 4: 2 plans in parallel (Plans 5, 6)

**Total parallel savings**: ~4-6 hours

## File Locations

All plans are in: `/thoughts/shared/plans/`

```
thoughts/shared/plans/
├── 00-master-plan-index.md           (this file)
├── plan1-foundation-infrastructure.md
├── plan2-design-system-theme.md
├── plan3-layout-components-templates.md
├── plan4-content-migration-assets.md
├── plan5-homepage-implementation.md
├── plan6-blog-system-implementation.md
├── plan7-archive-section.md
└── plan8-polish-testing-deployment.md
```

## How to Use These Plans

1. **Start with Plan 1** - Must complete first
2. **Follow the wave structure** - Execute plans in dependency order
3. **Parallelize when possible** - Run independent plans together
4. **Check success criteria** - Verify each phase before proceeding
5. **Test frequently** - Run builds and preview often
6. **Track progress** - Use todo lists and checklists
7. **Commit often** - Save progress after each phase

## Success Metrics

From REBUILD_PLAN.md, the rebuild is complete when:

✅ **Core Features**:
- Clean, professional homepage
- Working blog with search
- All old content in archive
- Catppuccin theme with toggle
- Fast load times
- Mobile responsive
- Deployed to matheusmortatti.com

✅ **Performance Targets**:
- Lighthouse Score: 95+ (all categories)
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle Size: < 100KB (excluding images)

✅ **Accessibility**:
- WCAG AA compliant
- Keyboard navigation
- Screen reader compatible
- Semantic HTML

✅ **Technical**:
- No console errors
- All links functional
- Images load correctly
- Theme persists
- GitHub Actions deploys automatically

## Next Steps

1. Review this master plan
2. Read Plan 1 in detail
3. Begin execution with Plan 1
4. Follow dependency graph
5. Check off each plan as completed
6. Launch when Plan 8 complete!

## Notes

- Each plan is self-contained with full implementation details
- Success criteria clearly defined (automated + manual)
- All code examples provided in plans
- Testing strategies included
- Rollback plans documented
- Time estimates are for focused work sessions
- Plans can be executed by different developers if needed
- All dependencies explicitly listed
- Reference to original REBUILD_PLAN.md maintained

## Questions or Issues?

- Check the specific plan file for detailed implementation
- Review REBUILD_PLAN.md for original requirements
- Each plan has a "Notes" section with tips
- Success criteria help verify completion
- Testing sections catch issues early

---

**Generated**: January 2025
**Source**: REBUILD_PLAN.md
**Total Plans**: 8
**Total Estimated Time**: 12-19 hours
**Target**: matheusmortatti.com
