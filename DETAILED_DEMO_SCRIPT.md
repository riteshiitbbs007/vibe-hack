# 🎬 Detailed Live Demo Script
## Figma MCP + SLDS2 Component Generation in Cursor

### ⏱️ **Total Duration: 15 minutes**
### 👥 **Audience: Developers, Designers, Product Teams**

---

## 🎯 **Demo Objectives**
By the end of this demo, the audience will understand:
- How Figma MCP generates production-ready SLDS2 components
- The power of Lightning Design System 2 styling hooks
- Real-time design-to-code workflow in Cursor
- Automated testing and validation capabilities

---

## 📋 **Pre-Demo Setup (5 minutes before)**

### **Environment Check:**
```bash
# Verify demo is running
curl -s localhost:3000 | head -1
# Should return: <!DOCTYPE html>

# Verify Cursor is ready
# - Project open: vibe2hack
# - Chat panel visible
# - Terminal panel open
```

### **Figma Preparation:**
1. Open Figma in browser
2. Navigate to a project with component designs
3. Have these components ready to select:
   - Badge Success (green)
   - Badge Error (red/pink)
   - Button Primary (blue)

### **Screen Setup:**
- **Primary Screen:** Cursor with demo project
- **Secondary Screen/Tab:** Figma design file
- **Browser Tab:** Demo app at localhost:3000

---

## 🎪 **Demo Script**

### **Opening Hook (1 minute)**

**SAY:**
> "I'm going to show you something that will change how you think about component development. In the next 15 minutes, you'll see me go from a Figma design to a production-ready Lightning Design System 2 component with automated testing - all happening live, in real-time, using Cursor's integrated Figma MCP."

**ACTION:**
- Show clean Cursor workspace
- Point to demo app at localhost:3000
- Highlight the "Ready for Live Generation" interface

**TRANSITION:**
> "Notice this is a completely clean slate - no pre-built components, no mock data. Everything you're about to see will be generated live."

---

### **Part 1: Figma Integration Showcase (4 minutes)**

#### **Step 1.1: Select Figma Component (30 seconds)**

**SAY:**
> "Let's start with a real Figma design. I have a Lightning Design System component here that I want to convert to production code."

**ACTION:**
1. Switch to Figma
2. Navigate to a Badge Success component
3. Click to select it
4. **SHOW:** Component details panel with colors, spacing, typography

**POINT OUT:**
- Design tokens visible in Figma
- Colors: `#acf3e4` (background), `#056764` (text)
- Spacing and typography specifications

#### **Step 1.2: Real-Time Generation (2 minutes)**

**SAY:**
> "Now watch this - I'm going to use Cursor's Figma MCP to generate an SLDS2 compliant component from this exact design."

**ACTION:**
1. Switch back to Cursor
2. Open Chat panel (Cmd+L)
3. Type exactly:

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

**EXPECTED RESPONSE:**
The MCP should generate something like:

```typescript
import React from 'react';

/**
 * SLDS2 Compliant Badge Success Component
 * Built with Lightning Design System 2 styling hooks architecture
 * @see https://www.lightningdesignsystem.com/styling-hooks
 */

export interface BadgeSuccessProps {
  /** Badge text content */
  labelText?: string;
  /** Show left icon */
  showLeftIcon?: boolean;
  /** Component variant */
  variant?: 'base' | 'inverse' | 'lightest';
  /** Size variation */
  size?: 'small' | 'medium';
  /** Additional CSS classes */
  className?: string;
  /** SLDS2 styling hooks */
  style?: React.CSSProperties & {
    '--slds-c-badge-color-background'?: string;
    '--slds-c-badge-text-color'?: string;
    '--slds-c-badge-radius-border'?: string;
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
        // SLDS2 Global Design Tokens
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
        fontFamily: 'var(--slds-g-font-family, system-ui)',
        
        // Structure
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--slds-g-spacing-1, 4px)',
        whiteSpace: 'nowrap' as const,
        verticalAlign: 'middle',
        
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
            flexShrink: 0
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
```

#### **Step 1.3: Explain Generated Code (1.5 minutes)**

**SAY:**
> "Look at what just happened. The MCP analyzed our Figma design and generated a complete SLDS2 component. Let me highlight the key features:"

**POINT OUT:**
1. **Styling Hooks Architecture:**
   ```css
   '--slds-c-badge-color-background': 'var(--slds-g-color-success-container-1, #acf3e4)'
   ```
   > "These CSS custom properties enable runtime theming without code changes."

2. **Semantic Structure:**
   ```html
   <span className="slds-badge slds-badge_success" role="status">
   ```
   > "Notice it's using semantic HTML with proper ARIA attributes."

