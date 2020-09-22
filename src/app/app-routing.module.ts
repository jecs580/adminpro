import { AuthRoutingModule } from './auth/auth.routing';
import { NgModule } from '@angular/core';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
// import { CommonModule } from '@angular/common'; // Ofrece uso de las direcivas(ngIf, ngFor)
// Modulos
import { PagesRoutingModule } from './pages/pages.routing';

import { RouterModule, Routes } from '@angular/router'


const routes:Routes=[

  // Rutas primarias
  { path:'**', component:NopagefoundComponent },
];

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes),
    PagesRoutingModule, // Rutas hijas que estan protegidas
    AuthRoutingModule // Rutas de autenticacion
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
