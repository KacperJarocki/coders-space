import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { CommonModule } from '@angular/common';
import { PublicationService } from '../../services/publication.service';
import { EventService } from '../../services/event.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment';
import { Publication } from '../../interfaces/publication';
import { Event } from '../../interfaces/event';
@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent {
  mostReportedItems: { type: string, id: number, count: number, details?: any }[] = [];

  constructor(
    private reportService: ReportService,
    private publicationService: PublicationService,
    private eventService: EventService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.reportService.getMostReportedItems().subscribe(items => {
      this.mostReportedItems = items;
      this.mostReportedItems.forEach(item => {
        this.loadDetails(item);
      });
    });
  }

  loadDetails(item: { type: string, id: number, count: number, details?: any }) {
    if (item.type === 'publication') {
      this.publicationService.getPublicationById(item.id).subscribe(details => item.details = details);
    } else if (item.type === 'event') {
      this.eventService.getEventById(item.id).subscribe(details => item.details = details);
    } else if (item.type === 'comment') {
      this.commentService.getCommentByid(item.id).subscribe(details => item.details = details);
    }
  }

  deleteItem(item: { type: string, id: number }) {
    if (item.type === 'publication') {
      this.publicationService.deletePublication({ id: item.id } as Publication).subscribe(() => {
        this.mostReportedItems = this.mostReportedItems.filter(i => i.id !== item.id || i.type !== 'publication');
      });
    } else if (item.type === 'event') {
      this.eventService.deleteEvent({ id: item.id } as Event).subscribe(() => {
        this.mostReportedItems = this.mostReportedItems.filter(i => i.id !== item.id || i.type !== 'event');
      });
    } else if (item.type === 'comment') {
      this.commentService.deleteComment({ id: item.id } as Comment).subscribe(() => {
        this.mostReportedItems = this.mostReportedItems.filter(i => i.id !== item.id || i.type !== 'comment');
      });
    }
  }
}
