import { FileUploadService } from './../../services/file-upload.service';
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
  public imagenSubir:File;
  public imgTemp:any = null;
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService,
    private fileUploadService:FileUploadService) {
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
  cambiarImagen(file:File){
    this.imagenSubir = file
    if (!file) {return this.imgTemp = null}
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      this.imgTemp = reader.result;
      
    }
  }
  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)
    .then(img => this.usuario.img = img);
  }
}
