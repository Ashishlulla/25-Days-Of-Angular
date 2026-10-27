import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee/employee';

@Component({
  imports: [RouterOutlet, Employee],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {

  employeeName: string = 'Ashish';
  showEmployee: boolean = true;

  ngOnInit(): void {
    console.log("App Component Initialize !");
    console.log("LOding Employee Data...");
  }

  changeName(){
    this.employeeName = 'Rahul';
    console.log("Name changed successfully");
  }

  toggleEmployee(): void {
  this.showEmployee = !this.showEmployee;
}
}
