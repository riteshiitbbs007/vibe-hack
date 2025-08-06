# 🎯 Cursor + Figma + Playwright MCP Demo Script
## SLDS2 Component Generation & Testing Showcase

### 📋 Demo Overview
**Duration:** 10-15 minutes  
**Audience:** Developers, Design System Teams, QA Engineers  
**Objective:** Showcase end-to-end SLDS2 component generation and testing workflow

---

## 🚀 Demo Setup (Pre-Demo - 2 minutes)

### 1. Environment Check ✅
```bash
# Verify all systems are ready
npm run dev          # Start development server (background)
npm run test:figma   # Quick test run to verify Playwright works
```

### 2. Browser Setup
- **Primary:** Demo in Cursor with localhost:3000 open
- **Secondary:** Have Figma Design ready (SLDS2 Badge component)
- **Backup:** Playwright test report ready at localhost:9323

### 3. Clean State
- Start with clean component generator (no components selected)
- Have Figma MCP extension ready
- Clear any previous test results

---

## 🎬 Demo Flow

### **Scene 1: Introduction (1 minute)**

> "Today I'll show you how Cursor, combined with Figma MCP and Playwright, can automatically generate Lightning Design System 2 compliant components and verify their visual accuracy."

**Show:** 
- Clean Cursor workspace
- Open demo project at `localhost:3000`
- Point out the SLDS2 branding and focus

### **Scene 2: Figma Design System Integration (3 minutes)**

> "Let's start with a Figma design. I have a SLDS2 Badge Success component designed according to Lightning Design System 2 specifications."

**Actions:**
1. **Open Figma** (or use mock design reference)
2. **Highlight SLDS2 Features:**
   - Styling hooks usage
   - Semantic structure  
   - Accessibility considerations
   - Color tokens and spacing

> "Now, let's use Cursor with Figma MCP to generate this component automatically."

**In Cursor:**
3. **Generate Component:**
   - Click "🎯 SLDS2 Badge Success" button
   - Show the generation process
   - Explain the SLDS2 compliance features being generated

### **Scene 3: SLDS2 Code Generation (3 minutes)**

> "Notice how the generated component follows SLDS2 architecture principles."

**Show Generated Code:**
4. **Switch to Code Tab** in the demo
5. **Highlight Key SLDS2 Features:**
   ```typescript
   // Point out these features:
   - CSS custom properties (styling hooks)
   - Semantic HTML structure (span, not div)
   - ARIA attributes for accessibility
   - Global design tokens integration
   - Component-level styling hooks
   ```

6. **Explain Benefits:**
   - Framework-agnostic design
   - Runtime theming capability
   - Accessibility built-in
   - Future-proof architecture

### **Scene 4: Live Component Preview (2 minutes)**

> "Let's see the component in action with SLDS2's flexible theming system."

**Actions:**
7. **Switch back to Preview tab**
8. **Show Live Component:**
   - Point out SLDS2 compliance badges
   - Demonstrate the styling hooks in action
   - Show how it matches the Figma design

> "But how do we ensure this component always matches our Figma design? That's where Playwright visual regression testing comes in."

### **Scene 5: Playwright Visual Testing (4 minutes)**

> "Now let's run automated visual tests to verify our component matches the Figma design pixel-perfectly."

**Actions:**
9. **Run Visual Tests** (in Cursor terminal):
   ```bash
   npm run test:figma
   ```

10. **Explain the Testing Process:**
    - Component isolation testing
    - Styling hooks validation
    - Cross-context rendering
    - Pixel-perfect comparison

11. **Show Test Results:**
    - Display passing tests (4/4 ✅)
    - Explain what each test validates
    - Show test execution time

12. **Demonstrate Test Report:**
    ```bash
    npx playwright show-report playwright-report-figma
    ```
    - Show detailed visual comparisons
    - Point out baseline vs actual screenshots
    - Highlight the precision (0.1% threshold)

### **Scene 6: Advanced SLDS2 Features (2 minutes)**

