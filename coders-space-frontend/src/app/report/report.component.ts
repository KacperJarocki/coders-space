import { Component, Input } from '@angular/core';
import { Comment } from '../interfaces/comment';
import { Event } from '../interfaces/event';
import { Publication } from '../interfaces/publication';
import { ReportService } from '../services/report.service';
import { Report } from '../interfaces/report';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  constructor(private reportService: ReportService, private snackBar: MatSnackBar) { }
  @Input() comment?: Comment;
  @Input() event?: Event;
  @Input() publication?: Publication;
  sendReport() {
    const report: Report = {
      id: -2,
      publicationId: this.publication?.id || null,
      eventId: this.event?.id || null,
      commentId: this.comment?.id || null,
      date: new Date().toISOString()
    }
    this.reportService.createReport(report).subscribe({
      next: (report: any) => {
        const snackBarRef = this.snackBar.open('It was reported', 'Close', {
          duration: 1000, // Snackbar stays for 3 seconds
          verticalPosition: 'top', // Position at the bottom
          horizontalPosition: 'center', // Center aligned horizontally
        });
      },
      error: (error) => {
        const snackBarRef = this.snackBar.open(error, 'Close', {
          duration: 1000, // Snackbar stays for 3 seconds
          verticalPosition: 'top', // Position at the bottom
          horizontalPosition: 'center', // Center aligned horizontally
        });
      }
    });
  }
}
