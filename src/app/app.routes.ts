import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from  './components/lista-alumnos/lista-alumnos.component'; ;
import { DetalleAlumnoComponent } from './components/detalle-alumno/detalle-alumno.component';
import { NuevoAlumnoComponent } from './components/nuevo-alumno/nuevo-alumno.component';
import { EditarAlumnoComponent } from './components/editar-alumno/editar-alumno.component';
import { ErrorComponent } from './components/error/error.component';


export const routes: Routes = [
    { path: '', redirectTo: '/lista-alumnos', pathMatch: 'full' },
    { path: 'lista-alumnos', component: ListaAlumnosComponent },
    { path: 'detalle-alumno/:id', component: DetalleAlumnoComponent },
    { path: 'nuevo-alumno', component: NuevoAlumnoComponent },
    { path: 'editar-alumno/:id', component: EditarAlumnoComponent },
    { path: '**', component: ErrorComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
