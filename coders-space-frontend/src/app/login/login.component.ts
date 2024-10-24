import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Client } from '../interfaces/client';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FooterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private url: string = "http://backend.localhost/api/";
  private http = inject(HttpClient);
  private router = inject(Router)
  logInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  logIn() {
    const email = this.logInForm.get('email')?.value;
    const password = this.logInForm.get('password')?.value;
    const client: Client = {
      id: 0,
      name: '',
      email: email || '',
      password: password || '',
      client_type: ''
    };
    this.http.post<{ token: string }>(
      this.url + "auth/login", client)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl("/")
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
  }
}
