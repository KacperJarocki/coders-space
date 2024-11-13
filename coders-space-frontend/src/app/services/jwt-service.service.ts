import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Jwtpayload } from '../interfaces/jwtpayload';
import { MatDialog } from '@angular/material/dialog';
import { LoginSignUpPromptDialogComponent } from '../login-sign-up-prompt-dialog/login-sign-up-prompt-dialog.component';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor(private dialog: MatDialog) { }
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
      console.error('You are not logged in');
      this.dialog.open(LoginSignUpPromptDialogComponent);
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
