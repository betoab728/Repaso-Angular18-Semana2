import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importar los componentes que se usarán en las rutas
import { ReportComponent } from './components/report/report.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

// Definir las rutas
const routes: Routes = [
    { path: 'user-management', component: UserManagementComponent },
    { path: 'report', component: ReportComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }