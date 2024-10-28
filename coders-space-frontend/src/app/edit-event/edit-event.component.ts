import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Event } from '../interfaces/event';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {
  @Input() event!: Event;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  editEventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {
    this.editEventForm = this.fb.group({
      name: [''],
      content: [''],
      date: ['']
    });
  }

  ngOnInit(): void {
    if (this.event) {
      this.openEditForm(this.event);
    }
  }

  openEditForm(event: Event): void {
    this.editEventForm.
      patchValue({
        name: event.name,
        content: event.content,
        date: new Date(event.date).toISOString().substring(0, 16) // ISO format for datetime-local
      });
  }

  closeEditForm(): void {
    this.close.emit();
  }

  updateEvent(): void {
    if (this.editEventForm.valid) {
      const updatedEvent = {
        ...this.event,
        ...this.editEventForm.value,
        date: new Date(this.editEventForm.value.date).toISOString() // Ensure date is compatible with backend
      };

      this.eventService.updateEvent(updatedEvent).subscribe({
        next: (response: any) => {
          console.log('Event updated', response);
          this.closeEditForm();
        },
        error: (error: any) => {
          console.error('Error updating the event!', error);
        },
      });
    }
  }
}
