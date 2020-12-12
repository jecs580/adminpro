import { ModalImagenService } from './../../services/modal-imagen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir:File;
  public imgTemp:any = null;
  constructor(public modalImagenService:ModalImagenService) { }

  ngOnInit(): void {
  }
  cerrarModal(){
    this.imgTemp=null;
    this.modalImagenService.CerrarModal();
  }
  cambiarImagen(file:File){
    this.imagenSubir = file
    if (!file) {return this.imgTemp = null}
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      this.imgTemp = reader.result;
      
    }
  }
}
