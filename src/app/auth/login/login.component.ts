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
  public formSubmitted:boolean=false;

  public loginForm = this.fb.group({
    email:['test100@gmail.com',[Validators.required, Validators.email]],
    password:['',Validators.required],
    remember:[true]
  });
  constructor(private router:Router,private fb:FormBuilder, private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }
  login(){
    this.usuarioService.loginUsuario(this.loginForm.value)
    .subscribe(res=>{
      console.log(res);
    },err=>{
      Swal.fire('Error',err.error.msg,'error');
    }
    )
    // this.router.navigate(['/dashboard']);
    
  }
}
