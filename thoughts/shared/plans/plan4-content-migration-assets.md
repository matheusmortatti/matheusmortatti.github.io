# Plan 4: Content Migration & Asset Organization

## Overview

Convert existing blog posts from HTML to Markdown, migrate images to the new structure, organize all assets properly, and ensure content is ready for the Astro content collections system.

## Current State Analysis

Existing content discovered:
- `index-bak.html` - Old Hugo-based homepage with blog post list
- Two blog posts mentioned:
  - "Wolfbit Postmortem" (Jan 18, 2017)
  - "From a Student's Perspective: A GDC Postmortem" (Mar 25, 2017)
- Images in `/images/`:
  - `avatar.png`, `avatar@2x.png` - Profile photos
  - `profile.png` - Additional profile image
  - `wolfbit.gif`, `wolfbitGameplay.gif`, `wolfbitAnalytics.png` - Wolfbit post assets
  - `favicon.ico`, `favicon.png` - Site icons
- PDF in `/pdf/`:
  - `matheus-mortatti-cv.pdf` - CV (to keep but not link)

## Desired End State

Organized content structure:
- All blog posts converted to Markdown with proper frontmatter
- Images moved to `public/images/`
- PDF kept in `public/pdf/`
- Favicon properly configured
- Content collections ready for Astro to consume
- All legacy HTML files archived or removed
- Broken links fixed in migrated content

### Verification:
- All Markdown files parse correctly
- Images referenced in posts exist and load
- Frontmatter validates against content schema
- No broken internal links
- Astro build includes all assets

## What We're NOT Doing

- Not implementing blog display UI (Plan 6)
- Not styling blog content yet (Plan 6)
- Not creating new blog posts
- Not editing or improving post content (preserve as-is)

## Implementation Approach

First, locate and read the original blog post HTML files. Convert each to Markdown preserving structure and images. Move all assets to appropriate public/ directories. Create proper frontmatter matching the content schema from Plan 1. Archive legacy HTML files.

## Phase 1: Locate Original Blog Posts

### Overview
Find the original blog post HTML files in the repository.

### Changes Required:

#### 1. Search for Blog Post Files
**Commands**:
```bash
# Search for HTML files that might be blog posts
find . -name "*.html" -type f
# Look for posts directory
ls -la posts/ 2>/dev/null || echo "No posts directory"
```

Expected locations based on Hugo structure:
- `posts/wolfbit/` or `posts/wolfbit.html`
- `posts/GDCPostmortem/` or `posts/GDCPostmortem.html`

#### 2. Read Blog Post HTML Files
Read each located post file completely to understand structure and extract content.

### Success Criteria:

#### Automated Verification:
- [x] All blog post HTML files located
- [x] File list documented

#### Manual Verification:
- [x] Can read each post file successfully
- [x] Understand content structure and embedded images
- [x] Identify all assets referenced in posts

---

## Phase 2: Convert Wolfbit Postmortem to Markdown

### Overview
Convert the first blog post about Wolfbit from HTML to Markdown format.

### Changes Required:

#### 1. Create Markdown File
**File**: `src/content/blog/wolfbit-postmortem.md`

Content structure (adapt after reading original):
```markdown
---
title: "Wolfbit Postmortem"
date: 2017-01-18
description: "A postmortem of a game done for the Ludum Dare 35 and the LowRez Jam 2016"
tags: ["gamedev", "postmortem", "ludum-dare"]
archived: true
---

[Convert HTML content to Markdown here]

- Preserve headings as ## or ###
- Convert <p> to paragraphs
- Convert <img> to ![alt text](/images/filename.ext)
- Convert <a> to [link text](url)
- Convert <ul>/<ol> to Markdown lists
- Convert <code>/<pre> to Markdown code blocks
```

#### 2. Verify Image References
Ensure all images referenced in the post exist:
- `/images/wolfbit.gif`
- `/images/wolfbitGameplay.gif`
- `/images/wolfbitAnalytics.png`

Update image paths in Markdown to use `/images/` prefix.

### Success Criteria:

#### Automated Verification:
- [x] Markdown file parses without errors
- [x] Frontmatter validates against schema: `npm run build`
- [x] All referenced images exist in filesystem

#### Manual Verification:
- [x] Content matches original HTML post
- [x] Images render correctly in preview
- [x] Links are functional
- [x] Formatting preserved (headings, lists, emphasis)

---

## Phase 3: Convert GDC Postmortem to Markdown

