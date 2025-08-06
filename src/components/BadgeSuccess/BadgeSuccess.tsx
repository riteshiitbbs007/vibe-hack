/**
 * SLDS2 Badge Success Component
 * Enterprise-grade, framework-agnostic badge component with Lightning Design System 2 compliance
 */

import React, { forwardRef, useMemo } from 'react';
import { BadgeSuccessProps, BadgeSuccessContext } from './types';
import { BadgeSuccessProvider, useBadgeSuccessContext } from './context';
import { generateBadgeId, validateProps } from './utils';
import './BadgeSuccess.css';

// Default success icon SVG
const DEFAULT_SUCCESS_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M13 3.5L5.5 11L1 6.5L2.5 5L5.5 8L11.5 2L13 3.5Z' fill='currentColor'/%3E%3C/svg%3E";

/**
 * Core Badge Success Component
 * Implements SLDS2 styling hooks architecture with semantic HTML and ARIA compliance
 */
export const BadgeSuccessCore = forwardRef<HTMLElement, BadgeSuccessProps>(
  (props, ref) => {
    const {
      children,
      id,
      className = '',
      leftIcon = true,
      rightIcon = false,
      size = 'medium',
      variant = 'default',
      interactive = false,
      onClick,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-live': ariaLive = 'polite',
      role,
      tabIndex,
      ...restProps
    } = props;

    // Get context values
    const context = useBadgeSuccessContext();
    
    // Validate props in development
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      validateProps(props);
    }

    // Generate unique ID if not provided
    const badgeId = useMemo(() => id || generateBadgeId(), [id]);

    // Determine component element type
    const Component = interactive ? 'button' : 'span';

    // Build CSS classes with SLDS2 BEM methodology
    const cssClasses = useMemo(() => {
      const baseClass = 'slds-badge-success';
      const classes = [baseClass];
      
      // Size modifier
      if (size !== 'medium') {
        classes.push(`${baseClass}--${size}`);
      }
      
      // Variant modifier
      if (variant !== 'default') {
        classes.push(`${baseClass}--${variant}`);
      }
      
      // Interactive state
      if (interactive) {
        classes.push(`${baseClass}--interactive`);
      }
      
      // Custom classes
      if (className) {
        classes.push(className);
      }
      
      return classes.join(' ');
    }, [size, variant, interactive, className]);

    // Prepare icon configuration
    const leftIconConfig = useMemo(() => {
      if (!leftIcon) return null;
      if (typeof leftIcon === 'boolean') {
        return { src: DEFAULT_SUCCESS_ICON, alt: 'Success', size };
      }
      return { size, ...leftIcon };
    }, [leftIcon, size]);

    const rightIconConfig = useMemo(() => {
      if (!rightIcon) return null;
      if (typeof rightIcon === 'boolean') {
        return { src: DEFAULT_SUCCESS_ICON, alt: 'Success', size };
      }
      return { size, ...rightIcon };
    }, [rightIcon, size]);

    // Handle click events
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (interactive && onClick) {
        // Track analytics if hook is available
        context?.hooks?.useAnalytics?.('badge_click', {
          id: badgeId,
          variant,
          size,
          text: typeof children === 'string' ? children : 'complex_content'
        });
        
        onClick(event);
      }
    };

    // Handle keyboard events for accessibility
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (interactive && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        handleClick(event as any);
      }
    };

    // Prepare ARIA attributes
    const ariaAttributes = {
      'aria-label': ariaLabel || (typeof children === 'string' ? `Success: ${children}` : 'Success badge'),
      'aria-describedby': ariaDescribedBy,
      'aria-live': ariaLive,
      role: role || (interactive ? 'button' : 'status'),
      tabIndex: interactive ? (tabIndex ?? 0) : tabIndex
    };

    return (
      <Component
        ref={ref as any}
        id={badgeId}
        className={cssClasses}
        onClick={interactive ? handleClick : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...ariaAttributes}
        {...restProps}
        data-slds-component="badge-success"
        data-slds-version="2.0"
        data-variant={variant}
        data-size={size}
        data-interactive={interactive}
      >
        {/* Left Icon */}
        {leftIconConfig && (
          <span 
            className="slds-badge-success__icon slds-badge-success__icon--left"
            aria-hidden="true"
            data-testid="badge-left-icon"
          >
            <img
              src={leftIconConfig.src}
              alt={leftIconConfig.alt}
              className={`slds-badge-success__icon-image slds-badge-success__icon-image--${leftIconConfig.size}`}
              draggable={false}
            />
          </span>
        )}

        {/* Badge Text */}
        <span 
          className="slds-badge-success__text"
          data-testid="badge-text"
        >
          {children}
        </span>

        {/* Right Icon */}
        {rightIconConfig && (
          <span 
            className="slds-badge-success__icon slds-badge-success__icon--right"
            aria-hidden="true"
            data-testid="badge-right-icon"
          >
            <img
              src={rightIconConfig.src}
              alt={rightIconConfig.alt}
              className={`slds-badge-success__icon-image slds-badge-success__icon-image--${rightIconConfig.size}`}
              draggable={false}
            />
          </span>
        )}
      </Component>
    );
  }
);

BadgeSuccessCore.displayName = 'BadgeSuccessCore';

/**
 * Badge Success Component with Provider
 * Wrapped with context provider for enterprise-grade configuration
 */
export const BadgeSuccess = forwardRef<HTMLElement, BadgeSuccessProps & { context?: BadgeSuccessContext }>(
  ({ context, ...props }, ref) => {
    if (context) {
      return (
        <BadgeSuccessProvider value={context}>
          <BadgeSuccessCore ref={ref} {...props} />
        </BadgeSuccessProvider>
      );
    }
    
    return <BadgeSuccessCore ref={ref} {...props} />;
  }
);

BadgeSuccess.displayName = 'BadgeSuccess';

export default BadgeSuccess;