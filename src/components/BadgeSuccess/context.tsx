/**
 * SLDS2 Badge Success Context
 * Provides enterprise-grade configuration and theming support
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { BadgeSuccessContext } from './types';

// Create context with default values
const BadgeSuccessContextInstance = createContext<BadgeSuccessContext | null>(null);

/**
 * Badge Success Context Provider
 * Enables global configuration for badge components
 */
export interface BadgeSuccessProviderProps {
  children: ReactNode;
  value: BadgeSuccessContext;
}

export const BadgeSuccessProvider: React.FC<BadgeSuccessProviderProps> = ({ 
  children, 
  value 
}) => {
  return (
    <BadgeSuccessContextInstance.Provider value={value}>
      {children}
    </BadgeSuccessContextInstance.Provider>
  );
};

/**
 * Hook to access Badge Success context
 * Returns context value or null if used outside provider
 */
export const useBadgeSuccessContext = (): BadgeSuccessContext | null => {
  return useContext(BadgeSuccessContextInstance);
};

/**
 * Hook to access Badge Success theme
 * Merges context theme with default SLDS2 theme
 */
export const useBadgeSuccessTheme = () => {
  const context = useBadgeSuccessContext();
  
  // Default SLDS2 theme values
  const defaultTheme = {
    backgroundColor: 'var(--slds-g-color-success-container-1)',
    textColor: 'var(--slds-g-color-on-success-1)',
    borderRadius: 'var(--slds-g-radius-border-1)',
    padding: 'var(--slds-g-spacing-1) var(--slds-g-spacing-2)',
    gap: 'var(--slds-g-spacing-1)',
    fontFamily: 'var(--slds-font-family-base)',
    fontSize: 'var(--slds-font-scale-neg-1)',
    fontWeight: 'var(--slds-font-weight-4)',
    lineHeight: 'var(--slds-body-font-scale-neg-1-line-height)'
  };
  
  // Merge with context theme if available
  return context?.theme ? { ...defaultTheme, ...context.theme } : defaultTheme;
};

/**
 * Higher-order component for badge success context
 * Provides context to wrapped components
 */
export const withBadgeSuccessContext = <P extends object>(
  Component: React.ComponentType<P>,
  contextValue: BadgeSuccessContext
) => {
  const WrappedComponent = (props: P) => (
    <BadgeSuccessProvider value={contextValue}>
      <Component {...props} />
    </BadgeSuccessProvider>
  );
  
  WrappedComponent.displayName = `withBadgeSuccessContext(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};