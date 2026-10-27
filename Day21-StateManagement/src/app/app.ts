import { Component } from '@angular/core';
import { EmployeeService } from './Services/employee-service';
import { DashBoard } from './Components/dash-board/dash-board';


@Component({
  imports: [DashBoard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {

  constructor(public employeeService: EmployeeService){}

  addEmployee(){
    this.employeeService.addEmployee();
  }

  removeEmployee():void{
    this.employeeService.removeEmployee();
  }
}
