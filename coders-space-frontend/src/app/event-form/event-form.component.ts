import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../services/event.service';
import { JwtServiceService } from '../services/jwt-service.service';
import { Event } from '../interfaces/event';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
  eventForm: FormGroup;
  constructor(private snackBar: MatSnackBar, private eventService: EventService, private jwtService: JwtServiceService, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      name: [''],
      content: [''],
      date: ['']
    });
  }
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();
  closeForm(): void {
    this.close.emit();
  }
  refresh(): void {
    this.refreshList.emit();
  }
  createEvent(): void {
    if (this.eventForm.valid) {
      let newEvent: Event = this.eventForm.value;
      newEvent.client_id = this.jwtService.getClientId() || -1;
      newEvent.date = this.formatDateToLocalDateTime(newEvent.date);
      console.log('New Event:', newEvent);
      this.eventService.createEvent(newEvent).subscribe({
        next: (response) => {
          this.closeForm();
          this.refresh();
        },
        error: (error) => {
          this.snackBar.open('Event creation failed', 'OK', {
            duration: 1000,
          });
        }
      });
    }
  }
  private formatDateToLocalDateTime(dateTime: string): string {
    return new Date(dateTime).toISOString().slice(0, 16);
  }
}
