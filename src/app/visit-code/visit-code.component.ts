import { Component, OnInit, signal, inject} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-visit-code',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatLabel,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './visit-code.component.html',
  styleUrl: './visit-code.component.css'
})
export class VisitCodeComponent implements OnInit {
  protected readonly value = signal('');
  router = inject(Router);

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  ngOnInit(): void {

  }

  logOff() {
    console.log("sesion terminada");
    localStorage.removeItem("angular18Local");
    alert("Sesión cerrada");
    this.router.navigate(['/login']);
  }

  navConfirm(){
    this.router.navigate(["/visitor/confirm-visit"])
  }

}
