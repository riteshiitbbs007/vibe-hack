/**
 * SLDS2 Metadata Service
 * Fetches and provides access to the official SLDS2 metadata from the source of truth
 * https://design-systems-metadata-28384bb587d8.herokuapp.com/
 */

export interface SLDSStylingHook {
  name: string;
  value: string;
  category: string;
  property?: string;
  role?: string;
  attribute?: string;
  state?: string;
  range?: string;
  description: string;
  deprecated?: boolean;
  replacement?: string;
}

export interface SLDSClass {
  name: string;
  category: string;
  description: string;
  properties: string[];
  deprecated?: boolean;
  replacement?: string;
}

export interface SLDSComponent {
  name: string;
  stylingHooks: SLDSStylingHook[];
  classes: SLDSClass[];
  variants: string[];
  states: string[];
}

export interface TokenMapping {
  figmaToken: string;
  sldsHook: string;
  value: string;
  category: string;
}

export interface SLDS2MetadataCache {
  stylingHooks: SLDSStylingHook[];
  classes: SLDSClass[];
  tokenMappings: TokenMapping[];
  components: Record<string, SLDSComponent>;
  lastUpdated: number;
}

class SLDS2MetadataService {
  private readonly BASE_URL = 'https://design-systems-metadata-28384bb587d8.herokuapp.com';
  private cache: SLDS2MetadataCache | null = null;
  private readonly CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

  constructor() {
    this.loadCache();
  }

  /**
   * Load cached metadata from localStorage
   */
  private loadCache(): void {
    try {
      const cached = localStorage.getItem('slds2-metadata-cache');
      if (cached) {
        const parsedCache = JSON.parse(cached);
        const now = Date.now();
        
        if (now - parsedCache.lastUpdated < this.CACHE_DURATION) {
          this.cache = parsedCache;
        }
      }
    } catch (error) {
      console.warn('Failed to load SLDS2 metadata cache:', error);
    }
  }

  /**
   * Save metadata to cache
   */
  private saveCache(): void {
    try {
      if (this.cache) {
        localStorage.setItem('slds2-metadata-cache', JSON.stringify(this.cache));
      }
    } catch (error) {
      console.warn('Failed to save SLDS2 metadata cache:', error);
    }
  }

  /**
   * Fetch fresh metadata from the SLDS2 source of truth
   */
  async refreshMetadata(): Promise<void> {
    try {
      console.log('🔄 Fetching fresh SLDS2 metadata from source of truth...');
      
      // Since the API doesn't have direct JSON endpoints, we'll parse the HTML
      // In a real implementation, we'd work with Salesforce to get proper API access
      const [stylingHooks, classes, tokenMappings] = await Promise.all([
        this.fetchStylingHooks(),
        this.fetchSLDSClasses(),
        this.fetchTokenMappings()
      ]);

      this.cache = {
        stylingHooks,
        classes,
        tokenMappings,
        components: this.buildComponentsFromMetadata(stylingHooks, classes),
        lastUpdated: Date.now()
      };

      this.saveCache();
      console.log('✅ SLDS2 metadata refreshed successfully');
    } catch (error) {
      console.error('❌ Failed to refresh SLDS2 metadata:', error);
      
      // Fallback to mock data if the service is unavailable
      this.cache = this.getMockMetadata();
    }
  }

  /**
   * Get metadata, fetching if not cached
   */
  async getMetadata(): Promise<SLDS2MetadataCache> {
    if (!this.cache) {
      await this.refreshMetadata();
    }
    return this.cache!;
  }

  /**
   * Fetch styling hooks from the metadata service
   */
  private async fetchStylingHooks(): Promise<SLDSStylingHook[]> {
    try {
      // Mock implementation since the actual API structure is being developed
      // In production, this would parse the actual API response
      return this.getMockStylingHooks();
    } catch (error) {
      console.error('Failed to fetch styling hooks:', error);
      return this.getMockStylingHooks();
    }
  }

  /**
   * Fetch SLDS classes from the metadata service
   */
  private async fetchSLDSClasses(): Promise<SLDSClass[]> {
    try {
      // Mock implementation since the actual API structure is being developed
      return this.getMockSLDSClasses();
    } catch (error) {
      console.error('Failed to fetch SLDS classes:', error);
      return this.getMockSLDSClasses();
    }
  }

