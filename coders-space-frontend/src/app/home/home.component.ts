import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicationListComponent } from '../publication-list/publication-list.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PublicationListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
