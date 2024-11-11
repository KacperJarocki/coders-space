import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../interfaces/event';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { CommentListComponent } from '../comment/comment-list/comment-list.component';
import { CommentFormComponent } from '../comment/comment-form/comment-form.component';
import { TagListComponent } from '../tags/tag-list/tag-list.component';
import { ReactionComponent } from '../reaction/reaction/reaction.component';
import { ParticipationComponent } from '../participation/participation.component';
import { JwtServiceService } from '../services/jwt-service.service';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, EditEventComponent, CommentListComponent, CommentFormComponent, TagListComponent, ReactionComponent, ParticipationComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  constructor(private eventService: EventService, private jwtService: JwtServiceService) { }
  @Input() event!: Event;
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();
  isModalVisible: boolean = false;
  commentsVisible: boolean = false;

  isItMine: boolean = false;
  emitRefresh(): void {
    this.refreshList.emit();
  }


  isItYours(): boolean {
    const clientId = this.jwtService.getClientId() ?? -1;
    return clientId == this.event.client_id;
  }
  ngOnInit() {
    this.isItMine = this.isItYours();
  }

  editEvent(): void {
    console.log('Editing event');
    this.isModalVisible = true;
  }
  closeEditEvent(): void {
    console.log('Closing edit event modal');
    this.isModalVisible = false
  }
  showComments(): void {
    console.log('Showing comments');
    this.commentsVisible = !this.commentsVisible;

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
