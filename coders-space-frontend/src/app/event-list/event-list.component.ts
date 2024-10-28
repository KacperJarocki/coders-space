import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../interfaces/event';
import { CommonModule } from '@angular/common';
import { EventComponent } from '../event/event.component';
import { ComponentListState, ListFetchingError } from '../types/list-state.type';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventComponent, EventFormComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  listState: ComponentListState<Event> = { state: 'idle' };
  isModalVisible: boolean = false;
  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
  constructor(private eventService: EventService) { }
  ngOnInit() {
    this.refreshEvents();
  }
  refreshEvents() {
    this.listState = { state: 'loading' };
    this.eventService.getEvents()
      .subscribe({
        next: (data) => {
          this.listState = { state: 'success', results: data };
        },
        error: (error: ListFetchingError) => {
          this.listState = { state: 'error', error: error };
        }
      });
  }
}
