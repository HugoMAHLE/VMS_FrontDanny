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
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, NgFor],
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

cards1 : {title: string, subtitle: string, hour: string, date: string}[] = [];
cards3 : {title: string, subtitle: string, hour: string, date: string}[] = [];
cards4 : {title: string, subtitle: string, hour: string, date: string}[] = [];

AddCard(){
  const newCard = {
    title: `Company ${this.cards1.length + 1}`,
    subtitle: `# guests`,
    hour: `10:30 A.M` ,
    date: `25/11/2024`
  }
  this.cards1.push(newCard);
}

AddCard3(){
  const newCard = {
    title: `Company ${this.cards3.length + 1}`,
    subtitle: `# guests`,
    hour: `10:30 A.M` ,
    date: `25/11/2024`
  }
  this.cards3.push(newCard);
}

AddCard4(){
  const newCard = {
    title: `Company ${this.cards4.length + 1}`,
    subtitle: `# guests`,
    hour: `10:30 A.M` ,
    date: `25/11/2024`
  }
  this.cards4.push(newCard);
}

navDetails(){
  this.router.navigate(['reception/recVisits']);
}

}
