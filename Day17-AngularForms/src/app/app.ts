import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  employeeName: string = '';
  employeeEmail: string = '';
  department: string = '';
  successMessage: string = '';

  onSubmit():void{
    this.successMessage = `Employee ${this.employeeName} registered successfully!`;
    console.log('Employee Name: ', this.employeeName);
    console.log('Employee Email: ', this.employeeEmail);
    console.log('Department: ', this.department);
  }
}
