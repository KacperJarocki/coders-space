import { Injectable } from '@angular/core';
import { ProfileDetails } from '../interfaces/profile-details';

@Injectable({
  providedIn: 'root'
})
export class ProfileDetailsService {

  constructor() { }
  getProfileDetails(username: string): ProfileDetails {
    const profileDetails: ProfileDetails = {
      id: 0,
      bio: 'bio',
      clientName: username,
      github_username: null,
      gitlab_username: 'gitlab_username',
      x_username: 'x_username'
    }
    return profileDetails;
  }
}
