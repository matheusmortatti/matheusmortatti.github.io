# Plan 2: Design System & Theme Implementation

## Overview

Implement the Catppuccin Mocha/Latte color system, create CSS custom properties, build the theme toggle functionality, and establish typography and spacing systems. This creates the visual foundation for all components.

## Current State Analysis

After Plan 1:
- Astro project initialized with basic structure
- Minimal placeholder page exists
- No styling or theme system implemented
- Global CSS not configured

## Desired End State

A complete design system with:
- Catppuccin Mocha (dark) and Latte (light) themes
- Working theme toggle with localStorage persistence
- Typography system using system fonts
- 8px grid spacing system
- CSS custom properties for all design tokens
- Smooth theme transitions

### Verification:
- Theme toggle button switches between Mocha and Latte
- Theme preference persists on page reload
- All CSS variables properly defined
- Typography scales correctly on all screen sizes
- No flash of unstyled content (FOUC)

## What We're NOT Doing

- Not implementing any page-specific layouts yet
- Not building navigation or header components
- Not styling blog content or Markdown
- Not adding animations beyond theme transition

## Implementation Approach

Create a CSS-based design system using custom properties for theme colors, implement client-side theme toggle with localStorage, and establish typography/spacing foundations that all future components will use.

## Phase 1: Catppuccin Color System

### Overview
Define both Mocha and Latte color palettes using CSS custom properties.

### Changes Required:

#### 1. Create Theme CSS File
**File**: `src/styles/themes.css`

```css
/* Catppuccin Mocha (Dark Theme) */
:root[data-theme="mocha"],
:root {
  /* Base colors */
  --color-base: #1e1e2e;
  --color-mantle: #181825;
  --color-crust: #11111b;

  /* Surface colors */
  --color-surface-0: #313244;
  --color-surface-1: #45475a;
  --color-surface-2: #585b70;

  /* Text colors */
  --color-text: #cdd6f4;
  --color-subtext-1: #bac2de;
  --color-subtext-0: #a6adc8;

  /* Overlay colors */
  --color-overlay-0: #6c7086;
  --color-overlay-1: #7f849c;
  --color-overlay-2: #9399b2;

  /* Accent colors */
  --color-blue: #89b4fa;
  --color-pink: #f5c2e7;
  --color-mauve: #cba6f7;
  --color-red: #f38ba8;
  --color-peach: #fab387;
  --color-yellow: #f9e2af;
  --color-green: #a6e3a1;
  --color-teal: #94e2d5;
  --color-sky: #89dceb;
  --color-sapphire: #74c7ec;
  --color-lavender: #b4befe;

  /* Semantic colors */
  --color-primary: var(--color-blue);
  --color-secondary: var(--color-pink);
  --color-accent: var(--color-mauve);
  --color-link: var(--color-blue);
  --color-link-hover: var(--color-sky);
}

/* Catppuccin Latte (Light Theme) */
:root[data-theme="latte"] {
  /* Base colors */
  --color-base: #eff1f5;
  --color-mantle: #e6e9ef;
  --color-crust: #dce0e8;

  /* Surface colors */
  --color-surface-0: #ccd0da;
  --color-surface-1: #bcc0cc;
  --color-surface-2: #acb0be;

  /* Text colors */
  --color-text: #4c4f69;
  --color-subtext-1: #5c5f77;
  --color-subtext-0: #6c6f85;

  /* Overlay colors */
  --color-overlay-0: #9ca0b0;
  --color-overlay-1: #8c8fa1;
  --color-overlay-2: #7c7f93;

  /* Accent colors */
  --color-blue: #1e66f5;
  --color-pink: #ea76cb;
  --color-mauve: #8839ef;
  --color-red: #d20f39;
  --color-peach: #fe640b;
  --color-yellow: #df8e1d;
  --color-green: #40a02b;
  --color-teal: #179299;
  --color-sky: #04a5e5;
  --color-sapphire: #209fb5;
  --color-lavender: #7287fd;

  /* Semantic colors */
  --color-primary: var(--color-blue);
  --color-secondary: var(--color-pink);
  --color-accent: var(--color-mauve);
  --color-link: var(--color-blue);
  --color-link-hover: var(--color-sky);
}

/* Theme transition */
:root {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

### Success Criteria:

#### Automated Verification:
- [ ] CSS file has no syntax errors
- [ ] All custom properties are defined for both themes
- [ ] Build succeeds: `npm run build`

#### Manual Verification:
- [ ] Inspect element shows correct CSS variables in dev tools
- [ ] Both theme datasets apply correctly when toggled in dev tools

---

## Phase 2: Typography System

### Overview
Establish font family, sizes, weights, and line heights for consistent typography.

### Changes Required:

#### 1. Create Typography CSS File
**File**: `src/styles/typography.css`

```css
:root {
  /* Font families */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
               "Helvetica Neue", Arial, sans-serif;
  --font-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono",
               Consolas, "Courier New", monospace;

  /* Font sizes */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */

  /* Font weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 1.75;

  /* Letter spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
}

/* Base typography */
body {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  font-weight: var(--font-weight-normal);
  color: var(--color-text);
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text);
  margin-top: 0;
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }
h5 { font-size: var(--font-size-lg); }
h6 { font-size: var(--font-size-base); }

/* Paragraphs */
p {
  margin-top: 0;
  margin-bottom: var(--spacing-4);
}

/* Links */
a {
  color: var(--color-link);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-link-hover);
  text-decoration: underline;
}

/* Code */
code, pre {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
}

code {
  padding: 0.125rem 0.25rem;
  background: var(--color-surface-0);
  border-radius: var(--radius-sm);
}

pre {
  padding: var(--spacing-4);
  background: var(--color-surface-0);
  border-radius: var(--radius-md);
  overflow-x: auto;
}

pre code {
  padding: 0;
  background: none;
}
```

### Success Criteria:

#### Automated Verification:
- [ ] CSS validates without errors
- [ ] Build succeeds with typography styles

#### Manual Verification:
- [ ] Headings render with correct sizes and weights
- [ ] Body text is readable at base font size
- [ ] Links have hover states
- [ ] Code blocks have proper styling

---

## Phase 3: Spacing & Layout System

### Overview
Define consistent spacing units based on 8px grid and border radius values.

### Changes Required:

#### 1. Create Spacing CSS File
**File**: `src/styles/spacing.css`

```css
:root {
  /* Spacing scale (8px base) */
  --spacing-0: 0;
  --spacing-1: 0.5rem;   /* 8px */
  --spacing-2: 1rem;     /* 16px */
  --spacing-3: 1.5rem;   /* 24px */
  --spacing-4: 2rem;     /* 32px */
  --spacing-5: 2.5rem;   /* 40px */
  --spacing-6: 3rem;     /* 48px */
  --spacing-8: 4rem;     /* 64px */
  --spacing-10: 5rem;    /* 80px */
  --spacing-12: 6rem;    /* 96px */

  /* Border radius */
  --radius-sm: 0.25rem;  /* 4px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 0.75rem;  /* 12px */
  --radius-xl: 1rem;     /* 16px */
  --radius-full: 9999px;

  /* Container widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-content: 720px; /* Main content width */

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Success Criteria:

#### Automated Verification:
- [ ] CSS validates without errors
- [ ] All spacing variables defined

#### Manual Verification:
- [ ] Spacing values follow 8px grid
- [ ] Border radius values create "cozy" feel

---

## Phase 4: Global Styles & Reset

### Overview
Create global CSS reset and base styles that apply to all pages.

### Changes Required:

#### 1. Create Global CSS File
**File**: `src/styles/global.css`

```css
/* Import design system */
@import './themes.css';
@import './typography.css';
@import './spacing.css';

/* CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  background-color: var(--color-base);
  color: var(--color-text);
  min-height: 100vh;
  transition: background-color var(--transition-slow),
              color var(--transition-slow);
}

/* Ensure theme transitions are smooth */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: var(--transition-slow);
  transition-timing-function: ease;
}

/* Disable transitions on theme change to prevent flash */
.theme-transitioning * {
  transition: none !important;
}

/* Container utility */
.container {
  max-width: var(--container-content);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
}

/* Skip to content link (accessibility) */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 0;
  padding: var(--spacing-2);
  background: var(--color-primary);
  color: var(--color-base);
  text-decoration: none;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}

/* Selection styling */
::selection {
  background-color: var(--color-primary);
  color: var(--color-base);
}

/* Focus styles */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Scrollbar styling (Webkit) */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--color-base);
}

::-webkit-scrollbar-thumb {
  background: var(--color-surface-1);
  border-radius: var(--radius-md);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-surface-2);
}
```

### Success Criteria:

#### Automated Verification:
- [ ] All CSS imports resolve correctly
- [ ] Build succeeds: `npm run build`
- [ ] No CSS syntax errors

#### Manual Verification:
- [ ] Page has no unstyled flash on load
- [ ] Scrollbar matches theme colors
- [ ] Text selection uses accent color
- [ ] Focus indicators visible on tab navigation

---

## Phase 5: Theme Toggle Component

### Overview
Build client-side theme toggle with localStorage persistence and smooth transitions.

### Changes Required:

#### 1. Create Theme Toggle Component
**File**: `src/components/ThemeToggle.astro`

```astro
---
// No server-side props needed
---

<button
  id="theme-toggle"
  class="theme-toggle"
  aria-label="Toggle theme"
  title="Toggle theme"
>
  <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
  <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
</button>

<style>
  .theme-toggle {
    position: relative;
    width: 40px;
    height: 40px;
    border: none;
    background: var(--color-surface-0);
    color: var(--color-text);
    border-radius: var(--radius-md);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--transition-base);
  }

  .theme-toggle:hover {
    background: var(--color-surface-1);
  }

  .sun-icon,
  .moon-icon {
    position: absolute;
    transition: opacity var(--transition-base), transform var(--transition-base);
  }

  :root[data-theme="mocha"] .sun-icon,
  :root .sun-icon {
    opacity: 0;
    transform: rotate(180deg);
  }

  :root[data-theme="mocha"] .moon-icon,
  :root .moon-icon {
    opacity: 1;
    transform: rotate(0deg);
  }

  :root[data-theme="latte"] .sun-icon {
    opacity: 1;
    transform: rotate(0deg);
  }

  :root[data-theme="latte"] .moon-icon {
    opacity: 0;
    transform: rotate(-180deg);
  }
</style>

<script>
  // Theme management
  const STORAGE_KEY = 'theme';
  const THEME_MOCHA = 'mocha';
  const THEME_LATTE = 'latte';

  // Get theme from localStorage or system preference
  function getInitialTheme(): string {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === THEME_MOCHA || stored === THEME_LATTE) {
      return stored;
    }

    // Default to system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return THEME_LATTE;
    }

    return THEME_MOCHA; // Default to dark
  }

  // Apply theme to document
  function applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Toggle between themes
  function toggleTheme(): void {
    const current = document.documentElement.getAttribute('data-theme') || THEME_MOCHA;
    const next = current === THEME_MOCHA ? THEME_LATTE : THEME_MOCHA;
    applyTheme(next);
  }

  // Initialize theme on page load
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // Set up toggle button
  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleTheme);
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? THEME_MOCHA : THEME_LATTE);
    }
  });
</script>
```

#### 2. Create Theme Initialization Script
**File**: `src/scripts/theme-init.ts`

```typescript
// This runs immediately to prevent FOUC
(function() {
  const STORAGE_KEY = 'theme';
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === 'mocha' || stored === 'latte') {
    document.documentElement.setAttribute('data-theme', stored);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'latte');
  } else {
    document.documentElement.setAttribute('data-theme', 'mocha');
  }
})();
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles without errors
- [ ] Component renders without errors
- [ ] Build succeeds

#### Manual Verification:
- [ ] Theme toggle button appears and is clickable
- [ ] Clicking toggles between Mocha and Latte
- [ ] Theme persists after page reload
- [ ] No flash of wrong theme on page load
- [ ] Icons animate smoothly during toggle
- [ ] Respects system preference if no stored preference

---

## Testing Strategy

### Unit Tests:
Not applicable (CSS and client-side JS).

### Integration Tests:
- Test theme toggle in multiple browsers
- Verify localStorage persistence
- Test system preference detection

### Manual Testing Steps:
1. Clear localStorage and reload - should match system preference
2. Toggle theme - should switch immediately
3. Reload page - theme should persist
4. Change system preference - should update if no manual preference set
5. Test in different browsers (Chrome, Firefox, Safari)
6. Verify no FOUC (flash of unstyled content)
7. Test all color combinations in both themes
8. Verify focus states and accessibility

## Performance Considerations

- Inline theme initialization script to prevent FOUC
- Use CSS custom properties (efficient browser updates)
- Minimize theme transition duration
- Cache theme preference in localStorage
- Use system fonts (no web font loading)

## Migration Notes

No migration needed - this is net new functionality.

## References

- Original plan: `REBUILD_PLAN.md`
- Catppuccin palette: https://catppuccin.com/palette
- Catppuccin Mocha: https://catppuccin.com/palette#mocha
- Catppuccin Latte: https://catppuccin.com/palette#latte

## Dependencies

**Required before starting:**
- Plan 1: Project Foundation (must be complete)

**Blocks these plans:**
- Plan 3: Layout Components (needs design system)
- Plan 5: Homepage (needs styling)
- Plan 6: Blog System (needs styling)

**Can run in parallel with:**
- Plan 4: Content Migration (independent work)

## Estimated Time

2-3 hours including testing and refinement

## Notes

- Theme toggle script must run as early as possible to prevent FOUC
- Use `data-theme` attribute instead of class for better specificity
- CSS custom properties make theme switching efficient
- Respect user's system preference as default
- Test in both themes constantly during development
- Consider adding prefers-reduced-motion support for transitions
