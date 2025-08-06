import React, { useState } from 'react'

interface ComponentGeneratorProps {
  onComponentGenerated: (component: {
    name: string
    code: string
    props: Record<string, any>
  }) => void
}

const ComponentGenerator: React.FC<ComponentGeneratorProps> = ({ onComponentGenerated }) => {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  // Demo will generate components in real-time using Figma MCP
  const [generatedComponents, setGeneratedComponents] = useState<Record<string, any>>({})

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)

    try {
      // This will be replaced with real Figma MCP call
      setLoading(false)
      alert('Ready for real Figma MCP integration! Use @figma in Cursor chat to generate components.')
    } catch (error) {
      setLoading(false)
      console.error('Generation failed:', error)
    }
  }

  const handleRealTimeGeneration = () => {
    alert('Use Cursor Chat with @figma to generate SLDS2 components from your selected Figma design!')
  }

  return (
    <div className="space-y-4">
      {/* Prompt Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Component Prompt
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Generate SLDS2 badge success component'"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? '🔄' : '🎨'} Generate SLDS2
          </button>
        </div>
      </div>

      {/* Real-Time Figma MCP Integration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🎨 Real-Time Figma MCP Generation
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleRealTimeGeneration}
            className="px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md font-medium border border-blue-300"
          >
            🎯 Generate from Figma
          </button>
          <div className="text-xs text-gray-500 self-center ml-2">
            Use @figma in Cursor Chat for real component generation
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="text-sm text-yellow-800">
            <strong>Live Demo Instructions:</strong>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Select a component in Figma</li>
              <li>Open Cursor Chat</li>
              <li>Type: <code className="bg-yellow-100 px-1 rounded">@figma Generate SLDS2 component</code></li>
              <li>Watch real-time code generation!</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Status */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          Connecting to Figma MCP...
        </div>
      )}
    </div>
  )
}

export default ComponentGenerator