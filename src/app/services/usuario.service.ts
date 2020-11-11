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
  loginUsuario(formData:LoginForm){
    return this.http.post(`${base_url}/login`,formData)
  }
}
