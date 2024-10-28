import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url = "http://backend.localhost/api/v1/events";
  constructor(private http: HttpClient) { }
  public getEvents() {
    return this.http.get<Event[]>(this.url);
  }
}
