import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Alumno } from '../../models/alumno.model';
import { AlumnosService } from '../../services/alumnos.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-editar-alumno',
  standalone: true,
  imports: [ CommonModule, RouterModule, FormsModule ],
  templateUrl: './editar-alumno.component.html',
  styleUrl: './editar-alumno.component.css'
})
export class EditarAlumnoComponent implements OnInit {

  alumno: Alumno = {
    idalumno: 0,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    direccion: '',
    correo: '',
    telefono: '',
    fechaNacimiento: new Date(),
    estado: ''
  };

  constructor(private alumnosService: AlumnosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
     // Obtiene el ID del alumno de la URL
     const id = Number(this.route.snapshot.paramMap.get('id'));
      // Obtiene el alumno por ID
      this.alumnosService.getAlumnoById(id).subscribe(alumno => {
      this.alumno = alumno;
    });
  }

  updateAlumno(): void {
    

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas actualizar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, Actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      // Si el usuario confirma, proceder con el guardado
      if (result.isConfirmed) {
        // Llamar al servicio para guardar el alumno
        this.alumnosService.updateAlumno(this.alumno.idalumno, this.alumno).subscribe({
          next: (response) => {
            // Mostrar alerta de éxito
            Swal.fire({
              title: '¡Alumno actualizado!',
              text: 'Actualizado correctamente.',
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
  

