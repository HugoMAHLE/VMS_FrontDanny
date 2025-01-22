import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-addcompany',
  standalone: true,
  templateUrl: './addCompany.component.html',
  styles: [],
  imports: [MatDialogModule, MatButtonModule, FormsModule], // Add FormsModule here
})
export class AddCompanyComponent {
  companyName: string = '';

  constructor(private dialogRef: MatDialogRef<AddCompanyComponent>) {}

  close() {
    this.dialogRef.close();
  }

  add() {
    this.dialogRef.close(this.companyName); // Return the input value to the parent component
  }
}
