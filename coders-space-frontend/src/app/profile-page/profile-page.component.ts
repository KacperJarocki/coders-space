import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileDetailsService } from '../services/profile-details.service';
import { CommonModule } from '@angular/common';
import { ProfileDetails } from '../interfaces/profile-details';
import { FormsModule } from '@angular/forms';
import { JwtServiceService } from '../services/jwt-service.service';
import { PublicationListComponent } from '../publication-list/publication-list.component';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PublicationListComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  constructor(private route: ActivatedRoute, private profileService: ProfileDetailsService, private jwtService: JwtServiceService) { }
  username: string | null = null;
  profileDetails?: ProfileDetails;
  editMode = false;
  isItMine: boolean = false;
  isItYours(): boolean {
    const clientName: string = this.jwtService.getClientName() ?? "";
    return clientName === this.username;
  }
  editableProfile: ProfileDetails = { // Initialize with empty values
    id: null,
    bio: '',
    clientName: '',
    githubUsername: '',
    gitlabUsername: '',
    xusername: ''
  };


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      if (this.username) {
        this.getProfileDetails(this.username);
      }
    });
    this.isItMine = this.isItYours();

  }

  getProfileDetails(username: string): void {
    this.profileService.getProfileDetails(username).subscribe(profile => {
      this.profileDetails = profile || {
        id: null,
        bio: '',
        clientName: '',
        githubUsername: '',
        gitlabUsername: '',
        xusername: ''
      }; // Default to empty profile if null
      this.editableProfile = { ...this.profileDetails }; // Clone for editing
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode && this.profileDetails) {
      this.editableProfile = { ...this.profileDetails };
    }
  }

  saveProfile(): void {
    if (this.editableProfile) {
      this.profileService.createOrUpdateProfileDetails(this.editableProfile).subscribe(updatedProfile => {
        this.profileDetails = updatedProfile;
        this.editMode = false;
      });
    }
  }
}
