/**
 * ============================================================================
 * PROMPT DETAIL COMPONENT - PROMPT NEXUS CHALLENGE
 * ============================================================================
 * 
 * COMPONENT: PromptDetailComponent
 * DESCRIPTION: Detailed view interface for individual AI image generation prompts
 *              with comprehensive metadata display and interaction features
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
 * - Route Parameter Handling
 * - HTTP Client Integration for Data Fetching
 * - Material Design Components
 * - Responsive Layout with Multiple States
 * 
 * COMPONENT FEATURES:
 * - Dynamic prompt loading based on route ID
 * - Comprehensive metadata display (views, date, complexity)
 * - Visual complexity scale with interactive bar
 * - Copy-to-clipboard functionality
 * - Loading and error state management
 * - Back navigation to library
 * - Responsive design for all devices
 * 
 * KEY FUNCTIONALITIES:
 * 1. Data Management:
 *    - Route parameter extraction for prompt ID
 *    - HTTP GET request to fetch prompt details
 *    - Data transformation and mapping
 *    - Error handling with user feedback
 * 
 * 2. User Interface:
 *    - Three-state display (loading, error, content)
 *    - Statistical cards with icons and metrics
 *    - Visual complexity visualization
 *    - Copy functionality for prompt content
 *    - Responsive grid and card layouts
 * 
 * 3. User Experience:
 *    - Smooth loading transitions
 *    - Detailed error information for debugging
 *    - Intuitive back navigation
 *    - Touch-optimized interactions
 * 
 * DATA STRUCTURE:
 * - prompt: Complete prompt object with transformed data
 * - routeId: Extracted ID from route parameters
 * - apiUrl: Constructed API endpoint URL
 * - error: Error message for failed requests
 * - isLoading: Loading state management
 * 
 * API INTEGRATION:
 * - Endpoint: GET http://127.0.0.1:8000/api/prompts/{id}/
 * - Data Mapping: Transforms API response to frontend format
 * - Error Handling: Comprehensive error state management
 * 
 * COMPLEXITY SYSTEM:
 * - Simple (1-3): Green color coding
 * - Moderate (4-7): Orange color coding
 * - Complex (8-10): Red color coding
 * - Visual progress bar with dynamic width
 * - Textual classification display
 * 
 * DEPENDENCIES:
 * - Angular Material: Card, Icon, Button
 * - Angular Common: CommonModule, HttpClientModule
 * - Angular Router: Route parameters and navigation
 * - ChangeDetectorRef: Manual change detection for zoneless mode
 * 
 * STATE MANAGEMENT:
 * - Loading: Initial data fetch state
 * - Error: API failure or invalid route state
 * - Content: Successful data load state
 * 
 * VERSION: 1.0.0
 * ============================================================================
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule, NavbarComponent],
  templateUrl: './prompt-detail.component.html',
  styleUrls: ['./prompt-detail.component.scss'],
})
export class PromptDetailComponent implements OnInit {
  prompt: any = null;
  routeId: string | null = null;
  apiUrl: string = '';
  error: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🔍 Component initialized');

    this.routeId = this.route.snapshot.paramMap.get('id');
    console.log('📌 Route ID:', this.routeId);

    if (this.routeId) {
      this.apiUrl = `http://127.0.0.1:8000/api/prompts/${this.routeId}/`;
      console.log('🌐 API URL:', this.apiUrl);

      this.http.get<any>(this.apiUrl).subscribe({
        next: (data) => {
          this.prompt = {
            title: data.title,
            content: data.content,
            complexity: data.complexity,
            complexityText: this.getComplexityText(data.complexity),
            views: data.view_count,
            date: new Date(data.created_at).toLocaleDateString(),
            created_at: data.created_at,
          };

          this.isLoading = false;

          // 👇 FORCE Angular to update UI (required in zoneless mode)
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = err.message;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        complete: () => {
          console.log('📦 API call completed');
          this.isLoading = false;
        },
      });
    } else {
      this.error = 'No ID found in route';
      this.isLoading = false;
    }
  }

  getComplexityText(level: number): string {
    if (level <= 3) return 'Simple';
    if (level <= 7) return 'Moderate';
    return 'Complex';
  }

  formatViews(views: number): string {
    return views >= 1000 ? (views / 1000).toFixed(1) + 'k' : views.toString();
  }

  getDaysAgo(dateString: string): number {
    if (!dateString) return 0;
    const created = new Date(dateString);
    if (isNaN(created.getTime())) return 0;
    const now = new Date();
    const diff = now.getTime() - created.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  getComplexityClass(level: number): string {
    if (level <= 3) return 'simple';
    if (level <= 7) return 'moderate';
    return 'complex';
  }

  copyPrompt() {
    if (this.prompt?.content) {
      navigator.clipboard
        .writeText(this.prompt.content)
        .then(() => {
          console.log('Prompt copied to clipboard');
        })
        .catch((err) => {
          console.error('Failed to copy prompt:', err);
        });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