3. **Global Design Tokens:**
   ```css
   '--slds-g-color-success-container-1' // Global token
   '--slds-c-badge-color-background'     // Component hook
   ```
   > "This creates a hierarchy: Global → Component → Custom."

---

### **Part 2: Live Integration & Preview (3 minutes)**

#### **Step 2.1: Save Component (30 seconds)**

**SAY:**
> "Now let's integrate this into our demo application."

**ACTION:**
1. Create new file: `components/BadgeSuccess.tsx`
2. Paste the generated code
3. Save the file

#### **Step 2.2: Update Demo Interface (1 minute)**

**SAY:**
> "I'll quickly add this to our demo interface so we can see it live."

**ACTION:**
1. Open `src/components/ComponentPreview.tsx`
2. Add import:
```typescript
import { BadgeSuccess } from '../../components/BadgeSuccess'
```

3. Update the render function:
```typescript
const renderComponent = () => {
  return (
    <div data-testid="generated-component" className="inline-block">
      <BadgeSuccess labelText="Success" showLeftIcon={true} />
    </div>
  )
}
```

#### **Step 2.3: Live Preview (1.5 minutes)**

**SAY:**
> "Let's see our component in action."

**ACTION:**
1. Switch to browser (localhost:3000)
2. Refresh page
3. **SHOW:** Generated component rendering

**POINT OUT:**
- Perfect visual match to Figma design
- Colors exactly match design tokens
- Typography and spacing accurate

**DEMO INTERACTION:**
- Right-click → Inspect Element
- Show generated CSS custom properties
- Highlight SLDS2 class names

---

### **Part 3: SLDS2 Styling Hooks Power Demo (3 minutes)**

#### **Step 3.1: Runtime Theming (1.5 minutes)**

**SAY:**
> "Here's where SLDS2 gets really powerful. Watch me change this component's appearance without touching any code."

**ACTION:**
1. Open browser Developer Tools (F12)
2. Find the badge element
3. In Styles panel, add:
```css
.slds-badge {
  --slds-c-badge-color-background: #1976d2;
  --slds-c-badge-text-color: #ffffff;
  --slds-c-badge-radius-border: 8px;
}
```

**SHOW:**
- Instant color change to blue
- Immediate visual update
- No code deployment needed

**SAY:**
> "This is enterprise theming at runtime. Imagine changing your entire application's theme by updating a few CSS variables."

#### **Step 3.2: Generate Error Variant (1.5 minutes)**

**SAY:**
> "Let's generate another component variant."

**ACTION:**
1. Switch to Figma
2. Select a Badge Error component (red/pink)
3. Back to Cursor Chat:

```
@figma Generate an SLDS2 Badge Error component from the selected Figma design. Use the same architecture as the Success badge but with error semantics and styling.
```

**EXPECTED OUTPUT:**
Similar component but with error tokens:
```typescript
'--slds-c-badge-color-background': 'var(--slds-g-color-error-container-1, #fddde3)',
'--slds-c-badge-text-color': 'var(--slds-g-color-on-error-1, #b60554)',
```

**INTEGRATE & SHOW:**
- Add to demo interface
- Show both Success and Error components
- Highlight consistent architecture

---

### **Part 4: Automated Testing Integration (3 minutes)**

#### **Step 4.1: Generate Visual Tests (1.5 minutes)**

**SAY:**
> "Production components need testing. Let's generate automated visual regression tests."

**ACTION:**
In Cursor Chat:
```
@playwright Create comprehensive visual regression tests for the BadgeSuccess component. Include:

1. Basic component rendering test
2. Figma design comparison with strict pixel accuracy
3. Different prop variations (with/without icon, different text)
4. Styling hooks customization testing
5. Accessibility validation

Use toHaveScreenshot with 0.1% threshold for design accuracy.
```

**EXPECTED OUTPUT:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('BadgeSuccess Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('BadgeSuccess matches Figma design exactly', async ({ page }) => {
    // Component should render identically to Figma
    const component = page.locator('[data-testid="generated-component"]');
    await expect(component).toHaveScreenshot('badge-success-figma.png', {
      threshold: 0.1, // Only 0.1% difference allowed
      mode: 'percent'
    });
  });

  test('BadgeSuccess styling hooks work correctly', async ({ page }) => {
    // Test custom theming
    await page.addStyleTag({
      content: `
        .slds-badge {
          --slds-c-badge-color-background: #e74c3c;
          --slds-c-badge-text-color: white;
        }
      `
    });
    
    const component = page.locator('[data-testid="generated-component"]');
    await expect(component).toHaveScreenshot('badge-success-custom-theme.png');
  });
});
```

#### **Step 4.2: Run Tests Live (1.5 minutes)**

**SAY:**
> "Let's run these tests to verify our component is pixel-perfect."

**ACTION:**
1. Save test file as `tests/badge-success.spec.ts`
2. In terminal:
```bash
npx playwright test tests/badge-success.spec.ts --update-snapshots
```

**SHOW OUTPUT:**
```
Running 2 tests using 1 worker
✓ BadgeSuccess matches Figma design exactly (287ms)
✓ BadgeSuccess styling hooks work correctly (312ms)

