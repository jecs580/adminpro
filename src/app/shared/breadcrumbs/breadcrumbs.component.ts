import { ActivationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent {
  public title: string;
  constructor(private router: Router) {
    this.getDataRuta();
  }
  getDataRuta(){
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        // instanceOf verifica si event es una instancia(objeto) de la Clase ActivationEnd
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe((data) => {
        console.log(data);
        this.title = data.title;
        document.title= `AdminPro - ${data.title}`;
      });
  }
}
