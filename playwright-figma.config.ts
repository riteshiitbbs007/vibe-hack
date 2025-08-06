/**
 * Playwright Configuration for Figma Design Comparison Tests
 * Ultra-strict visual regression testing with pixel-perfect accuracy
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*figma*.spec.ts',
  fullyParallel: false, // Sequential for consistent screenshots
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 1,
  workers: 1, // Single worker for consistent rendering
  reporter: [
    ['html', { outputFolder: 'playwright-report-figma' }],
    ['json', { outputFile: 'test-results/figma-results.json' }]
  ],
  
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Consistent rendering settings
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    hasTouch: false,
    isMobile: false,
    
    // Disable animations for consistent screenshots
    extraHTTPHeaders: {
      'prefers-reduced-motion': 'reduce'
    }
  },

  projects: [
    {
      name: 'figma-comparison-chrome',
      use: { 
        ...devices['Desktop Chrome'],
        // Override for consistent font rendering
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1
      },
    },
    {
      name: 'figma-comparison-firefox', 
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1
      },
    },
    {
      name: 'figma-comparison-safari',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1
      },
    }
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  // Ultra-strict visual testing configuration for Figma comparison
  expect: {
    toHaveScreenshot: { 
      threshold: 0.001, // 0.1% threshold for pixel-perfect accuracy
      mode: 'percent',
      
      // Additional options for precise comparison
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      
      // Figma-specific styling
      style: `
        /* Disable animations globally */
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        
        /* Ensure consistent font rendering */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-feature-settings: "liga" 0;
        }
        
        /* Hide focus outlines for screenshots */
        *:focus {
          outline: none !important;
        }
        
        /* Ensure consistent cursor */
        * {
          cursor: default !important;
        }
      `
    },
  },

  // Global test timeout
  timeout: 30 * 1000,

  // Global setup for consistent environment
  globalSetup: require.resolve('./tests/global-setup.ts'),
});
});