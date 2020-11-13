import { Usuario } from './../models/usuario.model';
import { map } from 'rxjs/operators';
import { LoginForm } from './../interfaces/login-form.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from './../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http:HttpClient) { }
  crearUsuario(formData:RegisterForm){
    return this.http.post(`${base_url}/users`,formData)
  }
  loginUsuario(usuario:Usuario, remember:boolean=false){
    if (remember) {
      localStorage.setItem('email',usuario.email);
    }
    else{
      localStorage.removeItem('email');
    }
    return this.http.post(`${base_url}/login`,usuario)
    .pipe(
      map((resp:any)=>{
        localStorage.setItem('token',resp.token);
        return true;
      })
    );
  }
}
