# Plan 7: Archive Section

## Overview

Create a dedicated archive page that displays legacy blog posts with a clear indication that they are historical content. This provides a separate space for older posts while keeping the main blog listing focused on recent content.

## Current State Analysis

After Plans 1-6:
- Blog system fully functional
- Blog posts migrated with `archived: true` flag
- Main blog listing shows all posts (archived and new)
- No dedicated archive page exists

## Desired End State

A dedicated archive page featuring:
- All archived posts in a clean list
- Clear indication this is historical content
- Chronological organization
- Same search functionality as main blog
- Consistent styling with rest of site
- Link from main blog to archive

## Desired End State

The archive section properly displays older blog posts with clear historical context.

### Verification:
- Archive page accessible at /blog/archive
- Only archived posts appear (where `archived: true`)
- Posts sorted chronologically
- Search functionality works
- Clear messaging about historical content
- Links work to individual posts
- Responsive design

## What We're NOT Doing

- Not creating separate styling for archived posts (reuse blog components)
- Not implementing advanced filtering (just show all archived)
- Not archiving posts automatically by date
- Not creating an archive index by year/month

## Implementation Approach

Reuse the blog listing components and layout from Plan 6, but filter to only show archived posts. Add introductory text explaining the archive. Keep implementation minimal and consistent.

## Phase 1: Archive Page Implementation

### Overview
Create the archive page that filters and displays only archived posts.

### Changes Required:

#### 1. Create Archive Page
**File**: `src/pages/blog/archive.astro`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import BlogCard from '../../components/blog/BlogCard.astro';

// Get only archived posts and sort by date (newest first)
const allPosts = await getCollection('blog');
const archivedPosts = allPosts
  .filter(post => post.data.archived === true)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<BaseLayout
  title="Archive | Matheus Mortatti"
  description="Historical blog posts and writings from earlier years"
>
  <Header slot="header" />

  <div class="archive-page">
    <div class="container">
      <header class="page-header">
        <h1 class="page-title">Archive</h1>
        <p class="page-description">
          Historical blog posts and writings from earlier years. These posts are preserved as-is from the original site.
        </p>
      </header>

      <div class="archive-info">
        <div class="info-icon">📦</div>
        <div class="info-content">
          <p class="info-text">
            <strong>About the Archive:</strong> These posts date back to {archivedPosts.length > 0 && new Date(Math.min(...archivedPosts.map(p => p.data.date.getTime()))).getFullYear()} and have been preserved from the previous version of this site. Content and formatting reflect the original posts.
          </p>
        </div>
      </div>

      <div class="search-container">
        <input
          type="search"
          id="search-input"
          class="search-input"
          placeholder="Search archived posts..."
          aria-label="Search archived posts"
        />
      </div>

      {archivedPosts.length > 0 ? (
        <>
          <div class="posts-list" id="posts-list">
            {archivedPosts.map(post => (
              <BlogCard
                title={post.data.title}
                slug={post.slug}
                date={post.data.date}
                description={post.data.description}
                tags={post.data.tags}
                archived={post.data.archived}
              />
            ))}
          </div>

          <div id="no-results" class="no-results" style="display: none;">
            <p>No archived posts found matching your search.</p>
          </div>
        </>
      ) : (
        <div class="empty-state">
          <p>No archived posts available.</p>
        </div>
      )}

      <div class="back-link">
        <a href="/blog" class="back-button">
          ← Back to Blog
        </a>
      </div>
    </div>
  </div>

  <Footer slot="footer" />
</BaseLayout>

<style>
  .archive-page {
    padding-top: var(--spacing-6);
    padding-bottom: var(--spacing-8);
  }

  .page-header {
    margin-bottom: var(--spacing-6);
    text-align: center;
  }

  .page-title {
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
  }

  .page-description {
    font-size: var(--font-size-lg);
    color: var(--color-subtext-1);
    max-width: 600px;
    margin: 0 auto;
  }

  .archive-info {
    display: flex;
    gap: var(--spacing-3);
    padding: var(--spacing-4);
    margin-bottom: var(--spacing-6);
    background: var(--color-surface-0);
    border-left: 4px solid var(--color-yellow);
    border-radius: var(--radius-lg);
  }

  .info-icon {
    font-size: var(--font-size-2xl);
    flex-shrink: 0;
  }

  .info-content {
    flex: 1;
  }

  .info-text {
    margin: 0;
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-subtext-1);
  }

  .info-text strong {
    color: var(--color-text);
    font-weight: var(--font-weight-semibold);
  }

  .search-container {
    margin-bottom: var(--spacing-6);
  }

  .search-input {
    width: 100%;
    padding: var(--spacing-3) var(--spacing-4);
    background: var(--color-surface-0);
    border: 1px solid var(--color-surface-1);
    border-radius: var(--radius-lg);
    color: var(--color-text);
    font-size: var(--font-size-base);
    font-family: var(--font-sans);
    transition: border-color var(--transition-base);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  .search-input::placeholder {
    color: var(--color-subtext-0);
  }

  .posts-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-8);
  }

  .no-results,
  .empty-state {
    padding: var(--spacing-8);
    text-align: center;
    color: var(--color-subtext-1);
    font-size: var(--font-size-lg);
  }

  .back-link {
    display: flex;
    justify-content: center;
    padding-top: var(--spacing-6);
    border-top: 1px solid var(--color-surface-0);
  }

  .back-button {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-2) var(--spacing-4);
    background: var(--color-surface-0);
    color: var(--color-text);
    text-decoration: none;
    border-radius: var(--radius-lg);
    font-weight: var(--font-weight-medium);
    transition: background-color var(--transition-base);
  }

  .back-button:hover {
    background: var(--color-surface-1);
    text-decoration: none;
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .page-title {
      font-size: var(--font-size-3xl);
    }

    .page-description {
      font-size: var(--font-size-base);
    }

    .archive-info {
      flex-direction: column;
      text-align: center;
    }

    .info-text {
      font-size: var(--font-size-sm);
    }
  }
