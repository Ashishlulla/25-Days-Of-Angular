import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  employeeCount= signal(10);

  addEmployee(): void{
    this.employeeCount.update(count=>count+1);
  }
  removeEmployee():void{
    this.employeeCount.update(count=>count-1);
  }
}
