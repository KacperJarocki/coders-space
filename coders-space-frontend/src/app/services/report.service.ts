import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '../interfaces/report';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://backend.localhost/api/v1/report';
  createReport(report: Report) {
    return this.http.post(this.apiUrl, report);
  }
  retrieveReports() {
    return this.http.get(this.apiUrl);
  }
}
