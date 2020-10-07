import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent{
  constructor() { 
    const obs$ = new Observable(observer=>{
      let i =-1;
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);
        if(i===4){
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          i=0;
          // console.log('error de i es 2')
          observer.error('i llego al valor de 2');
        }
      },1000)
    });
    obs$.pipe(
      // El pipe sirve para poder transformar la informacion que fluje antes de usarla, reintentar hacer.
      retry(1) // Opcionalmente colocamos las veces que reitentara.
    ).subscribe(
      valor=>console.log('subs:',valor),
      err=>console.warn(err),
      () =>console.log('completo')
      
    );
   }


}
