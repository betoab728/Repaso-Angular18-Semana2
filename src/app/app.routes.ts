import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from  './components/lista-alumnos/lista-alumnos.component'; ;
import { DetalleAlumnoComponent } from './components/detalle-alumno/detalle-alumno.component';
import { NuevoAlumnoComponent } from './components/nuevo-alumno/nuevo-alumno.component';
import { EditarAlumnoComponent } from './components/editar-alumno/editar-alumno.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { canDeactivateAlumnoGuard } from './can-deactivate-alumno.guard';
import { RegistroCursoComponent } from './components/registro-curso/registro-curso.component';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'lista-alumnos', component: ListaAlumnosComponent, canActivate: [AuthGuard] },
    { path: 'detalle-alumno/:id', component: DetalleAlumnoComponent },
    { path: 'nuevo-alumno', component: NuevoAlumnoComponent , canDeactivate: [canDeactivateAlumnoGuard]},
    { path: 'editar-alumno/:id', component: EditarAlumnoComponent },
    { path: 'error', component: ErrorComponent }, // Ruta para la página de error
    { path : 'registro-curso', component: RegistroCursoComponent},
   // { path: '**', redirectTo: '/error' }, // Redirige cualquier ruta no encontrada a la página de error
    // Rutas hijas
    {
      path: 'admin',
     loadChildren: () => import('./admin/admin.routes').then(m => m.AdminRoutingModule)
    }

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
