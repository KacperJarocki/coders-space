import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagsPublicationsEvents } from '../interfaces/tags-publications-events';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }
  readonly URL = 'http://backend.localhost/api/v1/tags'

  createTag(tag: TagsPublicationsEvents) {
    return this.http.put<TagsPublicationsEvents>(this.URL, tag);
  }
  retriveTag(tag: TagsPublicationsEvents) {
    return this.http.post<TagsPublicationsEvents[]>(this.URL, tag);
  }
  deleteTag(tag: TagsPublicationsEvents) {
    return this.http.delete(this.URL, { body: tag });
  }
}
