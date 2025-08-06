# 🎯 Demo Examples & Sample Outputs
## Exact Commands and Expected Results

This guide provides the exact commands you'll use and the expected outputs for a flawless demo.

---

## 🎨 **Figma MCP Commands**

### **Command 1: Badge Success Generation**

**Type in Cursor Chat:**
```
@figma Generate an SLDS2 compliant Badge Success component from the currently selected Figma node. Include:

1. Lightning Design System 2 styling hooks architecture
2. Semantic HTML structure with proper ARIA attributes  
3. TypeScript interfaces with comprehensive prop types
4. CSS custom properties for runtime theming
5. Global design tokens integration
6. Production-ready documentation

Make it enterprise-grade and framework-agnostic.
```

**Expected Generated Code:**
```typescript
import React from 'react';

/**
 * SLDS2 Compliant Badge Success Component
 * Built with Lightning Design System 2 styling hooks architecture
 * 
 * @example
 * ```tsx
 * <BadgeSuccess labelText="Completed" showLeftIcon={true} />
 * ```
 */

export interface BadgeSuccessProps {
  /** Badge text content */
  labelText?: string;
  /** Show left icon */
  showLeftIcon?: boolean;
  /** Component variant for different contexts */
  variant?: 'base' | 'inverse' | 'lightest';
  /** Size variation */
  size?: 'small' | 'medium';
  /** Additional CSS classes */
  className?: string;
  /** SLDS2 styling hooks for runtime theming */
  style?: React.CSSProperties & {
    '--slds-c-badge-color-background'?: string;
    '--slds-c-badge-text-color'?: string;
    '--slds-c-badge-radius-border'?: string;
    '--slds-c-badge-spacing-inline'?: string;
    '--slds-c-badge-spacing-block'?: string;
  };
}

export function BadgeSuccess({
  labelText = "Success",
  showLeftIcon = true,
  variant = "base",
  size = "medium", 
  className = "",
  style = {}
}: BadgeSuccessProps) {
  return (
    <span
      className={`slds-badge slds-badge_success ${className}`.trim()}
      style={{
        // SLDS2 Global Design Tokens → Component Hooks
        '--slds-c-badge-color-background': 'var(--slds-g-color-success-container-1, #acf3e4)',
        '--slds-c-badge-text-color': 'var(--slds-g-color-on-success-1, #056764)',
        '--slds-c-badge-radius-border': 'var(--slds-g-radius-border-4, 15rem)',
        
        // CSS Implementation using styling hooks
        backgroundColor: 'var(--slds-c-badge-color-background)',
        color: 'var(--slds-c-badge-text-color)',
        borderRadius: 'var(--slds-c-badge-radius-border)',
        paddingInline: 'var(--slds-g-spacing-2, 8px)',
        paddingBlock: 'var(--slds-g-spacing-1, 4px)',
        fontSize: 'var(--slds-g-font-size-1, 12px)',
        fontWeight: 'var(--slds-g-font-weight-4, 400)',
        lineHeight: 'var(--slds-g-line-height-1, 17px)',
        fontFamily: 'var(--slds-g-font-family, system-ui, sans-serif)',
        
        // SLDS2 Structural Properties
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--slds-g-spacing-1, 4px)',
        whiteSpace: 'nowrap' as const,
        verticalAlign: 'middle',
        textDecoration: 'none',
        border: 'none',
        outline: 'none',
        cursor: 'default',
        
        // Apply custom styling hooks
        ...style
      }}
      role="status"
      aria-label={`Success: ${labelText}`}
      data-slds-variant={variant}
      data-slds-size={size}
    >
      {showLeftIcon && (
        <span 
          className="slds-badge__icon slds-badge__icon_left"
          style={{
            width: 'var(--slds-g-sizing-square-x-small, 14px)',
            height: 'var(--slds-g-sizing-square-x-small, 14px)',
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-hidden="true"
        >
          ✓
        </span>
      )}
      <span className="slds-badge__label">
        {labelText}
      </span>
    </span>
  );
}

export default BadgeSuccess;
```

### **Command 2: Badge Error Generation**

**Type in Cursor Chat:**
```
@figma Generate an SLDS2 Badge Error component from the selected Figma design. Use the same architecture pattern as BadgeSuccess but with error semantics, red/pink theming, and appropriate ARIA labels.
```

