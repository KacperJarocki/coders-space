import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
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
  public postComment(comment: Comment) {
    return this.http.post<Comment>(this.url, comment);
  }
  public deleteComment(comment: Comment) {
    return this.http.delete<Comment>(this.url, { body: comment });
  }
}
