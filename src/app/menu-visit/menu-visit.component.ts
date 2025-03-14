import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-visit',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterOutlet],
  templateUrl: './menu-visit.component.html',
  styleUrl: './menu-visit.component.css'
})
export class MenuVisitComponent {
  router = inject(Router);
  
  logOff() {
    console.log("sesion terminada");
    localStorage.removeItem("login");
    alert("Sesión cerrada");
    this.router.navigate(['/login']);
  }
}
