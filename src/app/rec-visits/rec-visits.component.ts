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

  cards1: { title: string, email: string, phone: string, isPrintVisible: boolean, isCheckOutVisible: boolean }[] = [];

  AddCard(card: any, title: string, email: string, phone: string) {
    const newCard = {
      title: title,
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

  print(i: number): void {
    this.printVisitors();
    this.showCheckOut(i);
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

  async printVisitors() {
    try {
      const storedData = LocalStorage.getLocalStorageData('visitInfo');
      let visitID: any = 0
      let userid: any = 0

      if (storedData) {
        const visitInfo = storedData[storedData.length - 1];
        visitID = visitInfo.visitID;
        this.code = visitInfo.code;
        let date = new Date(visitInfo.date);

        let formattedDate = new Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "long",
          year: "2-digit",
        }).format(date);

        console.log(formattedDate); // "30 de enero de 25"
        this.dateStr = formattedDate
        userid = visitInfo.userid

      }

      const response = await axios.get(`${this.api_URL}visitor/get-visitors?id=${visitID}`);
      this.visitorArray = response.data.msg;
      console.log(this.visitorArray);

      for (const element of this.visitorArray) {
        const type: string = "Invitado";
        const name: string = element.firstname + " " + element.lastname;

        const enterpriseResponse = await axios.get(`${this.api_URL}visitor/company-by-id?id=${element.companyid}`);
        const enterprise: string = enterpriseResponse.data.company.company; // Adjust based on actual API response
        const hostResponse = await axios.get(`${this.api_URL}users/get-host-name?id=${userid}`);;
        const host: string = hostResponse.data.user.full_name;
        console.log(
          type + ' ' +
          name + ' ' +
          enterprise + ' ' +
          host + ' ' +
          this.dateStr + ' ' +
          this.code
        )
        this.printZebra(type, name, enterprise, host, this.dateStr, this.code);
        console.log("success")
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  printZebra(type: any, name: any, enterprise: any, host: any, date: any, code: any) {
    const font_width_per_char = 45
    const label_width = 804
    const label_height = 402
    const type_width = type.length
    const code_width = code.length
    const positionType = (label_width - type_width) / 2
    const positionCode = (label_width - code_width) / 2

    const mahleZpl = `^XA
  ^FO10,10^GFA,665,665,19,,::03NF03KF03F807F83FC001JFC,::::::03F81FE07F03FC07F03F807F83FC001FE,:::03F81FE07F03FC07F03KF83FC001JFC,:::03F81FE07F03KF03KF83FC001JFC,::03F81FE07F03KF03F807F83FC001FE,:::03F81FE07F03FC0FF03F807F83FE001FE,03F81FE07F03FC07F03F807F83JF1JFC,:::::,::^FS
      ^A0N,30,30 ^FO510,10^FDNumeros de emergencia^FS
      ^A0N,25,25 ^FO560,35^FD111/6566491600^FS
      ^FO10,55 ^GB790,3,3 ^FS
      ^A0N,40,40^FO${positionType},70 ^FD${type}^FS
      ^FO10,120 ^GB790,3,3 ^FS
      ^A0N,65,65 ^FO10,145^FD${name}^FS
      ^A0N,45,45 ^FO10,235^FD${enterprise}^FS
      ^A0N,30,30 ^FO10,305^FDHost: ^FS
      ^A0N,30,30 ^FO90,305^FD ${host}^FS
      ^A0N,30,30 ^FO420,305^FD Fecha: ^FS
      ^A0N,30,30 ^FO540,305^FD ${date}^FS
      ^FO10,340 ^GB790,3,3 ^FS
      ^A0N,50,50 ^FO${positionCode},360^FD ${code} ^FS
  ^XZ`;

    // `^XA
    // ^FO10,10^GFA,665,665,19,,::03NF03KF03F807F83FC001JFC,::::::03F81FE07F03FC07F03F807F83FC001FE,:::03F81FE07F03FC07F03KF83FC001JFC,:::03F81FE07F03KF03KF83FC001JFC,::03F81FE07F03KF03F807F83FC001FE,:::03F81FE07F03FC0FF03F807F83FE001FE,03F81FE07F03FC07F03F807F83JF1JFC,:::::,::^FS
    // ^CFA,15 ^FO520,10^FDNumeros de emergencia^FS
    // ^CFA,15 ^FO560,30^FD111/6566491600^FS
    // ^FO10,55 ^GB790,3,3 ^FS
    // ^CFA,40 ^FO${positionType},70 ^FD${type}^FS
    // ^FO10,120 ^GB790,3,3 ^FS
    // ^FX Second section with recipient address and permit information.
    // ^CFA,45 ^FO10,145^FD${name}^FS
    // ^CFA,45 ^FO10,205^FD${enterprise}^FS
    // ^CFA,25 ^FO10,305^FDHost: ^FS
    // ^CFA,25 ^FO90,305^FD ${host}^FS
    // ^CFA,25 ^FO420,305^FD Fecha: ^FS
    // ^CFA,25 ^FO540,305^FD ${date}^FS
    // ^FO10,340 ^GB790,3,3 ^FS
    // ^CFA,45 ^FO${positionCode},360^FD ${code} ^FS
    // ^XZ`;

    this.text = 'Label Sent to printer'
    this.printBarcode(mahleZpl)

  };

  printBarcode = async (
    zpl: string,
  ) => {
    try {
      console.log("printers: fetching...")
      const browserPrint = new ZebraBrowserPrintWrapper();
      const printers = await browserPrint.getAvailablePrinters();
      console.log(printers)
      const defaultPrinter = await browserPrint.getDefaultPrinter();
      browserPrint.setPrinter(defaultPrinter);

      console.log("Default Printer:", defaultPrinter);

      const printerStatus = await browserPrint.checkPrinterStatus();
      console.log("Printer Status:", printerStatus);

      if (printerStatus.isReadyToPrint) {
        console.log("Sending ZPL to printer:", zpl);
        browserPrint.print(zpl);
      } else {
        console.error("Printer is not ready. Errors:", printerStatus.errors);
      }
    } catch (e: any) {
      console.error("Error while printing:", e.message || e);
      this.text = 'Error while printing';
      //this.textChange.emit(this.text);
    }
  };

}
