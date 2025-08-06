/**
 * SLDS2 Badge Success Utilities
 * Helper functions for enterprise-grade badge functionality
 */

import { BadgeSuccessProps } from './types';

let badgeIdCounter = 0;

/**
 * Generates a unique ID for badge components
 * Ensures accessibility and testability requirements
 */
export const generateBadgeId = (): string => {
  badgeIdCounter += 1;
  return `slds-badge-success-${badgeIdCounter}-${Date.now()}`;
};

/**
 * Validates badge props in development mode
 * Provides helpful warnings for common misconfigurations
 */
export const validateProps = (props: BadgeSuccessProps): void => {
  const { children, leftIcon, rightIcon, interactive, onClick, 'aria-label': ariaLabel } = props;

  // Warn if no children provided
  if (!children) {
    console.warn('BadgeSuccess: No children provided. Badge will be empty.');
  }

  // Warn if interactive but no onClick handler
  if (interactive && !onClick) {
    console.warn('BadgeSuccess: Interactive badge should have an onClick handler.');
  }

  // Warn if interactive but no accessible label
  if (interactive && !ariaLabel && typeof children !== 'string') {
    console.warn('BadgeSuccess: Interactive badge with complex children should have an aria-label.');
  }

  // Warn about icon configuration
  if (leftIcon && typeof leftIcon === 'object' && !leftIcon.src) {
    console.warn('BadgeSuccess: Left icon object must have a src property.');
  }

  if (rightIcon && typeof rightIcon === 'object' && !rightIcon.src) {
    console.warn('BadgeSuccess: Right icon object must have a src property.');
  }

  // Warn about both icons being enabled
  if (leftIcon && rightIcon) {
    console.warn('BadgeSuccess: Using both left and right icons may impact readability.');
  }
};

/**
 * Sanitizes and validates CSS custom property values
 * Ensures safe runtime theming
 */
export const sanitizeCSSValue = (value: string): string => {
  // Remove potentially dangerous characters
  const sanitized = value.replace(/[<>'"]/g, '');
  
  // Validate CSS value format
  if (!/^[\w\s\-#(),.%]+$/.test(sanitized)) {
    console.warn(`BadgeSuccess: Invalid CSS value "${value}" sanitized to safe default.`);
    return 'inherit';
  }
  
  return sanitized;
};

/**
 * Builds CSS custom properties object for runtime theming
 * Integrates with SLDS2 design token system
 */
export const buildThemeCSS = (theme: Record<string, string>): React.CSSProperties => {
  const cssProps: React.CSSProperties = {};
  
  Object.entries(theme).forEach(([key, value]) => {
    // Convert camelCase to CSS custom property format
    const cssVar = `--slds-badge-success-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    cssProps[cssVar as any] = sanitizeCSSValue(value);
  });
  
  return cssProps;
};

/**
 * Debounces function calls for performance optimization
 * Useful for analytics tracking and event handling
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Creates a memoized event handler
 * Optimizes re-renders in complex component trees
 */
export const createMemoizedHandler = <T extends (...args: any[]) => any>(
  handler: T,
  deps: any[]
): T => {
  // Simple memoization based on dependency array
  let memoizedHandler: T;
  let lastDeps: any[];
  
  if (!lastDeps || !depsEqual(deps, lastDeps)) {
    memoizedHandler = handler;
    lastDeps = deps;
  }
  
  return memoizedHandler!;
};

/**
 * Compares dependency arrays for memoization
 */
const depsEqual = (deps1: any[], deps2: any[]): boolean => {
  if (deps1.length !== deps2.length) return false;
  return deps1.every((dep, index) => dep === deps2[index]);
};

/**
 * Extracts text content from React children
 * Useful for accessibility and analytics
 */
export const extractTextContent = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return children.toString();
  if (Array.isArray(children)) {
    return children.map(extractTextContent).join(' ');
  }
  if (React.isValidElement(children)) {
    return extractTextContent(children.props.children);
  }
  return '';
};

/**
 * Determines if reduced motion is preferred
 * Respects user accessibility preferences
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Announces changes to screen readers
 * Implements ARIA live region patterns
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  if (typeof document === 'undefined') return;
  
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.cssText = `
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;
  
  document.body.appendChild(announcement);
  announcement.textContent = message;
  
  // Clean up after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};