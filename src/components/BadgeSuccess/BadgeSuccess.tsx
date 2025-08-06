/**
 * SLDS2 Badge Success Component
 * Generated from Figma design with official SLDS2 styling hooks and metadata
 * Figma Node: ⚡ Badge - Success (ID: 12537_109385)
 * 
 * SLDS2 Design Tokens Applied:
 * - Background: --slds-g-color-success-container-1: #acf3e4
 * - Text Color: --slds-g-color-on-success-1: #056764
 * - Typography: SF Pro Regular 12px, line-height 17px
 * - Spacing: 4px gap, 8px horizontal padding, 4px vertical padding
 * - Border Radius: 4px
 * - Icon Size: 14px (3.5 spacing units)
 */

import React, { forwardRef, useMemo, useState } from 'react';
import { BadgeSuccessProps, BadgeSuccessContext, FigmaBadgeSuccessProps } from './types';
import { BadgeSuccessProvider, useBadgeSuccessContext } from './context';
import { generateBadgeId, validateProps } from './utils';
import './BadgeSuccess.css';

// Success icon from Figma design - localhost asset server
const FIGMA_SUCCESS_ICON = "http://localhost:3845/assets/b0e1da8e1a9e44bb965f5f8db7877f519b3431a2.svg";

// Fallback success icon SVG for when Figma assets aren't available
const FALLBACK_SUCCESS_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M13 3.5L5.5 11L1 6.5L2.5 5L5.5 8L11.5 2L13 3.5Z' fill='currentColor'/%3E%3C/svg%3E";

/**
 * Core Badge Success Component
 * Implements SLDS2 styling hooks architecture with Figma design specifications
 * 
 * Design Tokens from Figma:
 * - Background: --slds-g-color-success-container-1: #acf3e4
 * - Text Color: --slds-g-color-on-success-1: #056764
 * - Font: SF Pro Regular 12px (font/scale/neg-1)
 * - Spacing: --slds-g-spacing-1: 4px, --slds-g-spacing-2: 8px
 * - Border Radius: --slds-g-radius-border-1: 4px
 */
