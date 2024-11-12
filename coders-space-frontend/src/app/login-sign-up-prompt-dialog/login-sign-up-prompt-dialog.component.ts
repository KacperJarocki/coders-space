import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-sign-up-prompt-dialog',
  standalone: true,
  imports: [],
  templateUrl: './login-sign-up-prompt-dialog.component.html',
  styleUrl: './login-sign-up-prompt-dialog.component.css'
})
export class LoginSignUpPromptDialogComponent {
  constructor(private router: Router, private dialogRef: MatDialogRef<LoginSignUpPromptDialogComponent>) { }

  navigateToLogin() {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
    this.dialogRef.close();
  }
}
