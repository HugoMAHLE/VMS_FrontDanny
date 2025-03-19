import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute,Router } from '@angular/router';
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
export class ConfirmCasetaComponent implements OnInit {
  router = inject(Router);
    api_url = environment.api_URL
    showCards = true;
    data: any = {};
    code: string | null = null;
    guestArray: any[] = [];

    constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.code = params['code'];
        console.log('Código recibido:', this.code);

        if (this.code) {
          this.getGuests(this.cards1, this.code);
          this.getCompany(this.code)
        }
      });
    }

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

  async getCompany(code: string){
    try{
      const visitInfo = await axios.get(`${this.api_url}visit/get-visit-info?code=${code}`);
           const companyID = visitInfo.data.msg.companyID;
           const company = await axios.get(`${this.api_url}visitor/company-by-id?id=${companyID}`)
           console.log("Company received: " + company)
           this.data = {
             codigo: this.code,
             company: company.data.company.company
           };
    } catch (error){
      console.error('Error fetching company data: ', error)
      throw new Error('No data collected')
    }finally{
      this.cdr.detectChanges();
    }
  }

  async getGuests(card: any, code: string) {
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
