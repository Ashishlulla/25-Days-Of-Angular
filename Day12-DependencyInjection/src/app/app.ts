import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employeeservice } from './Services/employeeservice';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
  constructor(private employeeService: Employeeservice){}

  employees: string[]=[];

  newEmployee: string = '';


  getEmployees(): string[]{
    this.employees =  this.employeeService.getEmployees();
    return this.employees;
  }

  getEmployeeCount(): number{
    return this.employeeService.getEmployeeCount();
  }

  addEmployee(name: string): void{
    if(name.trim() === '')
      {
        return;
      }

      this.employeeService.addEmployee(name);
      this.employees = this.employeeService.getEmployees();
      this.newEmployee = '';
  }



}
