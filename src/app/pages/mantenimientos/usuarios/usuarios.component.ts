import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios:number= 0;
  public usuarios:Usuario[]=[];
  public desde:number=0;
  public limitmax=false;
  public limitmin=false;
  constructor(private usuarioService:UsuarioService) { }
  ngOnInit(): void {
    this.cargarUsuarios();
  }
  cargarUsuarios(){
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total,usuarios})=>{
      this.totalUsuarios = total;
      this.usuarios=usuarios;
    });
  }
  cambiarPagina(valor:number){
    this.desde+=valor;
    this.limitmax=false;
    this.limitmin=false;
    if (this.desde < 0) {
      this.desde=0;
      this.limitmin=true;
    }
    else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
      this.limitmax=true; 
    }
    this.cargarUsuarios();
  }
}
