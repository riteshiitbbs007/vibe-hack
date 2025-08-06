/**
 * Figma to SLDS Mapper Service
 * Maps Figma design data to proper SLDS2 styling hooks and classes
 * Uses the official SLDS2 metadata source of truth
 */

import { slds2MetadataService, SLDSStylingHook, SLDSClass } from './slds2MetadataService';

export interface FigmaDesignData {
  name: string;
  fills?: Array<{
    type: string;
    color: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
  }>;
  strokes?: Array<{
    color: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
    strokeWeight: number;
  }>;
  cornerRadius?: number;
  constraints?: {
    horizontal: string;
    vertical: string;
  };
  layoutAlign?: string;
  layoutGrow?: number;
  effects?: Array<{
    type: string;
    visible: boolean;
    radius?: number;
    color?: any;
    offset?: any;
  }>;
  fontName?: {
    family: string;
    style: string;
  };
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: any;
  letterSpacing?: any;
  textDecoration?: string;
  textCase?: string;
  children?: FigmaDesignData[];
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
}

export interface MappedSLDSProperty {
  property: string;
  value: string;
  stylingHook?: string;
  fallback: string;
  category: string;
  confidence: number; // 0-1 confidence score
}

export interface MappedSLDSComponent {
  componentName: string;
  baseClass: string;
  modifierClasses: string[];
  stylingHooks: MappedSLDSProperty[];
  customProperties: MappedSLDSProperty[];
  ariaAttributes: Record<string, string>;
  semanticStructure: {
    element: string;
    attributes: Record<string, string>;
  };
}

class FigmaToSLDSMapper {
  private readonly COLOR_TOLERANCE = 30; // RGB tolerance for color matching
  private readonly SIZE_TOLERANCE = 4; // Pixel tolerance for size matching

  /**
   * Map Figma design data to SLDS2 component
   */
  async mapFigmaToSLDS(figmaData: FigmaDesignData, componentType?: string): Promise<MappedSLDSComponent> {
    console.log('🎨 Mapping Figma design to SLDS2 component...', figmaData.name);

    // Determine component type from Figma data
    const detectedType = componentType || this.detectComponentType(figmaData);
    
    // Get component-specific metadata
    const componentMetadata = await slds2MetadataService.getComponentMetadata(detectedType);
    
    // Map visual properties to SLDS styling hooks
    const stylingHooks = await this.mapVisualPropertiesToStylingHooks(figmaData);
    
    // Generate SLDS classes
    const { baseClass, modifierClasses } = this.generateSLDSClasses(detectedType, figmaData);
    
    // Generate semantic structure
    const semanticStructure = this.generateSemanticStructure(detectedType, figmaData);
    
    // Generate ARIA attributes
    const ariaAttributes = this.generateAriaAttributes(detectedType, figmaData);

    const mappedComponent: MappedSLDSComponent = {
      componentName: this.formatComponentName(figmaData.name || detectedType),
      baseClass,
      modifierClasses,
      stylingHooks,
      customProperties: this.generateCustomProperties(stylingHooks),
      ariaAttributes,
      semanticStructure
    };

    console.log('✅ Successfully mapped Figma design to SLDS2:', mappedComponent);
    return mappedComponent;
  }

  /**
   * Detect component type from Figma data
   */
  private detectComponentType(figmaData: FigmaDesignData): string {
    const name = figmaData.name?.toLowerCase() || '';
    
    // Component type detection logic
    if (name.includes('badge') || name.includes('tag') || name.includes('chip')) {
      return 'badge';
    }
    
    if (name.includes('button') || name.includes('btn')) {
      return 'button';
    }
    
    if (name.includes('card')) {
      return 'card';
    }
    
    if (name.includes('modal') || name.includes('dialog')) {
      return 'modal';
    }
    
    if (name.includes('input') || name.includes('field')) {
      return 'input';
    }
    
    // Default fallback
    return 'component';
  }

  /**
   * Map visual properties to SLDS styling hooks
   */
  private async mapVisualPropertiesToStylingHooks(figmaData: FigmaDesignData): Promise<MappedSLDSProperty[]> {
    const properties: MappedSLDSProperty[] = [];

    // Map background color
    if (figmaData.fills && figmaData.fills.length > 0) {
      const fill = figmaData.fills[0];
      if (fill.type === 'SOLID' && fill.color) {
        const colorProperty = await this.mapColorToStylingHook(fill.color, 'background');
        if (colorProperty) {
          properties.push(colorProperty);
        }
      }
    }

    // Map border/stroke
    if (figmaData.strokes && figmaData.strokes.length > 0) {
      const stroke = figmaData.strokes[0];
      const borderColorProperty = await this.mapColorToStylingHook(stroke.color, 'border');
      if (borderColorProperty) {
        properties.push(borderColorProperty);
      }

      // Map border width
      if (stroke.strokeWeight) {
        const borderWidthProperty = await this.mapSizeToStylingHook(stroke.strokeWeight, 'border-width');
        if (borderWidthProperty) {
          properties.push(borderWidthProperty);
        }
      }
    }

    // Map border radius
    if (figmaData.cornerRadius !== undefined) {
      const radiusProperty = await this.mapSizeToStylingHook(figmaData.cornerRadius, 'border-radius');
      if (radiusProperty) {
        properties.push(radiusProperty);
      }
    }

    // Map padding
    const padding = this.extractPadding(figmaData);
    if (padding) {
      const paddingProperty = await this.mapSizeToStylingHook(padding, 'padding');
      if (paddingProperty) {
        properties.push(paddingProperty);
      }
    }

    // Map typography
    if (figmaData.fontSize) {
      const fontSizeProperty = await this.mapSizeToStylingHook(figmaData.fontSize, 'font-size');
      if (fontSizeProperty) {
        properties.push(fontSizeProperty);
      }
    }

    if (figmaData.fontWeight) {
      const fontWeightProperty = await this.mapFontWeightToStylingHook(figmaData.fontWeight);
      if (fontWeightProperty) {
        properties.push(fontWeightProperty);
      }
    }

    return properties;
  }