### Overview
Convert the second blog post about GDC from HTML to Markdown format.

### Changes Required:

#### 1. Create Markdown File
**File**: `src/content/blog/gdc-postmortem.md`

```markdown
---
title: "From a Student's Perspective: A GDC Postmortem"
date: 2017-03-25
description: "A Postmortem of my experience during GDC 2017"
tags: ["gamedev", "gdc", "postmortem"]
archived: true
---

[Convert HTML content to Markdown here]
```

Follow same conversion process as Wolfbit post.

### Success Criteria:

#### Automated Verification:
- [x] Markdown file parses without errors
- [x] Frontmatter validates against schema
- [x] Build succeeds with both posts

#### Manual Verification:
- [x] Content matches original
- [x] All links functional
- [x] Formatting preserved

---

## Phase 4: Organize Images and Assets

### Overview
Move all images and assets to proper public/ directories.

### Changes Required:

#### 1. Move Images to Public Directory
**Commands**:
```bash
# Copy images to public directory
cp -r images/* public/images/

# Verify all images copied
ls -la public/images/
```

**Expected files in `public/images/`**:
- `avatar.png`
- `avatar@2x.png`
- `profile.png`
- `wolfbit.gif`
- `wolfbitGameplay.gif`
- `wolfbitAnalytics.png`
- `favicon.ico`
- `favicon.png`

#### 2. Move PDF to Public Directory
**Commands**:
```bash
# Copy PDF to public directory
cp -r pdf/* public/pdf/

# Verify PDF copied
ls -la public/pdf/
```

#### 3. Configure Favicon
**File**: Update `src/layouts/BaseLayout.astro`

```astro
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
<link rel="icon" type="image/png" href="/images/favicon.png" />
```

### Success Criteria:

#### Automated Verification:
- [x] All files exist in public/ directories
- [x] Build includes assets in dist/: `npm run build && ls dist/images/`
- [x] No missing file errors during build

#### Manual Verification:
- [x] Images load at /images/* URLs
- [x] Favicon appears in browser tab
- [x] PDF accessible at /pdf/matheus-mortatti-cv.pdf
- [x] No 404 errors for any assets

---

## Phase 5: Validate Content Collections

### Overview
Ensure all blog posts are properly recognized by Astro's content collections.

### Changes Required:

#### 1. Test Content Collection Query
**File**: Create temporary test file `src/pages/test-content.astro`

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
console.log('Found blog posts:', posts.length);
posts.forEach(post => {
  console.log(`- ${post.data.title} (${post.data.date})`);
});
---

<html>
  <body>
    <h1>Content Collection Test</h1>
    <p>Found {posts.length} blog posts</p>
    <ul>
      {posts.map(post => (
        <li>{post.data.title} - {post.data.date.toLocaleDateString()}</li>
      ))}
    </ul>
  </body>
</html>
```

#### 2. Run Build and Check Logs
```bash
npm run build
```

Look for content collection validation messages. Should see both posts recognized.

#### 3. Delete Test File
```bash
rm src/pages/test-content.astro
```

### Success Criteria:

#### Automated Verification:
- [x] Content collection returns all blog posts
- [x] No schema validation errors
- [x] Build succeeds: `npm run build`
- [x] TypeScript types generated for content

#### Manual Verification:
- [x] Console logs show correct number of posts
- [x] Post titles and dates are correct
- [x] No parsing errors for Markdown content

---

## Phase 6: Archive Legacy Files

### Overview
Move old HTML files to an archive directory and clean up.

### Changes Required:

#### 1. Create Archive Directory
**Command**:
```bash
mkdir -p archive/old-site
```

#### 2. Move Legacy HTML Files
**Commands**:
```bash
# Move old HTML files to archive
mv index-bak.html archive/old-site/
mv 404.html archive/old-site/ 2>/dev/null || true

# Move original posts directory if it exists
mv posts archive/old-site/ 2>/dev/null || true

# Keep CSS/JS for reference
mv css archive/old-site/ 2>/dev/null || true
mv js archive/old-site/ 2>/dev/null || true
```

#### 3. Update .gitignore
**File**: `.gitignore` (add)

```
# Archive
archive/
```

Or commit archive if you want to keep history:
```bash
git add archive/
git commit -m "Archive old Hugo site for reference"
```

#### 4. Remove Original Asset Directories
**Commands**:
```bash
# Original images already copied to public/
rm -rf images/

# Original PDF already copied to public/
rm -rf pdf/
```

### Success Criteria:

#### Automated Verification:
- [x] Legacy files moved to archive/
- [x] Original asset directories removed
- [x] Build still succeeds: `npm run build`
- [x] Git status clean

#### Manual Verification:
- [x] Archive directory contains all legacy files
- [x] New site uses only public/ assets
- [x] No broken references to old locations
- [x] Site still functions correctly

---

## Phase 7: Create Placeholder Welcome Post

### Overview
Create a new (non-archived) welcome post to show the site is active.

### Changes Required:

#### 1. Create Welcome Post
**File**: `src/content/blog/welcome-new-site.md`

```markdown
---
title: "Welcome to the New Site"
date: 2025-01-28
description: "A fresh start with a new design and modern tooling"
tags: ["meta", "announcement"]
archived: false
---

Welcome to the redesigned matheusmortatti.com!

This site has been rebuilt from the ground up using modern web technologies:

- **Astro** for fast, content-focused static site generation
- **Catppuccin** color theme for a cozy aesthetic
- Clean, minimal design focused on readability

## What's Here

You'll find my blog posts, both old and new, as well as information about my work and projects.

## What's Next

I plan to write more regularly about:
- Game development
- Programming
- Tools and workflows
- Conference experiences

Stay tuned!
```

### Success Criteria:

#### Automated Verification:
- [x] Post validates and builds
- [x] Content collection includes new post

#### Manual Verification:
- [x] Post content is appropriate
- [x] Date is current
- [x] Post will appear in blog listing (verified in Plan 6)

---

## Testing Strategy

### Unit Tests:
Not applicable for content migration.

### Integration Tests:
- Verify content collections query returns all posts
- Test image loading in development and production builds
- Validate all Markdown parses correctly

### Manual Testing Steps:
1. Read each original blog post HTML
2. Compare converted Markdown side-by-side
3. Verify all images appear in converted posts
4. Check all links work (internal and external)
5. Build site and inspect dist/ directory
6. Verify assets copied to dist/images/ and dist/pdf/
7. Test image URLs load correctly
8. Confirm no 404 errors in browser console
9. Validate Markdown syntax with linter
10. Check frontmatter against schema

## Performance Considerations

- Use optimized image formats (already .png/.gif)
- Consider adding image optimization in future (not this plan)
- Ensure images are reasonably sized (check file sizes)
- All assets served from same domain (no external deps)

## Migration Notes

**Important**: Original HTML posts must be read completely before conversion. Do not guess at content structure.

**Preserving history**: Archive directory keeps original site for reference. Can be committed to git or gitignored based on preference.

**Image paths**: Update all image references from relative Hugo paths to `/images/` absolute paths.

**Links**: Check for any internal links between posts and update to new URL structure.

## References

- Original plan: `REBUILD_PLAN.md`
- Content schema: `src/content/config.ts` (created in Plan 1)
- Existing content: `index-bak.html` (shows post list)

## Dependencies

**Required before starting:**
- Plan 1: Project Foundation (needs content collections config)

**Blocks these plans:**
- Plan 6: Blog System (needs content to display)
- Plan 7: Archive Section (needs archived posts)

**Can run in parallel with:**
- Plan 2: Design System (independent work)
- Plan 3: Layout Components (independent work)

**After completion, enables:**
- Plan 6 can query and display blog posts
- Plan 7 can filter and show archived posts

## Estimated Time

2-3 hours including careful content conversion and verification

## Notes

- **CRITICAL**: Must locate and read original blog post HTML files first
- Preserve original content exactly - no editing or improvements
- Update image paths to work with new structure
- Test all links (internal and external)
- Verify images load in both dev and production builds
- Keep archive directory for reference
- Consider running a broken link checker after migration
- Double-check frontmatter dates match original posts
- Ensure `archived: true` for old posts, `archived: false` for new
- Welcome post establishes new site is active, not just an archive

## Discovery Tasks (First Steps)

Before converting content, execute these commands:

```bash
# Find all HTML files that might be posts
find . -type f -name "*.html" -not -path "./node_modules/*" -not -path "./dist/*"

# Search for common post directory names
ls -la posts/ content/ blog/ articles/ 2>/dev/null

# Look for any markdown files that might already exist
find . -type f -name "*.md" -not -path "./node_modules/*" -not -path "./dist/*"

# Check git history for deleted files
git log --all --full-history --oneline -- posts/
```

Update this plan with findings and exact file paths before proceeding with conversion.
