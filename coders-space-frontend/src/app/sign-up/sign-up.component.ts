import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Client } from '../interfaces/client';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  private url: string = "http://backend.localhost/api/v1/";
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  signUp() {
    if (this.signUpForm.valid) {
      const { name, email, password } = this.signUpForm.value;
      const client: Client = { id: 0, name, email, password, client_type: '' };
      this.snackBar.open('U need to Check your email first. Please log in.', 'OK', {
        duration: 2000,
        verticalPosition: 'top', // Position at the bottom
      });
      this.http.post(`${this.url}auth/register`, client).subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: (error) => console.log(error)
      });
    } else {
      this.snackBar.open('Please fill in all fields correctly', 'OK', {
        duration: 2000,
      });
    }
  }

  private passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get name() { return this.signUpForm.get('name'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get confirmPassword() { return this.signUpForm.get('confirmPassword'); }
}