</style>

<script>
  // Client-side search functionality (same as blog listing)
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const postsList = document.getElementById('posts-list');
  const noResults = document.getElementById('no-results');

  if (searchInput && postsList && noResults) {
    const posts = Array.from(postsList.children) as HTMLElement[];

    searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase();

      let visibleCount = 0;

      posts.forEach(post => {
        const title = post.querySelector('.card-title')?.textContent?.toLowerCase() || '';
        const description = post.querySelector('.card-description')?.textContent?.toLowerCase() || '';

        if (title.includes(query) || description.includes(query)) {
          post.style.display = '';
          visibleCount++;
        } else {
          post.style.display = 'none';
        }
      });

      if (visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    });
  }
</script>
```

### Success Criteria:

#### Automated Verification:
- [x] Page compiles without errors
- [x] Only archived posts included
- [x] Build succeeds: `npm run build`

#### Manual Verification:
- [x] Archive page accessible at /blog/archive
- [x] Only posts with `archived: true` appear
- [x] Info box explains archive purpose
- [x] Search functionality works
- [x] "Back to Blog" link works
- [x] Responsive on mobile

---

## Phase 2: Add Archive Link to Main Blog

### Overview
Add a clear link from the main blog listing to the archive section.

### Changes Required:

#### 1. Update Blog Listing Page
**File**: `src/pages/blog/index.astro` (update)

Add after the page header, before the search container:

```astro
<div class="archive-link-banner">
  <p>
    Looking for older posts?
    <a href="/blog/archive" class="archive-link">
      Visit the Archive →
    </a>
  </p>
</div>
```

Add corresponding styles:

```css
.archive-link-banner {
  padding: var(--spacing-3) var(--spacing-4);
  margin-bottom: var(--spacing-6);
  background: var(--color-surface-0);
  border-radius: var(--radius-lg);
  text-align: center;
  font-size: var(--font-size-base);
  color: var(--color-subtext-1);
}

.archive-link {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  margin-left: var(--spacing-2);
}

.archive-link:hover {
  text-decoration: underline;
}
```

### Success Criteria:

#### Automated Verification:
- [x] Page compiles without errors
- [x] Build succeeds

#### Manual Verification:
- [x] Archive link banner appears on blog listing
- [x] Link navigates to /blog/archive
- [x] Banner styled consistently

---

## Phase 3: Optional - Filter Archived Posts from Main Blog

### Overview
Optionally hide archived posts from the main blog listing, keeping them only in archive.

**Note**: This is optional. The original REBUILD_PLAN.md doesn't specify whether archived posts should appear in both places or only in archive. Decide based on preference.

### Changes Required (if implementing):

#### 1. Update Blog Listing to Exclude Archived Posts
**File**: `src/pages/blog/index.astro` (optional update)

```astro
---
// Change this line:
const sortedPosts = allPosts.sort((a, b) => {

// To this:
const sortedPosts = allPosts
  .filter(post => !post.data.archived) // Exclude archived posts
  .sort((a, b) => {
---
```

Update the archive link banner text:

```astro
<div class="archive-link-banner">
  <p>
    Looking for posts from {' '}
    <a href="/blog/archive" class="archive-link">
      the archive? →
    </a>
  </p>
</div>
```

### Success Criteria:

#### Automated Verification:
- [x] Page compiles without errors
- [x] Build succeeds

#### Manual Verification:
- [x] Main blog shows only non-archived posts
- [x] Archive shows only archived posts
- [x] No overlap between the two pages
- [x] User can still find all content

**Decision Point**: Discuss with user whether to implement this filter or keep archived posts visible in both locations.

---

## Testing Strategy

### Unit Tests:
Not applicable for page components.

### Integration Tests:
- Test archive page renders all archived posts
- Verify search filters correctly
- Test navigation between blog and archive

### Manual Testing Steps:
1. Visit /blog/archive page
2. Verify only archived posts appear
3. Test search functionality
4. Click on archived posts to view details
5. Use "Back to Blog" link
6. From main blog, click "Visit the Archive" link
7. Test on mobile devices
8. Verify consistent styling with main blog
9. Check that archived badge appears on all posts
10. Test theme toggle on archive page

## Performance Considerations

- Reuse blog components (no duplication)
- Archive page is static (pre-rendered)
- Search is lightweight client-side filtering
- No additional JavaScript beyond search

## Migration Notes

No migration needed - this extends existing blog system.

## References

- Original plan: `REBUILD_PLAN.md`
- Blog system: `plan6-blog-system-implementation.md`
- Content migration: `plan4-content-migration-assets.md`

## Dependencies

**Required before starting:**
- Plan 1: Project Foundation (must be complete)
- Plan 2: Design System (must be complete)
- Plan 3: Layout Components (must be complete)
- Plan 4: Content Migration (must be complete)
- Plan 6: Blog System (must be complete)

**Blocks these plans:**
- None (archive is final content feature)

**Can run in parallel with:**
- None (depends on all content plans)

## Estimated Time

1-2 hours including testing

## Notes

- Keep archive page simple and consistent with main blog
- Reuse BlogCard component for consistency
- Info box sets clear expectations about historical content
- Consider whether to show archived posts in main blog or only in archive
- "Back to Blog" link improves navigation
- Search helps users find specific archived posts
- Archive page is discoverable from main blog via banner link
- Earliest archived post year displayed dynamically in info box
- Future enhancement: Could add year-based grouping if archive grows large
