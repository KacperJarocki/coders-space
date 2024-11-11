import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participation } from '../interfaces/participation';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://backend.localhost/api/v1/participation';
  public postParticipation(participation: Participation) {
    return this.http.post(this.apiUrl, participation)
  }
  public deleteParticipation(participation: Participation) {
    return this.http.delete(this.apiUrl, { body: participation })
  }
}
