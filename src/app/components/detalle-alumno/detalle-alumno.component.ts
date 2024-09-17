import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Alumno } from '../../models/alumno.model';
import { AlumnosService } from '../../services/alumnos.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detalle-alumno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-alumno.component.html',
  styleUrl: './detalle-alumno.component.css'
})
export class DetalleAlumnoComponent implements OnInit {
 //obtener un alumno por id
  alumno?: Alumno;

  constructor(private alumnosService: AlumnosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
     // Obtiene el ID del alumno de la URL
     const id = Number(this.route.snapshot.paramMap.get('id'));
      // Obtiene el alumno por ID
    this.alumnosService.getAlumnoById(id).subscribe(alumno => {
      this.alumno = alumno;
    });
  }
}
