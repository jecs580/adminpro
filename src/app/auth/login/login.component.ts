import { Usuario } from './../../models/usuario.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UsuarioService } from './../../services/usuario.service';

declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  email:string;
  public formSubmitted:boolean=false;
  public auth2:any;

  public loginForm = this.fb.group({
    email:["",[Validators.required, Validators.email]],
    password:['',Validators.required],
    remember:[false]
  });
  constructor(private router:Router,private fb:FormBuilder, private usuarioService:UsuarioService, private ngZone:NgZone) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.renderButton();
  }
  login(){
    let usuario = new Usuario(null, this.loginForm.value.email, this.loginForm.value.password);
    console.log(usuario);

    this.usuarioService.loginUsuario(usuario,this.loginForm.value.remember)
    .subscribe(res=>{
      this.router.navigateByUrl('/')
    },err=>{
      Swal.fire('Error',err.error.msg,'error');
    }
    )
    // this.router.navigate(['/dashboard']);
  }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }
  async startApp(){
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser)=>{
           const id_token = googleUser.getAuthResponse().id_token;
          //  console.log(id_token);
          this.usuarioService.loginGoogle(id_token).subscribe(resp=>{
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/');
            })
          });
           
        }, (error) =>{
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
