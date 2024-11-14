import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicationListComponent } from '../publication-list/publication-list.component';
import { CommonModule } from '@angular/common';
import { PublicationFormComponent } from '../publication-form/publication-form.component';
import { ExplolerComponent } from '../exploler/exploler.component';
import { EventListComponent } from '../event-list/event-list.component';
import { AdminComponent } from '../admin/admin/admin.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AdminComponent, RouterLink, PublicationListComponent, CommonModule, PublicationFormComponent, ExplolerComponent, EventListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showPublicationList = true;
  showAdminPanel = false;
  changeView() {
    this.showPublicationList = !this.showPublicationList;
  }
  showAdmin() {
    this.showAdminPanel = !this.showAdminPanel;
  }

}
