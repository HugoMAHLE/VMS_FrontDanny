import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import axios from 'axios';
import localStorage from '../localStorage';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-visit-confirm',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './visit-confirm.component.html',
  styleUrls: ['./visit-confirm.component.css'],
})
export class VisitConfirmComponent {

  router = inject(Router);
  visitorArray = [];
  api_URL = environment.api_URL;

  ngOnInit(): void {

    const storedData = localStorage.getLocalStorageData('visitInfo');

    if (storedData) {
      const visitInfo = storedData[storedData.length - 1]; // Last token saved
      const visitID = visitInfo.visitID
      console.log(visitID)
      this.getVisitors(visitID);

    }

  }

  async getVisitors(id: any){
    try{
      const response = await axios.get(`${this.api_URL}visitor/get-visitors?id=${id}`);
      this.visitorArray = response.data.msg
      console.log(this.visitorArray)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  navYes(){
    this.router.navigate(["/visitor/video"]);
  }

  navNo(){
    this.router.navigate(["/visitor/error"])
  }
}
