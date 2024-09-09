import { Component } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { AlumnosService } from '../../services/alumnos.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-nuevo-alumno',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './nuevo-alumno.component.html',
  styleUrl: './nuevo-alumno.component.css'
})

export class NuevoAlumnoComponent {

 alumno: Alumno = { idalumno:0,nombre:'',apellidoPaterno:'',apellidoMaterno:'', sexo:'',direccion:'',correo:'',telefono:'',fechaNacimiento:new Date(),estado:''};

  constructor(private alumnosService: AlumnosService, private router: Router) { }

  guardarAlumno(): void {
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas registrar este nuevo alumno?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      // Si el usuario confirma, proceder con el guardado
      if (result.isConfirmed) {
        // Llamar al servicio para guardar el alumno
        this.alumnosService.addAlumno(this.alumno).subscribe({
          next: (response) => {
            // Mostrar alerta de éxito
            Swal.fire({
              title: '¡Alumno registrado!',
              text: 'El alumno se ha registrado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              // Navegar a la lista de alumnos
              this.alumnosService.getAlumnos().subscribe(); // Actualizar lista de alumnos
              this.router.navigate(['/lista-alumnos']);
            });
          },
          error: (error) => {
            // Mostrar alerta de error si algo falla
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al registrar el alumno. Inténtalo nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/lista-alumnos']);
    
  }
}