import { HospitalService } from './../../../services/hospital.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  constructor(private hospitalService:HospitalService) { }

  ngOnInit(): void {
    this.hospitalService.cargarHospitales()
    .subscribe(hospitales=>{
      console.log(hospitales);
      
    })
  }

}
