/**
 * SLDS2 Badge Success Component Demo
 * Live demonstration of the enterprise-grade badge component
 */

import React, { useState } from 'react';
import { BadgeSuccess, BadgeSuccessProvider } from './index';

export const BadgeSuccessDemo = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Enterprise configuration
  const enterpriseConfig = {
    theme: {
      backgroundColor: 'var(--slds-g-color-success-container-1)',
      textColor: 'var(--slds-g-color-on-success-1)',
      borderRadius: 'var(--slds-g-radius-border-1)',
    },
    hooks: {
      useAnalytics: (event: string, data?: Record<string, unknown>) => {
        console.log('📊 Analytics Event:', event, data);
      }
    },
    a11y: {
      announceChanges: true,
      reducedMotion: false
    }
  };

  const handleBadgeClick = () => {
    setClickCount(prev => prev + 1);
  };

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SLDS2 Badge Success Component
          </h1>
          <p className="text-lg text-gray-600">
            Enterprise-grade, framework-agnostic badge with Lightning Design System 2 compliance
          </p>
        </header>

        {/* Basic Examples */}
        <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Basic Usage</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <BadgeSuccess>Success</BadgeSuccess>
            <BadgeSuccess leftIcon>Task Completed</BadgeSuccess>
            <BadgeSuccess leftIcon size="small">Small</BadgeSuccess>
            <BadgeSuccess leftIcon size="large">Large</BadgeSuccess>
          </div>
        </section>

        {/* Variants */}
        <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Visual Variants</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <BadgeSuccess variant="default" leftIcon>Default</BadgeSuccess>
            <BadgeSuccess variant="strong" leftIcon>Strong</BadgeSuccess>
            <BadgeSuccess variant="subtle" leftIcon>Subtle</BadgeSuccess>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Interactive Features</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <BadgeSuccess 
                interactive 
                onClick={handleBadgeClick}
                leftIcon
              >
                Click me ({clickCount})
              </BadgeSuccess>
              
              <BadgeSuccess 
                interactive 
                onClick={toggleVisibility}
                aria-label="Toggle visibility demo"
              >
                Toggle Demo
              </BadgeSuccess>
              
              {isVisible && (
                <BadgeSuccess 
                  variant="strong"
                  leftIcon
                  aria-live="polite"
                >
                  Visible Badge
                </BadgeSuccess>
              )}
            </div>
            
            <p className="text-sm text-gray-600">
              Try clicking the badges above. The first one tracks clicks, 
              the second toggles the visibility of another badge.
            </p>
          </div>
        </section>

        {/* Custom Icons */}
        <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Custom Icons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <BadgeSuccess 
              leftIcon={{
                src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E",
                alt: "Check circle",
                size: "medium"
              }}
            >
              Custom Check
            </BadgeSuccess>
            
            <BadgeSuccess 
              leftIcon
              rightIcon={{
                src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6z'/%3E%3C/svg%3E",
                alt: "Arrow right",
                size: "small"
              }}
            >
              Both Icons
            </BadgeSuccess>
          </div>
        </section>

        {/* Enterprise Configuration */}
        <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Enterprise Configuration</h2>
          <BadgeSuccessProvider value={enterpriseConfig}>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 items-center">
                <BadgeSuccess>Configured Theme</BadgeSuccess>
                
                <BadgeSuccess 
                  interactive 
                  onClick={() => console.log('Enterprise click tracked')}
                  leftIcon
                >
                  With Analytics
                </BadgeSuccess>
                
                <BadgeSuccess 
                  variant="strong"
                  size="large"
                  leftIcon
                >
                  Enterprise Success
                </BadgeSuccess>
              </div>
              
              <p className="text-sm text-gray-600">
                These badges use enterprise configuration with custom theming and analytics tracking.
                Check the browser console to see analytics events.
              </p>
            </div>
          </BadgeSuccessProvider>
        </section>

        {/* Accessibility Features */}
        <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <BadgeSuccess 
                aria-label="Task completed successfully with high priority"
                aria-live="assertive"
                leftIcon
              >
                High Priority
              </BadgeSuccess>
              
              <BadgeSuccess 
                interactive
                onClick={() => alert('Accessible click!')}
                tabIndex={0}
                aria-label="Click to view task details"
                leftIcon
              >
                View Details
              </BadgeSuccess>
              
              <BadgeSuccess 
                role="status"
                aria-describedby="processing-description"
                leftIcon
              >
                Processing Done
              </BadgeSuccess>
            </div>
            
            <div id="processing-description" className="text-sm text-gray-600">
              The data processing task has completed successfully without errors.
            </div>
            
            <div className="p-4 bg-blue-50 rounded">
              <h3 className="font-medium text-blue-900 mb-2">Accessibility Features:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Full keyboard navigation (Tab, Enter, Space)</li>
                <li>• Screen reader announcements with aria-live</li>
                <li>• Automatic ARIA label generation</li>
                <li>• Focus management and visual indicators</li>
                <li>• Respects prefers-reduced-motion</li>
                <li>• High contrast mode support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Real-world Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Status Dashboard */}
            <div className="p-4 border rounded">
              <h3 className="font-medium mb-3">Status Dashboard</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Database Connection</span>
                  <BadgeSuccess leftIcon size="small">Connected</BadgeSuccess>
                </div>
                <div className="flex justify-between items-center">
                  <span>API Health</span>
                  <BadgeSuccess leftIcon size="small">Healthy</BadgeSuccess>
                </div>
                <div className="flex justify-between items-center">
                  <span>Backup Status</span>
                  <BadgeSuccess leftIcon size="small">Complete</BadgeSuccess>
                </div>
              </div>
            </div>

            {/* Task Management */}
            <div className="p-4 border rounded">
              <h3 className="font-medium mb-3">Task Management</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Setup Environment</span>
                  <BadgeSuccess 
                    interactive
                    onClick={() => alert('Task details')}
                    leftIcon 
                    size="small"
                  >
                    Done
                  </BadgeSuccess>
                </div>
                <div className="flex justify-between items-center">
                  <span>Run Tests</span>
                  <BadgeSuccess leftIcon size="small">Passed</BadgeSuccess>
                </div>
                <div className="flex justify-between items-center">
                  <span>Deploy to Production</span>
                  <BadgeSuccess leftIcon size="small" variant="strong">Success</BadgeSuccess>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BadgeSuccessDemo;