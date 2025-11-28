/**
 * ============================================================================
 * PROMPT LIBRARY COMPONENT - PROMPT NEXUS CHALLENGE
 * ============================================================================
 * 
 * COMPONENT: PromptLibraryComponent
 * DESCRIPTION: Main library interface for browsing, searching, and managing
 *              AI image generation prompts with complexity-based categorization
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
 * - Reactive Data Management
 * - HTTP Client Integration
 * - Material Design Components
 * - Custom Pipes for Complexity Styling
 * 
 * COMPONENT FEATURES:
 * - Dynamic prompt loading from REST API
 * - Advanced search and filtering
 * - Complexity-based visual categorization
 * - Responsive grid layout
 * - Click navigation to prompt details
 * - Add new prompt functionality
 * - User authentication management
 * 
 * KEY FUNCTIONALITIES:
 * 1. Data Management:
 *    - HTTP GET requests to fetch prompts
 *    - Real-time search filtering
 *    - Complexity level mapping (1-10 to Simple/Moderate/Complex)
 * 
 * 2. UI/UX Features:
 *    - Responsive card-based grid layout
 *    - Visual complexity indicators with custom colors
 *    - View count formatting (k for thousands)
 *    - Hover effects and smooth transitions
 *    - Mobile-first responsive design
 * 
 * 3. Navigation & Routing:
 *    - Prompt detail page navigation
 *    - Add new prompt route integration
 *    - User logout functionality
 * 
 * API INTEGRATION:
 * - Endpoint: http://127.0.0.1:8000/api/prompts/
 * - Data Mapping: Transforms API response to Prompt interface
 * - Error Handling: Console logging for development
 * 
 * DEPENDENCIES:
 * - Angular Material: Card, Button, Icon, Chips, FormField, Input, Dialog
 * - Angular Common: CommonModule, HttpClientModule
 * - Angular Router: Navigation and route management
 * - Custom Pipes: ComplexityToColorPipe for visual styling
 * 
 * INTERFACE: Prompt
 * - id: string | number
 * - title: string
 * - complexity: string
 * - complexityLevel: number
 * - description: string
 * - views: number
 * - date: string
 * 
 * VERSION: 1.0.0
 * ============================================================================
 */

import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
// Import the new custom pipe and modal component
import { ComplexityToColorPipe } from './complexity-to-color.pipe';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';


export interface Prompt {
  id: string | number; // Use UUID or number depending on backend
  title: string;
  complexity: string;
  complexityLevel: number;
  description: string;
  views: number;
  date: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ComplexityToColorPipe,
    MatDialogModule,
    HttpClientModule, // <-- required for HTTP requests
    FormsModule,
    NavbarComponent   
  ],
  templateUrl: './prompt-library.component.html',
  styleUrls: ['./prompt-library.component.scss'],
})
export class PromptLibraryComponent {
  @ViewChild('simpleModal') simpleModal!: TemplateRef<any>;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  prompts: Prompt[] = []; // start empty

  searchTerm: string = '';
  filteredPrompts: Prompt[] = [];

  ngOnInit() {
    this.loadPrompts();
  }

  loadPrompts() {
    this.http.get<Prompt[]>('http://127.0.0.1:8000/api/prompts/').subscribe({
      next: (data) => {
        this.prompts = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.content,
          complexityLevel: p.complexity,
          complexity: this.getComplexityText(p.complexity),
          views: p.view_count || 0,
          date: new Date(p.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
        }));
        // Initialize filteredPrompts
        this.filteredPrompts = [...this.prompts];
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error fetching prompts', err),
    });
  }

  // Filter function
  filterPrompts() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredPrompts = [...this.prompts];
      return;
    }

    this.filteredPrompts = this.prompts.filter(
      (p) => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  }

  navigateToPromptDetail(promptId: string, index: number) {
    //console.log('=== CARD CLICKED ===');
    //console.log('Prompt ID:', promptId);
    //console.log('Array index:', index);
    //console.log('Prompt object:', this.prompts[index]);
    //console.log('Router available:', !!this.router);

    if (!promptId) {
      console.error('No prompt ID found!');
      return;
    }

    this.router.navigate(['/prompts', promptId]);
  }

  // Helper to convert numeric complexity to text
  getComplexityText(level: number): string {
    if (level >= 1 && level <= 3) return 'Simple';
    if (level >= 4 && level <= 7) return 'Moderate';
    if (level >= 8 && level <= 10) return 'Complex';
    return 'Unknown';
  }

  getComplexityColor(complexity: string): string {
    switch (complexity.toLowerCase()) {
      case 'simple':
        return 'primary';
      case 'moderate':
        return 'accent';
      case 'complex':
        return 'warn';
      default:
        return 'primary';
    }
  }

  formatViews(views: number): string {
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'k';
    }
    return views.toString();
  }

  // Remove the openModal method and replace with navigateToAddPrompt
  navigateToAddPrompt() {
    this.router.navigate(['/add']);
  }

  // In your existing component
  logout(): void {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}