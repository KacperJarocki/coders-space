import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
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
      console.log("Should send data to server");
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
