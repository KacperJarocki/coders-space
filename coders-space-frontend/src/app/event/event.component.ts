import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../interfaces/event';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { EditEventComponent } from '../edit-event/edit-event.component';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, EditEventComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  constructor(private eventService: EventService) { }
  @Input() event!: Event;
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();
  isModalVisible: boolean = false;
  emitRefresh(): void {
    this.refreshList.emit();
  }
  editEvent(): void {
    console.log('Editing event');
    this.isModalVisible = true;
  }
  closeEditEvent(): void {
    console.log('Closing edit event modal');
    this.isModalVisible = false
  }
  removeEvent(): void {
    console.log("deleting event");
    this.eventService.deleteEvent(this.event).subscribe({
      next: (response: any) => {
        console.log('Event deleted', response);
        this.emitRefresh();
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
    });
  }
}
