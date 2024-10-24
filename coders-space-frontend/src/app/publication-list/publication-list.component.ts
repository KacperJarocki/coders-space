import { Component } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../interfaces/publication';
import { PublicationComponent } from '../publication/publication.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publication-list',
  standalone: true,
  imports: [CommonModule, PublicationComponent],
  templateUrl: './publication-list.component.html',
  styleUrl: './publication-list.component.css'
})
export class PublicationListComponent {
  PublicationList: Publication[] = [];
  isLoaded = false;
  constructor(private publicationService: PublicationService) { }
  ngOnInit() {
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
  }
}
