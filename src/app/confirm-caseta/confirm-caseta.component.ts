import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-confirm-caseta',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatButtonModule,MatToolbarModule,MatIconModule,NgFor],
  templateUrl: './confirm-caseta.component.html',
  styleUrl: './confirm-caseta.component.css'
})
export class ConfirmCasetaComponent {
  router = inject(Router);
    api_url = environment.api_URL
    showCards = true;
    guestArray: any[] = [];

    constructor(private cdr: ChangeDetectorRef) {}

  logOff() {
    console.log("sesion terminada");
    localStorage.removeItem("login");
    alert("Sesión cerrada");
    this.router.navigate(['/login']);
  }

  cards1 : {title: string, email: string, phone: string}[] = [];

  AddCard( card: any, title: string, email: string, phone: string){
    const newCard = {
      title: title,
      email: email,
      phone: phone 
    }
    card.push(newCard);
  }

  async getGuests(card: any, code: number) {
    const guestsTable = await axios.get(`${this.api_url}visit/rec-guests?code=${code}`)
    this.guestArray = guestsTable.data.msg

    for(const element of this.guestArray){
      const name = element.name;
      const email = element.email;
      const phone = element.phone;

      this.AddCard(card, name, email, phone)
    }
    this.cdr.detectChanges();
  }

  navOk(){
    this.router.navigate(['/security'])
  }
}
