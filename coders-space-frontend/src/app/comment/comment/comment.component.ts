import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentService } from '../../services/comment.service';
import { ReactionComponent } from '../../reaction/reaction/reaction.component';
import { JwtServiceService } from '../../services/jwt-service.service';
import { ClientService } from '../../services/client.service';
import { ClientName } from '../../interfaces/client';
import { ReportComponent } from '../../report/report.component';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [RouterLink, CommentFormComponent, ReactionComponent, ReportComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();
  clientName: ClientName = { clientName: '' };
  isItMine: boolean = false;
  newMsg = "Edit Comment";
  constructor(private snackBar: MatSnackBar, private commentService: CommentService, private jwtService: JwtServiceService, private clientService: ClientService) { }
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
        this.snackBar.open('Comment deleted', 'OK', {
          duration: 2000,
        });
        this.commentChanged();
      }
    })
  }
  commentChanged() {
    this.refreshList.emit();
  }

}
