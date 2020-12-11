import { ModalImagenService } from './../../services/modal-imagen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  
  constructor(public modalImagenService:ModalImagenService) { }

  ngOnInit(): void {
  }
  cerrarModal(){
    this.modalImagenService.CerrarModal();
  }

}
