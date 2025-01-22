import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';
import { SelectionModel } from '@angular/cdk/collections';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { AddCompanyComponent } from './dialog/addcompany/addCompany.component';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import {  MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

export class YourModule {}

export interface Visitor {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface VisitData {
  companyName: string;
  dateOfVisit: any;
  checkInTime: any;
  reasonForVisit: string;
}

@Component({
  selector: 'app-create-visit',
  standalone: true,
  imports: [
    MatDivider,
    NgIf, NgFor,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.css'],
})
export class CreateVisitComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  dataSource: MatTableDataSource<Visitor> = new MatTableDataSource<Visitor>([]);
  enterprises: string[] = [];
  selectedCompany: string = '';
  apiURL = environment.api_URL;

  CVisitForm = new FormGroup({
    reason: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    ent: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  get nameControl(): FormControl {
    return this.CVisitForm.get('name') as FormControl;
  }

  get reasonControl(): FormControl {
    return this.CVisitForm.get('reason') as FormControl;
  }

  get dateControl(): FormControl {
    return this.CVisitForm.get('date') as FormControl;
  }

  get entControl(): FormControl {
    return this.CVisitForm.get('ent') as FormControl;
  }

  ngOnInit(): void {

    const storedData = localStorage.getItem('visitFormData');
    this.fetchEnterprises();

    if (storedData) {
      const visitData = JSON.parse(storedData);
      this.CVisitForm.patchValue({
        name: visitData.companyName || '',
        date: visitData.dateOfVisit || '',
        ent: visitData.checkInTime || '',
        reason: visitData.reasonForVisit || ''
      });
    }

    const storedVisitors = localStorage.getItem('selectedVisitors');
    if (storedVisitors) {
        this.dataSource.data = JSON.parse(storedVisitors); // Example visitors array
    }
  }

  addVisitor() {
    localStorage.removeItem('visitFormData');

    console.log('Form Status:', this.CVisitForm.status); // Should log 'VALID' if all fields are filled
    console.log('Form Values:', this.CVisitForm.value); // Should log all current values

    const visitData: VisitData = {
      companyName: this.selectedCompany || '',
      dateOfVisit: this.CVisitForm.get('date')?.value || '',
      checkInTime: this.CVisitForm.get('ent')?.value || '',
      reasonForVisit: this.CVisitForm.get('reason')?.value || ''
    };
    console.log('Parsed visitData:', visitData);
    localStorage.setItem('visitFormData', JSON.stringify(visitData));

    this.router.navigate(['/menu/add-visitor']);
  }

  createVisitor() {
    this.router.navigate(['/menu/create-visitor']);
  }

  onEnterpriseSelect(selectedEnterprise: string) {
    console.log('Selected enterprise:', selectedEnterprise);
  }

  async fetchEnterprises() {
    try {
      const response = await axios.get(this.apiURL + "visitor/getcompanies");
      if (response.data.ok) {
        this.enterprises = response.data.msg; // Assuming 'msg' contains the array of visitors
      } else {
        console.error('Error fetching Enterprises:', response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching Enterprises:', error);
    }
  }

  async addEnterprise() {
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(async (company) => {
      if (company) {
        try {
          const response = await axios.post(this.apiURL + 'visitor/addcompany', { company }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response)
          if (response.data.ok) {
            this.enterprises = response.data.msg;
            this.selectedCompany = company;
            window.location.reload();
          } else {
            console.error('Error adding company:', response.data.msg);
          }
        } catch (error) {
          console.error('Error adding company:', error);
        }
      } else {
        // Clear the selection if no company was added
        this.selectedCompany = ''; // Reset the selected value
        window.location.reload();
      }
    });
  }

  async createVisit() {
    const name = this.nameControl.value; // Extract the value from the control
    const reason = this.reasonControl.value;
    const date = this.dateControl.value;
    const entry = this.entControl.value;
    let uid = 0

    const storedData = localStorage.getItem('angular18Local');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        const id = data[0].userid;
        console.log('requesting UserID')
        const uidResponse = await axios.get(`${this.apiURL}users/getuid?id=${id}`);
        console.log(uidResponse)
        uid = uidResponse.data.uid;
        console.log("UserID desde backend: " + uid)
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    } else {
      console.warn('No data found in localStorage for key angular18Local');
    }

    const storedVisitors = localStorage.getItem('selectedVisitors');
    let selectedVisitors = [];
    if (storedVisitors) {
      selectedVisitors = JSON.parse(storedVisitors);
    }

    const payload = {
      name,
      reason,
      date,
      entry,
      uid,
      visitors: selectedVisitors
    };

    try {
      const response = await axios.post(this.apiURL + 'visitor/createvisit', payload);
      console.log(response);

      if (response.data.ok) {
        console.log('Visit created successfully');
        localStorage.removeItem('selectedVisitors');
        localStorage.removeItem('visitFormData');

      } else {
        console.error('Error adding company:', response.data.msg);
      }
    } catch (error) {
      console.error('Error adding company:', error);
    }
  }

  displayedColumns: string[] = ['fname', 'lname', 'email', 'phone'];
  selection = new SelectionModel<Visitor>(true, []);
}
