/**
 * SLDS2 Badge Success Hooks
 * Enterprise-grade React hooks for badge functionality and theming
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BadgeSuccessTheme, BadgeSuccessProps } from './types';
import { useBadgeSuccessContext, useBadgeSuccessTheme } from './context';
import { debounce, prefersReducedMotion, announceToScreenReader } from './utils';

/**
 * Hook for managing badge interaction state
 * Handles keyboard navigation, focus management, and click events
 */
export const useBadgeInteraction = (props: BadgeSuccessProps) => {
  const { interactive, onClick, 'aria-live': ariaLive } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const badgeRef = useRef<HTMLElement>(null);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsPressed(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    if (interactive) {
      setIsPressed(true);
    }
  }, [interactive]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (interactive && onClick) {
      onClick(event);
      
      // Announce action to screen readers if needed
      if (ariaLive !== 'off') {
        const badgeText = badgeRef.current?.textContent || 'Badge';
        announceToScreenReader(`${badgeText} activated`, ariaLive);
      }
    }
  }, [interactive, onClick, ariaLive]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (!interactive) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsPressed(true);
      handleClick(event as any);
    }
  }, [interactive, handleClick]);

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (!interactive) return;

    if (event.key === 'Enter' || event.key === ' ') {
      setIsPressed(false);
    }
  }, [interactive]);

  return {
    badgeRef,
    isFocused,
    isPressed,
    handlers: {
      onFocus: handleFocus,
      onBlur: handleBlur,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp
    }
  };
};

/**
 * Hook for managing badge theme and CSS custom properties
 * Integrates with SLDS2 design token system
 */
export const useBadgeTheme = (customTheme?: Partial<BadgeSuccessTheme>) => {
  const contextTheme = useBadgeSuccessTheme();
  
  const theme = useMemo(() => {
    return { ...contextTheme, ...customTheme };
  }, [contextTheme, customTheme]);

  const cssCustomProperties = useMemo(() => {
    const props: Record<string, string> = {};
    
    Object.entries(theme).forEach(([key, value]) => {
      if (value) {
        const cssVar = `--slds-badge-success-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        props[cssVar] = value;
      }
    });
    
    return props;
  }, [theme]);

  return {
    theme,
    cssCustomProperties
  };
};

/**
 * Hook for badge analytics and tracking
 * Provides debounced event tracking for performance
 */
export const useBadgeAnalytics = (
  badgeId: string,
  variant: string,
  size: string
) => {
  const context = useBadgeSuccessContext();
  
  const trackEvent = useCallback(
    debounce((eventName: string, data?: Record<string, unknown>) => {
      if (context?.hooks?.useAnalytics) {
        context.hooks.useAnalytics(eventName, {
          badgeId,
          variant,
          size,
          timestamp: Date.now(),
          ...data
        });
      }
    }, 100),
    [context, badgeId, variant, size]
  );

  const trackClick = useCallback(() => {
    trackEvent('badge_click');
  }, [trackEvent]);

  const trackView = useCallback(() => {
    trackEvent('badge_view');
  }, [trackEvent]);

  const trackFocus = useCallback(() => {
    trackEvent('badge_focus');
  }, [trackEvent]);

  return {
    trackClick,
    trackView,
    trackFocus,
    trackEvent
  };
};

/**
 * Hook for accessibility features
 * Manages ARIA attributes and screen reader announcements
 */
export const useBadgeAccessibility = (props: BadgeSuccessProps) => {
  const { children, 'aria-label': ariaLabel, interactive } = props;
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const announceTimeoutRef = useRef<NodeJS.Timeout>();

  // Generate accessible label if not provided
  const accessibleLabel = useMemo(() => {
    if (ariaLabel) return ariaLabel;
    
    const textContent = typeof children === 'string' ? children : 'Success badge';
    return interactive ? `Button: ${textContent}` : `Status: ${textContent}`;
  }, [ariaLabel, children, interactive]);

  // Announce changes to content for screen readers
  const announceChange = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announceTimeoutRef.current) {
      clearTimeout(announceTimeoutRef.current);
    }

    announceTimeoutRef.current = setTimeout(() => {
      announceToScreenReader(message, priority);
    }, 100);
  }, []);

  // Track focus for analytics and accessibility
  const handleFocus = useCallback(() => {
    if (!hasBeenFocused) {
      setHasBeenFocused(true);
    }
  }, [hasBeenFocused]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (announceTimeoutRef.current) {
        clearTimeout(announceTimeoutRef.current);
      }
    };
  }, []);

  return {
    accessibleLabel,
    announceChange,
    handleFocus,
    hasBeenFocused
  };
};

/**
 * Hook for responsive badge behavior
 * Adapts badge size and behavior based on viewport
 */
export const useBadgeResponsive = (baseSize: string = 'medium') => {
  const [viewportSize, setViewportSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      
      if (width < 576) {
        setViewportSize('small');
        setIsMobile(true);
      } else if (width < 992) {
        setViewportSize('medium');
        setIsMobile(false);
      } else {
        setViewportSize('large');
        setIsMobile(false);
      }
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const responsiveSize = useMemo(() => {
    // Adjust size based on viewport for better mobile experience
    if (isMobile && baseSize === 'large') return 'medium';
    if (isMobile && baseSize === 'medium') return 'small';
    return baseSize;
  }, [baseSize, isMobile]);

  return {
    viewportSize,
    isMobile,
    responsiveSize
  };
};

/**
 * Hook for badge animation and motion preferences
 * Respects user's reduced motion preferences
 */
export const useBadgeAnimation = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const updateMotionPreference = () => {
      setReducedMotion(prefersReducedMotion());
    };

    updateMotionPreference();
    
    // Listen for changes in motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', updateMotionPreference);
    
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  const animationProps = useMemo(() => ({
    style: {
      transition: reducedMotion ? 'none' : undefined
    }
  }), [reducedMotion]);

  return {
    reducedMotion,
    animationProps
  };
};

/**
 * Composite hook that combines all badge functionality
 * Main hook for the Badge Success component
 */
export const useBadgeSuccess = (props: BadgeSuccessProps) => {
  const interaction = useBadgeInteraction(props);
  const theme = useBadgeTheme();
  const analytics = useBadgeAnalytics(
    props.id || 'unknown',
    props.variant || 'default',
    props.size || 'medium'
  );
  const accessibility = useBadgeAccessibility(props);
  const responsive = useBadgeResponsive(props.size);
  const animation = useBadgeAnimation();

  // Track view when component mounts
  useEffect(() => {
    analytics.trackView();
  }, [analytics]);

  return {
    ...interaction,
    theme,
    analytics,
    accessibility,
    responsive,
    animation
  };
};