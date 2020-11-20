import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public menuItems:any[];
  public usuario:Usuario;
  constructor(private sideBarService:SidebarService, private usuarioService:UsuarioService) {
    this.menuItems=sideBarService.menu;
    // console.log(this.menuItems);
    this.usuario = usuarioService.user;
  }

  ngOnInit(): void {
  }

}
