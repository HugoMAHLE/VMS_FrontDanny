import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-video-visit',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './video-visit.component.html',
  styleUrl: './video-visit.component.css'
})
export class VideoVisitComponent {

}
