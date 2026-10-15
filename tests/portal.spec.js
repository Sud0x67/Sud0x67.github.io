import { test, expect } from '@playwright/test';
import { readdir } from 'node:fs/promises';

test('switches content, metadata and accessible names in both directions', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('一些工具，一些探索。');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle('Sud0x67 · Projects & Notes');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Notes worth keeping.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'EN', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: '中文', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.getByRole('heading', { name: '个人简历' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'EN', exact: true })).toHaveAttribute('aria-pressed', 'false');
  expect(errors).toEqual([]);
});

test('exposes project destinations and keyboard navigation', async ({ page }) => {
  await page.goto('/');
  for (const [name, href] of [
    ['Cipher Lab', '/online-encryption/'], ['TeamAligned', '/team-aligned/'],
    ['手撸解释器教程', '/craftinginterpreters_zh/'], ['个人简历', '/resume/'],
  ]) await expect(page.getByRole('link', { name, exact: true })).toHaveAttribute('href', href);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: '跳至项目' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#projects$/);
  await page.getByRole('link', { name: '博客归档', exact: true }).click();
  await expect(page).toHaveURL(/\/archives\/$/);
});

test('fits narrow screens and keeps titles separate from arrows', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  for (const name of ['中文', 'EN']) {
    await page.getByRole('button', { name, exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    for (const card of await page.locator('.project-card').all()) {
      const text = await card.locator('h3 a').evaluate(el => {
        const range = document.createRange();
        range.selectNodeContents(el.firstChild);
        return range.getBoundingClientRect().right;
      });
      const arrow = await card.locator('.card-arrow').boundingBox();
      expect(text).toBeLessThan(arrow.x);
    }
  }
});

test('retains all existing blog, archive and tag permalinks', async ({ request }) => {
  const files = await readdir(new URL('../', import.meta.url), { recursive: true });
  const legacyPages = files.filter(file => /^(2021|archives|tags|about)\//.test(file) && file.endsWith('/index.html'));
  expect(legacyPages.length).toBeGreaterThan(10);
  for (const file of legacyPages) {
    const response = await request.get('/' + file.replace(/index\.html$/, ''));
    expect(response.status(), file).toBe(200);
    expect(await response.text(), file).toContain("Sud0x67's Blog");
  }
});
