# 🌐 SLDS2 Component Generator & MCP Integration

A comprehensive React application showcasing **Lightning Design System 2 (SLDS2)** compliant component generation with Figma MCP integration, Playwright MCP testing, and real-time validation.

## ✨ Key Features

- **🎨 Figma MCP Integration**: Real-time component generation from Figma designs using Cursor MCP
- **🌐 SLDS2 Compliance**: Lightning Design System 2 compliant components with official styling hooks
- **🎭 Playwright MCP Testing**: Automated visual regression testing with browser automation
- **⚡ SLDS Linter Integration**: Real-time compliance validation and code quality checks
- **🔄 Live Generation**: Watch components being generated with realistic progress tracking
- **♿ Accessibility First**: WCAG 2.1 AA compliance built-in to all components

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (localhost:3000)
npm run dev

# Run visual regression tests
npm run test:visual

# Run Figma comparison tests
npm run test:figma

# View test reports
npx playwright show-report
```

Open [http://localhost:3000](http://localhost:3000) to explore the SLDS2 Component Generator.

## 🏗️ Project Architecture

```
vibe2hack/
├── src/
│   ├── App.tsx                           # Main application with tab navigation
│   ├── components/
│   │   ├── EnhancedComponentGenerator.tsx # SLDS2 component generation with metadata
│   │   ├── ComponentPreview.tsx          # Live component preview and code display
│   │   ├── PlaywrightMCPDemo.tsx         # Playwright MCP browser automation
│   │   ├── SLDSLinterDemo.tsx           # SLDS linter integration and results
│   │   ├── VisualTestRunner.tsx         # Visual regression test management
│   │   └── BadgeSuccess/                # Complete SLDS2 Badge component
│   │       ├── BadgeSuccess.tsx         # Main component with Figma integration
│   │       ├── BadgeSuccess.css         # SLDS2 styling hooks
│   │       ├── types.ts                 # TypeScript interfaces
│   │       ├── context.tsx              # React context for enterprise features
│   │       ├── hooks.ts                 # Custom hooks for theming & analytics
│   │       ├── utils.ts                 # Validation and helper functions
│   │       └── demo.tsx                 # Comprehensive demo examples
│   └── services/
│       ├── figmaToSldsMapper.ts         # Figma design token → SLDS2 mapping
│       ├── playwrightMCPService.ts      # Playwright MCP browser automation
│       └── slds2MetadataService.ts      # SLDS2 metadata API integration
├── tests/
│   ├── badge-success-visual.spec.ts    # Comprehensive visual regression tests
│   ├── badge-success-figma-comparison.spec.ts # Figma design accuracy tests
│   └── visual-regression.spec.ts       # Cross-browser visual testing
├── styles/
│   └── slds-tokens.css                  # SLDS2 design tokens and styling hooks
└── playwright.config.ts                # Playwright configuration for testing
```

## 🎯 Application Tabs

### 1. 🌐 SLDS2 Component Generator
- **Real-time generation**: Watch 60-second component generation process
- **Official metadata**: Integrates with SLDS2 Metadata API
- **Figma integration**: Extracts design tokens from selected Figma nodes
- **Progress tracking**: Live updates with realistic timing and phases

### 2. 🎨 SLDS2 Badge Success Demo
- **Comprehensive examples**: All variants, sizes, and states
- **Interactive features**: Click handlers, hover states, focus management
- **Accessibility showcase**: ARIA attributes, screen reader support
- **Enterprise configuration**: Context providers, analytics, theming

### 3. ⚡ SLDS Linter Integration
- **Real SARIF data**: Actual linting results from slds-linter
- **Compliance validation**: Official SLDS2 rule enforcement
- **Code quality metrics**: TypeScript compilation and testing results

### 4. 🎭 Playwright MCP Testing
- **Browser automation**: Real browser control via Playwright MCP
- **Visual regression**: Screenshot comparison with baseline images
- **Cross-browser testing**: Chrome, Firefox, Safari support
- **Test reporting**: Detailed results with diff visualization

## 🛠️ Technical Implementation

### SLDS2 Component Architecture
- **Styling Hooks**: CSS custom properties (`--slds-c-badge-*`, `--slds-g-*`)
- **Semantic HTML**: Proper ARIA roles and accessible structure
- **TypeScript**: Full type safety with enterprise-grade interfaces
- **Context API**: Provider pattern for enterprise configuration
- **Custom Hooks**: Theming, analytics, and accessibility features

### MCP Integration Points
1. **Figma MCP**: `@figma` commands for design token extraction
2. **Playwright MCP**: Browser automation and visual testing
3. **Real APIs**: SLDS2 Metadata API for official styling hooks

### Visual Testing Strategy
- **Pixel-perfect accuracy**: Strict comparison with Figma designs
- **Cross-browser validation**: Chromium, Firefox, WebKit
- **Responsive testing**: Multiple viewport sizes
- **Accessibility verification**: Color contrast, focus indicators

## 🌐 External Integrations

### SLDS2 Metadata API
```
https://design-systems-metadata-28384bb587d8.herokuapp.com/
```
- Official SLDS2 styling hooks and classes
- Real-time metadata synchronization
- Component semantic structure definitions

### Figma Asset Server
```
http://localhost:3845/assets/
```
- Design asset extraction from Figma
- SVG icon integration
- Fallback asset management

## 📋 Component Examples

### BadgeSuccess - SLDS2 Compliant
```typescript
// Basic usage with Figma integration
<BadgeSuccess leftIcon={true} size="medium">
  Success
