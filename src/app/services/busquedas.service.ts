import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from './../models/hospital.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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
  private transformarUsuarios( resultados:any[]):Usuario[]{
    return resultados.map(
      user=> new Usuario(user.name,user.email,'',user.img,user.google,user.role,user.uid));
  }
  private transformarHospitales( resultados:any[]):Hospital[]{
    return resultados;
  }
  buscar(
    tipo:'usuarios'|'medicos'|'hospitales',
    termino:string){
    const url= `${base_url}/todo/collection/${tipo}/${termino}`;
    return this.http.get(url,this.headers)
    .pipe(
      map( (resp:any) => {
        switch (tipo) {
          case 'usuarios':
              return this.transformarUsuarios(resp.resultados);
              
          case 'hospitales':
          return this.transformarHospitales(resp.resultados);
          default:
            return [];
        }
      })
    );
  }
}
