import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Jwtpayload } from '../interfaces/jwtpayload';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor(private snackBar: MatSnackBar, private router: Router) { }
  private userSubject = new BehaviorSubject<string | null>(null); // Holds the current user state
  public user$: Observable<string | null> = this.userSubject.asObservable();
  setUser(user: string): void {
    this.userSubject.next(user);
  }

  clearUser(): void {
    this.userSubject.next(null);
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  private decodeToken(): Jwtpayload | null {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      if (token) {
        return jwtDecode<Jwtpayload>(token);
      }
    }
    return null;
  }
  public getClientIdToShowButton(): number | null {
    const decoded = this.decodeToken();
    if (decoded && decoded.id) {
      this.setUser(decoded.name);
      return decoded.id;
    } else {
      this.clearUser();
      return null;
    }
  }
  public getClientId(): number | null {
    const decoded = this.decodeToken();
    if (decoded && decoded.id) {
      this.setUser(decoded.name);
      return decoded.id;
    } else {
      this.clearUser();
      if (this.isBrowser()) {
        const snackBarRef = this.snackBar.open('You are not logged in. Please log in or sign up.', 'Go to login', {
          duration: 3000, // Snackbar stays for 3 seconds
          verticalPosition: 'top', // Position at the bottom
          horizontalPosition: 'center', // Center aligned horizontally
        });
        snackBarRef.onAction().subscribe(() => { this.router.navigate(['/login']); });
      }
      return null;
    }
  }
  public getClientName(): string | null {
    const decoded = this.decodeToken();
    if (decoded && decoded.name) {
      this.setUser(decoded.name);
      return decoded.name;
    } else {
      this.clearUser();
      return null;
    }
  }
}
