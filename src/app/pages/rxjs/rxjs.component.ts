import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent {
  constructor() {
    // this.retornaObservable().pipe(
    //   // El pipe sirve para poder transformar la informacion que fluje antes de usarla, reintentar hacer.
    //   retry(1) // Opcionalmente colocamos las veces que reitentara.
    // ).subscribe(
    //   valor=>console.log('subs:',valor),
    //   err=>console.warn(err),
    //   () =>console.log('completo')
    // );

    // this.retornaIntervalo().subscribe(console.log);
    this.retornaIntervalo().subscribe((valor) => console.log(valor));
  }

  retornaIntervalo(): Observable<number> {
    // Funcion que instancia un observable y transforma la salida.
    return interval(1000).pipe(
      // interval es un observable que se ejecutará cada determinado tiempo de manera infinita
      take(4), // Especifica el numero de intervalos que hara
      map((i) => i + 1) // Especifica que por cada valor encontrado q valor retornara
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          // console.log('error de i es 2')
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }
}
