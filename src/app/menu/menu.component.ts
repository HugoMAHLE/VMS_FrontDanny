import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, inject} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import LocalStorage from '../localStorage';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    NgIf ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent implements OnInit{
  @ViewChild(MatSidenav, {static: true})
  sidenav!: MatSidenav;

  router = inject(Router);
  userType = "visit";

  constructor (private observer : BreakpointObserver){

  }

  logOff() {
    console.log('sesion terminada');
    LocalStorage.clearLocalStorage('login');
    alert('Sesión cerrada');
    this.router.navigate(['/login']);
  }

  navHost(): void {
    this.router.navigate(['/menu/host']);
  }


  navCreateVisit(): void {
    this.router.navigate(['/menu/create-visit']);
  }

  navVisitor() : void{
    this.router.navigate(['menu/create-visitor']);
  }

  navEditVisitor() : void{
    this.router.navigate(['menu/edit-visitor'])
  }

  navEditVisit() : void{
    this.router.navigate(['menu/edit-visit'])
  }

  ngOnInit(): void{

    this.observer.observe(["(max-width: 800px)"])
    .subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode = "over";
        this.sidenav.close();
      }
      else{
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    })

    switch (this.userType)
    {
      case ("Visit"):
        this.router.navigateByUrl('menu/visit');
        break;
      case ("Admin"):
        this.router.navigateByUrl('menu/admin');
        break;
      case ("Recepcion"):
        this.router.navigateByUrl('menu/recep');
        break;
      case ("Host"):
        this.router.navigateByUrl('menu/host');
        break;
      case ("Guardhouse"):
        this.router.navigateByUrl('menu/guard');
        break;
      default:
        break;
    }

  }
}
