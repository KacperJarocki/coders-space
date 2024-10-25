import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../interfaces/publication';
import { JwtServiceService } from '../services/jwt-service.service';

@Component({
  selector: 'app-publication-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './publication-form.component.html',
  styleUrl: './publication-form.component.css'
})

export class PublicationFormComponent {
  private publicationService = inject(PublicationService);
  private jwtService = inject(JwtServiceService)
  publicationForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    publication_type: new FormControl('POST')
  })
  @Output() close = new EventEmitter<void>();
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();

  closeForm(): void {
    this.close.emit();
  }
  refresh(): void {
    this.refreshList.emit();
  }
  createPublication(): void {
    const client_id = this.jwtService.getClientId();
    const publication: Publication = {
      title: this.publicationForm.get('title')?.value || "",
      content: this.publicationForm.get('content')?.value || "",
      publication_type: this.publicationForm.get('publication_type')?.value || "0",
      client_id: client_id || -1,
      post_created: "",
      id: 0
    }
    console.log(publication);
    this.publicationService.createPublication(publication).subscribe({
      next: (response) => {
        alert('Publication created successfully');
        this.refresh();
        this.closeForm();
      },
      error: (error) => {
        console.error('Publication creation failed', error);
      }
    })

  }
}
