import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private url = "http://backend.localhost/api/v1/comments";

  public getComments(comment: Comment) {
    return this.http.put<Comment[]>(this.url, comment);
  }
}
