import { Injectable } from '@angular/core';
import { ProfileDetails } from '../interfaces/profile-details';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileDetailsService {

  constructor(private http: HttpClient) { }
  getProfileDetails(username: string) {
    return this.http.get<ProfileDetails>(`http://backend.localhost/api/v1/profile/${username}`);
  }
  createOrUpdateProfileDetails(profileDetails: ProfileDetails) {
    return this.http.post<ProfileDetails>('http://backend.localhost/api/v1/profile', profileDetails);
  }
}
