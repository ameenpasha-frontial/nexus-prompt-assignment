/**
 * ============================================================================
 * LOGIN COMPONENT - PROMPT NEXUS CHALLENGE
 * ============================================================================
 * 
 * COMPONENT: LoginComponent
 * DESCRIPTION: Dual-panel login interface with demo credentials display
 *              and auto-fill functionality for the Prompt Nexus Challenge
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
 * COMPONENT FEATURES:
 * - Dual-panel layout (Credentials Display + Login Form)
 * - Demo credentials with copy-to-clipboard functionality
 * - Auto-fill credentials feature
 * - Reactive form with validation
 * - Material Design components
 * - Responsive design
 * - Loading states with spinners
 * - Error handling and display
 * 
 * KEY FUNCTIONALITIES:
 * 1. Credentials Panel:
 *    - Display hardcoded demo credentials
 *    - Copy email/password to clipboard
 *    - Auto-fill form with demo credentials
 * 
 * 2. Login Form Panel:
 *    - Email and password validation
 *    - Form submission handling
 *    - Error message display
 *    - Loading state management
 * 
 * USAGE:
 * This component provides a user-friendly login interface with demo access
 * capabilities for testing and demonstration purposes.
 * 
 * VERSION: 1.0.0
 * ============================================================================
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;
  error: string = '';

  // Hardcoded credentials for testing - made public for template access
  readonly HARDCODED_EMAIL = 'demo@example.com';
  readonly HARDCODED_PASSWORD = 'demoExample123!';
  private readonly HARDCODED_USER = {
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'user'
  };

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/dashboard']);
    }

    // Auto-fill the form with demo credentials
    this.autoFillCredentials();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = '';

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Check against hardcoded credentials first
      if (this.checkHardcodedCredentials(email, password)) {
        this.handleSuccessfulLogin();
      } else {
        // Fallback to API login if hardcoded credentials don't match
        this.attemptApiLogin(email, password);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  // Copy to clipboard function
  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // You can add a snackbar or toast notification here
      console.log('Copied to clipboard:', text);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  // Auto-fill the form with demo credentials
  autoFillCredentials(): void {
    this.loginForm.patchValue({
      email: this.HARDCODED_EMAIL,
      password: this.HARDCODED_PASSWORD
    });
  }

  private checkHardcodedCredentials(email: string, password: string): boolean {
    return email === this.HARDCODED_EMAIL && password === this.HARDCODED_PASSWORD;
  }

  private handleSuccessfulLogin(): void {
    setTimeout(() => {
      this.isLoading = false;

      // Create a mock token
      const mockToken = this.generateMockToken();

      // Store token and user data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(this.HARDCODED_USER));

      console.log('Login successful with demo credentials');

      // Redirect to dashboard
      this.router.navigate(['/dashboard']);
    }, 1000);
  }

  private attemptApiLogin(email: string, password: string): void {
    const loginData = {
      email: email,
      password: password,
    };

    this.http.post<any>('http://127.0.0.1:8000/api/auth/login/', loginData).subscribe({
      next: (response) => {
        this.isLoading = false;

        // Store token and user data
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          // Redirect to dashboard
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      },
    });
  }

  private generateMockToken(): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        user_id: this.HARDCODED_USER.id,
        email: this.HARDCODED_USER.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      })
    );
    const signature = 'demo_mock_signature';

    return `${header}.${payload}.${signature}`;
  }

  // Quick login method for development
  quickLogin(): void {
    this.autoFillCredentials();
    this.onSubmit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template validation
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}