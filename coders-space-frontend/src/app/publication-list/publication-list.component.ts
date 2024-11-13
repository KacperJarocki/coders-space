import { Component, Input } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../interfaces/publication';
import { PublicationComponent } from '../publication/publication.component';
import { CommonModule } from '@angular/common';
import { PublicationFormComponent } from '../publication-form/publication-form.component';

@Component({
  selector: 'app-publication-list',
  standalone: true,
  imports: [CommonModule, PublicationComponent, PublicationFormComponent],
  templateUrl: './publication-list.component.html',
  styleUrl: './publication-list.component.css'
})
export class PublicationListComponent {
  PublicationList: Publication[] = [];
  isLoaded = false;
  isModalVisible: boolean = false;
  @Input() ForClientProfile: boolean = false;
  @Input() clientName: string | null = '';

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
  constructor(private publicationService: PublicationService) { }
  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.isLoaded = false;
    console.log('refreshing');
    if (!this.ForClientProfile) {
      this.publicationService.getPublications().subscribe({
        next: (data) => {
          console.log(data);
          this.PublicationList = data;
          this.isLoaded = true;
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    } else {
      this.publicationService.getPublicationByClientName(this.clientName ?? "").subscribe({
        next: (data) => {
          console.log(data);
          this.PublicationList = data;
          this.isLoaded = true;
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    }
  }
}