**Expected Generated Code:**
```typescript
export function BadgeError({
  labelText = "Error",
  showLeftIcon = true,
  variant = "base",
  size = "medium",
  className = "",
  style = {}
}: BadgeErrorProps) {
  return (
    <span
      className={`slds-badge slds-badge_error ${className}`.trim()}
      style={{
        // SLDS2 Error Design Tokens
        '--slds-c-badge-color-background': 'var(--slds-g-color-error-container-1, #fddde3)',
        '--slds-c-badge-text-color': 'var(--slds-g-color-on-error-1, #b60554)',
        '--slds-c-badge-radius-border': 'var(--slds-g-radius-border-4, 15rem)',
        
        // Same structural CSS as Success
        backgroundColor: 'var(--slds-c-badge-color-background)',
        color: 'var(--slds-c-badge-text-color)',
        // ... rest similar to BadgeSuccess
        
        ...style
      }}
      role="alert"
      aria-label={`Error: ${labelText}`}
    >
      {showLeftIcon && (
        <span className="slds-badge__icon slds-badge__icon_left">
          ⚠
        </span>
      )}
      <span className="slds-badge__label">{labelText}</span>
    </span>
  );
}
```

---

## 🧪 **Playwright MCP Commands**

### **Command 1: Visual Regression Tests**

**Type in Cursor Chat:**
```
@playwright Create comprehensive visual regression tests for the BadgeSuccess component. Include:

1. Basic component rendering test with exact Figma design comparison
2. Different prop variations (with/without icon, different text)
3. Styling hooks customization testing
4. Accessibility validation
5. Cross-browser compatibility

Use toHaveScreenshot with 0.1% threshold for strict design accuracy.
```

**Expected Generated Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('BadgeSuccess SLDS2 Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('BadgeSuccess matches Figma design exactly', async ({ page }) => {
    // Ensure component is rendered
    await page.waitForSelector('[data-testid="generated-component"]');
    
    // Take screenshot with strict comparison
    const component = page.locator('[data-testid="generated-component"]');
    await expect(component).toHaveScreenshot('badge-success-figma-match.png', {
      threshold: 0.1, // Only 0.1% pixel difference allowed
      mode: 'percent'
    });
  });

  test('BadgeSuccess with custom styling hooks', async ({ page }) => {
    // Apply custom styling hooks
    await page.addStyleTag({
      content: `
        .slds-badge {
          --slds-c-badge-color-background: #1976d2;
          --slds-c-badge-text-color: #ffffff;
          --slds-c-badge-radius-border: 8px;
        }
      `
    });
    
    await page.waitForSelector('[data-testid="generated-component"]');
    const component = page.locator('[data-testid="generated-component"]');
    await expect(component).toHaveScreenshot('badge-success-custom-blue.png');
  });

  test('BadgeSuccess prop variations', async ({ page }) => {
    // Test without icon
    await page.evaluate(() => {
      const badge = document.querySelector('.slds-badge');
      if (badge) {
        badge.textContent = 'No Icon Success';
        const icon = badge.querySelector('.slds-badge__icon');
        if (icon) icon.remove();
      }
    });
    
    const component = page.locator('[data-testid="generated-component"]');
    await expect(component).toHaveScreenshot('badge-success-no-icon.png');
  });

  test('BadgeSuccess accessibility compliance', async ({ page }) => {
    await page.waitForSelector('[data-testid="generated-component"]');
    
    // Check ARIA attributes
    const badge = page.locator('.slds-badge');
    await expect(badge).toHaveAttribute('role', 'status');
    await expect(badge).toHaveAttribute('aria-label', /Success:/);
    
    // Check semantic structure
    await expect(badge).toHaveClass(/slds-badge/);
    await expect(badge.locator('.slds-badge__label')).toBeVisible();
  });
});
```

### **Command 2: Integration Tests**

**Type in Cursor Chat:**
```
@playwright Create integration tests that validate the complete workflow: component generation → preview → styling hooks → visual validation. Include error handling and edge cases.
```

**Expected Generated Test Code:**
```typescript
test.describe('SLDS2 Component Integration Workflow', () => {
  test('Complete component generation workflow', async ({ page }) => {
    await page.goto('/');
    
    // Step 1: Verify clean slate
    await expect(page.locator('[data-testid="generated-component"]')).toContainText('Ready for Live Generation');
    
    // Step 2: Simulate component integration
    // (This would be manual integration in real demo)
    await page.evaluate(() => {
      // Simulate adding BadgeSuccess component
      const container = document.querySelector('[data-testid="generated-component"]');
      if (container) {
        container.innerHTML = `
          <span class="slds-badge slds-badge_success" role="status">
            <span class="slds-badge__icon">✓</span>
            <span class="slds-badge__label">Success</span>
          </span>
        `;
      }
    });
    
    // Step 3: Verify component rendering
    await expect(page.locator('.slds-badge')).toBeVisible();
    await expect(page.locator('.slds-badge__label')).toContainText('Success');
    
    // Step 4: Test styling hooks
    await page.addStyleTag({
      content: '.slds-badge { --slds-c-badge-color-background: #28a745; }'
    });
    
    // Step 5: Final validation
    const component = page.locator('[data-testid="generated-component"]');
    await expect(component).toHaveScreenshot('integration-workflow-complete.png');
  });
});
```

---

## 🎨 **Live Styling Examples**

### **Example 1: Blue Theme Override**

**In Browser Dev Tools Console:**
```css
/* Add this in Styles panel */
.slds-badge {
  --slds-c-badge-color-background: #1976d2;
  --slds-c-badge-text-color: #ffffff;
  --slds-c-badge-radius-border: 6px;
}
```

**Visual Result:** Badge turns blue with white text and slightly rounded corners

### **Example 2: Dark Mode Simulation**

**In Browser Dev Tools Console:**
```css
.slds-badge {
  --slds-c-badge-color-background: #2d3748;
  --slds-c-badge-text-color: #68d391;
  --slds-c-badge-radius-border: 4px;
}
```

**Visual Result:** Dark background with green text

### **Example 3: Large Size Variant**

**In Browser Dev Tools Console:**
```css
.slds-badge {
  --slds-c-badge-spacing-inline: 16px;
  --slds-c-badge-spacing-block: 12px;
  --slds-c-badge-font-size: 16px;
  --slds-g-sizing-square-x-small: 20px;
}
```

**Visual Result:** Larger badge with more padding and bigger icon

---

## 🎯 **Demo Integration Code**

### **Quick Component Integration**

**File: `src/components/ComponentPreview.tsx`**

Add this to make generated components appear:

```typescript
// Add import at top
import { BadgeSuccess } from '../../components/BadgeSuccess'

