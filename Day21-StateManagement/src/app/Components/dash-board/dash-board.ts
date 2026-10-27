import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee-service';
@Component({
  imports: [],
  selector: 'app-dash-board',
  styleUrl: './dash-board.css',
  templateUrl: './dash-board.html',
})
export class DashBoard {
  constructor(public employeeService: EmployeeService){}
  
}
