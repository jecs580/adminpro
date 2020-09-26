import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent  {

  @Input('valor') progreso:number=40; 
  /* La variable progreso podra ser establecida desde el padre, ademas podemos asignale un valor 
  para que pueda ser llamado desde el html*/

  get getPorcentaje(){
    return `${ this.progreso }%`;
  }

  cambiarValor(valor:number){
    if (this.progreso>=100 && valor>=0) {
      return this.progreso=100;
    } 
    if (this.progreso<=0 && valor<=0) {
      return this.progreso=0;
    } 
    this.progreso+=valor;
  }

}
