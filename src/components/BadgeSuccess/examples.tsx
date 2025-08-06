/**
 * SLDS2 Badge Success Component Examples
 * Comprehensive usage examples for enterprise implementation
 */

import React from 'react';
import { BadgeSuccess, BadgeSuccessProvider } from './index';

// Basic Examples
export const BasicExamples = () => (
  <div className="space-y-4">
    <h3>Basic Usage</h3>
    
    {/* Simple badge */}
    <BadgeSuccess>Success</BadgeSuccess>
    
    {/* With default icon */}
    <BadgeSuccess leftIcon>Task Completed</BadgeSuccess>
    
    {/* Different sizes */}
    <div className="space-x-2">
      <BadgeSuccess size="small">Small</BadgeSuccess>
      <BadgeSuccess size="medium">Medium</BadgeSuccess>
      <BadgeSuccess size="large">Large</BadgeSuccess>
    </div>
    
    {/* Different variants */}
    <div className="space-x-2">
      <BadgeSuccess variant="default">Default</BadgeSuccess>
      <BadgeSuccess variant="strong">Strong</BadgeSuccess>
      <BadgeSuccess variant="subtle">Subtle</BadgeSuccess>
    </div>
  </div>
);

// Interactive Examples
export const InteractiveExamples = () => (
  <div className="space-y-4">
    <h3>Interactive Badges</h3>
    
    {/* Clickable badge */}
    <BadgeSuccess 
      interactive 
      onClick={() => alert('Badge clicked!')}
    >
      Click me
    </BadgeSuccess>
    
    {/* With custom click handler */}
    <BadgeSuccess 
      interactive
      onClick={(event) => {
        console.log('Badge clicked:', event);
        // Your custom logic here
      }}
      aria-label="Mark task as complete"
    >
      Mark Complete
    </BadgeSuccess>
  </div>
);

// Icon Examples
export const IconExamples = () => (
  <div className="space-y-4">
    <h3>Icons</h3>
    
    {/* Default success icon */}
    <BadgeSuccess leftIcon>With Default Icon</BadgeSuccess>
    
    {/* Custom icon */}
    <BadgeSuccess 
      leftIcon={{
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E",
        alt: "Check mark",
        size: "medium"
      }}
    >
      Custom Check
    </BadgeSuccess>
    
    {/* Both icons */}
    <BadgeSuccess 
      leftIcon
      rightIcon={{
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6z'/%3E%3C/svg%3E",
        alt: "Arrow right",
        size: "small"
      }}
    >
      Success with Arrow
    </BadgeSuccess>
  </div>
);

// Enterprise Configuration Example
export const EnterpriseExample = () => {
  const enterpriseConfig = {
    theme: {
      backgroundColor: '#e8f5e8',
      textColor: '#1b5e20',
      borderRadius: '6px',
      fontWeight: '500'
    },
    hooks: {
      useAnalytics: (event: string, data?: Record<string, unknown>) => {
        console.log('Analytics:', event, data);
        // Integrate with your analytics service
        // analytics.track(event, data);
      }
    },
    a11y: {
      announceChanges: true,
      reducedMotion: false
    }
  };

  return (
    <div className="space-y-4">
      <h3>Enterprise Configuration</h3>
      
      <BadgeSuccessProvider value={enterpriseConfig}>
        <div className="space-x-2">
          <BadgeSuccess>Themed Badge</BadgeSuccess>
          
          <BadgeSuccess 
            interactive 
            onClick={() => console.log('Enterprise badge clicked')}
          >
            With Analytics
          </BadgeSuccess>
          
          <BadgeSuccess 
            leftIcon
            variant="strong"
            size="large"
          >
            Enterprise Success
          </BadgeSuccess>
        </div>
      </BadgeSuccessProvider>
    </div>
  );
};

// Accessibility Examples
export const AccessibilityExamples = () => (
  <div className="space-y-4">
    <h3>Accessibility Features</h3>
    
    {/* Custom ARIA label */}
    <BadgeSuccess 
      aria-label="Task completed successfully"
      aria-live="assertive"
    >
      Done
    </BadgeSuccess>
    
    {/* Interactive with keyboard support */}
    <BadgeSuccess 
      interactive
      onClick={() => console.log('Keyboard accessible click')}
      tabIndex={0}
      aria-label="Click to view details"
    >
      View Details
    </BadgeSuccess>
    
    {/* With describedby */}
    <div>
      <BadgeSuccess 
        aria-describedby="badge-description"
        role="status"
      >
        Processing Complete
      </BadgeSuccess>
      <div id="badge-description" className="sr-only">
        The data processing task has completed successfully.
      </div>
    </div>
  </div>
);

// Real-world Use Cases
export const RealWorldExamples = () => (
  <div className="space-y-6">
    <h3>Real-world Use Cases</h3>
    
    {/* Status indicator */}
    <div className="p-4 border rounded">
      <h4 className="font-semibold mb-2">Task Status</h4>
      <BadgeSuccess leftIcon>Completed</BadgeSuccess>
    </div>
    
    {/* Notification badge */}
    <div className="p-4 border rounded">
      <h4 className="font-semibold mb-2">Notification</h4>
      <BadgeSuccess 
        interactive
        onClick={() => alert('Notification clicked')}
        aria-label="New message notification"
      >
        2 New Messages
      </BadgeSuccess>
    </div>
    
    {/* Feature flag indicator */}
    <div className="p-4 border rounded">
      <h4 className="font-semibold mb-2">Feature Status</h4>
      <BadgeSuccess 
        variant="subtle"
        size="small"
        leftIcon
      >
        Feature Enabled
      </BadgeSuccess>
    </div>
    
    {/* Action confirmation */}
    <div className="p-4 border rounded">
      <h4 className="font-semibold mb-2">Action Result</h4>
      <BadgeSuccess 
        variant="strong"
        leftIcon
        aria-live="polite"
      >
        Saved Successfully
      </BadgeSuccess>
    </div>
  </div>
);

// Performance Examples
export const PerformanceExamples = () => {
  const [badges, setBadges] = React.useState<string[]>(['Badge 1']);

  const addBadge = () => {
    setBadges(prev => [...prev, `Badge ${prev.length + 1}`]);
  };

  const removeBadge = (index: number) => {
    setBadges(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3>Performance - Dynamic Badges</h3>
      
      <div className="space-x-2 mb-4">
        <button 
          onClick={addBadge}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Badge
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <BadgeSuccess 
            key={index}
            interactive
            onClick={() => removeBadge(index)}
            aria-label={`Remove ${badge}`}
            leftIcon
          >
            {badge}
          </BadgeSuccess>
        ))}
      </div>
    </div>
  );
};

// Complete example showcase
export const BadgeSuccessShowcase = () => (
  <div className="p-6 space-y-8">
    <h1 className="text-2xl font-bold">SLDS2 Badge Success Component Showcase</h1>
    
    <BasicExamples />
    <InteractiveExamples />
    <IconExamples />
    <EnterpriseExample />
    <AccessibilityExamples />
    <RealWorldExamples />
    <PerformanceExamples />
  </div>
);

export default BadgeSuccessShowcase;