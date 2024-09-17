import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';  // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('Acceso permitido, token válido');
      return true;  // Permitir acceso si el usuario está autenticado
    } else {
      this.authService.redirectToLogin();  // Redirigir al login si no está autenticado
      return false;
    }
  }
}