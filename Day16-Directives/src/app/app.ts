import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, NgClass, NgStyle],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  isLoggedIn: boolean =  false;
  users: string[] = ['Ashish','Priya', 'Rahul', 'Neha'];
  newUser: string = '';
  isHighlighted: boolean = true;

  addUser(): void{
    if(this.newUser.trim() === ''){
      return;
    }
    this.users.push(this.newUser.trim());
    this.newUser= ''; 

  }
}
