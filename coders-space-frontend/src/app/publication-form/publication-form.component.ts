import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-publication-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './publication-form.component.html',
  styleUrl: './publication-form.component.css'
})

export class PublicationFormComponent {
  publicationForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    publication_type: new FormControl(-1)
  })
  @Output() close = new EventEmitter<void>();

  closeForm(): void {
    this.close.emit();
  }
  createPublication(): void { }

}
