import React, { useState } from 'react'

interface ComponentPreviewProps {
  component: {
    name: string
    code: string
    props: Record<string, any>
  } | null
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ component }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

  if (!component) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-4xl mb-4">🎨</div>
        <p>Generate a component to see the preview</p>
      </div>
    )
  }

  // Real-time component renderer - will display components generated via Figma MCP
  const renderComponent = () => {
    return (
      <div data-testid="generated-component" className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg text-center border-2 border-dashed border-blue-300">
        <div className="text-6xl mb-4">🎨</div>
        <div className="text-xl font-semibold text-gray-800 mb-2">Ready for Live Generation!</div>
        <div className="text-sm text-gray-600 mb-4">
          Generated components will appear here in real-time
        </div>
        <div className="bg-blue-100 p-3 rounded border-l-4 border-blue-400">
          <div className="text-sm text-blue-800">
            <strong>Next:</strong> Use <code>@figma</code> in Cursor Chat to generate SLDS2 components
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'preview'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          👀 Preview
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'code'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          💻 Code
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[200px]">
        {activeTab === 'preview' ? (
          <div>
            {/* Live Generation Area */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900">🎯 Live Component Generation</h3>
              <p className="text-sm text-gray-600">Real-time SLDS2 components from Figma via Cursor MCP</p>
            </div>

            {/* Component Render Area */}
            <div className="rounded-lg">
              {renderComponent()}
            </div>

            {/* Props */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Props:</h4>
              <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                <pre>{JSON.stringify(component.props, null, 2)}</pre>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{component.code}</code>
              </pre>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Ready to copy and use in your project
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ComponentPreview