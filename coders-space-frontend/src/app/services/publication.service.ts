import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publication } from '../interfaces/publication';

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
  public deletePublication(publication: Publication) {
    console.log('Publication will be deleted service');
    return this.http.delete(this.url, { body: publication })
  }
  public updatePublication(publication: Publication) {
    return this.http.put(this.url, publication)
  }
}
