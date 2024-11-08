import { Component, Input } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: Comment;
  constructor(private commentService: CommentService) { }
  remove(): void {
    this.commentService.deleteComment(this.comment).subscribe({
      next: (response: any) => {
        console.log('Comment deleted', response);
        alert('Comment deleted');
      }
    })
  }
}
