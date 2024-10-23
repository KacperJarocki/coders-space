import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicationListComponent } from '../publication-list/publication-list.component';
import { CommonModule } from '@angular/common';
import { PublicationFormComponent } from '../publication-form/publication-form.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PublicationListComponent, CommonModule, PublicationFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isModalVisible: boolean = false;

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

}
