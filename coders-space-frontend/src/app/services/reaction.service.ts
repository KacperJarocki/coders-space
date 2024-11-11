import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reaction } from '../interfaces/reaction';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(private http: HttpClient) { }
  private url = "http://backend.localhost/api/v1/reaction";

  public retrive(reaction: Reaction) {
    console.log(reaction);
    return this.http.post<Reaction[]>(this.url, reaction);
  }
  public createAndUpdate(reaction: Reaction) {
    console.log(reaction);
    return this.http.put<Reaction>(this.url, reaction);
  }
  public delete(reaction: Reaction) {
    console.log(reaction);
    return this.http.delete<Reaction>(this.url, { body: reaction });
  }
}
