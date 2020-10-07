import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[]=[
    {
      title:'Dashboard',
      icon:'mdi mdi-gause',
      submenu:[
        {title: 'Main', url: '/'},
        {title: 'ProgressBar', url: 'progress'},
        {title: 'Graphs', url: 'grafica1'},
        {title: 'Promesas', url: 'promesas'},
        {title: 'Rxjs', url: 'rxjs'},
      ]
    }
  ]
  constructor() { }
}
