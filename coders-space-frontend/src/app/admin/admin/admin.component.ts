import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminReportsComponent } from '../admin-reports/admin-reports.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AdminReportsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  selectedSection: string = 'dashboard'; // Default section

  selectSection(section: string) {
    this.selectedSection = section;
  }
}
