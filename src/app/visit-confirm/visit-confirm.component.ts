import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from 'express';

@Component({
  selector: 'app-visit-confirm',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './visit-confirm.component.html',
  styleUrl: './visit-confirm.component.css'
})
export class VisitConfirmComponent implements OnInit {

  router = inject(Router);

  ngOnInit(): void {

  }

  navYes(){
    this.router.navigate(["/visitor/video"]);
  }

  navNo(){
    this.router.navigate(["/visitor/error"])
  }
}
