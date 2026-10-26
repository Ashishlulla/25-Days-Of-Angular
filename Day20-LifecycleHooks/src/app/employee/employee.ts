import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-employee',
  styleUrl: './employee.css',
  templateUrl: './employee.html',
})
export class Employee {
   
  @Input() employeeName: string = '';
}
