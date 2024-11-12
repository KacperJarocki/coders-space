import { Component } from '@angular/core';
import { JwtServiceService } from '../services/jwt-service.service';

@Component({
  selector: 'app-login-information',
  standalone: true,
  imports: [],
  templateUrl: './login-information.component.html',
  styleUrl: './login-information.component.css'
})
export class LoginInformationComponent {
  constructor(private jwtService: JwtServiceService) { }

  name: string = this.jwtService.getClientName() ?? 'Not logged in';

  ngOnInit() {
    this.jwtService.user$.subscribe({
      next: (user) => {
        this.name = user ?? 'Not logged in';
      },
    })
  }
}
