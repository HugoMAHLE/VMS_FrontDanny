import { ChangeDetectionStrategy, Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WarningComponent } from './warning/warning.component';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

export interface guests{
  Name: string;
  LastName: string;
  email:string;
  phone:string;
}

const list_guests: guests[] = [
  {Name: 'Daniel', LastName: 'Tellez', email: 'daniel.a.tellez@mahle.com', phone: '656-107-4675'},
  {Name: 'Diego', LastName: 'Originales', email: 'diego.a.originales@mahle.com', phone: '656-106-3246'},
  {Name: 'Julian', LastName: 'Elizarraras', email: 'julian.b.elizarraras@mahle.com', phone: '656-567-8912'},
  {Name: 'Hugo', LastName: 'Meza', email: 'hugo.a.meza@mahle.com', phone: '656-123-4565'},
  {Name: 'Gustavo', LastName: 'Montreal', email: 'gustavo.o.montreal@mahle.com', phone: '656-237-6789'},
  {Name: 'Juan', LastName: 'Montes', email: 'jaun.a.montes@mahle.com', phone: '656-107-4675'},
  {Name: 'Fernando', LastName: 'Valles', email: 'fernando.a.valles@mahle.com', phone: '656-106-3246'},
  {Name: 'Nancy', LastName: 'Magallanes', email: 'nancy.b.magallanes@mahle.com', phone: '656-567-8912'},
  {Name: 'Areli', LastName: 'Vazquez', email: 'areli.i.vazquez@mahle.com', phone: '656-123-4565'},
  {Name: 'Araceli', LastName: 'Mendez', email: 'araceli.o.mendez@mahle.com', phone: '656-237-6789'},
  {Name: 'Daniela', LastName: 'Camacho', email: 'daniela.a.camacho@mahle.com', phone: '656-107-4675'},
  {Name: 'Aurora', LastName: 'Rodriguez', email: 'aurora.a.rodriguez@mahle.com', phone: '656-106-3246'},
  {Name: 'Jorge', LastName: 'Perez', email: 'jorge.a.perez@mahle.com', phone: '656-567-8912'},
  {Name: 'Oscar', LastName: 'Garcia', email: 'oscar.a.garcia@mahle.com', phone: '656-123-4565'},
  {Name: 'Alan', LastName: 'Romero', email: 'alan.o.romero@mahle.com', phone: '656-237-6789'},
];


@Component({
  selector: 'app-edit-visitor',
  standalone: true,
  imports: [ NgIf, 
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatInputModule,
    MatPaginatorModule
    ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-visitor.component.html',
  styleUrl: './edit-visitor.component.css'
})
export class EditVisitorComponent implements AfterViewInit {

  displayedColumns: string[] = ['Name', 'LastName', 'email', 'phone','actions'];
  dataSource = new MatTableDataSource(list_guests);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialog = inject(MatDialog);

  openDialog(){
    this.dialog.open(WarningComponent, {
      width: '250px',
    });
  }
  
  visitorObj: any = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    company: ''
  };

  AddVisitorForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
  });

  get fnameControl(): FormControl {
    return this.AddVisitorForm.get('fname') as FormControl;
  }

  get lnameControl(): FormControl {
    return this.AddVisitorForm.get('lname') as FormControl;
  }

  get emailControl(): FormControl {
    return this.AddVisitorForm.get('email') as FormControl;
  }

  get phoneControl(): FormControl {
    return this.AddVisitorForm.get('phone') as FormControl;
  }

  get companyControl(): FormControl {
    return this.AddVisitorForm.get('company') as FormControl;
  }
}