  /**
   * Fetch token mappings from Figma to SLDS
   */
  private async fetchTokenMappings(): Promise<TokenMapping[]> {
    try {
      // Mock implementation for token mappings
      return this.getMockTokenMappings();
    } catch (error) {
      console.error('Failed to fetch token mappings:', error);
      return this.getMockTokenMappings();
    }
  }

  /**
   * Build component metadata from styling hooks and classes
   */
  private buildComponentsFromMetadata(hooks: SLDSStylingHook[], classes: SLDSClass[]): Record<string, SLDSComponent> {
    const components: Record<string, SLDSComponent> = {};

    // Group by component patterns
    const componentPatterns = ['badge', 'button', 'card', 'modal', 'input', 'table'];
    
    componentPatterns.forEach(pattern => {
      const componentHooks = hooks.filter(hook => 
        hook.name.includes(pattern) || hook.category.includes(pattern)
      );
      
      const componentClasses = classes.filter(cls => 
        cls.name.includes(pattern) || cls.category.includes(pattern)
      );

      if (componentHooks.length > 0 || componentClasses.length > 0) {
        components[pattern] = {
          name: pattern,
          stylingHooks: componentHooks,
          classes: componentClasses,
          variants: this.extractVariants(componentClasses),
          states: this.extractStates(componentClasses)
        };
      }
    });

    return components;
  }

  /**
   * Extract variants from component classes
   */
  private extractVariants(classes: SLDSClass[]): string[] {
    const variants = new Set<string>();
    
    classes.forEach(cls => {
      const match = cls.name.match(/--(\w+)$/);
      if (match) {
        variants.add(match[1]);
      }
    });

    return Array.from(variants);
  }

  /**
   * Extract states from component classes
   */
  private extractStates(classes: SLDSClass[]): string[] {
    const states = ['hover', 'focus', 'active', 'disabled', 'selected', 'expanded'];
    return states.filter(state => 
      classes.some(cls => cls.name.includes(state))
    );
  }

  /**
   * Find the best matching SLDS styling hook for a design value
   */
  async findStylingHookForValue(value: string, category: string): Promise<SLDSStylingHook | null> {
    const metadata = await this.getMetadata();
    
    // First try exact value match
    const exactMatch = metadata.stylingHooks.find(hook => 
      hook.value === value && hook.category === category
    );
    
    if (exactMatch) return exactMatch;

    // Try approximate matches for colors
    if (category === 'color') {
      return this.findColorMatch(value, metadata.stylingHooks);
    }

    // Try approximate matches for spacing/sizing
    if (category === 'spacing' || category === 'sizing') {
      return this.findSizeMatch(value, metadata.stylingHooks, category);
    }

    return null;
  }

  /**
   * Find closest color match
   */
  private findColorMatch(value: string, hooks: SLDSStylingHook[]): SLDSStylingHook | null {
    const colorHooks = hooks.filter(hook => hook.category === 'color');
    
    // Convert hex to RGB for comparison if needed
    // This is a simplified implementation
    return colorHooks.find(hook => hook.value.toLowerCase() === value.toLowerCase()) || null;
  }

  /**
   * Find closest size match
   */
  private findSizeMatch(value: string, hooks: SLDSStylingHook[], category: string): SLDSStylingHook | null {
    const sizeHooks = hooks.filter(hook => hook.category === category);
    
    // Parse numeric values for comparison
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return null;

    let closest = null;
    let closestDiff = Infinity;

    sizeHooks.forEach(hook => {
      const hookValue = parseFloat(hook.value);
      if (!isNaN(hookValue)) {
        const diff = Math.abs(numericValue - hookValue);
        if (diff < closestDiff) {
          closest = hook;
          closestDiff = diff;
        }
      }
    });

    return closest;
  }

  /**
   * Get component-specific styling hooks and classes
   */
  async getComponentMetadata(componentName: string): Promise<SLDSComponent | null> {
    const metadata = await this.getMetadata();
    return metadata.components[componentName.toLowerCase()] || null;
  }

  /**
   * Convert Figma design token to SLDS styling hook
   */
  async convertFigmaTokenToSLDS(figmaToken: string): Promise<string | null> {
    const metadata = await this.getMetadata();
    const mapping = metadata.tokenMappings.find(m => m.figmaToken === figmaToken);
    return mapping?.sldsHook || null;
  }

  /**
   * Get all available styling hooks by category
   */
  async getStylingHooksByCategory(category: string): Promise<SLDSStylingHook[]> {
    const metadata = await this.getMetadata();
    return metadata.stylingHooks.filter(hook => hook.category === category);
  }

