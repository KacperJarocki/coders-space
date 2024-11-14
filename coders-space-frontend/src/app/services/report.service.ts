import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '../interfaces/report';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://backend.localhost/api/v1/report';
  createReport(report: Report) {
    return this.http.post(this.apiUrl, report);
  }
  retrieveReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl); // Upewnij się, że typ <Report[]> jest określony tutaj
  }

  getMostReportedItems(): Observable<{ type: string, id: number, count: number }[]> {
    return this.retrieveReports().pipe(
      map((reports: Report[]) => {
        const groupedReports: { [key: string]: { type: string, id: number, count: number } } = {};

        reports.forEach(report => {
          let key = '';
          if (report.publicationId !== null) {
            key = `publication-${report.publicationId}`;
            groupedReports[key] = groupedReports[key] || { type: 'publication', id: report.publicationId, count: 0 };
          } else if (report.eventId !== null) {
            key = `event-${report.eventId}`;
            groupedReports[key] = groupedReports[key] || { type: 'event', id: report.eventId, count: 0 };
          } else if (report.commentId !== null) {
            key = `comment-${report.commentId}`;
            groupedReports[key] = groupedReports[key] || { type: 'comment', id: report.commentId, count: 0 };
          }

          // Upewniamy się, że klucz istnieje zanim spróbujemy zwiększyć count
          if (groupedReports[key]) {
            groupedReports[key].count++;
          }
        });

        // Sortujemy zgrupowane raporty malejąco według liczby wystąpień
        return Object.values(groupedReports).sort((a, b) => b.count - a.count);
      })
    );
  }
}
