import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  logIn() {
    const email = this.logInForm.get('email')?.value;
    const password = this.logInForm.get('password')?.value;
    console.log("Should send data to server" + email + password);
  }
}
