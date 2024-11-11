import { Component, Input } from '@angular/core';
import { ParticipationService } from '../services/participation.service';
import { JwtServiceService } from '../services/jwt-service.service';
import { Event } from '../interfaces/event';
import { Participation } from '../interfaces/participation';
@Component({
  selector: 'app-participation',
  standalone: true,
  imports: [],
  templateUrl: './participation.component.html',
  styleUrl: './participation.component.css'
})
export class ParticipationComponent {
  @Input() event!: Event;
  constructor(private service: ParticipationService, private jwtService: JwtServiceService) { }
  join: boolean = false;
  participate() {
    const participation: Participation = {
      id: 0,
      clientId: this.jwtService.getClientId() ?? -1,
      eventId: this.event.id
    }
    if (!this.join) {
      this.service.postParticipation(participation).subscribe({
        next: () => { alert("U have joined the event"); this.join = true; },
        error: (error) => { console.log(error); alert("cannot reach server"); }
      })
    } else {
      this.service.deleteParticipation(participation).subscribe({
        next: () => { alert("U have left the event"); this.join = false; },
        error: (error) => { console.log(error); alert("cannot reach server"); }
      })
    }

  }
}
