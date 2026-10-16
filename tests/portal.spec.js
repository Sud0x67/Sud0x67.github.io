import { test, expect } from '@playwright/test';
import { readdir } from 'node:fs/promises';

test('switches content, metadata and accessible names in both directions', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText("一些工具，一些探索。");
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle('Sud0x67 · Project Directory');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'About', exact: true })).toHaveAttribute('href', '/blog/about/');
  await expect(page.getByRole('heading', { name: 'Blog & technical notes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Useless Civilization', exact: true })).toHaveAttribute('href', 'https://useless-llm.com/');
  await expect(page.getByRole('link', { name: 'Source code', exact: true })).toHaveAttribute('href', 'https://github.com/Sud0x67/useless-civilization');
  await expect(page.getByRole('button', { name: 'EN', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: '中文', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.getByRole('heading', { name: '个人简历' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '无用文明', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'EN', exact: true })).toHaveAttribute('aria-pressed', 'false');
  expect(errors).toEqual([]);
});

test('exposes project destinations and keyboard navigation', async ({ page }) => {
  await page.goto('/');
  for (const [name, href] of [
    ['无用文明', 'https://useless-llm.com/'], ['项目源码', 'https://github.com/Sud0x67/useless-civilization'],
    ['Cipher Lab', '/online-encryption/'], ['TeamAligned', '/team-aligned/'],
    ['Agent Patterns Lab', 'https://github.com/Sud0x67/agent-patterns-lab'],
    ['手撸解释器教程', '/craftinginterpreters_zh/'], ['个人简历', '/resume/'],
  ]) await expect(page.getByRole('link', { name, exact: true })).toHaveAttribute('href', href);
  const titles = await page.locator('.project-card h3').allTextContents();
  expect(titles[titles.indexOf('TeamAligned↗') + 1]).toBe('Agent Patterns Lab↗');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: '跳至项目' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole('link', { name: '进入博客', exact: true })).toHaveAttribute('href', '/blog/');
  await expect(page.getByRole('link', { name: '文章归档', exact: true })).toHaveAttribute('href', '/blog/archives/');
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

test('maps all legacy blog, archive and tag permalinks to the separate blog', async ({ request }) => {
  const files = await readdir(new URL('../', import.meta.url), { recursive: true });
  const legacyPages = files.filter(file => /^(2021|archives|tags|about)\//.test(file) && file.endsWith('/index.html'));
  expect(legacyPages.length).toBeGreaterThan(10);
  for (const file of legacyPages) {
    const response = await request.get('/' + file.replace(/index\.html$/, ''));
    expect(response.status(), file).toBe(200);
    const html = await response.text();
    expect(html, file).toContain("Sud0x67's Blog");
    expect(html, file).toContain('rel="canonical" href="https://sud0x67.github.io/blog/');
    expect(html, file).toContain('http-equiv="refresh"');
  }
});

// The separate blog is deliberately mocked here: this test verifies only the legacy redirect boundary.
test('forwards legacy queries and fragments to the separate blog', async ({ page, baseURL }) => {
  await page.route('**/blog/**', route => route.fulfill({
    contentType: 'text/html', body: '<!doctype html><title>Blog destination</title>',
  }));
  await page.goto('/archives/?from=legacy#2021');
  await expect(page).toHaveURL(new URL('/blog/archives/?from=legacy#2021', baseURL).href);
});
