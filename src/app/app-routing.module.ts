import { NgModule } from '@angular/core';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './auth/register/register.component';
// import { CommonModule } from '@angular/common'; // Ofrece uso de las direcivas(ngIf, ngFor)
// Modulos
import { PagesRoutingModule } from './pages/pages.routing';

import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './auth/login/login.component';

const routes:Routes=[

  // Rutas primarias
  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent },
  // { path:'',  redirectTo:'/dashboard', pathMatch:'full' },
  { path:'**', component:NopagefoundComponent },
];

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
