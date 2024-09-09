import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Alumno } from '../../models/alumno.model';
import { AlumnosService } from '../../services/alumnos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [ RouterModule , CommonModule ],
  templateUrl: './lista-alumnos.component.html',
  styleUrl: './lista-alumnos.component.css'
})

export class ListaAlumnosComponent implements OnInit {
  alumnos: Alumno[] = [];

  constructor(private alumnosService: AlumnosService) { }
  ngOnInit(): void {
  
    this.alumnosService.alumnos$.subscribe(alumnos => {
      this.alumnos = alumnos;
    });

    // Obtener la lista de alumnos desde el servidor y actualizar el BehaviorSubject
    this.alumnosService.getAlumnos().subscribe();

  }

  eliminarAlumno(id: number): void {
    this.alumnosService.deleteAlumno(id).subscribe(() => {
      this.alumnos = this.alumnos.filter(alumno => alumno.idalumno !== id);
    });
  }
}