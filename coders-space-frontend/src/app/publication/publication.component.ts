import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Publication } from '../interfaces/publication';
import { PublicationService } from '../services/publication.service';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {
  @Input() publication!: Publication;
  @Output() publicationDeleted = new EventEmitter<void>();  // Event emitter to notify parent

  constructor(private publicationService: PublicationService) { }

  public removePublication() {
    console.log('Publication will be deleted');
    this.publicationService.deletePublication(this.publication).subscribe({
      next: (response: any) => {
        console.log('Publication deleted', response);
        this.publicationDeleted.emit();  // Emit event to parent
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
    });
  }

  public editPublication() { }
}
