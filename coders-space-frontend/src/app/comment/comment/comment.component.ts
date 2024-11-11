import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentService } from '../../services/comment.service';
import { ReactionComponent } from '../../reaction/reaction/reaction.component';
import { JwtServiceService } from '../../services/jwt-service.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommentFormComponent, ReactionComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();

  constructor(private commentService: CommentService, private jwtService: JwtServiceService) { }
  isItYours(): boolean {
    const clientId = this.jwtService.getClientId() ?? -1;
    return clientId == this.comment.clientId;
  }
  remove(): void {
    this.commentService.deleteComment(this.comment).subscribe({
      next: (response: any) => {
        console.log('Comment deleted', response);
        alert('Comment deleted');
        this.commentChanged();
      }
    })
  }
  commentChanged() {
    this.refreshList.emit();
  }

}
