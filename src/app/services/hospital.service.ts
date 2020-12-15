import { Hospital } from './../models/hospital.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(private http:HttpClient) { }

  get token():string {
    return localStorage.getItem('token')|| '';
  }
  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }
  cargarHospitales(){
    const url= `${base_url}/hospitals`;
    return this.http.get(url,this.headers)
    .pipe(
      map((resp:{ok:boolean,hospitales:Hospital[]}) => resp.hospitales)
    )
  }
}
