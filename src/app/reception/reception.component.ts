import { Component,inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { title } from 'process';
import { NgFor, NgIf} from '@angular/common';
import axios from 'axios';
import { DataSource } from '@angular/cdk/collections';
import { environment } from '../../environments/environment.development';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, NgFor],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css'
})
export class ReceptionComponent {
router = inject(Router);
api_url = environment.api_URL
showCards = true;
visitArray: any[] = [];

constructor(private cdr: ChangeDetectorRef) {}

ngOnInit(){
  this.getTodayVisits(this.cards1,1);
  this.getTodayVisits(this.cards1,2);
  this.getTodayVisits(this.cards3,3);
  this.getTodayVisits(this.cards4,4);
}

logOff() {
  console.log("sesion terminada");
  localStorage.removeItem("login");
  alert("Sesión cerrada");
  this.router.navigate(['/login']);
}

cards1 : {title: string, subtitle: string, hour: string, date: string}[] = [];
cards3 : {title: string, subtitle: string, hour: string, date: string}[] = [];
cards4 : {title: string, subtitle: string, hour: string, date: string}[] = [];

AddCard(card: any, title: string, subtitle: number, hour: string, date: Date ){
  const newCard = {
    title: title,
    subtitle: subtitle,
    hour: hour,
    date: date
  }
  card.push(newCard);
}

async getTodayVisits(card: any, plant: number){
  const visitTable = await axios.get(`${this.api_url}visit/recep-visits?plant=${plant}`)
  this.visitArray = visitTable.data.msg;

  for (const element of this.visitArray) {
    const company = element.company;
    const guests = element.guests;
    const date = element.date;
    const time = element.setHour;

    this.AddCard(card, company, guests, time, date )
  }
  this.cdr.detectChanges();
}

navDetails(){
  this.router.navigate(['rec-visits']);
}

}
