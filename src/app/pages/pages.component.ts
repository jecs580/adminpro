import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';


// Usamos esta linea para que TypeScript no muestre error al llamar a la funcion global. Sin esta declaracion igual funciona pero los logs de TypeScript te mostraran error.
declare function cumstomInitFunctions();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    cumstomInitFunctions();
  }

}
