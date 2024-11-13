import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileDetailsService } from '../services/profile-details.service';
import { CommonModule } from '@angular/common';
import { ProfileDetails } from '../interfaces/profile-details';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  constructor(private route: ActivatedRoute, private profileService: ProfileDetailsService) { }
  username: string | null = null;
  profileDetails?: ProfileDetails;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.getProfileDetails();
    });
  }
  getProfileDetails(): void {
    this.profileDetails = this.profileService.getProfileDetails(this.username ?? "");
  }
}
