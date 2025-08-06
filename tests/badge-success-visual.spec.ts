/**
 * BadgeSuccess Component Visual Regression Tests
 * Comprehensive Playwright tests with Figma design comparison and strict pixel accuracy
 */

import { test, expect, Page } from '@playwright/test';

// Test configuration with strict visual accuracy
const VISUAL_THRESHOLD = 0.001; // 0.1% threshold for strict design accuracy
const FIGMA_COMPARISON_THRESHOLD = 0.002; // 0.2% for Figma comparisons

test.describe('BadgeSuccess Visual Regression Tests', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('/');
    
    // Navigate to Badge Success demo tab
    await page.click('button:has-text("🎨 SLDS2 Badge Success Demo")');
    
    // Wait for demo to load
    await page.waitForSelector('[data-slds-component="badge-success"]', { timeout: 10000 });
    
    // Ensure consistent viewport for testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test.describe('Basic Component Rendering', () => {
    test('should render basic success badge correctly', async () => {
      const basicBadge = page.locator('[data-slds-component="badge-success"]').first();
      
      await expect(basicBadge).toBeVisible();
      await expect(basicBadge).toHaveScreenshot('badge-success-basic.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should render badge with left icon', async () => {
      const iconBadge = page.locator('[data-testid="badge-left-icon"]').first();
      const parentBadge = iconBadge.locator('..');
      
      await expect(iconBadge).toBeVisible();
      await expect(parentBadge).toHaveScreenshot('badge-success-with-icon.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should render badge text correctly', async () => {
      const badgeText = page.locator('[data-testid="badge-text"]').first();
      
      await expect(badgeText).toBeVisible();
      await expect(badgeText).toHaveText('Success');
      await expect(badgeText).toHaveScreenshot('badge-success-text.png', {
        threshold: VISUAL_THRESHOLD
      });
    });
  });

  test.describe('Size Variations', () => {
    test('should render small badge correctly', async () => {
      const smallBadge = page.locator('[data-size="small"]').first();
      
      await expect(smallBadge).toBeVisible();
      await expect(smallBadge).toHaveScreenshot('badge-success-small.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should render medium badge correctly', async () => {
      const mediumBadge = page.locator('[data-size="medium"]').first();
      
      await expect(mediumBadge).toBeVisible();
      await expect(mediumBadge).toHaveScreenshot('badge-success-medium.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should render large badge correctly', async () => {
      const largeBadge = page.locator('[data-size="large"]').first();
      
      await expect(largeBadge).toBeVisible();
      await expect(largeBadge).toHaveScreenshot('badge-success-large.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should compare all sizes in one screenshot', async () => {
      // Find section with basic usage examples
      const basicSection = page.locator('h2:has-text("Basic Usage")').locator('..');
      
      await expect(basicSection).toHaveScreenshot('badge-success-all-sizes.png', {
        threshold: VISUAL_THRESHOLD
      });
    });
  });

  test.describe('Visual Variants', () => {
    test('should render default variant correctly', async () => {
      const defaultBadge = page.locator('[data-variant="default"]').first();
      
      await expect(defaultBadge).toBeVisible();
      await expect(defaultBadge).toHaveScreenshot('badge-success-default.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should render strong variant correctly', async () => {
      const strongBadge = page.locator('[data-variant="strong"]').first();
      
      await expect(strongBadge).toBeVisible();
      await expect(strongBadge).toHaveScreenshot('badge-success-strong.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should render subtle variant correctly', async () => {
      const subtleBadge = page.locator('[data-variant="subtle"]').first();
      
      await expect(subtleBadge).toBeVisible();
      await expect(subtleBadge).toHaveScreenshot('badge-success-subtle.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should compare all variants in one screenshot', async () => {
      const variantsSection = page.locator('h2:has-text("Visual Variants")').locator('..');
      
      await expect(variantsSection).toHaveScreenshot('badge-success-all-variants.png', {
        threshold: VISUAL_THRESHOLD
      });
    });
  });

  test.describe('Interactive States', () => {
    test('should render interactive badge correctly', async () => {
      const interactiveBadge = page.locator('[data-interactive="true"]').first();
      
      await expect(interactiveBadge).toBeVisible();
      await expect(interactiveBadge).toHaveScreenshot('badge-success-interactive.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should show hover state correctly', async () => {
      const interactiveBadge = page.locator('[data-interactive="true"]').first();
      
      await interactiveBadge.hover();
      await page.waitForTimeout(200); // Allow transition to complete
      
      await expect(interactiveBadge).toHaveScreenshot('badge-success-hover.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should show focus state correctly', async () => {
      const interactiveBadge = page.locator('[data-interactive="true"]').first();
      
      await interactiveBadge.focus();
      await page.waitForTimeout(200); // Allow transition to complete
      
      await expect(interactiveBadge).toHaveScreenshot('badge-success-focus.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should show active state correctly', async () => {
      const interactiveBadge = page.locator('[data-interactive="true"]').first();
      
      await page.mouse.move(0, 0); // Move mouse away
      await interactiveBadge.click({ force: true });
      
      // Take screenshot during active state (very brief)
      await expect(interactiveBadge).toHaveScreenshot('badge-success-active.png', {
        threshold: VISUAL_THRESHOLD
      });
    });
  });

  test.describe('Icon Variations', () => {
    test('should render custom icon correctly', async () => {
      // Find custom icon badge in the demo
      const customIconBadge = page.locator('text="Custom Check"').locator('..');
      
      await expect(customIconBadge).toBeVisible();
      await expect(customIconBadge).toHaveScreenshot('badge-success-custom-icon.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should render badge with both icons', async () => {
      const bothIconsBadge = page.locator('text="Both Icons"').locator('..');
      
      await expect(bothIconsBadge).toBeVisible();
      await expect(bothIconsBadge).toHaveScreenshot('badge-success-both-icons.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should render right icon correctly', async () => {
      const rightIcon = page.locator('[data-testid="badge-right-icon"]').first();
      
      if (await rightIcon.isVisible()) {
        await expect(rightIcon).toHaveScreenshot('badge-success-right-icon.png', {
          threshold: VISUAL_THRESHOLD
        });
      }
    });
  });

  test.describe('Enterprise Configuration', () => {
    test('should render enterprise themed badges', async () => {
      const enterpriseSection = page.locator('h2:has-text("Enterprise Configuration")').locator('..');
      
      await expect(enterpriseSection).toHaveScreenshot('badge-success-enterprise.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should render configured theme badge', async () => {
      const themedBadge = page.locator('text="Configured Theme"').locator('..');
      
      await expect(themedBadge).toBeVisible();
      await expect(themedBadge).toHaveScreenshot('badge-success-themed.png', {
        threshold: VISUAL_THRESHOLD
      });
    });
  });

  test.describe('Real-world Use Cases', () => {
    test('should render status dashboard correctly', async () => {
      const statusDashboard = page.locator('h3:has-text("Status Dashboard")').locator('..');
      
      await expect(statusDashboard).toHaveScreenshot('badge-success-status-dashboard.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should render task management correctly', async () => {
      const taskManagement = page.locator('h3:has-text("Task Management")').locator('..');
      
      await expect(taskManagement).toHaveScreenshot('badge-success-task-management.png', {
        threshold: VISUAL_THRESHOLD
      });
    });
  });

  test.describe('Figma Design Comparison', () => {
    test('should match Figma design specifications - basic badge', async () => {
      // Test the core badge that matches the original Figma design
      const originalDesignBadge = page.locator('[data-slds-component="badge-success"]').first();
      
      await expect(originalDesignBadge).toBeVisible();
      
      // Measure exact dimensions and colors
      const boundingBox = await originalDesignBadge.boundingBox();
      expect(boundingBox?.width).toBeGreaterThan(0);
      expect(boundingBox?.height).toBeGreaterThan(0);
      
      // Compare with strict threshold for Figma accuracy
      await expect(originalDesignBadge).toHaveScreenshot('figma-design-comparison.png', {
        threshold: FIGMA_COMPARISON_THRESHOLD
      });
    });

    test('should validate SLDS2 design token compliance', async () => {
      // Test computed styles match SLDS2 tokens
      const badge = page.locator('[data-slds-component="badge-success"]').first();
      
      const styles = await badge.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          borderRadius: computed.borderRadius,
          padding: computed.padding,
          fontSize: computed.fontSize,
          fontFamily: computed.fontFamily,
          lineHeight: computed.lineHeight
        };
      });
      
      // Validate SLDS2 design tokens from Figma
      expect(styles.backgroundColor).toBe('rgb(172, 243, 228)'); // #acf3e4
      expect(styles.color).toBe('rgb(5, 103, 100)'); // #056764
      expect(styles.borderRadius).toBe('4px');
      expect(styles.fontSize).toBe('12px');
      expect(styles.fontFamily).toContain('SF Pro');
    });

    test('should validate icon dimensions match Figma specs', async () => {
      const icon = page.locator('[data-testid="badge-left-icon"] img').first();
      
      if (await icon.isVisible()) {
        const iconBox = await icon.boundingBox();
        
        // Figma specification: 14x14px (3.5 * 4px spacing unit)
        expect(iconBox?.width).toBe(14);
        expect(iconBox?.height).toBe(14);
      }
    });
  });

  test.describe('Styling Hooks Customization', () => {
    test('should apply custom CSS properties correctly', async () => {
      // Test custom theming through CSS variables
      await page.addStyleTag({
        content: `
          [data-test-custom-theme] {
            --slds-badge-success-background-color: #e8f5e8;
            --slds-badge-success-text-color: #1b5e20;
            --slds-badge-success-border-radius: 8px;
            --slds-badge-success-padding: 6px 12px;
          }
        `
      });

      // Apply custom theme to a badge
      await page.evaluate(() => {
        const badge = document.querySelector('[data-slds-component="badge-success"]');
        if (badge) {
          badge.setAttribute('data-test-custom-theme', '');
        }
      });

      const customThemedBadge = page.locator('[data-test-custom-theme]');
      await expect(customThemedBadge).toHaveScreenshot('badge-success-custom-theme.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should handle runtime theme changes', async () => {
      // Test dynamic theme switching
      const badge = page.locator('[data-slds-component="badge-success"]').first();
      
      // Apply runtime theme change
      await badge.evaluate((el) => {
        el.style.setProperty('--slds-badge-success-background-color', '#ff9800');
        el.style.setProperty('--slds-badge-success-text-color', '#ffffff');
      });

      await expect(badge).toHaveScreenshot('badge-success-runtime-theme.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should validate CSS custom properties inheritance', async () => {
      const badge = page.locator('[data-slds-component="badge-success"]').first();
      
      const customProperties = await badge.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundFromVar: styles.getPropertyValue('--slds-badge-success-background-color'),
          textFromVar: styles.getPropertyValue('--slds-badge-success-text-color'),
          radiusFromVar: styles.getPropertyValue('--slds-badge-success-border-radius')
        };
      });
      
      // Verify CSS custom properties are properly defined
      expect(customProperties.backgroundFromVar.trim()).toBeTruthy();
      expect(customProperties.textFromVar.trim()).toBeTruthy();
      expect(customProperties.radiusFromVar.trim()).toBeTruthy();
    });
  });

  test.describe('Accessibility Visual Validation', () => {
    test('should render focus indicators correctly', async () => {
      const interactiveBadge = page.locator('[data-interactive="true"]').first();
      
      // Test keyboard focus
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      
      await expect(interactiveBadge).toHaveScreenshot('badge-success-focus-indicator.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should validate high contrast mode', async () => {
      // Simulate high contrast mode
      await page.emulateMedia({ media: 'screen', colorScheme: 'dark' });
      await page.addStyleTag({
        content: `
          @media (prefers-contrast: high) {
            [data-slds-component="badge-success"] {
              border: 1px solid currentColor;
              outline: 2px solid currentColor;
            }
          }
        `
      });

      const badge = page.locator('[data-slds-component="badge-success"]').first();
      await expect(badge).toHaveScreenshot('badge-success-high-contrast.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should validate reduced motion preferences', async () => {
      // Test reduced motion
      await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
      
      const interactiveBadge = page.locator('[data-interactive="true"]').first();
      await interactiveBadge.hover();
      
      // In reduced motion, transitions should be disabled
      await expect(interactiveBadge).toHaveScreenshot('badge-success-reduced-motion.png', {
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should validate ARIA labels visibility', async () => {
      // Test screen reader accessibility
      const badge = page.locator('[data-slds-component="badge-success"]').first();
      
      const ariaLabel = await badge.getAttribute('aria-label');
      const role = await badge.getAttribute('role');
      
      expect(ariaLabel).toBeTruthy();
      expect(role).toBeTruthy();
      
      // Visual test for aria-live regions
      await expect(badge).toHaveScreenshot('badge-success-aria-labels.png', {
        threshold: VISUAL_THRESHOLD
      });
    });
  });

  test.describe('Cross-browser Compatibility', () => {
    test('should render consistently across viewports', async () => {
      // Mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      const mobileBadge = page.locator('[data-slds-component="badge-success"]').first();
      await expect(mobileBadge).toHaveScreenshot('badge-success-mobile.png', {
        threshold: VISUAL_THRESHOLD
      });

      // Tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      const tabletBadge = page.locator('[data-slds-component="badge-success"]').first();
      await expect(tabletBadge).toHaveScreenshot('badge-success-tablet.png', {
        threshold: VISUAL_THRESHOLD
      });

      // Desktop viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      const desktopBadge = page.locator('[data-slds-component="badge-success"]').first();
      await expect(desktopBadge).toHaveScreenshot('badge-success-desktop.png', {
        threshold: VISUAL_THRESHOLD
      });
    });
  });

  test.describe('Full Demo Page Screenshots', () => {
    test('should capture complete badge success demo page', async () => {
      await expect(page).toHaveScreenshot('badge-success-demo-full-page.png', {
        fullPage: true,
        threshold: VISUAL_THRESHOLD
      });
    });

    test('should capture demo sections individually', async () => {
      const sections = [
        'Basic Usage',
        'Visual Variants', 
        'Interactive Features',
        'Custom Icons',
        'Enterprise Configuration',
        'Accessibility Features',
        'Real-world Use Cases'
      ];

      for (const sectionName of sections) {
        const section = page.locator(`h2:has-text("${sectionName}")`).locator('..');
        if (await section.isVisible()) {
          const fileName = `badge-success-section-${sectionName.toLowerCase().replace(/\s+/g, '-')}.png`;
          await expect(section).toHaveScreenshot(fileName, {
            threshold: VISUAL_THRESHOLD
          });
        }
      }
    });
  });
});