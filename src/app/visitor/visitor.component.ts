import { Component, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import axios from 'axios';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCompanyComponent } from '../create-visit/dialog/addcompany/addCompany.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';

interface Visitor{
  type: string;
}

@Component({
  selector: 'app-visitor',
  standalone: true,
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.css',
  imports: [
    NgIf, NgFor,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatListModule,
    MatOptionModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule
  ]
})

export class VisitorComponent {
  apiURL = environment.api_URL;
  enterprises: string[] = [];
  selectedCompany: string = '';
  router = inject(Router);

  constructor(private dialog: MatDialog) {}

  visitorObj: any = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    company: ''
  };

  VisitorControl = new FormControl<Visitor | null> (null, Validators.required);
  selectFormControl = new FormControl ('', Validators.required)

  visitors: Visitor[] = [
    {type: 'New hire'},
    {type: 'Interplants'},
    {type: 'Suppliers'},
    {type: 'Clients'},
    {type: 'New intern'}
  ]

  newVisitorForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
  });

  get fnameControl(): FormControl {
    return this.newVisitorForm.get('fname') as FormControl;
  }

  get lnameControl(): FormControl {
    return this.newVisitorForm.get('lname') as FormControl;
  }

  get emailControl(): FormControl {
    return this.newVisitorForm.get('email') as FormControl;
  }

  get phoneControl(): FormControl {
    return this.newVisitorForm.get('phone') as FormControl;
  }

  get companyControl(): FormControl {
    return this.newVisitorForm.get('company') as FormControl;
  }

  async registerVisitor() {
    const fname: any = this.visitorObj.fname;
    const lname: any = this.visitorObj.lname;
    const email: any = this.visitorObj.email;
    const phone: any = this.visitorObj.phone;
    const company: any = this.visitorObj.company;

    if (!fname || !lname || !email || !phone || !company) {
      // Handle error or validation
    }

    try {
      const { data } = await axios.post(this.apiURL + 'visitor/create', {
        fname,
        lname,
        email,
        phone,
        company,
      });
      console.log('Registro exitoso:', data);
      alert('Registro exitoso');
    } catch (error) {
      console.error('Error en registro:', error);
      alert('Hubo un problema con el registro');
    }
  }

  // Ensure you correctly handle the event and the selected value
  onEnterpriseSelect(event: any) {
    console.log('Selected enterprise:', event);
    this.selectedCompany = event;
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
          console.log(response);
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

  navCreate(){
    this.router.navigate(['menu/create-visit'])
  }
}
