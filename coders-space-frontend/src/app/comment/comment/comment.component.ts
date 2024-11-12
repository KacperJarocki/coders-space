import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentService } from '../../services/comment.service';
import { ReactionComponent } from '../../reaction/reaction/reaction.component';
import { JwtServiceService } from '../../services/jwt-service.service';
import { ClientService } from '../../services/client.service';
import { ClientName } from '../../interfaces/client';

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
  clientName: ClientName = { clientName: '' };
  isItMine: boolean = false;
  constructor(private commentService: CommentService, private jwtService: JwtServiceService, private clientService: ClientService) { }
  isItYours(): boolean {
    const clientId = this.jwtService.getClientIdToShowButton() ?? -1;
    return clientId == this.comment.clientId;
  }

  getClientName(): void {
    this.clientService.retriveClientName(this.comment.clientId).subscribe({
      next: (response: ClientName) => { this.clientName = response; },
      error: (error: any) => { console.error('There wa an error!', error); },
    });
  }

  ngOnInit() {
    this.isItMine = this.isItYours();
    this.getClientName();
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
