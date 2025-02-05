import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../environments/environment.development';
import { MatTableDataSource } from '@angular/material/table';
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

  displayedColumns: string[] = ['Date', 'Time', 'Company', 'Guests'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    const storedData = localStorage.getItem("login");
    if (storedData) {
      const localArray = JSON.parse(storedData);
      const tokenData = localArray[localArray.length - 1];
      const token = tokenData.token;
      const payload = JSON.parse(atob(token.split(".")[1]));
      this.fetchTableData(payload.userid);
    }
  }

  async fetchTableData(userid: any) {
    try {
        if (!userid) throw new Error("User ID is required");

        const response = await axios.get(`${this.apiURL}users/get-host-visits`, { params: { userid } });

        if (Array.isArray(response.data)) {
            this.dataSource.data = response.data; // Asigna los datos al dataSource
        } else {
            console.error("Expected an array but got:", response.data);
            this.dataSource.data = [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        this.dataSource.data = [];
    }
  }

  navCreateVisit(){
    this.router.navigate(["/menu/create-visit"]);
  }
}


