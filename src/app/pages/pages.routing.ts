import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
    { 
        // Rutas Privadas
        path:'dashboard', component:PagesComponent, 
    // Rutas hijas(Secundarias), tambien se llaman rutas por modulo
        children:[
            { path:'', component:DashboardComponent, data:{title:'Dashboard'} },
            { path:'progress', component:ProgressComponent, data:{title:'ProgressBar'} },
            { path:'grafica1', component:Grafica1Component, data:{title:'Gráfica'} },
            { path:'account-settings', component:AccountSettingsComponent, data:{title:'Account Settings'} },
            { path:'promesas', component:PromesasComponent, data:{title:'Promesas'} },
            { path:'rxjs', component:RxjsComponent, data:{title:'Rxjs'} },
            // { path:'',  redirectTo:'/dashboard', pathMatch:'full' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}