</BadgeSuccess>

// Enterprise configuration
<BadgeSuccess 
  variant="strong"
  interactive={true}
  onClick={handleClick}
  aria-label="Task completed successfully"
  context={{
    theme: customTheme,
    hooks: { useAnalytics: trackEvent }
  }}
>
  Task Completed
</BadgeSuccess>
```

### Key SLDS2 Features
- **Global Styling Hooks**: `--slds-g-color-success-container-1: #acf3e4`
- **Component Hooks**: `--slds-c-badge-color-background`
- **Typography**: SF Pro with SLDS2 scale (`--slds-g-font-scale-neg-1`)
- **Spacing**: SLDS2 spacing tokens (`--slds-g-spacing-1`, `--slds-g-spacing-2`)

## 🧪 Testing & Quality

### Visual Regression Testing
```bash
# Run all visual tests
npm run test:visual

# Update baselines after design changes
npm run test:visual:update

# Figma accuracy testing
npm run test:figma
```

### SLDS Compliance
```bash
# Run SLDS linter
npm run lint:slds

# Generate compliance report
npm run slds:report
```

## 🎥 Demo Flow

1. **Component Generation** (60 seconds)
   - Extract Figma design tokens
   - Fetch SLDS2 metadata from official API
   - Generate TypeScript component code
   - Validate SLDS compliance
   - Compile and test

2. **Live Preview**
   - Interactive component rendering
   - Code display with syntax highlighting
   - SLDS2 compliance metrics

3. **Visual Testing**
   - Playwright browser automation
   - Screenshot comparison
   - Cross-browser validation

## 🚀 Future Enhancements

- **Real Cursor MCP Integration**: Direct integration with Cursor's MCP system
- **More Component Types**: Buttons, Alerts, Form components
- **Advanced Theming**: Runtime theme switching and customization
- **Analytics Dashboard**: Component usage and performance metrics
- **Design System Documentation**: Auto-generated component documentation

## 🤝 Contributing

This project demonstrates enterprise-grade SLDS2 component generation with MCP integration. Key areas for contribution:

1. **Expand component library** with more SLDS2 components
2. **Enhance MCP integrations** for deeper Figma and Playwright connectivity
3. **Improve visual testing** with more comprehensive test coverage
4. **Add accessibility features** for enhanced WCAG compliance

## 📞 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Playwright** for visual regression testing
- **SLDS2** Lightning Design System 2
- **Figma MCP** for design token extraction
- **Playwright MCP** for browser automation
- **SLDS Linter** for compliance validation

---

**🎉 Experience the future of design-to-code workflows with SLDS2 compliance and MCP integration!**