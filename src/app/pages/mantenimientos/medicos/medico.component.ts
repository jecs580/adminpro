import { delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router:Router,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id})=> this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      name:['',Validators.required],
      hospital:['',Validators.required]
    });
    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges
    .subscribe(resp=>{
      this.hospitalSeleccionado=this.hospitales.find(h=>h._id===resp);
      
    })
  }
  cargarMedico(id:string){
    if(id ==='nuevo'){
      return;
    }
    this.medicoService.recuperMedico(id)
    .pipe(
      delay(100)
    )
    .subscribe(resp=>{
      if(!resp){
        return this.router.navigateByUrl('/dashboard/medicos');
      }
      console.log("Medicooooo=>",resp);
      const {name,hospital:{_id}} = resp;
      console.log(name, _id);
      this.medicoSeleccionado = resp;
      this.medicoForm.setValue({name,hospital:_id});
      console.log(this.hospitalSeleccionado);
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
