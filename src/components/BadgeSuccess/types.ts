/**
 * SLDS2 Badge Success Component Types
 * Enterprise-grade TypeScript interfaces for Badge Success component
 */

export interface BadgeSuccessIcon {
  /** Icon source URL or data URI */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Icon size variant */
  size?: 'small' | 'medium' | 'large';
  /** Fallback icon source for error cases */
  fallbackSrc?: string;
}

/**
 * Figma Badge Success Props
 * Simplified interface that matches the Figma design specifications exactly
 */
export interface FigmaBadgeSuccessProps {
  /** Whether to show left icon (checkmark) */
  showLeftIcon?: boolean;
  /** Whether to show right icon */
  showRightIcon?: boolean;
  /** Badge text content */
  labelText?: string;
  /** Additional CSS class names */
  className?: string;
  /** Unique identifier */
  id?: string;
  /** Click handler */
  onClick?: () => void;
  /** Test identifier */
  'data-testid'?: string;
}

export interface BadgeSuccessProps {
  /** Badge text content */
  children: React.ReactNode;
  
  /** Unique identifier for the badge */
  id?: string;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Left icon configuration */
  leftIcon?: BadgeSuccessIcon | boolean;
  
  /** Right icon configuration */
  rightIcon?: BadgeSuccessIcon | boolean;
  
  /** Size variant of the badge */
  size?: 'small' | 'medium' | 'large';
  
  /** Visual variant for different success states */
  variant?: 'default' | 'strong' | 'subtle';
  
  /** Whether the badge is interactive (clickable) */
  interactive?: boolean;
  
  /** Click handler for interactive badges */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /** Custom ARIA label for accessibility */
  'aria-label'?: string;
  
  /** ARIA describedby for additional context */
  'aria-describedby'?: string;
  
  /** Whether the badge represents a live region for screen readers */
  'aria-live'?: 'polite' | 'assertive' | 'off';
  
  /** Role override for semantic meaning */
  role?: string;
  
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  
  /** Custom data attributes */
  [key: `data-${string}`]: string | number | boolean | undefined;
}

export interface BadgeSuccessTheme {
  /** Background color CSS custom property */
  backgroundColor?: string;
  
  /** Text color CSS custom property */
  textColor?: string;
  
  /** Border radius CSS custom property */
  borderRadius?: string;
  
  /** Padding CSS custom property */
  padding?: string;
  
  /** Gap between elements CSS custom property */
  gap?: string;
  
  /** Font family CSS custom property */
  fontFamily?: string;
  
  /** Font size CSS custom property */
  fontSize?: string;
  
  /** Font weight CSS custom property */
  fontWeight?: string;
  
  /** Line height CSS custom property */
  lineHeight?: string;
}

export interface BadgeSuccessHooks {
  /** Hook for customizing component behavior */
  useCustomBehavior?: () => void;
  
  /** Hook for analytics tracking */
  useAnalytics?: (event: string, data?: Record<string, unknown>) => void;
  
  /** Hook for theme customization */
  useTheme?: () => BadgeSuccessTheme;
}

export interface BadgeSuccessContext {
  /** Global theme configuration */
  theme?: BadgeSuccessTheme;
  
  /** Global hooks configuration */
  hooks?: BadgeSuccessHooks;
  
  /** Global accessibility configuration */
  a11y?: {
    announceChanges?: boolean;
    reducedMotion?: boolean;
  };
}