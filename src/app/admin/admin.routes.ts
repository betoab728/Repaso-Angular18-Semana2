import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importar los componentes que se usarán en las rutas


// Definir las rutas
const routes: Routes = [
    { path: 'user-management', 
        loadComponent: () => import('./components/user-management/user-management.component').then(m => m.UserManagementComponent),
     },
    { path: 'report', 
        loadComponent: () => import('./components/report/report.component').then(m => m.ReportComponent),
     },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }