# Plan 1: Project Foundation & Infrastructure

## Overview

Initialize the Astro project structure, configure build tools, and set up CI/CD pipeline for GitHub Pages deployment. This is the foundational plan that all other plans depend on.

## Current State Analysis

- Repository exists at `matheusmortatti.github.io` with legacy HTML site
- Domain configured: `matheusmortatti.com` via CNAME
- GitHub Pages already enabled
- Existing assets: images, PDFs, old blog posts in HTML

## Desired End State

A working Astro project with:
- Clean project structure with TypeScript support
- GitHub Actions workflow for automatic deployment
- Development and build scripts functional
- CNAME and essential files preserved
- Ready for component and content development

### Verification:
- `npm run dev` starts local development server
- `npm run build` creates production build
- GitHub Actions workflow exists and is valid
- CNAME file preserved in public directory

## What We're NOT Doing

- Not implementing any UI components yet
- Not migrating content in this phase
- Not setting up themes/styling
- Not configuring any Astro integrations beyond core functionality

## Implementation Approach

Start with a fresh Astro installation, configure for GitHub Pages deployment, preserve critical files (CNAME), and ensure the build/deploy pipeline works end-to-end before any development begins.

## Phase 1: Astro Project Initialization

### Overview
Create new Astro project with TypeScript and configure basic structure.

### Changes Required:

#### 1. Initialize Astro Project
**Command**: `npm create astro@latest`

**Configuration choices:**
- Template: Empty
- TypeScript: Yes (Strict)
- Install dependencies: Yes
- Initialize git: No (already a git repo)

#### 2. Configure Astro for GitHub Pages
**File**: `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://matheusmortatti.com',
  base: '/',
  outDir: './dist',
  build: {
    assets: 'assets'
  }
});
```

#### 3. Update package.json Scripts
**File**: `package.json`

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

#### 4. Preserve CNAME File
**File**: `public/CNAME`

```
matheusmortatti.com
```

Ensure CNAME exists in `public/` directory so it's copied to build output.

### Success Criteria:

#### Automated Verification:
- [x] `npm install` completes without errors
- [x] `npm run dev` starts development server on localhost:4321
- [x] `npm run build` produces dist directory
- [x] `npm run preview` serves built site
- [x] TypeScript compilation passes: `npx astro check`

#### Manual Verification:
- [x] Visit localhost:4321 and see default Astro page
- [x] CNAME file exists in public/ directory
- [x] Project structure matches expected Astro layout

---

## Phase 2: GitHub Actions Deployment Pipeline

### Overview
Set up automated deployment to GitHub Pages on every push to main/master.

### Changes Required:

#### 1. Create GitHub Actions Workflow
**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build with Astro
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 2. Add .gitignore Entries
**File**: `.gitignore`

```
# Astro
dist/
.astro/

# Dependencies
node_modules/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Environment
.env
.env.production

# MacOS
.DS_Store

# IDE
.vscode/
.idea/
*.swp
*.swo
```

### Success Criteria:

#### Automated Verification:
- [x] Workflow file is valid YAML: `npx yaml-lint .github/workflows/deploy.yml`
- [x] Git repository clean after adding files: `git status`
- [x] No secrets or credentials in committed files

#### Manual Verification:
- [ ] GitHub Actions workflow appears in repository Actions tab
- [ ] Workflow can be triggered manually via workflow_dispatch
- [ ] GitHub Pages settings show correct source (GitHub Actions)

---

## Phase 3: Project Structure Setup

### Overview
Create the directory structure for Astro components, pages, layouts, and content.

### Changes Required:

#### 1. Create Directory Structure
**Commands**:
```bash
mkdir -p src/layouts
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/content/blog
mkdir -p src/styles
mkdir -p public/images
mkdir -p public/pdf
```

#### 2. Create Minimal Index Page
**File**: `src/pages/index.astro`

