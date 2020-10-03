import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  
  constructor() {
    const url = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css";
    this.linkTheme.setAttribute('href',url);
  }
  changeTheme(theme:string){
    const url=`./assets/css/colors/${theme}.css`
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme',url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const links:NodeListOf<Element>=document.querySelectorAll('.selector');;
    links.forEach(e =>{
      e.classList.remove('working');
      const colorTheme = e.getAttribute('data-theme');
      const themeUrl = `./assets/css/colors/${colorTheme}.css`;
      const currentTheme =  this.linkTheme.getAttribute('href');
      if(themeUrl === currentTheme){
        e.classList.add('working');
      }
    })
  }
}
