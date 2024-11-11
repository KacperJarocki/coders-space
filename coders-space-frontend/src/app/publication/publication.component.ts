import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Publication } from '../interfaces/publication';
import { PublicationService } from '../services/publication.service';
import { EditPublicationComponent } from '../edit-publication/edit-publication.component';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from '../comment/comment-list/comment-list.component';
import { CommentFormComponent } from '../comment/comment-form/comment-form.component';
import { TagListComponent } from '../tags/tag-list/tag-list.component';
import { ReactionComponent } from '../reaction/reaction/reaction.component';
import { JwtServiceService } from '../services/jwt-service.service';

@Component({
  selector: 'app-publication',
  imports: [EditPublicationComponent, CommonModule, CommentListComponent, CommentFormComponent, TagListComponent, ReactionComponent],
  standalone: true,
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
  @Input() publication!: Publication;
  @Output() refreshList = new EventEmitter<void>();
  isModalVisible: boolean = false;
  commentsVisible: boolean = false;
  isItMine: boolean = false;

  isItYours(): boolean {
    const clientId = this.jwtService.getClientId() ?? -1;
    return clientId == this.publication.client_id;
  }
  constructor(private publicationService: PublicationService, private jwtService: JwtServiceService) {
  }
  ngOnInit() {
    this.isItMine = this.isItYours();
  }
  showComments(): void {
    console.log('Showing comments');
    this.commentsVisible = !this.commentsVisible;
  }

  editPublication(): void {
    this.isModalVisible = true;
    console.log('Opening edit publication modal');
  }

  closeEditPublication(): void {
    this.isModalVisible = false;
    console.log('Closing edit publication modal');
  }
  refresh(): void {
    this.refreshList.emit();
  }
  public removePublication() {
    if (confirm('Are you sure you want to delete this publication?')) {
      this.publicationService.deletePublication(this.publication).subscribe({
        next: (response: any) => {
          console.log('Publication deleted', response);
          this.refreshList.emit();
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        },
      });
    }
  }
}

