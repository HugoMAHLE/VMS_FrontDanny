import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WarningComponent } from './warning/warning.component';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-visitor',
  standalone: true,
  imports: [ NgIf, 
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-visitor.component.html',
  styleUrl: './edit-visitor.component.css'
})
export class EditVisitorComponent {
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
