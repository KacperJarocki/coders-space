import { Component } from '@angular/core';
import { LoginButtonsComponent } from '../login-buttons/login-buttons.component';
import { LoginInformationComponent } from '../login-information/login-information.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginButtonsComponent, LoginInformationComponent, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
