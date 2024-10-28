import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicationListComponent } from '../publication-list/publication-list.component';
import { CommonModule } from '@angular/common';
import { PublicationFormComponent } from '../publication-form/publication-form.component';
import { ExplolerComponent } from '../exploler/exploler.component';
import { EventListComponent } from '../event-list/event-list.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PublicationListComponent, CommonModule, PublicationFormComponent, ExplolerComponent, EventListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showPublicationList = true;
  changeView() {
    this.showPublicationList = !this.showPublicationList;
  }

}
