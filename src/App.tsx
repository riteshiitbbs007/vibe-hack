import React, { useState } from 'react'
import ComponentGenerator from './components/ComponentGenerator'
import ComponentPreview from './components/ComponentPreview'
import VisualTestRunner from './components/VisualTestRunner'
import BadgeSuccessDemo from './components/BadgeSuccess/demo'

interface GeneratedComponent {
  name: string
  code: string
  props: Record<string, any>
}

function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'badge-demo'>('generator')
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
                🎨 Live Figma MCP Demo
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time SLDS2 component generation from Figma designs using Cursor MCP
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
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('generator')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'generator'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🔧 Component Generator
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'generator' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel: Component Generator */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    🔧 Component Generator
                  </h2>
                  <ComponentGenerator onComponentGenerated={handleComponentGenerated} />
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

            {/* Live Demo Instructions */}
            <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                🎬 Live Figma MCP Demo Instructions
              </h3>
              <div className="space-y-3 text-blue-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Open Figma and select a component design</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <span>Open Cursor Chat panel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <span>Type: <code className="bg-blue-100 px-2 py-1 rounded">@figma Generate SLDS2 component from selected design</code></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                  <span>Watch real-time component generation with Lightning Design System 2 compliance!</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-100 rounded border-l-4 border-blue-400">
                <p className="text-sm text-blue-700">
                  <strong>What you'll see:</strong> Real-time generation of SLDS2 compliant React components with 
                  styling hooks, semantic structure, and accessibility built-in.
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
      </main>
    </div>
  )
}

export default App