import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import axios from 'axios';
import localStorage from '../localStorage';
import { environment } from '../../environments/environment.development';
import { ChangeDetectorRef } from '@angular/core';
import { VisitErrorComponent } from '../visit-error/visit-error.component';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-visit-confirm',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './visit-confirm.component.html',
  styleUrls: ['./visit-confirm.component.css'],
})
export class VisitConfirmComponent {

  router = inject(Router);
  visitorArray: any[] = [];
  currentVisitorIndex: number = 0;
  currentVisitor: any = null;
  api_URL = environment.api_URL;
  visitID: any = 0

  // readonly dialog = inject(MatDialog);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const storedData = localStorage.getLocalStorageData('visitInfo');

    if (storedData) {
      const visitInfo = storedData[storedData.length - 1];
      const visitID = visitInfo.visitID;
      this.visitID = visitID
      console.log(visitID);
      this.getVisitors(visitID);
    }
  }

  async getVisitors(id: any) {
    try {
      const response = await axios.get(`${this.api_URL}visitor/get-visitors?id=${id}`);
      this.visitorArray = response.data.msg;
      console.log(this.visitorArray);
      if (this.visitorArray.length > 0) {
        this.currentVisitor = this.visitorArray[this.currentVisitorIndex];
        this.cdr.detectChanges();
        console.log("Current visitor:", this.currentVisitor);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  showNextVisitor() {
    if (this.visitorArray.length === 0) {
      console.error("No visitors available!");
      return;
    }

    if (this.currentVisitorIndex < this.visitorArray.length - 1) {
      this.currentVisitorIndex++;
      this.currentVisitor = this.visitorArray[this.currentVisitorIndex];
    } else {
      this.router.navigate(["/video"]);
    }

    console.log("Current visitor index:", this.currentVisitorIndex);
    console.log("Current visitor:", this.currentVisitor);
  }

  // Error(){
  //   this.dialog.open(VisitErrorComponent);
  // }


  navYes() {

    this.showNextVisitor();
  }

  navNo() {
    // Logic for "No" button (e.g., deny attendance)
    this.showNextVisitor();
  }

  async updateVisitorStatus(stat: any){
    const id = this.currentVisitor.visitorid
    const response = await axios.post(`${this.api_URL}visitor/update-status`, { status: stat, visitorid: id, visitid: this.visitID});


  }
}

