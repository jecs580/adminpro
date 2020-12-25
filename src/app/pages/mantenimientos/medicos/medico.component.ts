import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MedicoService } from './../../../services/medico.service';
import { HospitalService } from './../../../services/hospital.service';

import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  public medicoForm:FormGroup;
  public hospitales:Hospital[]=[];
  public medicoSeleccionado:Medico;
  public hospitalSeleccionado:Hospital;
  constructor(
    private fb:FormBuilder,
    private hospitalService:HospitalService,
    private medicoService:MedicoService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.medicoForm = this.fb.group({
      name:['',Validators.required],
      hospital:['',Validators.required]
    });
    this.medicoForm.get('hospital').valueChanges
    .subscribe(resp=>{
      this.hospitalSeleccionado=this.hospitales.find(h=>h._id===resp);
      
    })
  }
  cargarHospitales(){
    this.hospitalService.cargarHospitales()
    .subscribe(
      (resp:Hospital[])=>{
        this.hospitales=resp;
      }
    )
  }
  guardarMedico(){
    const {name}=this.medicoForm.value;
    this.medicoService.crearMedico(this.medicoForm.value)
    .subscribe(
      (resp:any)=>{
        console.log(resp);
        Swal.fire('Creado',`${name} creado`,'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
      }
    )
  }
}
