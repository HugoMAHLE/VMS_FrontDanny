// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { environment } from '../../environments/environment.development';
// import axios from "axios";

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })

// export class LoginComponent implements OnInit {

//   isLoginView = true;
//   show = false;
//   hide = true;

//   userObj: any = {
//     userID: '',
//     email: '',
//     pass: ''
//   };

//   apiURL = environment.api_URL;
//   errorMessage: any;

//   constructor(private router: Router) { }

//   ngOnInit(): void {
//     const storedData = localStorage.getItem("angular18Local");
//     if (storedData) {
//       const localArray = JSON.parse(storedData);
//       const tokenData = localArray[localArray.length - 1]; // Último token guardado
//       const token = tokenData.token;
//       const payload = JSON.parse(atob(token.split(".")[1]));

//       // Check if the token is expired
//       const currentTime = Math.floor(Date.now() / 1000);
//       if (payload.exp > currentTime) {
//         // Token is valid, redirect based on user type
//         let type = payload.type.trim();
//         this.navUserType(type);
//       } else {
//         // Token is expired, remove it from localStorage
//         localStorage.removeItem("angular18Local");
//       }
//     }
//   }

//   async onLogin() {
//     const userid: any = this.userObj.userID;
//     const pass: any = this.userObj.pass;

//     try {
//       const { data } = await axios.post(this.apiURL + "users/login", { userid, pass });

//       if (data && data.token && data.type && data.userid) {
//         console.log("Login exitoso:", data);

//         // save token and user type en localStorage
//         const storedData = localStorage.getItem("angular18Local");
//         const localArray = storedData ? JSON.parse(storedData) : [];
//         localArray.push({
//           token: data.token,
//           type: data.type,
//           userid: data.userid
//         });
//         localStorage.setItem("angular18Local", JSON.stringify(localArray));

//         const userType = data.type.trim()
//         this.navUserType(userType);

//         // const token = localStorage.getItem("token");
//         // if (token) {
//         //   const payload = JSON.parse(atob(token.split(".")[1]));
//         //   if (payload.type === "admin") {
//         //     // admin
//         //   } else if (payload.type === "user") {
//         //     // user
//         //   }
//         // }
//       } else {
//         alert("Error desconocido al iniciar sesión.");
//       }
//     } catch (error: any) {
//       if (error.response) {
//         const status = error.response.status;

//         if (status === 404 || status === 401) {
//           alert("Usuario o contraseña incorrectos.");
//           this.errorMessage = "Usuario o contraseña incorrectos."
//         } else if (status === 500) {
//           alert("Error en el servidor. Por favor, intenta más tarde.");
//           this.errorMessage = "Error en el servidor. Por favor, intenta más tarde."
//         } else {
//           alert(`Error inesperado: ${status}`);
//           this.errorMessage = `Error inesperado: ${status}`
//         }
//       } else if (error.request) {
//         alert("No se recibió respuesta del servidor. Revisa tu conexión a internet.");
//       } else {
//         alert("Hubo un error al procesar la solicitud.");
//       }
//       console.error("Error en login:", error);
//     }
//   }

//   async onRegister() {
//     const userid: any = this.userObj.userID;
//     const pass: any = this.userObj.pass;
//     const email: any = this.userObj.email;

//     try {
//       const { data } = await axios.post(this.apiURL + "users/register", { userid, email, pass });
//       console.log("Registro exitoso:", data);
//       alert("Registro exitoso");
//     } catch (error) {
//       console.error("Error en registro:", error);
//       alert("Hubo un problema con el registro");
//     }
//   }

//   async showPopup() {
//     this.show = !this.show;
//     this.hide = !this.show;
//   };

//   // Token validation
//   isTokenValid(): boolean {
//     const storedData = localStorage.getItem("angular18Local");
//     if (!storedData) return false;

//     const localArray = JSON.parse(storedData);
//     const tokenData = localArray[localArray.length - 1]; // Último token guardado
//     if (!tokenData || !tokenData.expiration) return false;

//     const currentTime = new Date().getTime();
//     return currentTime < tokenData.expiration;
//   }

//   // delete token from localStorage (log off)
//   logOff() {
//     localStorage.removeItem("angular18Local");
//     alert("Sesión cerrada");
//   }

//   navUserType(type: string) {

//     switch (type){
//       case "admin":
//         alert("Bienvenido, administrador");
//         this.router.navigate(["/menu/host"]);
//         break;
//       case "host":
//         alert("Bienvenido, host");
//         this.router.navigate(["/menu/host"]);
//         break;
//       case "caseta":
//         alert("Bienvenido, Usuario Genera");
//         this.router.navigate(["/security"]);
//         break;
//       case "recep":
//         alert("Bienvenido, Recepcion");
//         this.router.navigate(["/reception"]);
//         break;
//       case "visita":
//         alert("Bienvenido, Visitante");
//         this.router.navigate(["/visitor"]);
//         break;
//       case "unverified":
//         alert("Cuenta no verificada, Espere a que un Administrador lo de de alta");
//         break;
//       default:
//         alert("Tipo de usuario Desconocido");
//         break;
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginView = true; // Toggles between Login and Register views
  show = false; // Toggles visibility of specific components
  hide = true;

  userObj: any = {
    userID: '',
    email: '',
    pass: ''
  };

  apiURL = environment.api_URL;
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedData = this.getLocalStorageData();
    if (storedData) {
      const tokenData = storedData[storedData.length - 1]; // Last token saved
      const payload = this.decodeToken(tokenData.token);

      // Check if the token is valid
      if (payload && !this.isTokenExpired(payload.exp)) {
        this.navUserType(payload.type.trim());
      } else {
        // Token expired
        this.clearLocalStorage();
      }
    }
  }

  // Login function
  async onLogin(): Promise<void> {
    const { userID, pass } = this.userObj;

    try {
      const { data } = await axios.post(`${this.apiURL}users/login`, { userid: userID, pass });

      if (data && data.token && data.type && data.userid) {
        console.log('Login exitoso:', data);

        this.saveToLocalStorage(data);
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
    const { userID, email, pass } = this.userObj;

    try {
      const { data } = await axios.post(`${this.apiURL}users/register`, { userid: userID, email, pass });
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

  // Get stored data from localStorage
  private getLocalStorageData(): any[] | null {
    const storedData = localStorage.getItem('angular18Local');
    return storedData ? JSON.parse(storedData) : null;
  }

  // Save data to localStorage
  private saveToLocalStorage(data: any): void {
    const storedData = this.getLocalStorageData() || [];
    storedData.push({
      token: data.token,
      type: data.type,
      userid: data.userid
    });
    localStorage.setItem('angular18Local', JSON.stringify(storedData));
  }

  // Clear localStorage
  private clearLocalStorage(): void {
    localStorage.removeItem('angular18Local');
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
    this.clearLocalStorage();
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
