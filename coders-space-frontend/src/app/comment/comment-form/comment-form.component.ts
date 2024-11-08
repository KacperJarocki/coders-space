import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtServiceService } from '../../services/jwt-service.service';
import { CommentService } from '../../services/comment.service';
import { Event } from '../../interfaces/event';
import { Publication } from '../../interfaces/publication';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {
  @Input() commentData: Comment | null = null;
  @Input() Event: Event | null = null;
  @Input() Publication: Publication | null = null;
  @Input() msg: string = "Add comment";
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();
  commentForm!: FormGroup;
  isVisible: boolean = false;
  constructor(private fb: FormBuilder, private jwtService: JwtServiceService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: [this.commentData?.content || '', [Validators.required, Validators.minLength(1)]]
    });
  }
  openPopup(): void {
    this.isVisible = true;
  }

  closePopup(): void {
    this.isVisible = false;
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const comment: Comment = {
        id: this.commentData?.id ?? 0,
        content: this.commentForm.value.content,
        clientId: this.jwtService.getClientId() || -1,
        eventId: this.Event?.id ?? this.commentData?.eventId ?? null,
        publicationId: this.Publication?.id ?? this.commentData?.publicationId ?? null

      }
      this.commentService.postComment(comment).subscribe({
        next: (response) => {
          console.log('Comment posted');
          console.log(response);
          this.refreshList.emit();
        }
      })

      this.closePopup();
    }
  }
}
