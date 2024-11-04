import { Component, Input } from '@angular/core';
import { Event } from '../../interfaces/event';
import { Publication } from '../../interfaces/publication';
import { ComponentListState, ListFetchingError } from '../../types/list-state.type';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent {

  @Input() event?: Event;
  @Input() publication?: Publication;

  listState: ComponentListState<Comment> = { state: 'idle' };
  isModalVisible: boolean = false;
  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
  constructor(private commentService: CommentService) { }
  ngOnInit() {
    this.refreshComments();
  }
  refreshComments() {
    const comment: Comment = {
      eventId: this.event?.id ?? null,
      publicationId: this.publication?.id ?? null,
      content: "",
      clientId: 0,
      id: 0,
    };
    console.log(comment);
    this.listState = { state: 'loading' };
    this.commentService.getComments(comment)
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
