# Plan 6: Blog System Implementation

## Overview

Build the complete blog system including listing page, individual post pages, search/filter functionality, and Markdown content styling. This makes the blog content created in Plan 4 accessible and readable.

## Current State Analysis

After Plans 1-5:
- Astro project with working content collections
- Blog posts migrated to Markdown in `src/content/blog/`
- Design system and layouts ready
- Homepage complete
- No blog UI exists yet

## Desired End State

A complete blog system with:
- Blog listing page showing all posts chronologically
- Individual blog post pages with proper styling
- Client-side search/filter functionality
- Markdown content properly styled (headings, links, code, images)
- Previous/next post navigation
- Reading time estimates
- Responsive design
- Table of contents for long posts (optional)

### Verification:
- Blog listing page renders all posts
- Search filter works to find posts by title
- Individual posts render with proper typography
- Code blocks have syntax highlighting
- Images display correctly in posts
- Links work (internal and external)
- Previous/next navigation functions
- Mobile responsive

## What We're NOT Doing

- Not implementing comments system
- Not adding social share buttons
- Not creating RSS feed (can add later)
- Not implementing tags/categories filtering (can add later)
- Not building admin interface for writing posts

## Implementation Approach

Start with the blog post template (individual posts), then build the listing page, then add search functionality. Style Markdown content carefully for readability. Implement navigation helpers last.

## Phase 1: Blog Post Layout

### Overview
Create layout specifically for blog posts with proper Markdown styling.

### Changes Required:

#### 1. Create Blog Post Layout
**File**: `src/layouts/BlogPost.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  date: Date;
  description?: string;
  readingTime?: string;
  tags?: string[];
  archived?: boolean;
}

const { title, date, description, readingTime, tags, archived } = Astro.props;

const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<BaseLayout title={`${title} | Matheus Mortatti`} description={description} type="article">
  <Header slot="header" />

  <article class="blog-post">
    <div class="container post-container">
      {archived && (
        <div class="archived-notice">
          <span class="archived-icon">📦</span>
          <span>This is an archived post from {formattedDate}</span>
        </div>
      )}

      <header class="post-header">
        <h1 class="post-title">{title}</h1>

        <div class="post-meta">
          <time datetime={date.toISOString()} class="post-date">
            {formattedDate}
          </time>
          {readingTime && (
            <span class="post-reading-time">· {readingTime}</span>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div class="post-tags">
            {tags.map(tag => (
              <span class="tag">{tag}</span>
            ))}
          </div>
        )}
      </header>

      <div class="post-content">
        <slot />
      </div>
    </div>
  </article>

  <Footer slot="footer" />
</BaseLayout>

<style>
  .blog-post {
    padding-top: var(--spacing-6);
    padding-bottom: var(--spacing-8);
  }

  .post-container {
    max-width: 720px;
  }

  .archived-notice {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-3);
    margin-bottom: var(--spacing-6);
    background: var(--color-surface-0);
    border-left: 4px solid var(--color-yellow);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    color: var(--color-subtext-1);
  }

  .archived-icon {
    font-size: var(--font-size-base);
  }

  .post-header {
    margin-bottom: var(--spacing-8);
    padding-bottom: var(--spacing-6);
    border-bottom: 1px solid var(--color-surface-0);
  }

  .post-title {
    margin-bottom: var(--spacing-3);
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    color: var(--color-text);
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
    font-size: var(--font-size-base);
    color: var(--color-subtext-1);
  }

  .post-date {
    font-weight: var(--font-weight-medium);
  }

  .post-reading-time {
    color: var(--color-subtext-0);
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }

  .tag {
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--color-surface-0);
    color: var(--color-primary);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  /* Markdown content styling */
  .post-content {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
  }

  .post-content :global(h2),
  .post-content :global(h3),
  .post-content :global(h4) {
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-4);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-snug);
  }

  .post-content :global(h2) {
    font-size: var(--font-size-3xl);
    padding-bottom: var(--spacing-2);
    border-bottom: 1px solid var(--color-surface-0);
  }

  .post-content :global(h3) {
    font-size: var(--font-size-2xl);
  }

  .post-content :global(h4) {
    font-size: var(--font-size-xl);
  }

  .post-content :global(p) {
    margin-bottom: var(--spacing-4);
  }

  .post-content :global(a) {
    color: var(--color-link);
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: text-decoration-color var(--transition-base);
  }

  .post-content :global(a:hover) {
    text-decoration-color: var(--color-link-hover);
  }

  .post-content :global(strong) {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .post-content :global(em) {
    font-style: italic;
  }

  .post-content :global(ul),
  .post-content :global(ol) {
    margin-bottom: var(--spacing-4);
    padding-left: var(--spacing-6);
  }

  .post-content :global(li) {
    margin-bottom: var(--spacing-2);
  }

  .post-content :global(li > ul),
  .post-content :global(li > ol) {
    margin-top: var(--spacing-2);
    margin-bottom: 0;
  }

  .post-content :global(blockquote) {
    margin: var(--spacing-6) 0;
    padding: var(--spacing-4);
    padding-left: var(--spacing-6);
    border-left: 4px solid var(--color-primary);
    background: var(--color-surface-0);
    border-radius: var(--radius-md);
    font-style: italic;
    color: var(--color-subtext-1);
  }

  .post-content :global(code) {
    padding: 0.125rem 0.375rem;
    background: var(--color-surface-0);
    color: var(--color-pink);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 0.9em;
  }

  .post-content :global(pre) {
    margin: var(--spacing-6) 0;
    padding: var(--spacing-4);
    background: var(--color-surface-0);
    border-radius: var(--radius-lg);
    overflow-x: auto;
    line-height: var(--line-height-normal);
  }

  .post-content :global(pre code) {
    padding: 0;
    background: none;
    color: var(--color-text);
    font-size: var(--font-size-sm);
  }

  .post-content :global(img) {
    max-width: 100%;
    height: auto;
    margin: var(--spacing-6) auto;
    display: block;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-surface-0);
  }

  .post-content :global(hr) {
    margin: var(--spacing-8) 0;
    border: none;
    border-top: 1px solid var(--color-surface-0);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .post-title {
      font-size: var(--font-size-3xl);
    }

    .post-content {
      font-size: var(--font-size-base);
    }

    .post-content :global(h2) {
      font-size: var(--font-size-2xl);
    }

    .post-content :global(h3) {
      font-size: var(--font-size-xl);
    }

    .post-content :global(pre) {
      font-size: var(--font-size-xs);
    }
  }
</style>
```

