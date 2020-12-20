import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
    { 
        // Rutas Privadas
        path:'dashboard', component:PagesComponent, 
        canActivate:[AuthGuard],
    // Rutas hijas(Secundarias), tambien se llaman rutas por modulo
        children:[
            { path:'', component:DashboardComponent, data:{title:'Dashboard'} },
            { path:'account-settings', component:AccountSettingsComponent, data:{title:'Account Settings'} },
            { path:'grafica1', component:Grafica1Component, data:{title:'Gráfica'} },
            { path:'profile', component:ProfileComponent, data:{title:'Perfil de usuario'} },
            { path:'progress', component:ProgressComponent, data:{title:'ProgressBar'} },
            { path:'promesas', component:PromesasComponent, data:{title:'Promesas'} },
            { path:'rxjs', component:RxjsComponent, data:{title:'Rxjs'} },
            // { path:'',  redirectTo:'/dashboard', pathMatch:'full' }

            // Mantenimientos
            { path:'usuarios', component:UsuariosComponent, data:{title:'Mantenimiento de usuarios'} },
            { path:'hospitales', component:HospitalesComponent, data:{title:'Mantenimiento de hospitales'} },
            { path:'medicos', component:MedicosComponent, data:{title:'Mantenimiento de médicos'} },
            { path:'medico/:id', component:MedicoComponent, data:{title:'Mantenimiento de médicos'} },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}