/**
 * ============================================================================
 * ADD PROMPT COMPONENT - PROMPT NEXUS CHALLENGE
 * ============================================================================
 * 
 * COMPONENT: AddPromptComponent
 * DESCRIPTION: Form interface for creating new AI image generation prompts
 *              with complexity rating and validation
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
 * - Reactive Forms with Validation
 * - HTTP Client Integration for API Communication
 * - Material Design Components
 * - Two-Column Layout with Tips Sidebar
 * 
 * COMPONENT FEATURES:
 * - Multi-field prompt creation form
 * - Real-time complexity visualization
 * - Character counting with limits
 * - Form validation with error messages
 * - Responsive two-column layout
 * - Helpful prompt optimization tips
 * - Back navigation to library
 * 
 * KEY FUNCTIONALITIES:
 * 1. Form Management:
 *    - Reactive form with validators
 *    - Real-time complexity level display
 *    - Character count tracking
 *    - Form submission handling
 * 
 * 2. User Experience:
 *    - Visual complexity slider with color coding
 *    - Sticky tips sidebar with optimization guidance
 *    - Responsive design for all devices
 *    - Loading states and error handling
 * 
 * 3. Data Integration:
 *    - HTTP POST to create new prompts
 *    - Data transformation for API compatibility
 *    - Success/error response handling
 * 
 * FORM STRUCTURE:
 * - Title: Required, 3-50 characters
 * - Description: Required, 20-500 characters  
 * - Complexity: Required, 1-10 numeric rating
 * 
 * API INTEGRATION:
 * - Endpoint: POST http://127.0.0.1:8000/api/prompts/
 * - Payload: { title, content, complexity }
 * - Response: New prompt object with ID
 * 
 * COMPLEXITY SYSTEM:
 * - Simple (1-3): Blue color coding
 * - Moderate (4-7): Orange color coding  
 * - Complex (8-10): Red color coding
 * - Visual scale bar with dynamic fill
 * - Category badges with icons
 * 
 * DEPENDENCIES:
 * - Angular Material: Button, Icon, FormField, Input, Select
 * - Angular Common: CommonModule, HttpClientModule
 * - Angular Router: Navigation and routing
 * - ReactiveFormsModule: Form validation and management
 * 
 * VERSION: 1.0.0
 * ============================================================================
 */

// add-prompt.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-add-prompt',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './add-prompt.component.html',
  styleUrls: ['./add-prompt.component.scss'],
})
export class AddPromptComponent implements OnInit {
  // FIX: Use the definite assignment assertion operator '!'
  promptForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.promptForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      complexity: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  getComplexityClass(): string {
    const value = this.promptForm.get('complexity')?.value;
    if (!value) return 'simple';

    if (value <= 3) return 'simple';
    if (value <= 7) return 'moderate';
    return 'complex';
  }

  getComplexityText(): string {
    const value = this.promptForm.get('complexity')?.value;
    if (!value) return 'Simple';

    if (value <= 3) return 'Simple';
    if (value <= 7) return 'Moderate';
    return 'Complex';
  }

  savePrompt() {
    if (this.promptForm.valid) {
      const formData = {
        title: this.promptForm.value.title,
        content: this.promptForm.value.description,
        complexity: this.promptForm.value.complexity,
      };

      this.http.post('http://127.0.0.1:8000/api/prompts/create/', formData).subscribe({
        next: (res) => {
          //console.log('Prompt saved', res);
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error saving prompt', err),
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
