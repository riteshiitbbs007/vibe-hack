/**
 * SLDS2 Badge Success Component
 * Enterprise-grade, framework-agnostic badge component
 * 
 * @version 2.0.0
 * @author SLDS2 Design System Team
 * @license MIT
 */

// Main component exports
export { default as BadgeSuccess, BadgeSuccessCore } from './BadgeSuccess';

// Type definitions
export type {
  BadgeSuccessProps,
  BadgeSuccessIcon,
  BadgeSuccessTheme,
  BadgeSuccessHooks,
  BadgeSuccessContext
} from './types';

// Context and providers
export {
  BadgeSuccessProvider,
  useBadgeSuccessContext,
  useBadgeSuccessTheme,
  withBadgeSuccessContext
} from './context';

// Hooks for advanced functionality
export {
  useBadgeInteraction,
  useBadgeTheme,
  useBadgeAnalytics,
  useBadgeAccessibility,
  useBadgeResponsive,
  useBadgeAnimation,
  useBadgeSuccess
} from './hooks';

// Utility functions
export {
  generateBadgeId,
  validateProps,
  sanitizeCSSValue,
  buildThemeCSS,
  debounce,
  extractTextContent,
  prefersReducedMotion,
  announceToScreenReader
} from './utils';

// CSS imports (ensure styles are loaded)
import './BadgeSuccess.css';