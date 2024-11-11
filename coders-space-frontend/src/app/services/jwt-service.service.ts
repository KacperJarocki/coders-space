import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Jwtpayload } from '../interfaces/jwtpayload';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor() { }
  private decodeToken(): Jwtpayload | null {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode<Jwtpayload>(token);
    } else {
      return null;
    }
  }
  public getClientIdToShowButton(): number | null {
    const decoded = this.decodeToken();
    if (decoded && decoded.id) {
      return decoded.id;
    } else {
      return null;
    }
  }
  public getClientId(): number | null {
    const decoded = this.decodeToken();
    if (decoded && decoded.id) {
      return decoded.id;
    } else {
      console.error('You are not logged in');
      alert('You are not logged in');
      return null;
    }
  }
}
