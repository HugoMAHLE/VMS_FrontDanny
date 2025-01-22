import { Component, ChangeDetectionStrategy, signal, inject} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caseta',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule],
  templateUrl: './caseta.component.html',
  styleUrl: './caseta.component.css'
})

export class CasetaComponent {
  protected readonly value = signal('');

  router = inject(Router);

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  logOff() {
    console.log("sesion terminada");
    localStorage.removeItem("angular18Local");
    alert("Sesión cerrada");
    this.router.navigate(['/login']);
  }

  navConfirmCaseta(){
    this.router.navigate(["/security/confirm"]);
  }
}
