# SLDS2 Badge Success Component

Enterprise-grade, framework-agnostic badge component with Lightning Design System 2 compliance.

## Overview

The Badge Success component is a production-ready, accessible badge that follows SLDS2 design principles. It features comprehensive TypeScript support, runtime theming capabilities, and enterprise-grade architecture.

## Features

- ✅ **SLDS2 Compliant**: Full Lightning Design System 2 styling hooks architecture
- ✅ **Accessible**: WCAG 2.1 AA compliant with comprehensive ARIA support
- ✅ **TypeScript**: Complete type safety with comprehensive interfaces
- ✅ **Themeable**: Runtime theming with CSS custom properties
- ✅ **Enterprise-Ready**: Context providers, hooks architecture, and analytics support
- ✅ **Framework-Agnostic**: Works with any React-based framework
- ✅ **Performance Optimized**: Memoized components and debounced events
- ✅ **Responsive**: Adaptive sizing and mobile-optimized

## Installation

```bash
# Copy the BadgeSuccess directory to your components folder
cp -r src/components/BadgeSuccess your-project/src/components/
```

## Basic Usage

```tsx
import { BadgeSuccess } from './components/BadgeSuccess';

// Simple success badge
<BadgeSuccess>Success</BadgeSuccess>

// With custom icon
<BadgeSuccess leftIcon={{ src: '/icons/check.svg', alt: 'Check' }}>
  Task Completed
</BadgeSuccess>

// Interactive badge
<BadgeSuccess 
  interactive 
  onClick={() => console.log('Badge clicked')}
>
  Click me
</BadgeSuccess>
```

## Advanced Usage

### Size Variants

```tsx
<BadgeSuccess size="small">Small Badge</BadgeSuccess>
<BadgeSuccess size="medium">Medium Badge</BadgeSuccess>
<BadgeSuccess size="large">Large Badge</BadgeSuccess>
```

### Visual Variants

```tsx
<BadgeSuccess variant="default">Default</BadgeSuccess>
<BadgeSuccess variant="strong">Strong</BadgeSuccess>
<BadgeSuccess variant="subtle">Subtle</BadgeSuccess>
```

### With Icons

```tsx
// Default success icon
<BadgeSuccess leftIcon>Success</BadgeSuccess>

// Custom icon
<BadgeSuccess 
  leftIcon={{ 
    src: '/icons/custom.svg', 
    alt: 'Custom icon',
    size: 'medium'
  }}
>
  Custom Success
</BadgeSuccess>

// Both icons
<BadgeSuccess 
  leftIcon 
  rightIcon={{ src: '/icons/arrow.svg', alt: 'Arrow' }}
>
  Navigate
</BadgeSuccess>
```

### Enterprise Configuration

```tsx
import { BadgeSuccessProvider, BadgeSuccess } from './components/BadgeSuccess';

const enterpriseConfig = {
  theme: {
    backgroundColor: '#custom-green',
    textColor: '#custom-dark-green'
  },
  hooks: {
    useAnalytics: (event, data) => {
      // Your analytics implementation
      analytics.track(event, data);
    }
  },
  a11y: {
    announceChanges: true,
    reducedMotion: false
  }
};

<BadgeSuccessProvider value={enterpriseConfig}>
  <BadgeSuccess>Enterprise Badge</BadgeSuccess>
</BadgeSuccessProvider>
```

## API Reference

### BadgeSuccessProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Badge content (required) |
| `id` | `string` | auto-generated | Unique identifier |
| `className` | `string` | `''` | Additional CSS classes |
| `leftIcon` | `BadgeSuccessIcon \| boolean` | `false` | Left icon configuration |
| `rightIcon` | `BadgeSuccessIcon \| boolean` | `false` | Right icon configuration |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size variant |
| `variant` | `'default' \| 'strong' \| 'subtle'` | `'default'` | Visual variant |
| `interactive` | `boolean` | `false` | Whether badge is clickable |
| `onClick` | `(event) => void` | - | Click handler |
| `aria-label` | `string` | auto-generated | Accessibility label |
| `aria-live` | `'polite' \| 'assertive' \| 'off'` | `'polite'` | Screen reader announcements |

