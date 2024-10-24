import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publication } from '../interfaces/publication';
import { JwtServiceService } from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private url = "http://backend.localhost/api/v1/publications";
  constructor(private http: HttpClient) { }
  public getPublications() {
    return this.http.get<Publication[]>(this.url);
  }
  public createPublication(publication: Publication) {
    return this.http.post(this.url, publication)
  }
}
