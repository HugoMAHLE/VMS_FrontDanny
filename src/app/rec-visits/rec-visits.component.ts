import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-rec-visits',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, NgFor],
  templateUrl: './rec-visits.component.html',
  styleUrl: './rec-visits.component.scss'
})
export class RecVisitsComponent {
  router = inject(Router);
  api_url = environment.api_URL
  showCards = true;
  guestArray: any[] = [];
  data: any = {};

  constructor(private cdr: ChangeDetectorRef) {}

  cards1: { title: string, email: string, phone: string }[] = [];

  AddCard(card: any, title: string, email: string, phone: string) {
    const newCard = {
      title: title,
      email: email,
      phone: phone
    }
    card.push(newCard);
  }

  async getCompany(codigo: number){
    try{
      const getCode = await axios.get(`${this.api_url}visit/rec-visitCode?code=${codigo}`)
        this.data = {
          codigo: getCode.data.codigo,
          company: getCode.data.Company
        };
    } catch (error){
      console.error('Error fetching company data: ', error)
      throw new Error('No data collected')
    }
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


  logOff() {
    console.log("sesion terminada");
    localStorage.removeItem("login");
    alert("Sesión cerrada");
    this.router.navigate(['/login']);
  }

  navMenu() {
    this.router.navigate(['reception'])
  }

}
