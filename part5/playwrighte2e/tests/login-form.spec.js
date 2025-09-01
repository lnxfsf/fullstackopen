const { test, expect, beforeEach, beforeAll, describe } = require('@playwright/test');

describe('Blog app', () => {
  // Use beforeAll for DB reset and user creation
  beforeAll(async ({ request }) => {
    await request.post('http://localhost:5173/api/testing/reset');
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Edita',
        username: 'edita3323',
        password: '12345678'
      }
    });
  });

  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

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
      // Find all 'view' buttons and click the last one (for the last blog)
      const viewButtons = await page.locator('button', { hasText: /view/i }).all();
      await viewButtons[viewButtons.length - 1].click();
      // Like the blog
      const likeButtons = await page.locator('button', { hasText: /like/i }).all();
      await likeButtons[likeButtons.length - 1].click();
      // Expect the like count to increase to 1
      await expect(page.getByText('likes 1')).toBeVisible();
    });

    test('the user who added the blog can delete the blog', async ({ page }) => {
      // Create a new blog first
      await page.getByRole('button', { name: /new blog/i }).click();
      await page.getByLabel('title').fill('Deletable Blog');
      await page.getByLabel('author').fill('Delete Author');
      await page.getByLabel('url').fill('https://delete.blog');
      await page.getByRole('button', { name: /create/i }).click();
      // Wait for the last blog to appear before interacting
      await expect(page.locator('.blog-title', { hasText: 'Deletable Blog' })).toBeVisible();
      // Find all 'view' buttons and click the last one (for the last blog)
      const viewButtons = await page.locator('button', { hasText: /view/i }).all();
      await viewButtons[viewButtons.length - 1].click();
      // Wait for the delete button to be visible
      const deleteButtons = await page.locator('button', { hasText: /delete/i }).all();
      await expect(deleteButtons[deleteButtons.length - 1]).toBeVisible();
      // Intercept window.confirm and accept BEFORE clicking delete
      page.once('dialog', async dialog => {
        await dialog.accept();
      });
      // Click the last delete button
      await deleteButtons[deleteButtons.length - 1].click();
      // Expect the blog to be removed from the list
      await expect(page.locator('.blog-title', { hasText: 'Deletable Blog' })).not.toBeVisible();
    });

  });

});


