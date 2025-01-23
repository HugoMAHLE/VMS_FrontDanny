import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visit-confirm',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './visit-confirm.component.html',
  styleUrls: ['./visit-confirm.component.css'],
})
export class VisitConfirmComponent {

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
