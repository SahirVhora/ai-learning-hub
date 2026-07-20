const { test, expect } = require('@playwright/test');

test('home, search, and learning path work without page errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/index.html');

  await expect(page.locator('.path-card')).toHaveCount(3);
  await expect(page.locator('#featured-grid').locator(':scope > *').first()).toBeVisible();

  await page.locator('#global-search').fill('transformer');
  await expect(page.locator('#search-results')).not.toHaveClass(/hidden/);
  await expect(page.locator('.search-item').first()).toBeVisible();

  await page.locator('.path-card[data-level="beginner"]').click();
  await expect(page.locator('#learning-content')).not.toHaveClass(/hidden/);
  await expect(page.locator('.topic-card').first()).toBeVisible();
  expect(errors).toEqual([]);
});