### Success Criteria:

#### Automated Verification:
- [x] Layout compiles without errors
- [x] TypeScript types valid
- [x] Build succeeds

#### Manual Verification:
- [x] Post header displays correctly
- [x] Archived notice shows for old posts
- [x] Markdown content styled properly
- [x] Code blocks readable
- [x] Images display correctly
- [x] Links styled and functional

---

## Phase 2: Dynamic Blog Post Pages

### Overview
Create dynamic routes for individual blog posts using Astro's content collections.

### Changes Required:

#### 1. Create Blog Post Page
**File**: `src/pages/blog/[slug].astro`

```astro
---
import { getCollection } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();

// Calculate reading time (rough estimate: 200 words per minute)
const words = post.body.split(/\s+/).length;
const readingTime = `${Math.ceil(words / 200)} min read`;
---

<BlogPost
  title={post.data.title}
  date={post.data.date}
  description={post.data.description}
  readingTime={readingTime}
  tags={post.data.tags}
  archived={post.data.archived}
>
  <Content />
</BlogPost>
```

### Success Criteria:

#### Automated Verification:
- [x] Pages generate for all blog posts
- [x] Build succeeds: `npm run build`
- [x] All post URLs work

#### Manual Verification:
- [x] Can access posts at /blog/[slug]
- [x] Content renders correctly
- [x] Reading time calculated
- [x] All Markdown features render

---

## Phase 3: Blog Listing Page

### Overview
Create the main blog page that lists all posts with dates.

### Changes Required:

#### 1. Create Blog Card Component
**File**: `src/components/blog/BlogCard.astro`

