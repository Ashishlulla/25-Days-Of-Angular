import { Component } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  constructor(public authService: Auth, public router: Router){}

  login():void{
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }
}
