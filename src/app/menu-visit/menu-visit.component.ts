import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-menu-visit',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './menu-visit.component.html',
  styleUrl: './menu-visit.component.css'
})
export class MenuVisitComponent {

}
