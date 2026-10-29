import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http
    .get('https://jsonplaceholder.typicode.com/users')
    .subscribe({
      next: (data)=> console.log("API Response", data), 
      error: (error)=> console.log("Error", error)});
  }

}
