# SLDS2 Metadata Integration - Complete Implementation

## 🌐 **Integration Overview**

This implementation provides complete integration with the **official SLDS2 metadata source of truth** at `https://design-systems-metadata-28384bb587d8.herokuapp.com/`, enabling MCP-powered component generation that automatically uses accurate SLDS2 styling hooks and best practices.

## 🎯 **Key Features Implemented**

### **1. SLDS2 Metadata Service** (`src/services/slds2MetadataService.ts`)
- **Real-time metadata fetching** from official SLDS2 API
- **Intelligent caching** with 24-hour refresh cycle
- **Fallback mock data** for development and offline scenarios
- **Comprehensive metadata parsing** for styling hooks, classes, and component structures

### **2. Figma-to-SLDS Mapping Service** (`src/services/figmaToSldsMapper.ts`)
- **Intelligent property mapping** from Figma design data to SLDS2 styling hooks
- **Color distance algorithms** for accurate color matching
- **Size tolerance algorithms** for spacing and dimension mapping
- **Semantic structure generation** with proper HTML elements and ARIA attributes

### **3. Enhanced Component Generator** (`src/components/EnhancedComponentGenerator.tsx`)
- **Metadata-driven generation** using official SLDS2 data
- **Real-time metadata status** with refresh capabilities
- **Configurable generation options** for different use cases
- **Enterprise-grade output** with accessibility and theming built-in

## 🔧 **Architecture**

### **Data Flow**
```
Figma Design Data → SLDS2 Metadata API → Figma-to-SLDS Mapper → React Component Code
```

### **Service Layer**
1. **SLDS2MetadataService**: Fetches and caches official metadata
2. **FigmaToSLDSMapper**: Maps design properties to SLDS styling hooks
3. **EnhancedComponentGenerator**: Orchestrates the generation process

### **Integration Points**
- **Component Preview**: Shows real-time compliance checking
- **SLDS Linter**: Validates generated components
- **Visual Testing**: Ensures pixel-perfect accuracy

## 📊 **Official SLDS2 Metadata Endpoints**

### **Available Endpoints**
```
Base URL: https://design-systems-metadata-28384bb587d8.herokuapp.com/

/metadata/sldsStylingHooks          - SLDS styling hooks
/metadata/sldsClasses               - SLDS component classes  
/metadata/globalStylingHooksMetadata - Global styling hooks
/metadata/auraToLwcTokensMapping    - Aura to LWC token mapping
/metadata/lwcToSlds                 - LWC to SLDS mapping
/metadata/valueToStylingHooksSlds   - Value to styling hooks mapping
/metadata/valueToStylingHooksCosmos - Cosmos styling hooks mapping
/metadata/bemNaming                 - BEM naming conventions
/metadata/deprecatedClasses         - Deprecated classes
/metadata/deprecatedStylingHooks    - Deprecated styling hooks
```

## 🎨 **Generated Component Features**

### **SLDS2 Compliance**
- ✅ **Official styling hooks** from metadata API
- ✅ **Semantic HTML structure** with proper elements
- ✅ **ARIA attributes** for accessibility
- ✅ **BEM naming conventions** following SLDS standards
- ✅ **Component data attributes** for testing and styling
- ✅ **Runtime theming support** with CSS custom properties

### **Enterprise Features**
- ✅ **TypeScript interfaces** with comprehensive prop types
- ✅ **Variant systems** (default, strong, subtle)
- ✅ **Size systems** (small, medium, large)
- ✅ **State management** (hover, focus, active, disabled)
- ✅ **Responsive design** considerations
- ✅ **Performance optimization** with efficient CSS

## 🔍 **Example: Generated Badge Component**

### **Input: Figma Design Data**
```typescript
{
  name: 'Badge Success',
  fills: [{ type: 'SOLID', color: { r: 0.3, g: 0.7, b: 0.3, a: 1.0 } }],
  cornerRadius: 4,
  paddingLeft: 8,
  fontSize: 14,
  fontWeight: 500
}
```

### **Output: SLDS2 Compliant Component**
```typescript
interface BadgeSuccessProps {
  children: React.ReactNode;
  variant?: 'default' | 'strong' | 'subtle';
  size?: 'small' | 'medium' | 'large';
  'aria-label'?: string;
}

export const BadgeSuccess = forwardRef<HTMLElement, BadgeSuccessProps>(({
  children,
  variant = 'default',
  size = 'medium',
  className,
  ...rest
}, ref) => {
  const baseClass = 'slds-badge-success';
  const variantClass = variant !== 'default' ? `${baseClass}--${variant}` : '';
  
  return (
    <span
      ref={ref}
      className={`${baseClass} ${variantClass} ${className || ''}`}
      data-slds-component="badge-success"
      role="status"
      aria-label={`Success: ${children}`}
      {...rest}
    >
      {children}
    </span>
  );
});
```

