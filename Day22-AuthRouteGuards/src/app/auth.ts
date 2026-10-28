import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  isLoggedIn: boolean = sessionStorage.getItem('isLoggedIn') === 'true'; 
  constructor(){}

  login(): void{
    this.isLoggedIn = true;
    sessionStorage.setItem('isLoggedIn', 'true');
  }

  logout(): void{
    this.isLoggedIn = false;
    sessionStorage.setItem('isLoggedIn', 'false');
  }
}
