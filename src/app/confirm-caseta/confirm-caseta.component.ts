import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-confirm-caseta',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatButtonModule,MatToolbarModule,MatIconModule,NgFor],
  templateUrl: './confirm-caseta.component.html',
  styleUrl: './confirm-caseta.component.css'
})
export class ConfirmCasetaComponent {
  router = inject(Router);

  logOff() {
    console.log("sesion terminada");
    localStorage.removeItem("login");
    alert("Sesión cerrada");
    this.router.navigate(['/login']);
  }

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

  navOk(){
    this.router.navigate(['/security'])
  }
}
