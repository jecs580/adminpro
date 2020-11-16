import { Usuario } from './../models/usuario.model';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm } from './../interfaces/login-form.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token')|| '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token);
      }),
      map(resp=>true),
      catchError(error=>of(false)) // En caso de que no exista el token o sea invalido envaremos como respuesta un false
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData);
  }
  loginUsuario(usuario: Usuario, remember: boolean = false) {
    if (remember) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(`${base_url}/login`, usuario).pipe(
      map((resp: any) => {
        localStorage.setItem('token', resp.token);
        return true;
      })
    );
  }
  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
