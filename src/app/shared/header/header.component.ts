import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{
  public usuario:Usuario;
  constructor(private usuarioService:UsuarioService,
              private router:Router) { 

    this.usuario=usuarioService.user;
    // console.log(this.usuario.imageUrl);
    
  }
  logout(){
    this.usuarioService.logout();
  }

  buscar(termino:string){
    if(termino.length===0){
      return
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}
