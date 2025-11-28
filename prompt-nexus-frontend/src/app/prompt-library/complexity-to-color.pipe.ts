/**
 * ============================================================================
 * COMPLEXITY TO COLOR PIPE - PROMPT NEXUS CHALLENGE
 * ============================================================================
 * 
 * PIPE: ComplexityToColorPipe
 * DESCRIPTION: Custom Angular pipe that transforms complexity level strings
 *              into corresponding background colors for visual categorization
 * 
 * DEVELOPED BY: Ameen Pasha A
 * COMPANY: Stratagile
 * CLIENT: Emplay
 * PROJECT: Prompt Nexus Challenge
 * 
 * TECHNICAL SPECIFICATIONS:
 * - Angular: 21.0.1
 * - Angular CLI: 21.0.1
 * - Node.js: 24.11.1
 * - Package Manager: npm 11.6.2
 * - Operating System: win32 x64
 * 
 * ARCHITECTURE:
 * - Standalone Pipe Architecture (Angular 14+)
 * - Pure Pipe Implementation
 * - String Transformation Logic
 * - Color Mapping System
 * 
 * PIPE FEATURES:
 * - Transforms complexity text to background colors
 * - Case-insensitive string matching
 * - Fallback default color for unknown values
 * - Light theme optimized color palette
 * - Consistent with overall design system
 * 
 * KEY FUNCTIONALITIES:
 * 1. Color Mapping:
 *    - "simple" → Soft Blue (#D0EBFF)
 *    - "moderate" → Soft Yellow (#FFF7C3)
 *    - "complex" → Soft Pink/Red (#FFE5E5)
 *    - default → Light Gray (#f5f5f5)
 * 
 * 2. Transformation Logic:
 *    - Converts input to lowercase for case-insensitive matching
 *    - Returns corresponding hex color code
 *    - Provides fallback for unexpected values
 * 
 * USAGE EXAMPLES:
 * In Template:
 *   [style.background-color]="prompt.complexity | complexityToColor"
 * 
 * Input/Output:
 *   Input: "Simple" → Output: "#D0EBFF"
 *   Input: "MODERATE" → Output: "#FFF7C3"
 *   Input: "complex" → Output: "#FFE5E5"
 *   Input: "unknown" → Output: "#f5f5f5"
 * 
 * COLOR SYSTEM RATIONALE:
 * - Soft Blue (#D0EBFF): Represents calm, simple, easy-to-understand prompts
 * - Soft Yellow (#FFF7C3): Represents moderate complexity with cautionary tone
 * - Soft Pink/Red (#FFE5E5): Represents complex, advanced prompts requiring attention
 * - Light Gray (#f5f5f5): Neutral fallback for edge cases
 * 
 * DESIGN INTEGRATION:
 * - Complements the complexity badge system
 * - Consistent with Material Design principles
 * - Light theme optimized for readability
 * - Accessible color contrast ratios
 * 
 * PERFORMANCE CHARACTERISTICS:
 * - Pure Pipe: Only executes when input changes
 * - Lightweight: Simple string transformation
 * - Efficient: No external dependencies or API calls
 * - Cacheable: Deterministic output for same input
 * 
 * DEPENDENCIES:
 * - Angular Core: Pipe, PipeTransform interfaces
 * - Standalone: No additional module dependencies
 * 
 * INTEGRATION POINTS:
 * - Prompt Library Component: Complexity chip styling
 * - Prompt Detail Component: Visual complexity indicators
 * - Any component requiring complexity-based coloring
 * 
 * MAINTENANCE CONSIDERATIONS:
 * - Color values can be easily updated for theme changes
 * - Additional complexity levels can be added as needed
 * - Consistent with overall design system updates
 * 
 * ACCESSIBILITY FEATURES:
 * - Sufficient color contrast for text readability
 * - Non-reliance on color alone for information
 * - Consistent with WCAG 2.1 guidelines
 * 
 * TESTING SCENARIOS:
 * - Valid complexity levels return correct colors
 * - Case-insensitive matching works correctly
 * - Unknown values return default fallback
 * - Null/undefined input handling
 * 
 * VERSION: 1.0.0
 * ============================================================================
 */

// complexity-to-color.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'complexityToColor',
  standalone: true, // Must be standalone to be imported directly
})
export class ComplexityToColorPipe implements PipeTransform {
  transform(complexity: string): string {
    switch (complexity.toLowerCase()) {
      // Maps to the light background colors defined in SCSS
      case 'simple':
        return '#D0EBFF'; // Soft blue
      case 'moderate':
        return '#FFF7C3'; // Soft yellow
      case 'complex':
        return '#FFE5E5'; // Soft pink/red
      default:
        return '#f5f5f5';
    }
  }
}
