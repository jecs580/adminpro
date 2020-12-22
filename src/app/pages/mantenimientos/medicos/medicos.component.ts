import { Subscription } from 'rxjs';
import { BusquedasService } from './../../../services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { MedicoService } from './../../../services/medico.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy{

  public cargando:boolean=true;
  public medicos:Medico[]=[];
  private imgSubs:Subscription;
  constructor(private medicoService:MedicoService,
    private modalImagenService:ModalImagenService,
    private busquedasService:BusquedasService
    ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img=>{
      this.cargarMedicos();
    })
  }
  cargarMedicos(){
    this.cargando=true;
    this.medicoService.cargarMedicos()
    .subscribe(resp=>{
      this.cargando=false;
      this.medicos=resp;
      
    })
  }
  buscar(termino:string){
    if(termino.length ===0){
      return this.cargarMedicos();
    }
    this.busquedasService.buscar("medicos",termino).subscribe(
      resp=>{
        this.medicos = resp
      }  
    )
  }
  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos',medico._id,medico.img);
  }
}