  /**
   * Map Figma color to SLDS styling hook
   */
  private async mapColorToStylingHook(
    color: { r: number; g: number; b: number; a: number },
    usage: 'background' | 'border' | 'text'
  ): Promise<MappedSLDSProperty | null> {
    const hex = this.rgbaToHex(color);
    const metadata = await slds2MetadataService.getMetadata();
    
    // Find matching color styling hook
    let bestMatch: SLDSStylingHook | null = null;
    let bestDistance = Infinity;

    for (const hook of metadata.stylingHooks) {
      if (hook.category === 'color') {
        const distance = this.calculateColorDistance(hex, hook.value);
        if (distance < bestDistance && distance <= this.COLOR_TOLERANCE) {
          bestMatch = hook;
          bestDistance = distance;
        }
      }
    }

    if (bestMatch) {
      return {
        property: usage === 'background' ? 'background-color' : usage === 'border' ? 'border-color' : 'color',
        value: `var(${bestMatch.name}, ${hex})`,
        stylingHook: bestMatch.name,
        fallback: hex,
        category: 'color',
        confidence: Math.max(0, 1 - (bestDistance / this.COLOR_TOLERANCE))
      };
    }

    // Return fallback with custom property
    return {
      property: usage === 'background' ? 'background-color' : usage === 'border' ? 'border-color' : 'color',
      value: hex,
      fallback: hex,
      category: 'color',
      confidence: 0.5
    };
  }

  /**
   * Map size value to SLDS styling hook
   */
  private async mapSizeToStylingHook(
    sizeInPx: number,
    property: string
  ): Promise<MappedSLDSProperty | null> {
    const metadata = await slds2MetadataService.getMetadata();
    const category = this.determineSizeCategory(property);
    
    let bestMatch: SLDSStylingHook | null = null;
    let bestDistance = Infinity;

    for (const hook of metadata.stylingHooks) {
      if (hook.category === category) {
        const hookSizeInPx = this.convertToPixels(hook.value);
        if (hookSizeInPx !== null) {
          const distance = Math.abs(sizeInPx - hookSizeInPx);
          if (distance < bestDistance && distance <= this.SIZE_TOLERANCE) {
            bestMatch = hook;
            bestDistance = distance;
          }
        }
      }
    }

    if (bestMatch) {
      return {
        property,
        value: `var(${bestMatch.name}, ${sizeInPx}px)`,
        stylingHook: bestMatch.name,
        fallback: `${sizeInPx}px`,
        category,
        confidence: Math.max(0, 1 - (bestDistance / this.SIZE_TOLERANCE))
      };
    }

    return {
      property,
      value: `${sizeInPx}px`,
      fallback: `${sizeInPx}px`,
      category,
      confidence: 0.5
    };
  }

  /**
   * Map font weight to SLDS styling hook
   */
  private async mapFontWeightToStylingHook(fontWeight: number): Promise<MappedSLDSProperty | null> {
    const metadata = await slds2MetadataService.getMetadata();
    const fontWeightHooks = metadata.stylingHooks.filter(hook => 
      hook.category === 'typography' && hook.property === 'font' && hook.attribute === 'weight'
    );

    let bestMatch: SLDSStylingHook | null = null;
    let bestDistance = Infinity;

    for (const hook of fontWeightHooks) {
      const hookWeight = parseInt(hook.value);
      if (!isNaN(hookWeight)) {
        const distance = Math.abs(fontWeight - hookWeight);
        if (distance < bestDistance) {
          bestMatch = hook;
          bestDistance = distance;
        }
      }
    }

    if (bestMatch) {
      return {
        property: 'font-weight',
        value: `var(${bestMatch.name}, ${fontWeight})`,
        stylingHook: bestMatch.name,
        fallback: fontWeight.toString(),
        category: 'typography',
        confidence: bestDistance <= 100 ? 0.9 : 0.6
      };
    }

    return {
      property: 'font-weight',
      value: fontWeight.toString(),
      fallback: fontWeight.toString(),
      category: 'typography',
      confidence: 0.5
    };
  }

