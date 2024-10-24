import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Client } from '../interfaces/client';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  private url: string = "http://backend.localhost/api/";
  private http = inject(HttpClient);
  private router = inject(Router)
  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  constructor() { }
  signUp() {
    const name = this.signUpForm.get('name')?.value;
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = this.signUpForm.get('confirmPassword')?.value;
    if (this.matchPassword(password, confirmPassword)) {
      const client: Client = {
        id: 0,
        name: name || '',
        email: email || '',
        password: password || '',
        client_type: ''
      };
      this.http.post(
        this.url + "auth/register", client)
        .subscribe({
          next: (response) => {
            alert('Account created successfully');
            this.router.navigateByUrl('/login');
          }, error: er => { console.log(er) }
        });
    } else {
      alert('Password and Confirm Password do not match');
    }
  }
  matchPassword(password?: string | null, confirmPassword?: string | null): boolean {
    if (password === null || confirmPassword === null) {
      return false;
    } else if (password === undefined || confirmPassword === undefined) {
      return false;
    } else
      return password === confirmPassword;
  }
}
