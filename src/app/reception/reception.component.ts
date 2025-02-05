import { Component,inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css'
})
export class ReceptionComponent {
router = inject(Router);

logOff() {
  console.log("sesion terminada");
  localStorage.removeItem("login");
  alert("Sesión cerrada");
  this.router.navigate(['/login']);
}

navConfirmCaseta(){
  this.router.navigate(["/security/confirm"]);
}

}
