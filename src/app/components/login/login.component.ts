import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  credentials: Login = { nombre: '', clave: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
   
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log( "respuesta de la api :"+ response);
        // Guarda el token en localStorage o como desees manejarlo
        localStorage.setItem('token', response.token);
        // Redirige al dashboard o alguna página protegida
        this.router.navigate(['/lista-alumnos']);
      },
      error: (err) => {
        this.errorMessage = 'Usuario o clave incorrectos';
      }
    });
  }
}
