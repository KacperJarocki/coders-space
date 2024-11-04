import { Component, Input } from '@angular/core';
import { ComponentListState, ListFetchingError } from '../../types/list-state.type';
import { Comment } from '../../interfaces/comment';
import { CommentService } from '../../services/comment.service';
import { Event } from '../../interfaces/event';
import { Publication } from '../../interfaces/publication';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {
}