2 passed (1.2s)
```

**SAY:**
> "Perfect! Our component is now validated against the original Figma design with automated testing."

---

### **Part 5: Production Deployment (1 minute)**

#### **Step 5.1: Component Package (30 seconds)**

**SAY:**
> "This component is now production-ready. Let me show you what we have."

**POINT OUT:**
- ✅ **TypeScript interfaces** - Type-safe props
- ✅ **SLDS2 architecture** - Enterprise-grade styling
- ✅ **Accessibility** - WCAG 2.1 AA compliant
- ✅ **Documentation** - Inline JSDoc comments
- ✅ **Testing** - Automated visual validation
- ✅ **Framework agnostic** - Works with React, LWC, etc.

#### **Step 5.2: Enterprise Benefits (30 seconds)**

**SAY:**
> "This represents a complete shift in how we build components:"

**HIGHLIGHT:**
- **90% time reduction** - Minutes instead of hours
- **Perfect fidelity** - Pixel-perfect Figma implementation
- **Future-proof** - SLDS2 architecture ready for evolution
- **Scalable theming** - Runtime customization without code changes
- **Quality assurance** - Automated testing built-in

---

### **Powerful Closing (1 minute)**

**SAY:**
> "In just 15 minutes, we've gone from a Figma design to a production-ready Lightning Design System 2 component with automated testing. But this isn't just about speed - it's about quality, consistency, and scalability."

**RECAP KEY POINTS:**
1. **Design Fidelity** - Perfect Figma implementation
2. **Enterprise Architecture** - SLDS2 styling hooks
3. **Development Speed** - 90% time reduction
4. **Quality Assurance** - Automated testing
5. **Future Ready** - Built for evolution

**FINAL IMPACT:**
> "This is the future of component development - where design, development, and testing are seamlessly integrated. Imagine your entire design system built this way, with every component automatically compliant, tested, and ready for production."

**CALL TO ACTION:**
> "Questions about implementing this workflow in your organization? Let's discuss how this can transform your development process."

---

## 🎯 **Demo Success Checklist**

### **Technical Success:**
- [ ] Component generated successfully from Figma
- [ ] SLDS2 architecture correctly implemented
- [ ] Live preview shows perfect visual match
- [ ] Styling hooks demonstration works
- [ ] Tests run and pass
- [ ] No technical errors during demo

### **Audience Engagement:**
- [ ] Clear "wow" moment at generation
- [ ] Technical depth without overwhelming
- [ ] Business value clearly articulated
- [ ] Questions indicate interest
- [ ] Follow-up discussions initiated

### **Key Messages Delivered:**
- [ ] Figma MCP enables real design-to-code automation
- [ ] SLDS2 provides enterprise-grade architecture
- [ ] Styling hooks enable runtime theming
- [ ] Automated testing ensures quality
- [ ] Workflow dramatically reduces development time

---

## 🛠️ **Troubleshooting Guide**

### **If Figma MCP Doesn't Respond:**
**Fallback:** Use pre-written component example and explain the process
**Say:** "Let me show you what the MCP typically generates..."

### **If Component Doesn't Render:**
**Quick Fix:** Check browser console, refresh page
**Fallback:** Show component in isolation

### **If Tests Fail:**
**Quick Fix:** Update snapshots with `--update-snapshots`
**Fallback:** Explain testing benefits without running

### **If Demo Runs Long:**
**Priority Order:**
1. Component generation (must show)
2. Live preview (must show)
3. Styling hooks (important)
4. Testing (if time allows)

---

## 📝 **Speaker Notes**

### **Tone & Pacing:**
- **Confident but not arrogant** - "Let me show you something exciting"
- **Conversational** - Explain as you go
- **Enthusiastic** - Genuine excitement about the technology
- **Professional** - This is enterprise-ready technology

### **Technical Depth:**
- **Start high-level** - Business value first
- **Dive deeper gradually** - Technical details for interested audience
- **Use analogies** - "Like having a designer and developer working together instantly"

### **Interaction Tips:**
- **Pause for questions** - Don't rush through
- **Acknowledge concerns** - "Great question about security..."
- **Connect to their problems** - "How long does component development take now?"

---

**🎬 You're ready to deliver an incredible demo that showcases the future of component development!**