/**
 * Global Setup for Figma Design Comparison Tests
 * Ensures consistent environment for pixel-perfect screenshots
 */

import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🎨 Setting up Figma comparison test environment...');
  
  // Launch browser to warm up and ensure consistent state
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to app and wait for full load
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    
    // Navigate to Badge Success demo
    await page.click('button:has-text("🎨 SLDS2 Badge Success Demo")');
    
    // Wait for all components to load
    await page.waitForSelector('[data-slds-component="badge-success"]', { timeout: 10000 });
    
    // Wait for fonts to load
    await page.waitForFunction(() => document.fonts.ready);
    
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
    
    console.log('✅ Environment setup complete');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;