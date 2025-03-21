import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor, NgClass, NgIf } from '@angular/common';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { ChangeDetectorRef } from '@angular/core';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
import LocalStorage from '../localStorage';
import { ZebraPrinter } from '../../utils/ZebraPrinter';

@Component({
  selector: 'app-rec-visits',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, NgClass, NgFor, NgIf],
  templateUrl: './rec-visits.component.html',
  styleUrl: './rec-visits.component.scss'
})

export class RecVisitsComponent implements OnInit {
  router = inject(Router);
  api_url = environment.api_URL
  showCards = true;
  guestArray: any[] = [];
  data: any = {};
  code: string | null = null;
  statusClass: string = 'Checked-In';
  text: string = '';
  visitorArray: any[] = [];
  dateStr: any = ""
  formattedDate: string = ""
  api_URL = environment.api_URL

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute) { }

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

  cards1: {
    name: string,
    email: string,
    phone: string,
    isPrintVisible: boolean,
    isCheckOutVisible: boolean }[] = [];

  AddCard(card: any, name: string, email: string, phone: string) {
    const newCard = {
      name: name,
      email: email,
      phone: phone,
      isPrintVisible: true,
      isCheckOutVisible: false
    }
    card.push(newCard);
  }

  async getCompany(code: string) {
    try {
      const visitInfo = await axios.get(`${this.api_url}visit/get-visit-info?code=${code}`);
      const companyID = visitInfo.data.msg.companyID;
      const company = await axios.get(`${this.api_url}visitor/company-by-id?id=${companyID}`)
      console.log("Company received: " + company)
      this.data = {
        codigo: this.code,
        company: company.data.company.company
      };
    } catch (error) {
      console.error('Error fetching company data: ', error)
      throw new Error('No data collected')
    } finally {
      this.cdr.detectChanges();
    }
  }

  async getGuests(card: any, code: string) {
    const guestsTable = await axios.get(`${this.api_url}visit/rec-guests?code=${code}`)
    this.guestArray = guestsTable.data.msg

    for (const element of this.guestArray) {
      const name = element.firstname + ' ' + element.lastname;
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

  async print(card: any) {
    const print = new ZebraPrinter();

    const visitInfoResponse = await axios.get(`${this.api_URL}visit/get-visit-info?code=${this.code}`);;
    const visitInfo = visitInfoResponse.data.msg;
    const enterpriseResponse = await axios.get(`${this.api_URL}visitor/company-by-id?id=${visitInfo.companyID}`);
    const hostResponse = await axios.get(`${this.api_URL}users/get-host-name?id=${visitInfo.userid}`);;

    const type = "Invitado";
    const name = card.name;
    const comp = enterpriseResponse.data.company.company;
    const date = visitInfo.date;
    const host = hostResponse.data.user.full_name;
    const code = this.code;

    console.log('label printed for: ', '\n', type, '\n', name, '\n', comp, '\n', host, '\n', date, '\n', code)
    print.printLabel(type, name, comp, host, date, code)

    this.showCheckOut(card.index);
    this.cdr.detectChanges();
  }

  showCheckOut(index: number){
    let i = index
    this.cards1[i].isPrintVisible = false;
    this.cards1[i].isCheckOutVisible = true;
  }

  hideCheckOut(index: number){
    this.cards1[index].isCheckOutVisible = false;
  }
}