const BadgeSuccessCore = forwardRef<HTMLElement, BadgeSuccessProps>(
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
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') {
      validateProps(props);
    }

    // Generate unique ID if not provided
    const badgeId = useMemo(() => id || generateBadgeId(), [id]);

    // Determine component element type
    const Component = interactive ? 'button' : 'span';

    // Build CSS classes with SLDS2 BEM methodology based on Figma design
    const cssClasses = useMemo(() => {
      const baseClass = 'slds-badge-success';
      const classes = [baseClass];
      
      // Size modifier (from Figma: default is scale/neg-1 = 12px)
      if (size !== 'medium') {
        classes.push(`${baseClass}--${size}`);
      }
      
      // Variant modifier (Figma design shows success container variant)
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

    // Prepare icon configuration with Figma asset
    const leftIconConfig = useMemo(() => {
      if (!leftIcon) return null;
      if (typeof leftIcon === 'boolean') {
        return { 
          src: FIGMA_SUCCESS_ICON, 
          fallbackSrc: FALLBACK_SUCCESS_ICON,
          alt: 'Success', 
          size 
        };
      }
      return { 
        size, 
        fallbackSrc: FALLBACK_SUCCESS_ICON,
        ...leftIcon 
      };
    }, [leftIcon, size]);

    const rightIconConfig = useMemo(() => {
      if (!rightIcon) return null;
      if (typeof rightIcon === 'boolean') {
        return { 
          src: FIGMA_SUCCESS_ICON, 
          fallbackSrc: FALLBACK_SUCCESS_ICON,
          alt: 'Success', 
          size 
        };
      }
      return { 
        size, 
        fallbackSrc: FALLBACK_SUCCESS_ICON,
        ...rightIcon 
      };
    }, [rightIcon, size]);

    // Handle click events with analytics tracking
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (interactive && onClick) {
        // Track analytics if hook is available
        context?.hooks?.useAnalytics?.('badge_click', {
          id: badgeId,
          variant,
          size,
          design_source: 'figma',
          figma_node_id: '12537_109385',
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

    // Icon component with fallback support
    const IconComponent = ({ config, position }: { config: any; position: 'left' | 'right' }) => {
      const [iconSrc, setIconSrc] = React.useState(config.src);
      
      const handleImageError = () => {
        if (config.fallbackSrc && iconSrc !== config.fallbackSrc) {
          setIconSrc(config.fallbackSrc);
        }
      };

      return (
        <span 
          className={`slds-badge-success__icon slds-badge-success__icon--${position}`}
          aria-hidden="true"
          data-testid={`badge-${position}-icon`}
        >
          <img
            src={iconSrc}
            alt={config.alt}
            className={`slds-badge-success__icon-image slds-badge-success__icon-image--${config.size}`}
            onError={handleImageError}
            draggable={false}
            style={{
              // SLDS2 sizing based on Figma design (14px = 3.5 * 4px)
              width: 'var(--slds-g-sizing-3-5, 14px)',
              height: 'var(--slds-g-sizing-3-5, 14px)'
            }}
          />
        </span>
      );
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
        data-figma-node="12537_109385"
        data-figma-name="⚡ Badge - Success"
        data-variant={variant}
        data-size={size}
        data-interactive={interactive}
        style={{
          // SLDS2 styling hooks from Figma design
          '--badge-success-bg': 'var(--slds-g-color-success-container-1, #acf3e4)',
          '--badge-success-text': 'var(--slds-g-color-on-success-1, #056764)',
          '--badge-success-font-size': 'var(--slds-g-font-scale-neg-1, 12px)',
          '--badge-success-font-family': 'var(--slds-g-font-family-base, "SF Pro", sans-serif)',
          '--badge-success-font-weight': 'var(--slds-g-font-weight-4, 400)',
          '--badge-success-line-height': 'var(--slds-g-body-font-scale-neg-1-line-height, 17px)',
          '--badge-success-padding-x': 'var(--slds-g-spacing-2, 8px)',
          '--badge-success-padding-y': 'var(--slds-g-spacing-1, 4px)',
          '--badge-success-gap': 'var(--slds-g-spacing-1, 4px)',
          '--badge-success-border-radius': 'var(--slds-g-radius-border-1, 4px)'
        } as React.CSSProperties}
      >
        {/* Left Icon from Figma Design */}
        {leftIconConfig && <IconComponent config={leftIconConfig} position="left" />}

        {/* Badge Text with SLDS2 Typography */}
        <span 
          className="slds-badge-success__text"
          data-testid="badge-text"
          style={{
            fontFamily: 'var(--badge-success-font-family)',
            fontSize: 'var(--badge-success-font-size)',
            fontWeight: 'var(--badge-success-font-weight)',
            lineHeight: 'var(--badge-success-line-height)',
            color: 'var(--badge-success-text)'
          }}
        >
          {children || 'Success'}
        </span>

        {/* Right Icon from Figma Design */}
        {rightIconConfig && <IconComponent config={rightIconConfig} position="right" />}
      </Component>
    );
  }
);

BadgeSuccessCore.displayName = 'BadgeSuccessCore';

/**
 * Badge Success Component with Provider
 * Wrapped with context provider for enterprise-grade configuration
 * Updated with Figma design specifications and SLDS2 metadata integration
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

/**
 * Direct Figma Implementation - SLDS2 Compliant Badge Success
 * This component exactly matches the Figma design output while following SLDS2 patterns
 * 
 * Generated from Figma with these specifications:
 * - Container: flex row, gap-1 (4px), padding 8px/4px, rounded corners
 * - Icon: 14px success checkmark from Figma assets
 * - Text: SF Pro Regular 12px, color #056764, line-height 17px
 * - Background: #acf3e4 (success container color)
 */
const FigmaBadgeSuccessComponent = forwardRef<HTMLDivElement, FigmaBadgeSuccessProps>(
  ({
    showLeftIcon = true,
    showRightIcon = false,
    labelText = "Success",
    className = "",
    id,
    onClick,
    'data-testid': dataTestId,
    ...props
  }, ref) => {
    const [iconSrc, setIconSrc] = useState(FIGMA_SUCCESS_ICON);

    const handleImageError = () => {
      if (iconSrc !== FALLBACK_SUCCESS_ICON) {
        setIconSrc(FALLBACK_SUCCESS_ICON);
      }
    };

    // SLDS2 compliant styling that matches exact Figma output
    const containerStyle: React.CSSProperties = {
      // Layout from Figma: flex row with specific spacing
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 'var(--slds-g-spacing-1, 4px)',
      
      // Spacing from Figma design tokens
      paddingLeft: 'var(--slds-g-spacing-2, 8px)',
      paddingRight: 'var(--slds-g-spacing-2, 8px)',
      paddingTop: 'var(--slds-g-spacing-1, 4px)',
      paddingBottom: 'var(--slds-g-spacing-1, 4px)',
      
      // Visual styling from SLDS2 tokens
      backgroundColor: 'var(--slds-g-color-success-container-1, #acf3e4)',
      borderRadius: 'var(--slds-g-radius-border-1, 4px)',
      
      // Box model
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
      
      // Responsive sizing
      width: 'fit-content',
      height: 'fit-content'
    };

    const textStyle: React.CSSProperties = {
      // Typography from Figma design tokens
      fontFamily: 'var(--slds-font-family-base, "SF Pro", sans-serif)',
      fontSize: 'var(--slds-font-scale-neg-1, 12px)',
      fontWeight: 'var(--slds-font-weight-4, 400)',
      lineHeight: 'var(--slds-body-font-scale-neg-1-line-height, 17px)',
      color: 'var(--slds-g-color-on-success-1, #056764)',
      
      // Text behavior
      whiteSpace: 'nowrap',
      textAlign: 'left',
      fontStyle: 'normal',
      margin: 0,
      padding: 0,
      flexShrink: 0
    };

    const iconStyle: React.CSSProperties = {
      // Icon sizing from Figma (14px = 3.5 spacing units)
      width: '14px',
      height: '14px',
      flexShrink: 0,
      display: 'block',
      maxWidth: 'none'
    };

    return (
      <div
        ref={ref}
        id={id}
        className={`slds-badge-success ${className}`.trim()}
        style={containerStyle}
        onClick={onClick}
        data-slds-component="badge-success"
        data-slds-version="2.0"
        data-figma-node="12537_109385"
        data-figma-name="⚡ Badge - Success"
        data-testid={dataTestId || "figma-badge-success"}
        role={onClick ? "button" : "status"}
        tabIndex={onClick ? 0 : undefined}
        {...props}
      >
        {/* Left Icon - Exact Figma Implementation */}
        {showLeftIcon && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 'var(--slds-g-spacing-1, 4px)',
              padding: 0,
              position: 'relative',
              flexShrink: 0
            }}
            data-name="Left icon"
            data-testid="badge-left-icon-container"
          >
            <div
              style={{
                position: 'relative',
                flexShrink: 0,
                width: '14px',
                height: '14px'
              }}
              data-name="Utility Icons / S / success"
              data-testid="badge-icon-wrapper"
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '3.846%' // Figma design specific positioning
                }}
                data-name="Icon"
              >
                <img
                  alt=""
                  src={iconSrc}
                  style={iconStyle}
                  onError={handleImageError}
                  draggable={false}
                  data-testid="badge-success-icon"
                />
              </div>
            </div>
          </div>
        )}

        {/* Badge Text - Exact Figma Typography */}
        <div
          style={textStyle}
          data-testid="badge-text"
        >
          <p
            style={{
              display: 'block',
              lineHeight: 'var(--slds-body-font-scale-neg-1-line-height, 17px)',
              whiteSpace: 'pre',
              margin: 0,
              padding: 0
            }}
          >
            {labelText}
          </p>
        </div>

        {/* Right Icon - Same implementation as left */}
        {showRightIcon && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 'var(--slds-g-spacing-1, 4px)',
              padding: 0,
              position: 'relative',
              flexShrink: 0
            }}
            data-name="Right icon"
            data-testid="badge-right-icon-container"
          >
            <div
              style={{
                position: 'relative',
                flexShrink: 0,
                width: '14px',
                height: '14px'
              }}
              data-name="Utility Icons / S / success"
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '3.846%'
                }}
                data-name="Icon"
              >
                <img
                  alt=""
                  src={iconSrc}
                  style={iconStyle}
                  onError={handleImageError}
                  draggable={false}
                  data-testid="badge-success-right-icon"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

FigmaBadgeSuccessComponent.displayName = 'FigmaBadgeSuccess';

// Export the Figma component with proper name
export const FigmaBadgeSuccess = FigmaBadgeSuccessComponent;

// Export the enhanced badge as the default
export { BadgeSuccessCore };
export default BadgeSuccess;