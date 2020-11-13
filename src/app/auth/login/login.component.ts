import { Usuario } from './../../models/usuario.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  email:string;
  public formSubmitted:boolean=false;

  public loginForm = this.fb.group({
    email:["",[Validators.required, Validators.email]],
    password:['',Validators.required],
    remember:[true]
  });
  constructor(private router:Router,private fb:FormBuilder, private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
  }
  login(){
    let usuario = new Usuario(null, this.loginForm.value.email, this.loginForm.value.password);
    console.log(usuario);

    this.usuarioService.loginUsuario(usuario,this.loginForm.value.remember)
    .subscribe(res=>{
      this.router.navigate(['/dashboard']);
    },err=>{
      Swal.fire('Error',err.error.msg,'error');
    }
    )
    // this.router.navigate(['/dashboard']);
    
  }
}
