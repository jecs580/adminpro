import { ActivationEnd, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy{
  public title: string;
  public titleSubs$: Subscription;
  constructor(private router: Router) {
    this.titleSubs$ = this.getDataRuta().subscribe((data) => {
      this.title = data.title;
      console.log(data);
      
      document.title = `AdminPro - ${data.title}`;
    });
  }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }
  getDataRuta() {
    // Hacemos la limpieza de la data
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      // instanceOf verifica si event es una instancia(objeto) de la Clase ActivationEnd
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