### BadgeSuccessIcon

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Icon source URL (required) |
| `alt` | `string` | - | Alternative text (required) |
| `size` | `'small' \| 'medium' \| 'large'` | inherited | Icon size |

## Theming

### CSS Custom Properties

The component uses CSS custom properties for runtime theming:

```css
:root {
  /* Background colors */
  --slds-badge-success-background-color: #acf3e4;
  --slds-badge-success-hover-background: #9be8d8;
  
  /* Text colors */
  --slds-badge-success-text-color: #056764;
  
  /* Layout */
  --slds-badge-success-padding: 4px 8px;
  --slds-badge-success-border-radius: 4px;
  --slds-badge-success-gap: 4px;
  
  /* Typography */
  --slds-badge-success-font-family: 'SF Pro', sans-serif;
  --slds-badge-success-font-size: 12px;
  --slds-badge-success-font-weight: 400;
  --slds-badge-success-line-height: 17px;
}
```

### Runtime Theming

```tsx
const customTheme = {
  backgroundColor: '#e8f5e8',
  textColor: '#2e7d32',
  borderRadius: '8px'
};

<BadgeSuccess context={{ theme: customTheme }}>
  Themed Badge
</BadgeSuccess>
```

## Accessibility

### ARIA Support

- Automatic `role` assignment (`status` for static, `button` for interactive)
- Comprehensive `aria-label` generation
- Screen reader announcements with `aria-live`
- Keyboard navigation support
- Focus management

### Keyboard Navigation

- `Enter` and `Space` activate interactive badges
- Focus indicators follow SLDS2 design guidelines
- Tab order integration

### Reduced Motion

Respects `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  .slds-badge-success {
    transition: none;
  }
}
```

## Hooks

### useBadgeSuccess

Main hook that combines all functionality:

```tsx
import { useBadgeSuccess } from './components/BadgeSuccess';

const MyBadge = (props) => {
  const {
    badgeRef,
    handlers,
    theme,
    analytics
  } = useBadgeSuccess(props);
  
  return (
    <span ref={badgeRef} {...handlers}>
      {props.children}
    </span>
  );
};
```

### Individual Hooks

- `useBadgeInteraction` - Click and keyboard handling
- `useBadgeTheme` - Theme management
- `useBadgeAnalytics` - Event tracking
- `useBadgeAccessibility` - A11y features
- `useBadgeResponsive` - Responsive behavior
- `useBadgeAnimation` - Motion preferences

## Testing

### Test IDs

The component provides data attributes for testing:

```tsx
// Component automatically includes:
data-testid="badge-text"
data-testid="badge-left-icon"
data-testid="badge-right-icon"
data-slds-component="badge-success"
data-variant="default"
data-size="medium"
data-interactive="false"
```

### Usage in Tests

```tsx
import { render, screen } from '@testing-library/react';
import { BadgeSuccess } from './BadgeSuccess';

test('renders badge with text', () => {
  render(<BadgeSuccess>Success</BadgeSuccess>);
  expect(screen.getByTestId('badge-text')).toHaveTextContent('Success');
});

test('handles click events', () => {
  const handleClick = jest.fn();
  render(
    <BadgeSuccess interactive onClick={handleClick}>
      Click me
    </BadgeSuccess>
  );
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance

- Tree-shakeable exports
- Memoized components
- Debounced event handlers
- Optimized re-renders
- CSS custom properties for runtime theming

## Contributing

1. Follow SLDS2 design guidelines
2. Maintain TypeScript strict mode
3. Include comprehensive tests
4. Update documentation
5. Ensure accessibility compliance

## License

MIT License - see LICENSE file for details.

## Changelog

### 2.0.0
- Initial SLDS2 compliant implementation
- Enterprise-grade architecture
- Comprehensive accessibility support
- Runtime theming capabilities
- Framework-agnostic design