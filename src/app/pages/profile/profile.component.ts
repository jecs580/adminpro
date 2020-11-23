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

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name:['123',Validators.required],
      email:['abc',[Validators.required,Validators.email]]
    });
  }
  actualizarProfile(){
    console.log(this.profileForm.value);
    this.usuarioService.actualizarProfile(this.profileForm.value)
    .subscribe(resp=>{
      console.log(resp);
            
    });
  }
}
