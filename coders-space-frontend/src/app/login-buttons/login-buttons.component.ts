import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JwtServiceService } from '../services/jwt-service.service';

@Component({
  selector: 'app-login-buttons',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './login-buttons.component.html',
  styleUrl: './login-buttons.component.css'
})
export class LoginButtonsComponent {
  constructor(private jwtService: JwtServiceService) { }
  name: string | null = this.jwtService.getClientName();

  ngOnInit() {
    this.jwtService.user$.subscribe({
      next: (user) => {
        this.name = user;
      },
    })
  }
  logout() {
    localStorage.clear();
    location.reload();
  }

}
