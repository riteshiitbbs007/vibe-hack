# 🎯 SLDS2 Component Demo

A focused React demo showcasing **Lightning Design System 2 (SLDS2)** compliant components with Figma integration and visual regression testing.

## ⚡ Lightning Design System 2 Features

- **Global Styling Hooks**: CSS custom properties for flexible theming
- **Semantic Structure**: WCAG 2.1 AA accessible components
- **Component Blueprints**: Framework-agnostic design patterns
- **Future-Ready**: Dark mode and agentic experience support

## 🎥 SLDS2 Demo Walkthrough

1. **Generate SLDS2 Component** → From Figma design with styling hooks
2. **Preview Live Component** → See SLDS2 structure and styling
3. **Run Visual Tests** → Verify pixel-perfect Figma accuracy
4. **Explore Styling Hooks** → Runtime theming and customization

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run SLDS2 visual tests
npm run test:figma
```

Open [http://localhost:3000](http://localhost:3000) to view the SLDS2 demo.

## 🏗️ Project Structure

```
src/
├── App.tsx                     # SLDS2 demo interface
├── components/
│   ├── ComponentGenerator.tsx  # SLDS2 component generator
│   ├── ComponentPreview.tsx    # Live SLDS2 preview
│   └── VisualTestRunner.tsx    # SLDS2 visual testing
└── main.tsx                    # React entry point

tests/
└── figma-comparison.spec.ts    # SLDS2 Playwright tests

components/
├── BadgeSuccess.tsx            # SLDS2 Badge Success component
├── BadgeSuccess.slds2.example.tsx # Comprehensive examples
└── styles/
    └── slds2-badge.css         # SLDS2 styling hooks
```

## ✨ SLDS2 Features

- **🎯 SLDS2 Compliant**: Lightning Design System 2 architecture
- **🎨 Styling Hooks**: CSS custom properties for theming
- **♿ Accessibility**: WCAG 2.1 AA compliance built-in
- **🌙 Dark Mode Ready**: Future-proof design system
- **🤖 Agentic Ready**: Modular for AI experiences

## 🛠️ Tech Stack

- **React 18** - UI framework with SLDS2 components
- **TypeScript** - Type safety with styling hook interfaces
- **Vite** - Build tool
- **SLDS2** - Lightning Design System 2
- **Playwright** - Visual regression testing

## 🧪 SLDS2 Visual Testing

Advanced visual testing for SLDS2 compliance:

1. **Component Accuracy**: Pixel-perfect Figma matching
2. **Styling Hooks**: CSS custom property validation
3. **Accessibility**: WCAG compliance verification
4. **Cross-Context**: Isolation and layout testing

### Running SLDS2 Tests

```bash
# Run SLDS2 visual tests
npm run test:figma

# Update baselines after changes
npm run test:figma:update

# View detailed test report
npx playwright show-report playwright-report-figma
```

## 🎯 SLDS2 Component Features

**BadgeSuccess** - Lightning Design System 2 compliant:

- **Global Styling Hooks**: `--slds-c-badge-*` CSS properties
- **Variant System**: base, inverse, lightest
- **Size System**: small, medium
- **Icon Management**: Left/right positioning
- **Accessibility**: Built-in ARIA attributes

## 📝 Usage

1. Select a component type or enter a custom prompt
2. Click "Generate" to create the component
3. View the live preview and generated code
4. Run visual tests to validate appearance
5. Accept changes or update baselines as needed

## 🔧 Configuration

- **Playwright Config**: `playwright.config.ts`
- **Tailwind Config**: `tailwind.config.js`
- **TypeScript**: `tsconfig.json`
- **Vite**: `vite.config.ts`

## 📸 Visual Test Examples

```typescript
test('BadgeSuccess visual test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'success badge' }).click();
  await expect(page.locator('[data-testid="generated-component"]'))
    .toHaveScreenshot('badge-success.png');
});
```

## 🤝 Contributing

This is a demo project. In a real implementation, you would:

1. Connect to actual Figma API
2. Implement real component generation
3. Add more component types
4. Enhance visual testing coverage

---

**Made with ❤️ for the Figma Component Demo**