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
  email: string = '';
  department: string = '';

  registeredEmployee(){
    console.log("Employee Name: ", this.employeeName);
    console.log("Email: ",this.email);
    console.log("Department: ", this.department);

    console.log("Employee Registerd successfully...");
  }

  
  
  
}