  /**
   * Generate SLDS classes for component
   */
  private generateSLDSClasses(componentType: string, figmaData: FigmaDesignData): {
    baseClass: string;
    modifierClasses: string[];
  } {
    const baseClass = `slds-${componentType}`;
    const modifierClasses: string[] = [];

    // Add variant modifiers based on visual properties
    if (this.hasStrongVisualWeight(figmaData)) {
      modifierClasses.push(`${baseClass}--strong`);
    }

    if (this.hasSubtleVisualStyle(figmaData)) {
      modifierClasses.push(`${baseClass}--subtle`);
    }

    // Add size modifiers
    const size = this.detectComponentSize(figmaData);
    if (size !== 'medium') {
      modifierClasses.push(`${baseClass}--${size}`);
    }

    return { baseClass, modifierClasses };
  }

  /**
   * Generate semantic HTML structure
   */
  private generateSemanticStructure(componentType: string, figmaData: FigmaDesignData): {
    element: string;
    attributes: Record<string, string>;
  } {
    const attributes: Record<string, string> = {};

    switch (componentType) {
      case 'badge':
        return {
          element: 'span',
          attributes: {
            'data-slds-component': 'badge',
            'role': 'status'
          }
        };
      case 'button':
        return {
          element: 'button',
          attributes: {
            'data-slds-component': 'button',
            'type': 'button'
          }
        };
      default:
        return {
          element: 'div',
          attributes: {
            'data-slds-component': componentType
          }
        };
    }
  }

  /**
   * Generate ARIA attributes for accessibility
   */
  private generateAriaAttributes(componentType: string, figmaData: FigmaDesignData): Record<string, string> {
    const aria: Record<string, string> = {};
    const componentName = figmaData.name || componentType;

    switch (componentType) {
      case 'badge':
        aria['aria-label'] = `Status: ${componentName}`;
        break;
      case 'button':
        aria['aria-label'] = componentName;
        break;
      default:
        if (componentName) {
          aria['aria-label'] = componentName;
        }
    }

    return aria;
  }

  /**
   * Generate custom CSS properties for runtime theming
   */
  private generateCustomProperties(stylingHooks: MappedSLDSProperty[]): MappedSLDSProperty[] {
    return stylingHooks.map(hook => ({
      ...hook,
      property: `--component-${hook.property.replace(/[^a-zA-Z0-9]/g, '-')}`,
      value: hook.stylingHook ? `var(${hook.stylingHook})` : hook.value
    }));
  }

  // Utility methods

  private formatComponentName(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '');
  }

  private rgbaToHex(color: { r: number; g: number; b: number; a: number }): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private calculateColorDistance(hex1: string, hex2: string): number {
    const rgb1 = this.hexToRgb(hex1);
    const rgb2 = this.hexToRgb(hex2);
    
    if (!rgb1 || !rgb2) return Infinity;
    
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private convertToPixels(value: string): number | null {
    if (value.endsWith('px')) {
      return parseFloat(value);
    }
    if (value.endsWith('rem')) {
      return parseFloat(value) * 16; // Assuming 16px base
    }
    if (value.endsWith('em')) {
      return parseFloat(value) * 16; // Assuming 16px base
    }
    return null;
  }

  private determineSizeCategory(property: string): string {
    if (property.includes('padding') || property.includes('margin') || property.includes('spacing')) {
      return 'spacing';
    }
    if (property.includes('radius')) {
      return 'radius';
    }
    if (property.includes('font-size')) {
      return 'typography';
    }
    return 'sizing';
  }

  private extractPadding(figmaData: FigmaDesignData): number | null {
    if (figmaData.paddingLeft !== undefined) {
      return figmaData.paddingLeft;
    }
    if (figmaData.paddingTop !== undefined) {
      return figmaData.paddingTop;
    }
    return null;
  }

  private hasStrongVisualWeight(figmaData: FigmaDesignData): boolean {
    // Check for strong visual indicators
    return (figmaData.fontWeight && figmaData.fontWeight >= 600) ||
           (figmaData.fills && figmaData.fills.some(fill => 
             fill.color && (fill.color.r + fill.color.g + fill.color.b) < 1.5 // Dark colors
           ));
  }

  private hasSubtleVisualStyle(figmaData: FigmaDesignData): boolean {
    // Check for subtle visual indicators
    return figmaData.fills && figmaData.fills.some(fill => 
      fill.color && fill.color.a < 0.8 // Semi-transparent
    );
  }

  private detectComponentSize(figmaData: FigmaDesignData): 'small' | 'medium' | 'large' {
    const height = figmaData.absoluteBoundingBox?.height || 0;
    
    if (height < 24) return 'small';
    if (height > 48) return 'large';
    return 'medium';
  }
}

// Export singleton instance
export const figmaToSLDSMapper = new FigmaToSLDSMapper();
export default figmaToSLDSMapper;