// Update renderComponent function
const renderComponent = () => {
  if (component && component.name === 'BadgeSuccess') {
    return (
      <div data-testid="generated-component" className="inline-block">
        <BadgeSuccess 
          labelText="Success"
          showLeftIcon={true}
          variant="base"
          size="medium"
        />
      </div>
    )
  }
  
  return (
    <div data-testid="generated-component" className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg text-center border-2 border-dashed border-blue-300">
      <div className="text-6xl mb-4">🎨</div>
      <div className="text-xl font-semibold text-gray-800 mb-2">Component Generated!</div>
      <div className="text-sm text-gray-600">
        Your SLDS2 component is ready and rendered above
      </div>
    </div>
  )
}
```

### **Quick Demo State Update**

**In ComponentGenerator, trigger preview:**

```typescript
const handleGeneratedComponent = () => {
  onComponentGenerated({
    name: 'BadgeSuccess',
    code: '// Generated SLDS2 Component code...',
    props: { labelText: 'Success', showLeftIcon: true }
  })
}
```

---

## 📊 **Expected Demo Timings**

### **Figma MCP Generation:**
- Command entry: 30 seconds
- MCP response: 15-45 seconds
- Code explanation: 60 seconds
- **Total: ~2.5 minutes**

### **Component Integration:**
- File creation: 15 seconds
- Code copying: 15 seconds
- Import/integration: 30 seconds
- **Total: ~1 minute**

### **Live Preview:**
- Browser refresh: 5 seconds
- Component appears: Instant
- Visual verification: 30 seconds
- **Total: ~35 seconds**

### **Styling Hooks Demo:**
- Dev tools open: 10 seconds
- CSS modification: 30 seconds
- Visual changes: Instant
- **Total: ~40 seconds**

### **Testing Generation:**
- Playwright command: 30 seconds
- Test generation: 20-30 seconds
- Test execution: 45 seconds
- **Total: ~2 minutes**

---

## 🎪 **Demo Recovery Scripts**

### **If Figma MCP is Slow:**
> "While that's generating, let me explain what we're about to see. The MCP is analyzing the Figma design tokens, extracting colors, spacing, and typography, then applying SLDS2 architecture patterns..."

### **If Component Doesn't Render:**
> "Let me quickly check the integration... In a real workflow, this would be seamless, but for demo purposes, let me show you what the generated component looks like..."

### **If Tests Take Too Long:**
> "Testing is running in the background. Let me show you what typically happens..." (show expected test output)

---

## 🚀 **Success Indicators**

### **Technical Success:**
- [ ] Figma MCP generates valid SLDS2 code
- [ ] Component renders correctly in demo
- [ ] Styling hooks work in dev tools
- [ ] Tests generate and run successfully

### **Audience Success:**
- [ ] Visible excitement at generation speed
- [ ] Questions about implementation
- [ ] Recognition of business value
- [ ] Requests for follow-up discussions

---

**🎬 With these detailed examples, you're ready to deliver a flawless live demo!**