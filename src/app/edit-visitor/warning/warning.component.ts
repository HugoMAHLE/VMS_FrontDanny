import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef,MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle,MatDialogClose,MatButtonModule],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css'
})
export class WarningComponent {
  constructor(private dialogRef: MatDialogRef<WarningComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
