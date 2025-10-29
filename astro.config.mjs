// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://matheusmortatti.com',
  base: '/',
  outDir: './dist',
  build: {
    assets: 'assets'
  }
});
