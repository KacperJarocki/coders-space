import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Publication } from '../interfaces/publication';
import { PublicationService } from '../services/publication.service';
import { EditPublicationComponent } from '../edit-publication/edit-publication.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [EditPublicationComponent, CommonModule],
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
  @Input() publication!: Publication;
  @Output() publicationsChanged = new EventEmitter<void>();
  isModalVisible: boolean = false;

  constructor(private publicationService: PublicationService) { }

  editPublication(): void {
    this.isModalVisible = true;
    console.log('Opening edit publication modal');
  }

  closeEditPublication(): void {
    this.isModalVisible = false;
    console.log('Closing edit publication modal');
  }

  public removePublication() {
    if (confirm('Are you sure you want to delete this publication?')) {
      this.publicationService.deletePublication(this.publication).subscribe({
        next: (response: any) => {
          console.log('Publication deleted', response);
          this.publicationsChanged.emit();
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        },
      });
    }
  }
}

