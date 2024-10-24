import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { Publication } from '../interfaces/publication';
import { PublicationService } from '../services/publication.service';
import { EditPublicationComponent } from '../edit-publication/edit-publication.component';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [EditPublicationComponent],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {
  @Input() publication!: Publication;
  @Output() publicationsChanged = new EventEmitter<void>();
  isModalVisible: boolean = false;

  editPublication(): void {
    this.isModalVisible = true;
    console.log('Edit publication');
  }

  closeEditPublication(): void {
    this.isModalVisible = false;
    console.log('Close edit publication')
  }

  constructor(private publicationService: PublicationService) { }

  public removePublication() {
    console.log('Publication will be deleted');
    this.publicationService.deletePublication(this.publication).subscribe({
      next: (response: any) => {
        console.log('Publication deleted', response);
        this.publicationsChanged.emit();  // Emit event to parent
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
    });
  }

}
