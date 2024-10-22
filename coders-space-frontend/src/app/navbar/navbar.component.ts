import { Component } from '@angular/core';
import { LoginButtonsComponent } from '../login-buttons/login-buttons.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginButtonsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
