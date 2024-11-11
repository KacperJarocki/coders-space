import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Client } from '../interfaces/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private url: string = "http://backend.localhost/api/";
  logInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  logIn() {
    if (this.logInForm.valid) {
      const { email, password } = this.logInForm.value;
      const client: Client = { id: 0, name: '', email, password, client_type: '' };

      this.http.post<{ token: string }>(`${this.url}auth/login`, client).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl("/");
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Login failed: Invalid credentials or network error');
        }
      });
    } else {
      alert('Please correct the errors in the form.');
    }
  }

  get email() { return this.logInForm.get('email'); }
  get password() { return this.logInForm.get('password'); }
}
