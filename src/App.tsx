import React, { useState } from 'react'
import EnhancedComponentGenerator from './components/EnhancedComponentGenerator'
import ComponentPreview from './components/ComponentPreview'
import VisualTestRunner from './components/VisualTestRunner'
import BadgeSuccessDemo from './components/BadgeSuccess/demo'
import SLDSLinterDemo from './components/SLDSLinterDemo'
import PlaywrightMCPDemo from './components/PlaywrightMCPDemo'

interface GeneratedComponent {
  name: string
  code: string
  props: Record<string, any>
}

function App() {
  const [activeTab, setActiveTab] = useState<'enhanced-generator' | 'badge-demo' | 'slds-linter' | 'playwright-mcp'>('enhanced-generator')
  const [generatedComponent, setGeneratedComponent] = useState<GeneratedComponent | null>(null)
  const [testResults, setTestResults] = useState<{
    status: 'idle' | 'running' | 'passed' | 'failed'
    diff?: string
  }>({ status: 'idle' })

  const handleComponentGenerated = (component: GeneratedComponent) => {
    setGeneratedComponent(component)
    setTestResults({ status: 'idle' })
  }

  const handleRunVisualTest = async () => {
    if (!generatedComponent) return
    
    setTestResults({ status: 'running' })
    
    // Simulate visual test - in real implementation this would call Playwright
    setTimeout(() => {
      const passed = Math.random() > 0.3 // 70% chance to pass
      setTestResults({
        status: passed ? 'passed' : 'failed',
        diff: passed ? undefined : '/mock-diff-screenshot.png'
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
🌐 SLDS2 Component Generator & Tools
              </h1>
              <p className="text-gray-600 mt-1">
Enterprise-grade Lightning Design System 2 components with real-time validation and testing
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
                ✅ Figma MCP Ready
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-300">
                🎯 Live Generation
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-300">
                🎨 SLDS2 Badge Ready
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
                ⚡ SLDS Linter Integrated
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-300">
                🌐 SLDS2 Metadata API
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-300">
                🎭 Playwright MCP
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">

            <button
              onClick={() => setActiveTab('enhanced-generator')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'enhanced-generator'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🌐 SLDS2 Component Generator
            </button>
            <button
              onClick={() => setActiveTab('badge-demo')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'badge-demo'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🎨 SLDS2 Badge Success Demo
            </button>
            <button
              onClick={() => setActiveTab('slds-linter')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'slds-linter'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ⚡ SLDS Linter Integration
            </button>
            <button
              onClick={() => setActiveTab('playwright-mcp')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'playwright-mcp'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🎭 Playwright MCP Testing
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {activeTab === 'enhanced-generator' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel: Enhanced Component Generator */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    🌐 SLDS2 Metadata Generator
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Enhanced component generation using the official SLDS2 metadata source of truth
                  </p>
                  <EnhancedComponentGenerator onComponentGenerated={handleComponentGenerated} />
                </div>

                {generatedComponent && (
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      🧪 Visual Testing
                    </h2>
                    <VisualTestRunner
                      component={generatedComponent}
                      testResults={testResults}
                      onRunTest={handleRunVisualTest}
                    />
                  </div>
                )}
              </div>

              {/* Right Panel: Preview */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  👀 Component Preview
                </h2>
                <ComponentPreview component={generatedComponent} />
              </div>
            </div>

            {/* SLDS2 Metadata Integration Info */}
            <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                🌐 SLDS2 Metadata Integration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-indigo-800 mb-2">📡 Source of Truth</h4>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• <a href="https://design-systems-metadata-28384bb587d8.herokuapp.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-900">Official SLDS2 Metadata API</a></li>
                    <li>• Real-time styling hooks and classes</li>
                    <li>• Figma-to-SLDS token mapping</li>
                    <li>• Component semantic structure</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-purple-800 mb-2">⚡ Enhanced Features</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Intelligent property mapping</li>
                    <li>• Accessibility-first generation</li>
                    <li>• Runtime theming support</li>
                    <li>• Enterprise-grade compliance</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded border-l-4 border-indigo-400">
                <p className="text-sm text-indigo-700">
                  <strong>How it works:</strong> The enhanced generator fetches the latest SLDS2 metadata, 
                  maps Figma design properties to official styling hooks, and generates production-ready 
                  components that automatically comply with Lightning Design System 2 standards.
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'badge-demo' && (
          <div className="w-full">
            <BadgeSuccessDemo />
          </div>
        )}

        {activeTab === 'slds-linter' && (
          <div className="w-full">
            <SLDSLinterDemo />
          </div>
        )}

        {activeTab === 'playwright-mcp' && (
          <div className="w-full">
            <PlaywrightMCPDemo />
          </div>
        )}
      </main>
    </div>
  )
}

export default App