import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const promesa = new Promise((resolve,reject)=>{
      if (!true) {
        resolve('Hola mundo');
      }else{
        reject('algo salio mal');
      }
    });
    promesa.
    then((res)=>{
      console.log(res);
    })
    .catch((error)=>{
      console.log(error);
      
    });
    console.log('Fin del init');
    this.geUsers()
    .then(resp =>console.log(resp));
  }
  geUsers(){
    return new Promise(resolve=>{
      fetch('https://reqres.in/api/users')
      .then(response=> response.json())
      .then(body=> resolve(body.data));
    });

  }
}
