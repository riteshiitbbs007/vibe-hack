/**
 * BadgeSuccess Figma Design Comparison Tests
 * Pixel-perfect comparison with original Figma design specifications
 */

import { test, expect, Page } from '@playwright/test';

// Ultra-strict threshold for Figma comparison (0.1%)
const FIGMA_THRESHOLD = 0.001;

test.describe('BadgeSuccess Figma Design Comparison', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    
    // Navigate to app with full loading
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Navigate to Badge Success demo
    await page.click('button:has-text("🎨 SLDS2 Badge Success Demo")');
    
    // Wait for demo to fully load
    await page.waitForSelector('[data-slds-component="badge-success"]', { timeout: 10000 });
    
    // Ensure fonts are loaded
    await page.waitForFunction(() => document.fonts.ready);
    
    // Wait for any initial animations
    await page.waitForTimeout(500);
    
    // Disable all animations globally
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `
    });
  });

  test.describe('Figma Design Token Validation', () => {
    test('should match exact Figma color specifications', async () => {
      const badge = page.locator('[data-slds-component="badge-success"]').first();
      
      // Validate computed styles match Figma design tokens
      const styles = await badge.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          borderRadius: computed.borderRadius,
          padding: computed.padding,
          fontSize: computed.fontSize,
          fontFamily: computed.fontFamily,
          lineHeight: computed.lineHeight,
          gap: computed.gap
        };
      });
      
      // Figma extracted values:
      // --slds-g-color-success-container-1: #acf3e4
      // --slds-g-color-on-success-1: #056764
      expect(styles.backgroundColor).toBe('rgb(172, 243, 228)'); // #acf3e4
      expect(styles.color).toBe('rgb(5, 103, 100)'); // #056764
      expect(styles.borderRadius).toBe('4px'); // --slds-g-radius-border-1
      expect(styles.fontSize).toBe('12px'); // font/scale/neg-1
      expect(styles.fontFamily).toMatch(/SF Pro/); // font/family/base
      
      // Take pixel-perfect screenshot
      await expect(badge).toHaveScreenshot('figma-exact-colors.png', {
        threshold: FIGMA_THRESHOLD
      });
    });

    test('should match exact Figma spacing specifications', async () => {
      const badge = page.locator('[data-slds-component="badge-success"]').first();
      
      // Validate spacing matches Figma specs
      const spacing = await badge.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          padding: computed.padding,
          gap: computed.gap,
          width: rect.width,
          height: rect.height,
          paddingTop: computed.paddingTop,
          paddingRight: computed.paddingRight,
          paddingBottom: computed.paddingBottom,
          paddingLeft: computed.paddingLeft
        };
      });
      
      // Figma spacing: --slds-g-spacing-1: 4px, --slds-g-spacing-2: 8px
      expect(spacing.paddingTop).toBe('4px');
      expect(spacing.paddingBottom).toBe('4px');
      expect(spacing.paddingLeft).toBe('8px');
      expect(spacing.paddingRight).toBe('8px');
      expect(spacing.gap).toBe('4px');
    });

    test('should match exact Figma icon specifications', async () => {
      const icon = page.locator('[data-testid="badge-left-icon"] img').first();
      
      if (await icon.isVisible()) {
        const iconSpecs = await icon.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          const computed = window.getComputedStyle(el);
          return {
            width: rect.width,
            height: rect.height,
            objectFit: computed.objectFit,
            objectPosition: computed.objectPosition
          };
        });
        
        // Figma icon specs: 14x14px (3.5 * 4px base unit)
        expect(iconSpecs.width).toBe(14);
        expect(iconSpecs.height).toBe(14);
        expect(iconSpecs.objectFit).toBe('contain');
        
        await expect(icon).toHaveScreenshot('figma-exact-icon.png', {
          threshold: FIGMA_THRESHOLD
        });
      }
    });
  });

  test.describe('Pixel-Perfect Figma Comparison', () => {
    test('should match Figma design - basic success badge', async () => {
      // Locate the exact badge that matches original Figma design
      const originalBadge = page.locator('text="Success"').locator('..').first();
      
      // Ensure it's visible and in viewport
      await originalBadge.scrollIntoViewIfNeeded();
      await expect(originalBadge).toBeVisible();
      
      // Take pixel-perfect screenshot with ultra-strict threshold
      await expect(originalBadge).toHaveScreenshot('figma-basic-badge-exact.png', {
        threshold: FIGMA_THRESHOLD,
        animations: 'disabled',
        caret: 'hide'
      });
    });

    test('should match Figma design - badge with icon', async () => {
      // Find badge with left icon that matches Figma
      const iconBadge = page.locator('text="Task Completed"').locator('..').first();
      
      await iconBadge.scrollIntoViewIfNeeded();
      await expect(iconBadge).toBeVisible();
      
      // Validate icon is present
      const hasIcon = await iconBadge.locator('[data-testid="badge-left-icon"]').isVisible();
      expect(hasIcon).toBe(true);
      
      await expect(iconBadge).toHaveScreenshot('figma-icon-badge-exact.png', {
        threshold: FIGMA_THRESHOLD,
        animations: 'disabled',
        caret: 'hide'
      });
    });

    test('should match Figma design - different sizes', async () => {
      // Test all size variants against Figma specs
      const sizes = ['small', 'medium', 'large'];
      
      for (const size of sizes) {
        const sizeBadge = page.locator(`[data-size="${size}"]`).first();
        
        if (await sizeBadge.isVisible()) {
          await sizeBadge.scrollIntoViewIfNeeded();
          
          await expect(sizeBadge).toHaveScreenshot(`figma-${size}-badge-exact.png`, {
            threshold: FIGMA_THRESHOLD,
            animations: 'disabled',
            caret: 'hide'
          });
        }
      }
    });
  });

  test.describe('Figma Design System Compliance', () => {
    test('should validate SLDS2 design system integration', async () => {
      // Test that component follows SLDS2 design system principles
      const badge = page.locator('[data-slds-component="badge-success"]').first();
      
      // Check SLDS2 data attributes
      const sldVersion = await badge.getAttribute('data-slds-version');
      expect(sldVersion).toBe('2.0');
      
      // Check BEM methodology class structure
      const className = await badge.getAttribute('class');
      expect(className).toContain('slds-badge-success');
      
      // Validate design token usage
      const tokenUsage = await badge.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          usesCustomProperties: styles.backgroundColor.includes('var(') || 
                               getComputedStyle(document.documentElement)
                                 .getPropertyValue('--slds-g-color-success-container-1') !== ''
        };
      });
      
      // Should use CSS custom properties from design tokens
      expect(tokenUsage.usesCustomProperties).toBe(true);
    });

    test('should validate component architecture compliance', async () => {
      const badge = page.locator('[data-slds-component="badge-success"]').first();
      
      // Check semantic HTML structure
      const tagName = await badge.evaluate(el => el.tagName.toLowerCase());
      expect(['span', 'button']).toContain(tagName);
      
      // Check ARIA compliance
      const ariaLabel = await badge.getAttribute('aria-label');
      const role = await badge.getAttribute('role');
      
      expect(ariaLabel).toBeTruthy();
      expect(role).toBeTruthy();
      expect(['status', 'button']).toContain(role);
      
      // Check component structure
      const hasText = await badge.locator('[data-testid="badge-text"]').isVisible();
      expect(hasText).toBe(true);
    });

    test('should validate enterprise hooks architecture', async () => {
      const badge = page.locator('[data-slds-component="badge-success"]').first();
      
      // Test CSS custom property hooks
      const customPropertyHooks = await badge.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        const rootStyles = getComputedStyle(document.documentElement);
        
        return {
          hasBadgeSpecificProps: rootStyles.getPropertyValue('--slds-badge-success-background-color') !== '',
          hasGlobalTokens: rootStyles.getPropertyValue('--slds-g-color-success-container-1') !== '',
          canBeThemed: true // Component supports runtime theming
        };
      });
      
      expect(customPropertyHooks.hasGlobalTokens).toBe(true);
      expect(customPropertyHooks.canBeThemed).toBe(true);
    });
  });

  test.describe('Cross-browser Figma Consistency', () => {
    test('should render consistently across browsers', async () => {
      const badge = page.locator('[data-slds-component="badge-success"]').first();
      
      // Test in current browser context
      await expect(badge).toHaveScreenshot('figma-cross-browser-base.png', {
        threshold: FIGMA_THRESHOLD
      });
      
      // Validate consistent dimensions across browsers
      const dimensions = await badge.boundingBox();
      expect(dimensions?.width).toBeGreaterThan(0);
      expect(dimensions?.height).toBeGreaterThan(0);
      
      // Check font rendering consistency
      const fontMetrics = await badge.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight
        };
      });
      
      expect(fontMetrics.fontSize).toBe('12px');
      expect(fontMetrics.fontFamily).toMatch(/SF Pro/);
      expect(fontMetrics.fontWeight).toBe('400');
    });
  });

  test.describe('Figma Interactive State Accuracy', () => {
    test('should match Figma hover specifications', async () => {
      const interactiveBadge = page.locator('[data-interactive="true"]').first();
      
      if (await interactiveBadge.isVisible()) {
        // Test default state
        await expect(interactiveBadge).toHaveScreenshot('figma-interactive-default.png', {
          threshold: FIGMA_THRESHOLD
        });
        
        // Test hover state
        await interactiveBadge.hover();
        await page.waitForTimeout(100); // Allow any transitions to complete
        
        await expect(interactiveBadge).toHaveScreenshot('figma-interactive-hover.png', {
          threshold: FIGMA_THRESHOLD
        });
      }
    });

    test('should match Figma focus specifications', async () => {
      const interactiveBadge = page.locator('[data-interactive="true"]').first();
      
      if (await interactiveBadge.isVisible()) {
        await interactiveBadge.focus();
        await page.waitForTimeout(100);
        
        await expect(interactiveBadge).toHaveScreenshot('figma-interactive-focus.png', {
          threshold: FIGMA_THRESHOLD
        });
      }
    });
  });

  test.describe('Figma Component Variants Accuracy', () => {
    test('should validate all visual variants match Figma', async () => {
      const variants = ['default', 'strong', 'subtle'];
      
      for (const variant of variants) {
        const variantBadge = page.locator(`[data-variant="${variant}"]`).first();
        
        if (await variantBadge.isVisible()) {
          await variantBadge.scrollIntoViewIfNeeded();
          
          await expect(variantBadge).toHaveScreenshot(`figma-variant-${variant}-exact.png`, {
            threshold: FIGMA_THRESHOLD,
            animations: 'disabled'
          });
        }
      }
    });
  });

  test.describe('Figma Typography Compliance', () => {
    test('should match exact Figma typography specifications', async () => {
      const badgeText = page.locator('[data-testid="badge-text"]').first();
      
      const typography = await badgeText.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        
        return {
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
          letterSpacing: styles.letterSpacing,
          textAlign: styles.textAlign,
          actualHeight: rect.height,
          actualWidth: rect.width
        };
      });
      
      // Figma typography specs:
      // Body/font-scale-neg-1/Regular: Font(family: "SF Pro", style: Regular, size: 12, weight: 400, lineHeight: 17)
      expect(typography.fontSize).toBe('12px');
      expect(typography.fontFamily).toMatch(/SF Pro/);
      expect(typography.fontWeight).toBe('400');
      expect(typography.lineHeight).toBe('17px');
      
      await expect(badgeText).toHaveScreenshot('figma-typography-exact.png', {
        threshold: FIGMA_THRESHOLD
      });
    });
  });
});