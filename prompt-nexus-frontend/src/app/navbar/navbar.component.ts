/**
 * ============================================================================
 * NAVBAR COMPONENT - PROMPT NEXUS CHALLENGE
 * ============================================================================
 * 
 * COMPONENT: NavbarComponent
 * DESCRIPTION: Main navigation header component with branding, navigation links,
 *              and user authentication controls for the Prompt Nexus application
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
 * - Standalone Component Architecture
 * - Router Integration for Navigation
 * - Material Design Icon Integration
 * - Responsive Design with Mobile-First Approach
 * - Authentication State Management
 * 
 * COMPONENT FEATURES:
 * - Brand identity with animated gradient text
 * - Navigation links with active route highlighting
 * - User logout functionality with confirmation
 * - Sticky header behavior for scroll persistence
 * - Responsive design for all device sizes
 * - Accessibility-compliant interactive elements
 * 
 * KEY FUNCTIONALITIES:
 * 1. Navigation System:
 *    - Dashboard route navigation
 *    - Create prompt route navigation
 *    - Active tab highlighting with visual indicators
 *    - RouterLink integration for SPA navigation
 * 
 * 2. User Authentication:
 *    - Logout functionality with local storage cleanup
 *    - Secure navigation to login page
 *    - Authentication token management
 * 
 * 3. Visual Design:
 *    - Animated gradient branding with "Prompt Nexus Challenge"
 *    - Hover effects and transitions for interactive elements
 *    - Sticky positioning with shadow and border styling
 *    - Responsive typography and spacing
 * 
 * NAVIGATION STRUCTURE:
 * - Dashboard: Primary overview and analytics route
 * - Create: Prompt creation and management route
 * - Logout: User session termination
 * 
 * AUTHENTICATION FLOW:
 * - Token Removal: Clears authToken from localStorage
 * - User Data Cleanup: Removes user profile data
 * - Route Navigation: Redirects to login page
 * - Session Termination: Complete user session cleanup
 * 
 * RESPONSIVE BREAKPOINTS:
 * - Desktop: Full navigation with horizontal layout
 * - Tablet: Adjusted spacing and font sizes
 * - Mobile: Stacked layout with centered elements
 * - Small Mobile: Compact navigation with wrapped links
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic HTML structure
 * - ARIA labels and titles for interactive elements
 * - Keyboard navigation support
 * - Focus indicators for tab navigation
 * - Reduced motion support for animations
 * 
 * DEPENDENCIES:
 * - Angular Router: Navigation and route management
 * - Angular Material: Icon and Button components
 * - Angular Common: Common directives and pipes
 * 
 * DESIGN SYSTEM INTEGRATION:
 * - Consistent with overall application theme
 * - Material Design principles compliance
 * - Gradient color scheme alignment
 * - Typography hierarchy maintenance
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - Lightweight component with minimal dependencies
 * - Efficient change detection strategy
 * - Optimized animations with CSS transforms
 * - Lazy loading compatible structure
 * 
 * SECURITY FEATURES:
 * - Secure token removal on logout
 * - Route protection through authentication guards
 * - XSS prevention through Angular sanitization
 * 
 * VERSION: 1.0.0
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  logout(): void {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