### **Generated CSS with Official Styling Hooks**
```css
.slds-badge-success {
  background-color: var(--slds-g-color-success-1, #4caf50);
  color: var(--slds-g-color-on-success-1, #ffffff);
  border-radius: var(--slds-g-radius-border-4, 0.25rem);
  padding: var(--slds-g-spacing-4, 0.5rem) var(--slds-g-spacing-8, 1rem);
  font-size: var(--slds-g-font-scale-neg-1, 0.875rem);
  font-weight: var(--slds-g-font-weight-4, 500);
  
  /* Component-specific styling hooks for customization */
  --component-background-color: var(--slds-g-color-success-1);
  --component-color: var(--slds-g-color-on-success-1);
}
```

## 🧪 **Smart Mapping Algorithms**

### **Color Mapping**
- **RGB distance calculation** with tolerance thresholds
- **Automatic color palette detection** (success, warning, error, info)
- **Accessibility contrast validation** for text-background combinations
- **Semantic color role assignment** based on usage context

### **Size Mapping**
- **Pixel-to-rem conversion** with base font size consideration
- **SLDS spacing scale alignment** (4px, 8px, 12px, 16px, etc.)
- **Responsive design tokens** for different screen sizes
- **Typography scale mapping** following SLDS hierarchy

### **Property Intelligence**
- **Automatic variant detection** based on visual weight and contrast
- **State inference** from interaction patterns
- **Semantic element selection** based on component purpose
- **ARIA attribute generation** for accessibility compliance

## 🎭 **Live Demo Features**

### **🌐 SLDS2 Metadata Generator Tab**
- Real-time metadata loading from official API
- Configurable generation options
- Live metadata status indicators
- Enhanced component preview with compliance checking

### **Integration Flow**
1. **Load Metadata**: Fetch latest SLDS2 data from source of truth
2. **Parse Design**: Analyze Figma component properties
3. **Map Properties**: Convert design tokens to SLDS styling hooks
4. **Generate Code**: Create enterprise-grade React component
5. **Validate Compliance**: Run SLDS linter for final verification

## 📈 **Performance Optimizations**

### **Caching Strategy**
- **24-hour metadata cache** in localStorage
- **Intelligent cache invalidation** on API changes
- **Fallback data** for offline development
- **Progressive loading** of metadata sections

### **Mapping Efficiency**
- **Pre-computed color palettes** for faster matching
- **Indexed styling hooks** by category for quick lookups
- **Lazy evaluation** of complex mappings
- **Debounced API calls** to prevent rate limiting

## 🔗 **Integration Commands**

### **Package Scripts**
```json
{
  "dev": "vite",
  "build": "vite build", 
  "slds:lint": "npx @salesforce-ux/slds-linter lint",
  "slds:lint:fix": "npx @salesforce-ux/slds-linter lint --fix",
  "slds:report": "npx @salesforce-ux/slds-linter report -o slds-reports"
}
```

### **Development Workflow**
```bash
# Start development server
npm run dev

# Generate component with metadata integration
# (Use the Enhanced Generator tab in the UI)

# Validate SLDS2 compliance
npm run slds:lint

# Auto-fix compliance issues
npm run slds:lint:fix

# Generate compliance report
npm run slds:report
```

## 🚀 **Next Steps & Enhancements**

### **Future Improvements**
1. **Real-time Figma API integration** for live design sync
2. **Advanced component variants** based on design system patterns
3. **Cross-platform code generation** (React Native, Vue, Angular)
4. **AI-powered component suggestions** based on design patterns
5. **Automated testing generation** for component behavior

### **Enterprise Features**
1. **Custom metadata sources** for organization-specific design systems
2. **Brand-specific token mapping** for multi-brand applications
3. **Component library integration** with existing design systems
4. **CI/CD pipeline integration** for automated compliance checking

## 🎉 **Summary**

This implementation provides a **complete, production-ready integration** with the official SLDS2 metadata source of truth, enabling:

- ✅ **Accurate SLDS2 compliance** using real metadata
- ✅ **Intelligent design-to-code mapping** with smart algorithms  
- ✅ **Enterprise-grade component generation** with accessibility built-in
- ✅ **Real-time validation** and compliance checking
- ✅ **Performance-optimized** caching and mapping strategies

The integration transforms the Figma MCP workflow into a **professional-grade component generation system** that automatically produces enterprise-ready SLDS2 compliant components! 🌟

**Live Demo**: http://localhost:3001 → "🌐 SLDS2 Metadata Generator" tab