import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  standalone: true,
  templateUrl: './success.component.html',
  styles: [],
  imports: [MatDialogModule, MatButtonModule, FormsModule], // Add FormsModule here
})
export class SuccessComponent {
  companyName: string = '';

  constructor(private dialogRef: MatDialogRef<SuccessComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
