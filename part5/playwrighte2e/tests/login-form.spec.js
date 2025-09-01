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


});


