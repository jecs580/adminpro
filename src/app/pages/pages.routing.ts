import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../guards/auth.guard';

import { PagesComponent } from './pages.component';

const routes: Routes = [
    { 
        // Rutas Privadas
        path:'dashboard', component:PagesComponent, 
        canActivate:[AuthGuard],
        canLoad:[AuthGuard],
    // Rutas hijas(Secundarias), tambien se llaman rutas por modulo
        loadChildren:()=> import('./child-routes.module').then(
            m=>m.ChildRoutesModule
        )
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}