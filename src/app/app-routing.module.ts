import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common'; // Ofrece uso de las direcivas(ngIf, ngFor)

import { RouterModule, Routes } from '@angular/router'

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';

const routes:Routes=[
  { path:'', component:PagesComponent, 
  // Rutas hijas(Secundarias)
    children:[
      { path:'dashboard', component:DashboardComponent },
      { path:'progress', component:ProgressComponent },
      { path:'grafica1', component:Grafica1Component },
      { path:'',  redirectTo:'/dashboard', pathMatch:'full' }
    ]
  },
  // Rutas primarias
  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent },
  // { path:'',  redirectTo:'/dashboard', pathMatch:'full' },
  { path:'**', component:NopagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }