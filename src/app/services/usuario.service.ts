import { CargarUsuario } from './../interfaces/cargar-usuarios.interface';
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
  get token():string {
    return localStorage.getItem('token')|| '';
  }
  get uid():string{
    return this.user.uid || '';
  }
  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }
  googleInit(){
    return new Promise<void>(resolve=>{
      gapi.load('auth2', ()=>{
        this.auth2 = gapi.auth2.init({
          client_id: '228251880919-krui5doj5ddqe0mmg82usancc8atao4e.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }
  guardarLocalStorage(token:string,menu:any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
   
    this.auth2.signOut().then(() =>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    });
  }
  validarToken():Observable<boolean>{
    
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map((resp:any)=>{
        // console.log(resp);
        const { email,google,name,role,img='',uid} = resp['usuario'];
        this.user = new Usuario(name,email,'',img,google,role,uid);
        this.guardarLocalStorage(resp.token,resp.menu);
        return true
      }),
      catchError(error=>of(false)) // En caso de que no exista el token o sea invalido envaremos como respuesta un false
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData)
    .pipe(
      tap((resp:any)=>{
        this.guardarLocalStorage(resp.token,resp.menu);
      })
    )
  }
  actualizarProfile(data:{email:string,name:string,role:string}){
    data={
      ...data,
      role:this.user.role
    }
    return this.http.put(`${base_url}/users/${this.uid}`, data,this.headers);
  }
  loginUsuario(usuario: Usuario, remember: boolean = false) {
    if (remember) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(`${base_url}/login`, usuario).pipe(
      map((resp: any) => {
        console.log(resp);
        this.guardarLocalStorage(resp.token,resp.menu);
        return true;
      })
    );
  }
  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token,resp.menu);
      })
    );
  }
  cargarUsuarios(from:number=0){
    const url= `${base_url}/users?from=${from}`;
    return this.http.get<CargarUsuario>(url,this.headers).
    pipe(
      map(resp =>{
        const usuarios=resp.usuarios.map(user=> new Usuario(user.name,user.email,'',user.img,user.google,user.role,user.uid));
        return {
          usuarios,
          total:resp.total
        }
      })
    );
  }
  eliminarUsuario(usuario:Usuario){
    console.log(usuario);
    const url= `${base_url}/users/${usuario.uid}`;
    return this.http.delete<CargarUsuario>(url,this.headers);
  }
  guardarProfile(usuario:Usuario){
    return this.http.put(`${base_url}/users/${usuario.uid}`, usuario,this.headers);
  }
}
