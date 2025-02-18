import { Component,inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { title } from 'process';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, NgIf, NgFor],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css'
})
export class ReceptionComponent {
router = inject(Router);

showCards = false;

logOff() {
  console.log("sesion terminada");
  localStorage.removeItem("login");
  alert("Sesión cerrada");
  this.router.navigate(['/login']);
}

navConfirmCaseta(){
  this.router.navigate(["/security/confirm"]);
}

cards1 : string[] = [];
cards3 : string[] = [];
cards4 : string[] = [];

AddCard(){
  const newCard = `Carta ${this.cards1.length + 1}`;
  this.cards1.push(newCard);
}

AddCard3(){
  const newCard = `Carta ${this.cards3.length + 1}`;
  this.cards3.push(newCard);
}

AddCard4(){
  const newCard = `Carta ${this.cards4.length + 1}`;
  this.cards4.push(newCard);
}

}
