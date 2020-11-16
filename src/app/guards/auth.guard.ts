import { UsuarioService } from './../services/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService:UsuarioService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this.usuarioService.validarToken().pipe(
        tap(resp=>{
          if(!resp){
            this.router.navigateByUrl('/login');
          }
        })
      )
      
  }
  
}
