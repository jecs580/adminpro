import { catchError, map, tap } from 'rxjs/operators';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { LoginForm } from './../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from './../models/usuario.model';
const base_url = environment.base_url;

declare const gapi:any;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2:any;
  public user:Usuario;
  constructor(private http: HttpClient, private router:Router, private ngZone:NgZone) {
    this.googleInit();
  }
  googleInit(){
    return new Promise(resolve=>{
      gapi.load('auth2', ()=>{
        this.auth2 = gapi.auth2.init({
          client_id: '228251880919-krui5doj5ddqe0mmg82usancc8atao4e.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }
  logout(){
    localStorage.removeItem('token');
   
    this.auth2.signOut().then(() =>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    });
  }
  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token')|| '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      map((resp:any)=>{
        // console.log(resp);
        const { email,google,name,role,img='',uid} = resp['usuario'];
        this.user = new Usuario(name,email,'',img,google,role,uid);
        localStorage.setItem('token', resp.token);
        return true
      }),
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
