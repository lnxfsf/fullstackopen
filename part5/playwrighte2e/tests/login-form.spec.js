const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Edita',
        username: 'edita3323',
        password: '12345678'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // Expand the login form first
    await page.getByRole('button', { name: /login/i }).click();
    // Check for login form elements
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });


  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: /login/i }).click();
      await page.getByLabel('username').fill('edita3323');
      await page.getByLabel('password').fill('12345678');
      await page.getByRole('button', { name: /login/i }).click();
      // Expect to see user's name or some indication of successful login
      await expect(page.getByText(/edita/i)).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: /login/i }).click();
      await page.getByLabel('username').fill('edita3323');
      await page.getByLabel('password').fill('wrongpassword');
      await page.getByRole('button', { name: /login/i }).click();
      // Expect to see error message
      await expect(page.getByText(/wrong credentials/i)).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: /login/i }).click();
      await page.getByLabel('username').fill('edita3323');
      await page.getByLabel('password').fill('12345678');
      await page.getByRole('button', { name: /login/i }).click();
    });

    test('a new blog can be created', async ({ page }) => {
      // Expand the form to create a new blog
      await page.getByRole('button', { name: /new blog/i }).click();
      await page.getByLabel('title').fill('Playwright E2E Blog');
      await page.getByLabel('author').fill('Test Author');
      await page.getByLabel('url').fill('https://playwright.dev');
      await page.getByRole('button', { name: /create/i }).click();
      // Expect the new blog to appear in the list
      await expect(page.locator('.blog-title', { hasText: 'Playwright E2E Blog' })).toBeVisible();
      await expect(page.locator('.blog-author', { hasText: 'Test Author' })).toBeVisible();

    });

    test('a blog can be liked', async ({ page }) => {
      // Create a new blog first
      await page.getByRole('button', { name: /new blog/i }).click();
      await page.getByLabel('title').fill('Likeable Blog');
      await page.getByLabel('author').fill('Like Author');
      await page.getByLabel('url').fill('https://likeable.blog');
      await page.getByRole('button', { name: /create/i }).click();
      // Reveal blog details
      await page.getByRole('button', { name: /view/i }).click();
      // Like the blog
      await page.getByRole('button', { name: /like/i }).click();
      // Expect the like count to increase to 1
      await expect(page.getByText('likes 1')).toBeVisible();
    });

  });

});


