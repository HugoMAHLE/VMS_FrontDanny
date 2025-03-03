import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css'
})
export class WarningComponent {
  constructor(private dialogRef: MatDialogRef<WarningComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