> "Let's demonstrate SLDS2's most powerful feature: runtime styling hooks."

**Actions:**
13. **Show Styling Hooks in Action:**
    - Open browser developer tools
    - Modify CSS custom properties live:
      ```css
      --slds-c-badge-color-background: #1976d2
      --slds-c-badge-text-color: #ffffff
      ```
    - Show instant theme changes

14. **Explain Enterprise Benefits:**
    - Brand customization without code changes
    - Dark mode support
    - Agentic experience readiness
    - Multi-tenant theming

---

## 🎯 Demo Talking Points

### **Figma MCP Benefits:**
- ✅ **Zero Manual Coding** - Direct design-to-code conversion
- ✅ **SLDS2 Architecture** - Automatic compliance with design system
- ✅ **Accessibility Built-in** - WCAG 2.1 AA compliance from start
- ✅ **Future-Proof** - Modern CSS architecture with styling hooks

### **Playwright Testing Benefits:**
- ✅ **Visual Accuracy** - Pixel-perfect Figma matching
- ✅ **Regression Prevention** - Catch visual changes instantly  
- ✅ **Cross-Browser** - Consistent rendering verification
- ✅ **CI/CD Integration** - Automated quality gates

### **SLDS2 Advantages:**
- ✅ **Styling Hooks** - Runtime theming without code changes
- ✅ **Semantic Structure** - Framework-agnostic components
- ✅ **Global Tokens** - Consistent design language
- ✅ **Component Blueprints** - Reusable across React, LWC, etc.

---

## 🔧 Demo Commands Reference

### **Development Commands:**
```bash
npm run dev                    # Start demo server
npm run test:figma            # Run SLDS2 visual tests  
npm run test:figma:update     # Update test baselines
npx playwright show-report    # View test results
```

### **Key URLs:**
- **Demo App:** http://localhost:3000
- **Test Report:** http://localhost:9323 (when running)

---

## 🚨 Troubleshooting Guide

### **Common Issues & Solutions:**

#### **Playwright Browser Missing:**
```bash
npx playwright install
```

#### **Component Not Rendering:**
- Check console for errors
- Verify styling hooks are loaded
- Refresh the page

#### **Test Failures:**
- Run with `--update-snapshots` to regenerate baselines
- Check for recent styling changes
- Verify screen resolution matches test environment

#### **Dev Server Issues:**
```bash
# Kill any hanging processes
pkill -f "vite"
npm run dev
```

---

## 📊 Success Metrics

**Demo Success Indicators:**
- ✅ Component generates successfully
- ✅ All 4 Playwright tests pass
- ✅ Visual accuracy verified
- ✅ Styling hooks demonstration works
- ✅ Audience understands SLDS2 benefits

**Key Messages Delivered:**
- ✅ Figma-to-code automation works seamlessly
- ✅ SLDS2 compliance is automatic
- ✅ Visual testing prevents regressions
- ✅ Enterprise-ready architecture

---

## 🎤 Demo Conclusion

> "In just a few minutes, we've seen how Cursor with Figma MCP and Playwright can:
> 
> 1. **Generate SLDS2 compliant components** directly from Figma designs
> 2. **Ensure visual accuracy** with automated testing
> 3. **Provide enterprise-grade theming** through styling hooks
> 4. **Maintain design system consistency** across the development lifecycle
>
> This workflow reduces component development time from hours to minutes while ensuring Lightning Design System 2 compliance and visual accuracy."

**Call to Action:**
> "Questions about implementing this in your organization? Let's discuss how this can accelerate your design system adoption."

---

## 📁 Demo Assets Checklist

- [ ] Figma design file (or reference)
- [ ] Demo app running on localhost:3000
- [ ] Playwright tests passing
- [ ] Browser dev tools ready for styling hooks demo
- [ ] Backup scenarios prepared
- [ ] Screen recording setup (optional)

---

*Demo prepared for showcasing Cursor + Figma MCP + Playwright capabilities with SLDS2 component generation and testing.*