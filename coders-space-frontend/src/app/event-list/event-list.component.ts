import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../interfaces/event';
import { CommonModule } from '@angular/common';
import { EventComponent } from '../event/event.component';

type ListFetchingError = { state: number, message: string };
///idle
type IdleState = { state: 'idle' };
//Loading
type LoadingState = { state: 'loading' };
//success
type SuccessState = { state: 'success', results: Event[] };
//error
type ErrorState = { state: 'error', error: ListFetchingError };

type ComponentListState = IdleState | LoadingState | SuccessState | ErrorState;




@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  listState: ComponentListState = { state: 'idle' };
  constructor(private eventService: EventService) { }
  ngOnInit() {
    this.refreshEvents();
  }
  refreshEvents() {
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
