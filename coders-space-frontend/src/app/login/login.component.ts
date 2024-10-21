import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
class Client {
  email?: string;
  password?: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
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
  logInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  logIn() {
    const email = this.logInForm.get('email')?.value;
    const password = this.logInForm.get('password')?.value;
    const client = new Client(email ?? "", password ?? "");
    this.http.post<{ token: string }>(
      this.url + "auth/login", client)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
  }
}
