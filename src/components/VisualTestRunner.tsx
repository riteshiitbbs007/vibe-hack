import React from 'react'

interface VisualTestRunnerProps {
  component: {
    name: string
    code: string
    props: Record<string, any>
  }
  testResults: {
    status: 'idle' | 'running' | 'passed' | 'failed'
    diff?: string
  }
  onRunTest: () => void
}

const VisualTestRunner: React.FC<VisualTestRunnerProps> = ({
  component,
  testResults,
  onRunTest
}) => {
  const getStatusIcon = () => {
    switch (testResults.status) {
      case 'running':
        return <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full" />
      case 'passed':
        return <span className="text-green-600">✅</span>
      case 'failed':
        return <span className="text-red-600">❌</span>
      default:
        return <span className="text-gray-400">🧪</span>
    }
  }

  const getStatusMessage = () => {
    switch (testResults.status) {
      case 'running':
        return 'Running SLDS2 visual regression test...'
      case 'passed':
        return 'Perfect! SLDS2 component matches Figma design exactly.'
      case 'failed':
        return 'SLDS2 component changes detected! Check the diff below.'
      default:
        return 'Ready to run SLDS2 visual regression test'
    }
  }

  const getStatusColor = () => {
    switch (testResults.status) {
      case 'running':
        return 'text-blue-600'
      case 'passed':
        return 'text-green-600'
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-4">
      {/* Test Control */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusMessage()}
          </span>
        </div>
        
        <button
          onClick={onRunTest}
          disabled={testResults.status === 'running'}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
        >
          {testResults.status === 'running' ? 'Running...' : '🎭 Run Visual Test'}
        </button>
      </div>

      {/* SLDS2 Test Info */}
      <div className="bg-green-50 p-3 rounded-lg text-sm border border-green-200">
        <div className="font-medium text-green-700 mb-2">SLDS2 Test Configuration:</div>
        <div className="space-y-1 text-green-600">
          <div>• Component: <code className="bg-white px-1 rounded font-medium">{component.name}</code> (SLDS2 Compliant)</div>
          <div>• Styling Hooks: Global CSS custom properties</div>
          <div>• Browser: Chromium (headless)</div>
          <div>• Viewport: 1280x720</div>
          <div>• Threshold: 0.1% pixel difference (strict)</div>
          <div>• Accessibility: WCAG 2.1 AA compliant</div>
        </div>
      </div>

      {/* Test Results */}
      {testResults.status === 'passed' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <span className="text-xl">✅</span>
            <div>
              <div className="font-semibold">SLDS2 Visual Test Passed!</div>
              <div className="text-sm">Component renders exactly as Figma design with perfect SLDS2 compliance.</div>
            </div>
          </div>
        </div>
      )}

      {testResults.status === 'failed' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800 mb-3">
            <span className="text-xl">❌</span>
            <div>
              <div className="font-semibold">Visual Changes Detected</div>
              <div className="text-sm">The component doesn't match the baseline screenshot.</div>
            </div>
          </div>
          
          {/* Mock Diff Viewer */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-red-700">Screenshot Comparison:</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="bg-gray-200 aspect-video rounded mb-1 flex items-center justify-center text-gray-500">
                  Baseline
                </div>
                <div>Expected</div>
              </div>
              <div className="text-center">
                <div className="bg-red-100 aspect-video rounded mb-1 flex items-center justify-center text-red-500">
                  Current
                </div>
                <div>Actual</div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 aspect-video rounded mb-1 flex items-center justify-center text-yellow-600">
                  Diff
                </div>
                <div>Difference</div>
              </div>
            </div>
            
            <div className="text-xs text-red-600">
              • 47 pixels changed (0.8% difference)
              • Changes detected in: color, spacing
            </div>
            
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                Accept Changes
              </button>
              <button className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700">
                Update Baseline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playwright Code Example */}
      {testResults.status !== 'idle' && (
        <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs">
          <div className="text-gray-400 mb-2">Generated Playwright Test:</div>
          <pre className="overflow-x-auto">
{`test('${component.name} visual regression', async ({ page }) => {
  await page.goto('/component-preview');
  await expect(page.locator('[data-testid="generated-component"]'))
    .toHaveScreenshot('${component.name.toLowerCase()}.png');
});`}
          </pre>
        </div>
      )}
    </div>
  )
}

export default VisualTestRunner