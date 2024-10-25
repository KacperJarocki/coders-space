import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../interfaces/publication';

@Component({
  selector: 'app-edit-publication',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.css']
})
export class EditPublicationComponent {
  @Input() publication!: Publication;
  @Output() close = new EventEmitter<void>();
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();
  editPublicationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private publicationService: PublicationService,
  ) {
    this.editPublicationForm = this.fb.group({
      title: [''],
      content: [''],
      publication_type: [''],
    });
  }

  ngOnInit(): void {
    if (this.publication) {
      this.openEditForm(this.publication);
    }
  }

  public openEditForm(publication: Publication): void {
    this.editPublicationForm.patchValue({
      title: publication.title,
      content: publication.content,
      publication_type: publication.publication_type,
    });
  }

  closeEditForm(): void {
    this.close.emit();
  }
  refresh(): void {
    this.refreshList.emit();
  }
  public updatePublication(): void {
    if (this.editPublicationForm.valid) {
      const updatedPublication = {
        ...this.publication,
        ...this.editPublicationForm.value,
      };

      this.publicationService.updatePublication(updatedPublication).subscribe({
        next: (response: any) => {
          console.log('Publication updated', response);
          this.closeEditForm();
          this.refresh();
        },
        error: (error: any) => {
          console.error('There was an error updating the publication!', error);
        },
      });
    }
  }
}

