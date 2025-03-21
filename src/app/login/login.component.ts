import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import axios from 'axios';
import localStorage from '../localStorage';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  isLoginView = true; // Toggles between Login and Register views
  show = false; // Toggles visibility of specific components
  hide = true;

  userObj: any = {
    userID: '',
    firstname: '',
    lastname: '',
    plant: '',
    email: '',
    pass: ''
  };

  apiURL = environment.api_URL;
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedData = localStorage.getLocalStorageData('login');
    if (storedData) {
      const tokenData = storedData[storedData.length - 1]; // Last token saved
      const payload = this.decodeToken(tokenData.token);
      const type = tokenData.type.trim()

      // Check if the token is valid
      if (payload && !this.isTokenExpired(payload.exp)) {
        this.navUserType(type);
      } else {
        // Token expired
        localStorage.clearLocalStorage('login');
      }
    }
  }

  keyEnterPress(data : string, evt : KeyboardEvent){

  }

  // Login function
  async onLogin(): Promise<void> {
    const { userID, pass } = this.userObj;

    try {
      const { data } = await axios.post(`${this.apiURL}users/login`, { userid: userID, pass });

      if (data && data.token && data.type && data.userid) {
        console.log('Login exitoso:', data);

        localStorage.saveToLocalStorage('login',data);
        this.navUserType(data.type.trim());
      } else {
        alert('Error desconocido al iniciar sesión.');
      }
    } catch (error: any) {
      this.handleHttpError(error, 'login');
    }
  }

  // Registration function
  async onRegister(): Promise<void> {
    const { userID, firstname, lastname, plant, email, pass } = this.userObj;

    try {
      const { data } = await axios.post(`${this.apiURL}users/register`, { userInfo: userID, firstname, lastname, plant, email, pass });
      console.log('Registro exitoso:', data);
      alert('Registro exitoso');
    } catch (error: any) {
      console.error('Error en registro:', error);
      alert('Hubo un problema con el registro.');
    }
  }

  // Toggles between Login and Register views
  toggleView(): void {
    this.isLoginView = !this.isLoginView;
  }

  // Toggles visibility of specific components
  togglePopup(): void {
    this.show = !this.show;
    this.hide = !this.show;
  }

  // Decode JWT token
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Check if token is expired
  private isTokenExpired(expiration: number): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return expiration <= currentTime;
  }

  // Handles navigation based on user type
  navUserType(type: string): void {
    const routes: { [key: string]: { route: string; message: string } } = {
      admin: { route: '/menu/host', message: 'Bienvenido, administrador' },
      host: { route: '/menu/host', message: 'Bienvenido, host' },
      caseta: { route: '/security', message: 'Bienvenido, Usuario General' },
      recep: { route: '/reception', message: 'Bienvenido, Recepción' },
      visita: { route: '/visitor', message: 'Bienvenido, Visitante' },
      unverified: { route: '', message: 'Cuenta no verificada. Espere a que un Administrador lo de de alta.' }
    };

    const userRoute = routes[type];
    if (userRoute) {
      alert(userRoute.message);
      if (userRoute.route) {
        this.router.navigate([userRoute.route]);
      }
    } else {
      alert('Tipo de usuario desconocido.');
    }
  }

  // Logout function
  logOff(): void {
    localStorage.clearLocalStorage('login');
    alert('Sesión cerrada');
  }

  // Handle HTTP errors
  private handleHttpError(error: any, context: string): void {
    if (error.response) {
      const { status } = error.response;

      if (status === 404 || status === 401) {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
        alert(this.errorMessage);
      } else if (status === 500) {
        this.errorMessage = 'Error en el servidor. Por favor, intenta más tarde.';
        alert(this.errorMessage);
      } else {
        this.errorMessage = `Error inesperado (${status}).`;
        alert(this.errorMessage);
      }
    } else if (error.request) {
      alert('No se recibió respuesta del servidor. Revisa tu conexión a internet.');
    } else {
      alert('Hubo un error al procesar la solicitud.');
    }
    console.error(`Error en ${context}:`, error);
  }
}
