import { ModalImagenService } from './../../../services/modal-imagen.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { BusquedasService } from './../../../services/busquedas.service';
import { UsuarioService } from './../../../services/usuario.service';

import { Usuario } from './../../../models/usuario.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {
  public totalUsuarios:number= 0;
  public usuarios:Usuario[]=[];
  public usuariosTemp:Usuario[]=[];
  public imgSubs:Subscription;
  public desde:number=0;
  public limitmax=false;
  public limitmin=false;
  public cargando:boolean=true;
  constructor(private usuarioService:UsuarioService,
    private busquedasService:BusquedasService,
    private modalImagenService:ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img=>{
      this.cargarUsuarios();
    })
  }
  cargarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total,usuarios})=>{
      this.totalUsuarios = total;
      this.usuarios=usuarios;
      this.usuariosTemp=usuarios;
      this.cargando=false;
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
  buscar(termino:string){
    if(termino.length ===0){
      return this.usuarios=this.usuariosTemp;
    }
    this.busquedasService.buscar('usuarios',termino).subscribe(
      (resp:Usuario[])=>{
        this.usuarios=resp;
      }
    )
  }
  eliminarUsuario(usuario:Usuario){
    if(usuario.uid=== this.usuarioService.uid){
      return Swal.fire('Error','No puede borrarse a si mismo','error');
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
        .subscribe(resp=>{ 
          Swal.fire(
            'Usuario borrado',
            `${usuario.name} fue eliminado correctamente`,
            'success'
          );
          this.cargarUsuarios();
          });
      }
    })
  }
  cambiarRole(usuario:Usuario){
    this.usuarioService.guardarProfile(usuario)
    .subscribe(resp=>{
      console.log(resp);
      
    });
  }
  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
    
  }
}
