import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { MedicoService } from './../../../services/medico.service';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public cargando:boolean=true;
  public medicos:Medico[]=[];
  constructor(private medicoService:MedicoService,
    private modalImagenService:ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }
  cargarMedicos(){
    this.cargando=true;
    this.medicoService.cargarMedicos()
    .subscribe(resp=>{
      this.cargando=false;
      this.medicos=resp;
      
    })
  }
  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos',medico._id,medico.img);
  }
}
