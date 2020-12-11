import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal:boolean=true;
  get OcultarModal(){
    return this._ocultarModal;
  }
  abrirModal(){
    this._ocultarModal=false;
  }
  CerrarModal(){
    this._ocultarModal=true;
  }
  constructor() { }
}
