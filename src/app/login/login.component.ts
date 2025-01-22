import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import axios from "axios";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLoginView = true;
  show = false;
  hide = true;

  userObj: any = {
    userID: '',
    email: '',
    pass: ''
  };

  apiURL = environment.api_URL;
  errorMessage: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedData = localStorage.getItem("angular18Local");
    if (storedData) {
      const localArray = JSON.parse(storedData);
      const tokenData = localArray[localArray.length - 1]; // Último token guardado
      const token = tokenData.token;
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Check if the token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp > currentTime) {
        // Token is valid, redirect based on user type
        let type = payload.type.trim();
        this.navUserType(type);
      } else {
        // Token is expired, remove it from localStorage
        localStorage.removeItem("angular18Local");
      }
    }
  }

  async onLogin() {
    const userid: any = this.userObj.userID;
    const pass: any = this.userObj.pass;

    try {
      const { data } = await axios.post(this.apiURL + "users/login", { userid, pass });

      if (data && data.token && data.type && data.userid) {
        console.log("Login exitoso:", data);

        // save token and user type en localStorage
        const storedData = localStorage.getItem("angular18Local");
        const localArray = storedData ? JSON.parse(storedData) : [];
        localArray.push({
          token: data.token,
          type: data.type,
          userid: data.userid
        });
        localStorage.setItem("angular18Local", JSON.stringify(localArray));

        const userType = data.type.trim()
        this.navUserType(userType);

        // const token = localStorage.getItem("token");
        // if (token) {
        //   const payload = JSON.parse(atob(token.split(".")[1]));
        //   if (payload.type === "admin") {
        //     // admin
        //   } else if (payload.type === "user") {
        //     // user
        //   }
        // }
      } else {
        alert("Error desconocido al iniciar sesión.");
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;

        if (status === 404 || status === 401) {
          alert("Usuario o contraseña incorrectos.");
          this.errorMessage = "Usuario o contraseña incorrectos."
        } else if (status === 500) {
          alert("Error en el servidor. Por favor, intenta más tarde.");
          this.errorMessage = "Error en el servidor. Por favor, intenta más tarde."
        } else {
          alert(`Error inesperado: ${status}`);
          this.errorMessage = `Error inesperado: ${status}`
        }
      } else if (error.request) {
        alert("No se recibió respuesta del servidor. Revisa tu conexión a internet.");
      } else {
        alert("Hubo un error al procesar la solicitud.");
      }
      console.error("Error en login:", error);
    }
  }

  async onRegister() {
    const userid: any = this.userObj.userID;
    const pass: any = this.userObj.pass;
    const email: any = this.userObj.email;

    try {
      const { data } = await axios.post(this.apiURL + "users/register", { userid, email, pass });
      console.log("Registro exitoso:", data);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Hubo un problema con el registro");
    }
  }

  async showPopup() {
    this.show = !this.show;
    this.hide = !this.show;
  };

  // Token validation
  isTokenValid(): boolean {
    const storedData = localStorage.getItem("angular18Local");
    if (!storedData) return false;

    const localArray = JSON.parse(storedData);
    const tokenData = localArray[localArray.length - 1]; // Último token guardado
    if (!tokenData || !tokenData.expiration) return false;

    const currentTime = new Date().getTime();
    return currentTime < tokenData.expiration;
  }

  // delete token from localStorage (log off)
  logOff() {
    localStorage.removeItem("angular18Local");
    alert("Sesión cerrada");
  }

  navUserType(type: string) {

    switch (type){
      case "admin":
        alert("Bienvenido, administrador");
        this.router.navigate(["/menu/host"]);
        break;
      case "host":
        alert("Bienvenido, host");
        this.router.navigate(["/menu/host"]);
        break;
      case "caseta":
        alert("Bienvenido, Usuario Genera");
        this.router.navigate(["/security"]);
        break;
      case "recep":
        alert("Bienvenido, Recepcion");
        this.router.navigate(["/reception"]);
        break;
      case "visita":
        alert("Bienvenido, Visitante");
        this.router.navigate(["/visitor"]);
        break;
      case "unverified":
        alert("Cuenta no verificada, Espere a que un Administrador lo de de alta");
        break;
      default:
        alert("Tipo de usuario Desconocido");
        break;
    }
  }
}

