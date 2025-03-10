import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

export interface TableCompany{
  CName: string
  email: string
}

export interface TableData{
  Name: string
  LName: string
  Email: string
  Phone: string
}

const ELEMENT_DATA: TableCompany[] = [
  {CName: 'Daniel', email: 'daniel.a.tellez@mahle.com'},
  {CName: 'Daniel', email: 'daniel.a.tellez@mahle.com'},
  {CName: 'Daniel', email: 'daniel.a.tellez@mahle.com'}

]

@Component({
  selector: 'app-edit-visit',
  standalone: true,
  imports: [MatDivider,  
  FormsModule, 
  ReactiveFormsModule, 
  NgIf,
  MatTableModule,
  MatButtonModule],
  templateUrl: './edit-visit.component.html',
  styleUrl: './edit-visit.component.css'
})
export class EditVisitComponent {

  router = inject(Router);

  LVisitForm = new FormGroup({
    Date : new FormControl('', Validators.required),
    Checkin : new FormControl('', Validators.required)
  });

  get DateControl(): FormControl{
    return this.LVisitForm.get('Date') as FormControl
  }

  get CheckinControl(): FormControl{
    return this.LVisitForm.get('Checkin') as FormControl
  }
    displayedColumnsData : string[] = ['Name', 'LName', 'Email', 'Phone']
    displayedColumns : string[] = ['CName','email', 'Action']
    EmployeesDataSource = new MatTableDataSource<TableData>()
    dataSource = new MatTableDataSource<TableCompany>(ELEMENT_DATA);

   NavAdd(){
    this.router.navigate(['menu/add-visitor'])
   } 

   NavCreate(){
    this.router.navigate(['menu/create-visitor'])
   }
}
