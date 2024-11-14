import { Component, EventEmitter, Output, } from '@angular/core';
import { JwtServiceService } from '../services/jwt-service.service';
@Component({
  selector: 'app-exploler',
  standalone: true,
  imports: [],
  templateUrl: './exploler.component.html',
  styleUrl: './exploler.component.css'
})
export class ExplolerComponent {
  constructor(private jwtService: JwtServiceService) { }
  message = "Events";
  changeMessage = false;
  @Output() AdminPanel = new EventEmitter<void>();
  @Output() changeFeed = new EventEmitter<void>();
  isAdmin: boolean = false;
  role: string = this.jwtService.getRole() ?? 'Not logged in';

  ngOnInit() {
    this.jwtService.userRole$.subscribe({
      next: (role) => {
        this.role = role ?? 'Not logged in';
      },
    })
  }
  isItAdmin(): boolean {
    return this.role === 'ADMIN'
  }
  emitAdminPanel() {
    this.AdminPanel.emit();
  }


  private emitChangeFeed() {
    this.changeFeed.emit();
  }
  public change(): void {
    if (this.changeMessage) {
      this.message = "Events";
      this.changeMessage = false;
    } else {
      this.message = "Publications";
      this.changeMessage = true;
    }
    this.emitChangeFeed();
  }
}
