import { test, expect } from '@playwright/test';

test.describe('Component Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('BadgeSuccess component visual test', async ({ page }) => {
    // Generate a BadgeSuccess component
    await page.getByRole('button', { name: 'success badge' }).click();
    
    // Wait for component to be generated and rendered
    await page.waitForSelector('[data-testid="generated-component"]');
    
    // Take screenshot of the component
    await expect(page.locator('[data-testid="generated-component"]')).toHaveScreenshot('badge-success.png');
  });

  test('BadgeWarning component visual test', async ({ page }) => {
    // Generate a BadgeWarning component
    await page.getByRole('button', { name: 'warning badge' }).click();
    
    // Wait for component to be generated and rendered
    await page.waitForSelector('[data-testid="generated-component"]');
    
    // Take screenshot of the component
    await expect(page.locator('[data-testid="generated-component"]')).toHaveScreenshot('badge-warning.png');
  });

  test('ButtonPrimary component visual test', async ({ page }) => {
    // Generate a ButtonPrimary component
    await page.getByRole('button', { name: 'button primary' }).click();
    
    // Wait for component to be generated and rendered
    await page.waitForSelector('[data-testid="generated-component"]');
    
    // Take screenshot of the component
    await expect(page.locator('[data-testid="generated-component"]')).toHaveScreenshot('button-primary.png');
  });

  test('Card component visual test', async ({ page }) => {
    // Generate a Card component
    await page.getByRole('button', { name: 'card' }).click();
    
    // Wait for component to be generated and rendered
    await page.waitForSelector('[data-testid="generated-component"]');
    
    // Take screenshot of the component
    await expect(page.locator('[data-testid="generated-component"]')).toHaveScreenshot('card.png');
  });

  test('Full page visual test', async ({ page }) => {
    // Test the entire demo page
    await expect(page).toHaveScreenshot('demo-page.png', { fullPage: true });
  });

  test('Component generation flow', async ({ page }) => {
    // Test the complete flow
    await page.fill('input[placeholder*="Generate"]', 'success badge');
    await page.getByRole('button', { name: /Generate/ }).click();
    
    // Wait for component to load
    await page.waitForSelector('[data-testid="generated-component"]');
    
    // Switch to code view
    await page.getByRole('button', { name: '💻 Code' }).click();
    
    // Take screenshot of code view
    await expect(page.locator('.bg-gray-900')).toHaveScreenshot('code-view.png');
  });
});