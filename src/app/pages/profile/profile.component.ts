import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  public profileForm:FormGroup;
  public usuario:Usuario;
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService) {
    this.usuario= usuarioService.user;
   }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name:[this.usuario.name,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]]
    });
  }
  actualizarProfile(){
    // console.log(this.profileForm.value);
    this.usuarioService.actualizarProfile(this.profileForm.value)
    .subscribe(resp=>{
      // console.log(resp);
      const {name, email} = resp['usuario'];
      this.usuario.name = name;
      this.usuario.email = email;
    });
  }
}
