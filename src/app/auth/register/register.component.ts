import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted:boolean=false;

  public registerForm = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required, Validators.email]],
    password:['',Validators.required],
    password2:['',Validators.required],
    terminos:[false,Validators.required],
  }, {
    validators:this.passwordsIguales('password','password2')
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService:UsuarioService
    ) { }
  crearUsuario(){
    this.formSubmitted=true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return
    }
    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(res=>{
      console.log('usuario creado');
      console.log(res);
    },
    err=> {Swal.fire('Error',err.error.msg,'error');}
    );
  }
  campoNoValido( campo:string):Boolean{
    if(this.registerForm.get(campo).invalid && this.formSubmitted){
       return true;
    } else{
      return false;
    }
  }
  passwordNoValidas(){
    const pass1=this.registerForm.get('password').value;
    const pass2=this.registerForm.get('password2').value;
    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else{
      return false
    }
  }
  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }
  passwordsIguales(pass1Name:string, pass2Name:string){
    return (formGroup:FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name);  
      const pass2Control = formGroup.get(pass2Name);  
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual:true});
      }
    }
  }
}
