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

cards1 : {code: string, title: string, subtitle: string, hour: string, date: string, schedule: string}[] = [];
cards3 : {code: string, title: string, subtitle: string, hour: string, date: string, schedule: string}[] = [];
cards4 : {code: string, title: string, subtitle: string, hour: string, date: string, schedule: string}[] = [];

AddCard(card: any, title: string, subtitle: number, hour: string, date: Date , schedule: string, code:string){
  const newCard = {
    title: title,
    subtitle: subtitle,
    hour: hour,
    date: date,
    schedule: schedule,
    code: code
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
    const schedule = element.schedule
    const code = element.code

    this.AddCard(card, company, guests, time, date, schedule, code )
  }
  this.cdr.detectChanges();
}


navDetails(code: string){
  this.router.navigate(['menu-visit/rec-visits'], {queryParams: {code: code}});
navDetails(){
  this.router.navigate(['rec-visits']);
>>>>>>> parent of 26e98e6 (Cambio de ruteos)
}

}