```astro
---
// Minimal placeholder homepage
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Matheus Mortatti</title>
  </head>
  <body>
    <h1>Matheus Mortatti</h1>
    <p>Site under construction - Coming soon!</p>
  </body>
</html>
```

#### 3. Create Content Collection Config
**File**: `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    archived: z.boolean().optional(),
  }),
});

export const collections = { blog };
```

### Success Criteria:

#### Automated Verification:
- [x] All directories exist: `ls -la src/`
- [x] TypeScript config validates: `npx astro check`
- [x] Build succeeds with new structure: `npm run build`
- [x] Content collection config has no type errors

#### Manual Verification:
- [x] Directory structure matches plan in REBUILD_PLAN.md
- [x] Index page renders "Site under construction" message
- [ ] No 404 errors when visiting localhost:4321

---

## Phase 4: Initial Deployment Test

### Overview
Deploy the minimal site to verify the entire pipeline works before development begins.

### Changes Required:

#### 1. Commit and Push Foundation
**Commands**:
```bash
git add .
git commit -m "Initialize Astro project with GitHub Pages deployment

- Set up Astro 4.x with TypeScript
- Configure GitHub Actions workflow
- Create project structure
- Add minimal homepage placeholder
- Preserve CNAME for custom domain"
git push origin master
```

#### 2. Verify GitHub Pages Configuration
**Manual steps**:
- Go to repository Settings → Pages
- Ensure "Source" is set to "GitHub Actions"
- Wait for deployment to complete

### Success Criteria:

#### Automated Verification:
- [x] Git push succeeds without errors
- [ ] GitHub Actions workflow triggers automatically
- [ ] Workflow completes successfully (green checkmark)
- [ ] Build artifact is uploaded

#### Manual Verification:
- [ ] Visit https://matheusmortatti.com and see placeholder page
- [ ] HTTPS works correctly
- [ ] No SSL certificate errors
- [ ] Custom domain resolves properly
- [ ] No console errors in browser

---

## Testing Strategy

### Unit Tests:
Not applicable for infrastructure setup.

### Integration Tests:
- Test complete build pipeline locally
- Verify GitHub Actions workflow in staging

### Manual Testing Steps:
1. Clone repository fresh in new directory
2. Run `npm install` and verify no errors
3. Run `npm run dev` and visit localhost:4321
4. Run `npm run build` and verify dist/ contents
5. Check GitHub Actions logs for any warnings
6. Visit deployed site and verify placeholder renders

## Performance Considerations

- Use `npm ci` in CI/CD for faster, deterministic installs
- Cache node_modules in GitHub Actions
- Ensure build output is optimized (Astro handles this by default)

## Migration Notes

**Preserving existing files:**
- Move CNAME to public/ directory
- Keep existing images/ and pdf/ in public/
- Archive old HTML files temporarily (don't delete yet)

**Rollback plan:**
If deployment fails, the old site remains live until new deployment succeeds. GitHub Pages atomic deployment prevents partial updates.

## References

- Original plan: `REBUILD_PLAN.md`
- Astro documentation: https://docs.astro.build
- GitHub Actions for Pages: https://github.com/actions/deploy-pages
- GitHub Pages docs: https://docs.github.com/en/pages

## Dependencies

**Required before starting:**
- Node.js 18+ installed
- npm or pnpm package manager
- Git repository with push access

**Blocks these plans:**
- Plan 2: Design System (needs project structure)
- Plan 3: Layout Components (needs project structure)
- Plan 4: Content Migration (needs content collections config)
- All other plans depend on this foundation

**Can run in parallel with:**
- None (this is the first plan)

## Estimated Time

2-3 hours including testing and verification

## Notes

- This plan focuses solely on infrastructure - no visual design yet
- The placeholder page is intentionally minimal
- All existing site content remains untouched in git history
- If GitHub Actions fails, check repository permissions and Pages settings
- Keep the build simple - add complexity in later plans
