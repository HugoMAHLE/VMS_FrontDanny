import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../environments/environment.development';
import axios from 'axios';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './host.component.html',
  styleUrl: './host.component.css'
})
export class HostComponent {
  router = inject(Router);
  apiURL = environment.api_URL;

  rowData: any[] = [];
  displayedColumns: string[] = ['Name', 'Email'];

  ngOnInit() {
    const storedData = localStorage.getItem("angular18Local");
    if (storedData) {
      const localArray = JSON.parse(storedData);
      const tokenData = localArray[localArray.length - 1];
      const token = tokenData.token;
      const payload = JSON.parse(atob(token.split(".")[1]));
      this.fetchTableData(payload.userid);
    }
  }

  async fetchTableData(user: any) {
    try {
      const response = await axios.get(this.apiURL + "host/getVisit", { params: {user} });
      this.rowData = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  navCreateVisit(){
    this.router.navigate(["/menu/createvisit"]);
  }
}
