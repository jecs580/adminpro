import { NgModule } from '@angular/core';

import { AdminGuard } from './../guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RouterModule, Routes } from '@angular/router';

const childRoutes :Routes=[
  { path:'', component:DashboardComponent, data:{title:'Dashboard'} },
  { path:'account-settings', component:AccountSettingsComponent, data:{title:'Account Settings'} },
  { path:'buscar/:termino', component:BusquedaComponent, data:{title:' Busquedas'} },
  { path:'grafica1', component:Grafica1Component, data:{title:'Gráfica'} },
  { path:'profile', component:ProfileComponent, data:{title:'Perfil de usuario'} },
  { path:'progress', component:ProgressComponent, data:{title:'ProgressBar'} },
  { path:'promesas', component:PromesasComponent, data:{title:'Promesas'} },
  { path:'rxjs', component:RxjsComponent, data:{title:'Rxjs'} },
  // { path:'',  redirectTo:'/dashboard', pathMatch:'full' }

  // Mantenimientos
  { path:'hospitales', component:HospitalesComponent, data:{title:'Mantenimiento de hospitales'} },
  { path:'medicos', component:MedicosComponent, data:{title:'Mantenimiento de médicos'} },
  { path:'medico/:id', component:MedicoComponent, data:{title:'Mantenimiento de médicos'} },
  
  // Rutas de Admin
  { path:'usuarios',canActivate:[AdminGuard], component:UsuariosComponent, data:{title:'Mantenimiento de usuarios'} },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
