import { test, expect } from '@playwright/test';
import { discoverStories, storyUrl } from './helpers/story-utils';

const DISABLE_ANIMATIONS_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    scroll-behavior: auto !important;
  }
`;

const stories = discoverStories();

for (const story of stories) {
  test(`${story.title} / ${story.name}`, async ({ page }) => {
    await page.goto(storyUrl(story.id), { waitUntil: 'networkidle' });

    // Wait for Storybook to finish rendering (loading indicator disappears)
    await page.locator('.sb-preparing-story').waitFor({ state: 'hidden' });

    // Disable CSS animations and transitions
    await page.addStyleTag({ content: DISABLE_ANIMATIONS_CSS });

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    const root = page.locator('#storybook-root');
    await root.waitFor({ state: 'attached' });

    // Some stories render invisible content (e.g. Modal with isOpen=false, empty lists).
    // For those, fall back to a full-page screenshot.
    const isVisible = await root.isVisible();
    if (isVisible) {
      await expect(root).toHaveScreenshot(`${story.id}.png`);
    } else {
      await expect(page).toHaveScreenshot(`${story.id}.png`);
    }
  });
}
