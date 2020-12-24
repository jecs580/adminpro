import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  public medicoForm:FormGroup;
  public hospitales:Hospital[]=[];
  public hospitalSeleccionado:Hospital;
  constructor(
    private fb:FormBuilder,
    private hospitalService:HospitalService
    ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.medicoForm = this.fb.group({
      name:['Jorge',Validators.required],
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
    console.log(this.medicoForm.value);
    // this.hospitalService.
  }
}
