import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs:Subscription;

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
    this.intervalSubs = this.retornaIntervalo().subscribe((valor) => console.log(valor));
  }
  ngOnDestroy(): void {
    // Metodo que se ejecutara cuando se cambie de componente.
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    // Funcion que instancia un observable y transforma la salida.
    return interval(100).pipe(
      // interval es un observable que se ejecutará cada determinado tiempo de manera infinita
      take(10), // Especifica el numero de intervalos que hara
      map((i) => i + 1), // Especifica que por cada valor encontrado q valor retornara
      filter(valor => valor%2===0),  // Si devuelve false, el operador take no se dispara, 
      //solo hara la cuenta cuando cumpla la condicion
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
