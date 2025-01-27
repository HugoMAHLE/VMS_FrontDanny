import { Component, OnInit, signal, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import LocalStorage from '../localStorage';

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
  styleUrls: ['./visit-code.component.css']
})
export class VisitCodeComponent implements OnInit {
  protected readonly value = signal('');
  router = inject(Router);
  api_URL = environment.api_URL;

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  ngOnInit(): void {}

  logOff() {
    console.log('sesion terminada');
    LocalStorage.clearLocalStorage('login');
    alert('Sesión cerrada');
    this.router.navigate(['/login']);
  }

  async navConfirm() {
    const visitCode = this.value();

    if (!visitCode || visitCode.trim() === '' || visitCode.length < 10) {
      alert('Please enter a valid visit code before submitting.');
      return;
    }

    if (!/^\d+$/.test(visitCode)) {
      alert('The visit code must only contain numbers. Please try again.');
      return;
    }

    try {
      const response = await axios.get(`${this.api_URL}visit/get-visit-info?code=${visitCode}`);
      const visitInfo = response.data.msg;
      if (visitInfo) {
        alert('Code is valid! Proceeding...');

        LocalStorage.saveToLocalStorage('visitInfo', visitInfo)

        this.router.navigate(['/confirm-info']);
      } else {
        alert('Invalid code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying the visit code:', error);
      alert('An error occurred while verifying the code. Please try again later.');
    }
  }
}