```astro
---
interface Props {
  title: string;
  slug: string;
  date: Date;
  description?: string;
  tags?: string[];
  archived?: boolean;
}

const { title, slug, date, description, tags, archived } = Astro.props;

const formattedDate = date.toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
---

<article class="blog-card">
  <a href={`/blog/${slug}`} class="card-link">
    <div class="card-header">
      <time datetime={date.toISOString()} class="card-date">
        {formattedDate}
      </time>
      {archived && (
        <span class="archived-badge">Archived</span>
      )}
    </div>

    <h2 class="card-title">{title}</h2>

    {description && (
      <p class="card-description">{description}</p>
    )}

    {tags && tags.length > 0 && (
      <div class="card-tags">
        {tags.map(tag => (
          <span class="tag">{tag}</span>
        ))}
      </div>
    )}
  </a>
</article>

<style>
  .blog-card {
    padding: var(--spacing-4);
    border-radius: var(--radius-lg);
    border: 1px solid transparent;
    transition: border-color var(--transition-base),
                background-color var(--transition-base);
  }

  .blog-card:hover {
    background: var(--color-surface-0);
    border-color: var(--color-surface-1);
  }

  .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-2);
  }

  .card-date {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-primary);
  }

  .archived-badge {
    padding: 0.125rem var(--spacing-2);
    background: var(--color-yellow);
    color: var(--color-base);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
  }

  .card-title {
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    line-height: var(--line-height-snug);
  }

  .blog-card:hover .card-title {
    color: var(--color-primary);
  }

  .card-description {
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-base);
    color: var(--color-subtext-1);
    line-height: var(--line-height-normal);
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-1);
  }

  .tag {
    padding: 0.125rem var(--spacing-2);
    background: var(--color-surface-1);
    color: var(--color-subtext-1);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
  }
</style>
```

#### 2. Create Blog Listing Page
**File**: `src/pages/blog/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import BlogCard from '../../components/blog/BlogCard.astro';

// Get all blog posts and sort by date (newest first)
const allPosts = await getCollection('blog');
const sortedPosts = allPosts.sort((a, b) => {
  return b.data.date.getTime() - a.data.date.getTime();
});
---

<BaseLayout
  title="Blog | Matheus Mortatti"
  description="Thoughts on game development, programming, and technology"
>
  <Header slot="header" />

  <div class="blog-page">
    <div class="container">
      <header class="page-header">
        <h1 class="page-title">Blog</h1>
        <p class="page-description">
          Thoughts on game development, programming, and technology
        </p>
      </header>

      <div class="search-container">
        <input
          type="search"
          id="search-input"
          class="search-input"
          placeholder="Search posts by title..."
          aria-label="Search posts"
        />
      </div>

      <div class="posts-list" id="posts-list">
        {sortedPosts.map(post => (
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
        <p>No posts found matching your search.</p>
      </div>
    </div>
  </div>

  <Footer slot="footer" />
</BaseLayout>

<style>
  .blog-page {
    padding-top: var(--spacing-6);
    padding-bottom: var(--spacing-8);
  }

  .page-header {
    margin-bottom: var(--spacing-8);
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
  }

  .no-results {
    padding: var(--spacing-8);
    text-align: center;
    color: var(--color-subtext-1);
    font-size: var(--font-size-lg);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .page-title {
      font-size: var(--font-size-3xl);
    }

    .page-description {
      font-size: var(--font-size-base);
    }
  }
</style>

<script>
  // Client-side search functionality
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
- [x] All posts appear in list
- [x] Build succeeds

#### Manual Verification:
- [x] Blog listing page loads at /blog
- [x] Posts sorted by date (newest first)
- [x] Search input filters posts by title
- [x] "No results" message shows when appropriate
- [x] Click on post navigates to detail page
- [x] Archived badge shows for old posts

---

## Phase 4: Post Navigation Component

### Overview
Add previous/next post navigation at the bottom of blog posts.

### Changes Required:

#### 1. Create Post Navigation Component
**File**: `src/components/blog/PostNavigation.astro`

```astro
---
interface Post {
  slug: string;
  data: {
    title: string;
  };
}

interface Props {
  prevPost?: Post;
  nextPost?: Post;
}

const { prevPost, nextPost } = Astro.props;
---

{(prevPost || nextPost) && (
  <nav class="post-navigation" aria-label="Post navigation">
    <div class="container nav-container">
      {prevPost && (
        <a href={`/blog/${prevPost.slug}`} class="nav-link prev-link">
          <span class="nav-label">← Previous</span>
          <span class="nav-title">{prevPost.data.title}</span>
        </a>
      )}

      {nextPost && (
        <a href={`/blog/${nextPost.slug}`} class="nav-link next-link">
          <span class="nav-label">Next →</span>
          <span class="nav-title">{nextPost.data.title}</span>
        </a>
      )}
    </div>
  </nav>
)}

