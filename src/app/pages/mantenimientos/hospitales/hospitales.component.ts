import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { BusquedasService } from './../../../services/busquedas.service';
import { HospitalService } from './../../../services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import { Hospital } from 'src/app/models/hospital.model';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
  public hospitales:Hospital[]=[];
  public cargando:boolean=true;
  public imgSubs:Subscription;
  constructor(
    private hospitalService:HospitalService,
    private modalImagenService:ModalImagenService,
    private busquedasService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img=>{
      this.cargarHospitales();
    })
  }
  buscar(termino:string){
    if(termino.length ===0){
      return this.cargarHospitales();
    }
    this.busquedasService.buscar("hospitales",termino).subscribe(
      resp=>{
        this.hospitales = resp
      }  
    )
  }
  cargarHospitales(){
    this.cargando=true;
    this.hospitalService.cargarHospitales()
    .subscribe(hospitales=>{
      this.cargando=false;
      console.log(hospitales);
      
      this.hospitales=hospitales;
    })
  }
  guardarCambios(hospital:Hospital){
    this.hospitalService.actualizarHospital(hospital._id,hospital.name)
    .subscribe(resp=>{
      Swal.fire('Actualizado',hospital.name,'success');
    })
  }
  eliminarHospital(hospital:Hospital){
    this.hospitalService.borrarHospital(hospital._id)
    .subscribe(resp=>{
      this.cargarHospitales();
      Swal.fire('Borrado',hospital.name,'success');
    })
  }
  async abrirSweetAlert(){
    const {value=''} = await Swal.fire<string>({
      title:'Crear hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })
    if (value.trim().length>0) {
      this.hospitalService.crearHospital(value)
      .subscribe((resp:any)=>{
        this.hospitales.push(resp.hospital)
      })
    }
  }
  abrirModal(hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales',hospital._id,hospital.img);
  }
}
