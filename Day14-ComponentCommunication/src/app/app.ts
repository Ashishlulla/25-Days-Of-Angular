import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee/employee';

@Component({
  imports: [RouterOutlet, Employee],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  employeeName: string= 'Ashish';
  selectedEmployee: string= '';

  onEmplyeeSelected(name:string): void{
    this.selectedEmployee = name;
  }
}
