import { Component, Input } from '@angular/core';
import { ParticipationService } from '../services/participation.service';
import { JwtServiceService } from '../services/jwt-service.service';
import { Event } from '../interfaces/event';
import { Participation } from '../interfaces/participation';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-participation',
  standalone: true,
  imports: [],
  templateUrl: './participation.component.html',
  styleUrl: './participation.component.css'
})
export class ParticipationComponent {
  @Input() event!: Event;
  constructor(private snackBar: MatSnackBar, private service: ParticipationService, private jwtService: JwtServiceService) { }
  join: boolean = false;
  participate() {
    const participation: Participation = {
      id: 0,
      clientId: this.jwtService.getClientId() ?? -1,
      eventId: this.event.id
    }
    if (!this.join) {
      this.service.postParticipation(participation).subscribe({
        next: () => {
          this.snackBar.open("U have joined event", "OK", { duration: 2000 });
          this.join = true;
        },
        error: (error) => {
          this.snackBar.open("cannot reach server", "OK", { duration: 2000 });
        }
      })
    } else {
      this.service.deleteParticipation(participation).subscribe({
        next: () => {
          this.snackBar.open("U have left event", "OK", { duration: 2000 });
          this.join = false;
        },
        error: (error) => {
          this.snackBar.open("cannot reach server", "OK", { duration: 2000 });
        }
      })
    }

  }
}
