import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`
  }

  @Input('valor') progreso:number=40; 
  /* La variable progreso podra ser establecida desde el padre, ademas podemos asignale un valor 
  para que pueda ser llamado desde el html*/
  @Input() btnClass:string='btn-primary'; 


  @Output() valorSalda:EventEmitter<number> = new EventEmitter();

  cambiarValor(valor:number){
    if (this.progreso>=100 && valor>=0) {
      this.valorSalda.emit(100); // Lanza un evento cuando llega a 100
      return this.progreso=100;
    } 
    if (this.progreso<=0 && valor<=0) {
      this.valorSalda.emit(0); // Lanza un evento cuando llega a 0
      return this.progreso=0;
    } 
    this.progreso+=valor;
    this.valorSalda.emit(this.progreso); // Lanza un evento cuando se agrga un nuevo valor
  }
  enCambio(newValor:number){
    if (newValor>=100) {
      this.progreso=100;
    }else if(newValor<=0){
      this.progreso=0;
    }else{
      this.progreso=newValor
    }
    this.valorSalda.emit(newValor);
  }
}
