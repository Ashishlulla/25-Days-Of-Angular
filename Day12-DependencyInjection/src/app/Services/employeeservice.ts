import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employeeservice {
  employees: string[] = ['employee 1', 'employee 2', 'employee 3'];

  getEmployees(): string[]{
    return this.employees;
  }

  getEmployeeCount(): number{
    return this.employees.length;
  }

  addEmployee(name: string): void{
    this.employees.push(name);
  }

}
