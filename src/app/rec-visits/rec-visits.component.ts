import { Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router } from 'express';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-rec-visits',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, NgFor],
  templateUrl: './rec-visits.component.html',
  styleUrl: './rec-visits.component.scss'
})
export class RecVisitsComponent {
  router = inject(Router);
  showCards = false;

  cards1 : {title: string, email: string, phone: string}[] = [];

  AddCard(){
    const newCard = {
      title: `Daniel Tellez`,
      email: `ejemplo@gmail.com`,
      phone: `656-107-4675` 
    }
    this.cards1.push(newCard);
  }

  logOff() {
    console.log("sesion terminada");
    localStorage.removeItem("login");
    alert("Sesión cerrada");
    this.router.navigate(['/login']);
  }

  navMenu(){
    this.router.navigate(['reception'])
  }

}
