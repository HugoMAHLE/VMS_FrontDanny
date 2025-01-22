import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-visitor',
  standalone: true,
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.css',
  imports: [
    FormsModule,
    CommonModule,
    NgIf,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    RouterLink
  ]
})

export class VisitorComponent {
  apiURL = environment.api_URL;

  visitorObj: any = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    company: ''
  };

  ClientForm = new FormGroup({
    name : new FormControl('', Validators.required),
    LName : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    Curp : new FormControl('', Validators.required),
    Tel : new FormControl ('', Validators.required)
  });

  get nameControl(): FormControl{
    return this.ClientForm.get('name') as FormControl
  }

  get LnameControl(): FormControl{
    return this.ClientForm.get('LName') as FormControl
  }

  get emailControl(): FormControl{
    return this.ClientForm.get('email') as FormControl
  }

  get CurpControl(): FormControl{
    return this.ClientForm.get('Curp') as FormControl
  }

  get TelControl(): FormControl{
    return this.ClientForm.get('Tel') as FormControl
  }

  async registerVisitor() {
    const fname: any = this.visitorObj.fname;
    const lname: any = this.visitorObj.lname;
    const email: any = this.visitorObj.email;
    const phone: any = this.visitorObj.phone;
    const company: any = this.visitorObj.company;

    if (!fname || !lname || !email || !phone || !company) {

    }


    try {
      const { data } = await axios.post(this.apiURL + "visitor/create", { fname, lname, email, phone, company });
      console.log("Registro exitoso:", data);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Hubo un problema con el registro");
    }
  }
}

