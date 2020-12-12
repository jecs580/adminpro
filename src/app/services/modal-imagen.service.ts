import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
const base_url= environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal:boolean=true;
  public tipo:string;
  public id:string;
  public img:string;
  get OcultarModal(){
    return this._ocultarModal;
  }
  abrirModal(
    tipo:'usuarios'|'medicos' | 'hospitales',
    id:string,
    img:string='no-img'){
      this._ocultarModal=false;
      this.id = id;
      this.tipo=tipo;
      if (img.includes('https')) {
        this.img=img;
      }else{
        this.img =`${base_url}/uploads/${tipo}/${img}`;
      }
      
  }
  CerrarModal(){
    this._ocultarModal=true;
  }
  constructor() { }
}