<style>
  .post-navigation {
    margin-top: var(--spacing-12);
    padding-top: var(--spacing-6);
    border-top: 1px solid var(--color-surface-0);
  }

  .nav-container {
    max-width: 720px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-4);
  }

  .nav-link {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    padding: var(--spacing-4);
    background: var(--color-surface-0);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: background-color var(--transition-base);
  }

  .nav-link:hover {
    background: var(--color-surface-1);
  }

  .next-link {
    text-align: right;
    margin-left: auto;
  }

  .nav-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-primary);
  }

  .nav-title {
    font-size: var(--font-size-base);
    color: var(--color-text);
    line-height: var(--line-height-snug);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .nav-container {
      grid-template-columns: 1fr;
    }

    .next-link {
      margin-left: 0;
    }
  }
</style>
```

#### 2. Update Blog Post Page to Include Navigation
**File**: `src/pages/blog/[slug].astro` (update)

```astro
---
import { getCollection } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';
import PostNavigation from '../../components/blog/PostNavigation.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) => {
    return b.data.date.getTime() - a.data.date.getTime();
  });

  return sortedPosts.map((post, index) => ({
    params: { slug: post.slug },
    props: {
      post,
      prevPost: index < sortedPosts.length - 1 ? sortedPosts[index + 1] : null,
      nextPost: index > 0 ? sortedPosts[index - 1] : null,
    },
  }));
}

const { post, prevPost, nextPost } = Astro.props;
const { Content } = await post.render();

const words = post.body.split(/\s+/).length;
const readingTime = `${Math.ceil(words / 200)} min read`;
---

<BlogPost
  title={post.data.title}
  date={post.data.date}
  description={post.data.description}
  readingTime={readingTime}
  tags={post.data.tags}
  archived={post.data.archived}
>
  <Content />

  <PostNavigation prevPost={prevPost} nextPost={nextPost} />
</BlogPost>
```

### Success Criteria:

#### Automated Verification:
- [x] Component compiles without errors
- [x] Navigation links generated correctly
- [x] Build succeeds

#### Manual Verification:
- [x] Previous/next links appear at bottom of posts
- [x] Links navigate to correct posts
- [x] Navigation respects chronological order
- [x] First post has no "previous" link
- [x] Last post has no "next" link

---

## Testing Strategy

### Unit Tests:
Not applicable for UI components.

### Integration Tests:
- Test all blog posts render correctly
- Verify search filters posts properly
- Test navigation between posts

### Manual Testing Steps:
1. Visit /blog listing page
2. Verify all posts appear sorted by date
3. Test search input with various queries
4. Click on each post to verify rendering
5. Check Markdown styling (headings, links, lists, code)
6. Verify images display in posts
7. Test previous/next navigation
8. Check reading time calculation
9. Verify archived posts have badge and notice
10. Test on mobile devices
11. Check keyboard navigation
12. Verify theme toggle works on all pages

## Performance Considerations

- Use static site generation for all blog pages
- Minimize JavaScript (search is only client-side JS)
- Optimize images referenced in posts
- Consider lazy loading images below fold
- Keep search functionality lightweight (simple string matching)

## Migration Notes

All blog content was migrated in Plan 4. This plan just adds the UI to display it.

## References

- Original plan: `REBUILD_PLAN.md`
- Content schema: `src/content/config.ts` (from Plan 1)
- Migrated content: `src/content/blog/` (from Plan 4)
- Design system: `plan2-design-system-theme.md`

## Dependencies

**Required before starting:**
- Plan 1: Project Foundation (must be complete)
- Plan 2: Design System (must be complete)
- Plan 3: Layout Components (must be complete)
- Plan 4: Content Migration (must be complete)

**Blocks these plans:**
- Plan 7: Archive Section (needs blog system)

**Can run in parallel with:**
- Plan 5: Homepage (different pages)

## Estimated Time

3-4 hours including Markdown styling and testing

## Notes

- Markdown styling is critical - test with actual blog content
- Search is intentionally simple (title/description only)
- Consider adding syntax highlighting for code blocks (use Shiki or Prism)
- Reading time is a rough estimate - 200 words/minute average
- Navigation follows chronological order (newest to oldest)
- Keep blog listing clean and scannable
- Archived posts clearly marked to set expectations
- Consider adding "Back to blog" link in post layout
- Future enhancements: RSS feed, tags filtering, related posts
