# BadgeSuccess Visual Regression Testing Guide

Comprehensive Playwright visual testing suite for the SLDS2 BadgeSuccess component with strict pixel accuracy and Figma design comparison.

## 🎯 Test Overview

### Test Suites

1. **`badge-success-visual.spec.ts`** - Comprehensive component testing
2. **`badge-success-figma-comparison.spec.ts`** - Pixel-perfect Figma comparison
3. **`global-setup.ts`** - Environment consistency setup

### Visual Accuracy Thresholds

- **Standard Tests**: 0.1% threshold (0.001)
- **Figma Comparison**: 0.1% threshold (0.001) 
- **Cross-browser**: 0.2% threshold (0.002)

## 🚀 Quick Start

### Install Playwright Browsers
```bash
npm run test:install
```

### Run Badge Success Tests
```bash
# All badge tests
npm run test:badge

# Figma comparison tests only
npm run test:badge:figma

# Update screenshots (first run)
npm run test:badge:update

# Interactive test runner
npm run test:visual:ui
```

## 📊 Test Categories

### 1. Basic Component Rendering
- ✅ Basic success badge
- ✅ Badge with left icon
- ✅ Badge text rendering
- ✅ Component visibility

### 2. Size Variations
- ✅ Small badge (data-size="small")
- ✅ Medium badge (data-size="medium") 
- ✅ Large badge (data-size="large")
- ✅ All sizes comparison

### 3. Visual Variants
- ✅ Default variant (data-variant="default")
- ✅ Strong variant (data-variant="strong")
- ✅ Subtle variant (data-variant="subtle")
- ✅ All variants comparison

### 4. Interactive States
- ✅ Default interactive state
- ✅ Hover state with transitions
- ✅ Focus state with indicators
- ✅ Active state during click

### 5. Icon Variations
- ✅ Default success icon
- ✅ Custom SVG icons
- ✅ Both left and right icons
- ✅ Icon size consistency

### 6. Enterprise Configuration
- ✅ Themed badges with context
- ✅ Runtime theme changes
- ✅ CSS custom properties

### 7. Figma Design Comparison
- ✅ Exact color specifications (#acf3e4, #056764)
- ✅ Spacing specifications (4px, 8px)
- ✅ Typography specs (12px SF Pro, 400 weight, 17px line-height)
- ✅ Icon dimensions (14x14px)
- ✅ Border radius (4px)

### 8. Accessibility Visual Validation
- ✅ Focus indicators
- ✅ High contrast mode
- ✅ Reduced motion preferences
- ✅ ARIA label visibility

### 9. Cross-browser Compatibility
- ✅ Mobile viewport (375x667)
- ✅ Tablet viewport (768x1024)
- ✅ Desktop viewport (1280x720)
- ✅ Chrome, Firefox, Safari

## 🎨 Figma Design Token Validation

### Color Specifications
```css
--slds-g-color-success-container-1: #acf3e4 (rgb(172, 243, 228))
--slds-g-color-on-success-1: #056764 (rgb(5, 103, 100))
```

### Spacing Specifications
```css
--slds-g-spacing-1: 4px (padding top/bottom, gap)
--slds-g-spacing-2: 8px (padding left/right)
--slds-g-radius-border-1: 4px (border radius)
```

### Typography Specifications
```css
font/family/base: SF Pro
font/scale/neg-1: 12px
font/weight/4: 400 (Regular)
Body/font-scale-neg-1/Regular: 17px line-height
```

### Icon Specifications
```css
Icon size: 14x14px (3.5 * 4px spacing unit)
Icon object-fit: contain
Icon object-position: center
```

## 📁 Test File Structure

```
tests/
├── badge-success-visual.spec.ts           # Main visual tests
├── badge-success-figma-comparison.spec.ts # Figma comparison
├── global-setup.ts                        # Environment setup
├── visual-regression.spec.ts              # Legacy tests
└── README.md                              # This file

test-results/
├── figma-results.json                     # Figma test results
└── [various screenshot files]

playwright-report/                         # Standard test reports
playwright-report-figma/                   # Figma-specific reports
```

## 🔧 Configuration Files

### Standard Testing
- `playwright.config.ts` - Standard visual regression config
- Threshold: 0.1% (0.001)
- Single browser: Chrome
- Port: 3001

### Figma Comparison Testing  
- `playwright-figma.config.ts` - Ultra-strict Figma comparison
- Threshold: 0.1% (0.001)
- Multi-browser: Chrome, Firefox, Safari
- Disabled animations for consistency
- Font rendering optimizations

## 🎪 Running Tests

### Development Workflow
```bash
# 1. Start dev server (automatically handled)
npm run dev

# 2. Run visual tests with UI
npm run test:visual:ui

# 3. Run specific badge tests
npm run test:badge

# 4. Update screenshots after changes
npm run test:badge:update
```

### CI/CD Workflow
```bash
# Run all tests
npm run test:all

# Figma comparison only
npm run test:figma

# Generate reports
npm run test:figma:ui
```

## 📸 Screenshot Management

### Updating Screenshots
```bash
# Update all badge screenshots
npm run test:badge:update

# Update Figma comparison screenshots
npm run test:figma:update
```

### Screenshot Naming Convention
```
badge-success-basic.png                    # Basic component
badge-success-small.png                    # Size variant
badge-success-strong.png                   # Visual variant
badge-success-hover.png                    # Interactive state
figma-exact-colors.png                     # Figma comparison
badge-success-enterprise.png               # Enterprise config
```

## 🚨 Troubleshooting

### Common Issues

1. **Screenshots Don't Match**
   - Check font loading: `await page.waitForFunction(() => document.fonts.ready)`
   - Disable animations: Global CSS injection
   - Ensure consistent viewport: 1280x720

2. **Figma Comparison Fails**
   - Verify design tokens are loaded
   - Check CSS custom properties
   - Validate color calculations (RGB vs Hex)

3. **Interactive States**
   - Allow transition time: `await page.waitForTimeout(200)`
   - Use proper selectors: `[data-interactive="true"]`
   - Handle hover/focus carefully

4. **Cross-browser Differences**
   - Font rendering variations
   - Subpixel differences
   - Use browser-specific thresholds

### Debug Commands
```bash
# Run with debug info
DEBUG=pw:api npm run test:badge

# Run single test
npm run test:badge -- --grep "basic badge"

# Run with headed browser
npm run test:badge -- --headed

# Generate trace
npm run test:badge -- --trace on
```

## 📈 Test Metrics

### Coverage Goals
- ✅ 100% Visual states covered
- ✅ 100% Size variants covered  
- ✅ 100% Interactive states covered
- ✅ 100% Figma design tokens validated
- ✅ 100% Accessibility features tested
- ✅ 100% Cross-browser compatibility

### Success Criteria
- All tests pass with 0.1% threshold
- Figma comparison within 0.1% accuracy
- No visual regressions introduced
- Consistent rendering across browsers
- Accessibility compliance maintained

## 🎊 Best Practices

1. **Consistent Environment**
   - Always run `global-setup.ts`
   - Use fixed viewport sizes
   - Disable animations for screenshots

2. **Reliable Selectors**
   - Use `data-testid` attributes
   - Leverage `data-slds-component` markers
   - Avoid fragile CSS selectors

3. **Screenshot Quality**
   - Wait for font loading
   - Allow transition completion
   - Use appropriate thresholds

4. **Figma Accuracy**
   - Validate computed styles
   - Check exact color values
   - Measure precise dimensions

5. **Maintenance**
   - Update screenshots after design changes
   - Review failed tests carefully
   - Document any threshold adjustments