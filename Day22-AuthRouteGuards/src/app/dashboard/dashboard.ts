import { Component } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard 
{
  constructor(public authService: Auth, public router: Router){}

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
