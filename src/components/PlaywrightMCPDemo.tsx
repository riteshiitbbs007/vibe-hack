/**
 * Playwright MCP Demo Component
 * Shows REAL Playwright MCP integration capabilities - NO MOCK DATA
 */

import React, { useState, useCallback } from 'react';
import { playwrightMCPService } from '../services/playwrightMCPService';

export const PlaywrightMCPDemo: React.FC = () => {
  const [browserStatus, setBrowserStatus] = useState<'idle' | 'starting' | 'ready' | 'error'>('idle');
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [testOutput, setTestOutput] = useState<string[]>([]);

  // Real Playwright MCP integration
  const startBrowser = useCallback(async () => {
    setBrowserStatus('starting');
    
    try {
      const page = await playwrightMCPService.startBrowser('http://localhost:3001');
      setBrowserStatus('ready');
      setCurrentUrl(page.url);
      setTestOutput(prev => [...prev, `✅ Browser started successfully`]);
      setTestOutput(prev => [...prev, `🌐 Navigated to: ${page.url}`]);
    } catch (error) {
      console.error('Failed to start browser:', error);
      setBrowserStatus('error');
      setTestOutput(prev => [...prev, `❌ Browser startup failed: ${error}`]);
    }
  }, []);

  const takeScreenshot = useCallback(async () => {
    if (browserStatus !== 'ready') {
      setTestOutput(prev => [...prev, `⚠️ Browser not ready for screenshot`]);
      return;
    }

    try {
      const screenshot = await playwrightMCPService.takeScreenshot();
      setTestOutput(prev => [...prev, `📷 Screenshot captured successfully`]);
      return screenshot;
    } catch (error) {
      setTestOutput(prev => [...prev, `❌ Screenshot failed: ${error}`]);
    }
  }, [browserStatus]);

  const navigateToPage = useCallback(async (url: string) => {
    if (browserStatus !== 'ready') {
      setTestOutput(prev => [...prev, `⚠️ Browser not ready for navigation`]);
      return;
    }

    try {
      await playwrightMCPService.navigate(url);
      setCurrentUrl(url);
      setTestOutput(prev => [...prev, `🧭 Navigated to: ${url}`]);
    } catch (error) {
      setTestOutput(prev => [...prev, `❌ Navigation failed: ${error}`]);
    }
  }, [browserStatus]);

  const resizeBrowser = useCallback(async (width: number, height: number) => {
    if (browserStatus !== 'ready') {
      setTestOutput(prev => [...prev, `⚠️ Browser not ready for resize`]);
      return;
    }

    try {
      await playwrightMCPService.resize(width, height);
      setTestOutput(prev => [...prev, `📐 Browser resized to ${width}x${height}`]);
    } catch (error) {
      setTestOutput(prev => [...prev, `❌ Resize failed: ${error}`]);
    }
  }, [browserStatus]);

  const clearOutput = useCallback(() => {
    setTestOutput([]);
  }, []);

  const getBrowserStatusIcon = () => {
    switch (browserStatus) {
      case 'starting': return '🔄';
      case 'ready': return '🌐';
      case 'error': return '❌';
      default: return '⏳';
    }
  };

  const getBrowserStatusText = () => {
    switch (browserStatus) {
      case 'starting': return 'Starting browser...';
      case 'ready': return 'Browser ready for testing';
      case 'error': return 'Browser error occurred';
      default: return 'Browser not started';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎭 Playwright MCP Integration
          </h1>
          <p className="text-lg text-gray-600">
            Real browser automation using Playwright MCP tools
          </p>
        </div>

        {/* Browser Control Panel */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getBrowserStatusIcon()}</span>
              <div>
                <h3 className="font-semibold text-gray-900">Browser Control</h3>
                <p className="text-sm text-gray-600">{getBrowserStatusText()}</p>
                {currentUrl && (
                  <p className="text-xs text-blue-600 font-mono">{currentUrl}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={startBrowser}
                disabled={browserStatus === 'starting' || browserStatus === 'ready'}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {browserStatus === 'starting' ? 'Starting...' : 'Start Browser'}
              </button>
              <button
                onClick={() => playwrightMCPService.closeBrowser()}
                disabled={browserStatus !== 'ready'}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Close Browser
              </button>
            </div>
          </div>
        </div>

        {/* MCP Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">🛠️ Real MCP Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Navigation */}
            <div className="p-4 border rounded">
              <h4 className="font-medium mb-2">🧭 Navigation</h4>
              <div className="space-y-2">
                <button
                  onClick={() => navigateToPage('http://localhost:3001')}
                  disabled={browserStatus !== 'ready'}
                  className="w-full px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:bg-gray-200 disabled:text-gray-500"
                >
                  Home Page
                </button>
                <button
                  onClick={() => navigateToPage('http://localhost:3001/?tab=badge-demo')}
                  disabled={browserStatus !== 'ready'}
                  className="w-full px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:bg-gray-200 disabled:text-gray-500"
                >
                  Badge Demo
                </button>
              </div>
            </div>

            {/* Screenshots */}
            <div className="p-4 border rounded">
              <h4 className="font-medium mb-2">📷 Screenshots</h4>
              <div className="space-y-2">
                <button
                  onClick={takeScreenshot}
                  disabled={browserStatus !== 'ready'}
                  className="w-full px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:bg-gray-200 disabled:text-gray-500"
                >
                  Take Screenshot
                </button>
              </div>
            </div>

            {/* Viewport Control */}
            <div className="p-4 border rounded">
              <h4 className="font-medium mb-2">📐 Viewport</h4>
              <div className="space-y-2">
                <button
                  onClick={() => resizeBrowser(1920, 1080)}
                  disabled={browserStatus !== 'ready'}
                  className="w-full px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-500"
                >
                  Desktop (1920x1080)
                </button>
                <button
                  onClick={() => resizeBrowser(768, 1024)}
                  disabled={browserStatus !== 'ready'}
                  className="w-full px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-500"
                >
                  Tablet (768x1024)
                </button>
                <button
                  onClick={() => resizeBrowser(375, 667)}
                  disabled={browserStatus !== 'ready'}
                  className="w-full px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-500"
                >
                  Mobile (375x667)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Test Output */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">📋 Live Test Output</h3>
            <button
              onClick={clearOutput}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Clear
            </button>
          </div>
          
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-64 overflow-y-auto">
            {testOutput.length === 0 ? (
              <div className="text-gray-500">No test output yet. Start the browser to begin testing.</div>
            ) : (
              testOutput.map((line, index) => (
                <div key={index} className="mb-1">
                  <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {line}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Real MCP Commands Reference */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
          <h3 className="text-xl font-semibold text-purple-900 mb-4">🎭 Real Playwright MCP Commands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-purple-800 mb-2">🚀 Available Commands</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">mcp_playwright_browser_navigate</code>
                  <span className="text-purple-700">Navigate to URLs</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">mcp_playwright_browser_click</code>
                  <span className="text-purple-700">Click elements</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">mcp_playwright_browser_type</code>
                  <span className="text-purple-700">Type text</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">mcp_playwright_browser_snapshot</code>
                  <span className="text-purple-700">Capture page state</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">🔧 More Commands</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">mcp_playwright_browser_take_screenshot</code>
                  <span className="text-blue-700">Screenshots</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">mcp_playwright_browser_evaluate</code>
                  <span className="text-blue-700">Execute JavaScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">mcp_playwright_browser_wait_for</code>
                  <span className="text-blue-700">Wait conditions</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">mcp_playwright_browser_resize</code>
                  <span className="text-blue-700">Viewport control</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded border-l-4 border-purple-400">
            <p className="text-sm text-purple-700">
              <strong>Real Integration:</strong> This demo uses actual Playwright MCP commands for browser automation. 
              All actions above trigger real browser interactions when available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaywrightMCPDemo;