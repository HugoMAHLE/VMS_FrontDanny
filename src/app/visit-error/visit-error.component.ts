import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router } from 'express';

@Component({
  selector: 'app-visit-error',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './visit-error.component.html',
  styleUrl: './visit-error.component.css'
})
export class VisitErrorComponent {
  router = inject(Router);

  navConfirm(){
    this.router.navigate(["/visiitor/confirm-visit"]);
  }
}