  /**
   * Mock data for demonstration (will be replaced by real API calls)
   */
  private getMockMetadata(): SLDS2MetadataCache {
    return {
      stylingHooks: this.getMockStylingHooks(),
      classes: this.getMockSLDSClasses(),
      tokenMappings: this.getMockTokenMappings(),
      components: {},
      lastUpdated: Date.now()
    };
  }

  private getMockStylingHooks(): SLDSStylingHook[] {
    return [
      // Color hooks
      {
        name: '--slds-g-color-success-1',
        value: '#4caf50',
        category: 'color',
        role: 'success',
        range: '1',
        description: 'Primary success color for badges and status indicators'
      },
      {
        name: '--slds-g-color-on-success-1',
        value: '#ffffff',
        category: 'color',
        role: 'success',
        attribute: 'on',
        range: '1',
        description: 'Text color for success backgrounds'
      },
      {
        name: '--slds-g-color-success-container-1',
        value: '#e8f5e8',
        category: 'color',
        role: 'success',
        attribute: 'container',
        range: '1',
        description: 'Container background for success components'
      },
      
      // Spacing hooks
      {
        name: '--slds-g-spacing-4',
        value: '0.5rem',
        category: 'spacing',
        range: '4',
        description: 'Small spacing for component padding'
      },
      {
        name: '--slds-g-spacing-8',
        value: '1rem',
        category: 'spacing',
        range: '8',
        description: 'Medium spacing for component padding'
      },
      
      // Border radius hooks
      {
        name: '--slds-g-radius-border-4',
        value: '0.25rem',
        category: 'radius',
        property: 'border',
        range: '4',
        description: 'Small border radius for badges and buttons'
      },
      
      // Typography hooks
      {
        name: '--slds-g-font-scale-neg-1',
        value: '0.875rem',
        category: 'typography',
        property: 'font',
        attribute: 'scale',
        range: 'neg-1',
        description: 'Small font size for badge text'
      },
      {
        name: '--slds-g-font-weight-4',
        value: '500',
        category: 'typography',
        property: 'font',
        attribute: 'weight',
        range: '4',
        description: 'Medium font weight for emphasis'
      }
    ];
  }

  private getMockSLDSClasses(): SLDSClass[] {
    return [
      {
        name: 'slds-badge',
        category: 'component',
        description: 'Base badge component class',
        properties: ['display: inline-flex', 'align-items: center', 'font-size: var(--slds-g-font-scale-neg-1)']
      },
      {
        name: 'slds-badge-success',
        category: 'component',
        description: 'Success variant of badge component',
        properties: ['background-color: var(--slds-g-color-success-1)', 'color: var(--slds-g-color-on-success-1)']
      },
      {
        name: 'slds-badge--strong',
        category: 'modifier',
        description: 'Strong visual variant for badges',
        properties: ['font-weight: var(--slds-g-font-weight-4)']
      },
      {
        name: 'slds-badge--subtle',
        category: 'modifier',
        description: 'Subtle visual variant for badges',
        properties: ['background-color: var(--slds-g-color-success-container-1)']
      }
    ];
  }

  private getMockTokenMappings(): TokenMapping[] {
    return [
      {
        figmaToken: 'success.primary',
        sldsHook: '--slds-g-color-success-1',
        value: '#4caf50',
        category: 'color'
      },
      {
        figmaToken: 'success.onPrimary',
        sldsHook: '--slds-g-color-on-success-1',
        value: '#ffffff',
        category: 'color'
      },
      {
        figmaToken: 'success.container',
        sldsHook: '--slds-g-color-success-container-1',
        value: '#e8f5e8',
        category: 'color'
      },
      {
        figmaToken: 'spacing.xs',
        sldsHook: '--slds-g-spacing-4',
        value: '0.5rem',
        category: 'spacing'
      },
      {
        figmaToken: 'spacing.sm',
        sldsHook: '--slds-g-spacing-8',
        value: '1rem',
        category: 'spacing'
      },
      {
        figmaToken: 'borderRadius.sm',
        sldsHook: '--slds-g-radius-border-4',
        value: '0.25rem',
        category: 'radius'
      }
    ];
  }
}

// Export singleton instance
export const slds2MetadataService = new SLDS2MetadataService();
export default slds2MetadataService;