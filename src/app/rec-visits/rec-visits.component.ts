import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor, NgIf } from '@angular/common';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-rec-visits',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, NgFor, NgIf],
  templateUrl: './rec-visits.component.html',
  styleUrl: './rec-visits.component.scss'
})

export class RecVisitsComponent implements OnInit {
  router = inject(Router);
  api_url = environment.api_URL
  showCards = true;
  guestArray: any[] = [];
  data: any = {};
  code: string | null = null


  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      console.log('Código recibido:', this.code);

      if (this.code) {
        this.getGuests(this.cards1, this.code);
      }
    });
  }

  cards1: { title: string, email: string, phone: string,   isPrintVisible: boolean, isCheckOutVisible: boolean }[] = [];

  AddCard(card: any, title: string, email: string, phone: string) {
    const newCard = {
      title: title,
      email: email,
      phone: phone,
      isPrintVisible : true,
      isCheckOutVisible : false
    }
    card.push(newCard);
  }

  showCheckOut(index: number){
    this.cards1[index].isPrintVisible = false;
    this.cards1[index].isCheckOutVisible = true;
  }

  hideCheckout(index: number){
    this.cards1[index].isCheckOutVisible = false
  }

  async getCompany(codigo: number) {
    try {
      const getCode = await axios.get(`${this.api_url}visit/rec-visitCode?code=${codigo}`)
      this.data = {
        codigo: getCode.data.codigo,
        company: getCode.data.Company
      };
    } catch (error) {
      console.error('Error fetching company data: ', error)
      throw new Error('No data collected')
    }
  }

  async getGuests(card: any, code: string) {
    const guestsTable = await axios.get(`${this.api_url}visit/rec-guests?code=${code}`)
    this.guestArray = guestsTable.data.msg

    for (const element of this.guestArray) {
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
    this.router.navigate(['menu-visit/reception'])
  }

}
