import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { employeeData } from '../data/employee-data';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class Employeeservice {

  employees = signal<Employee[]>(employeeData);

  addEmployee(employee: Employee){
    this.employees.update(currentemp=>{
      const maxId = currentemp.length> 0 ?Math.max(...currentemp.map(e=>e.id)) :0;
      
      return [...currentemp, {...employee, id: maxId+1}];
    });
  }

  deleteEmployee(id: number){
    this.employees.update(currentemp=> currentemp.filter(e=>e.id !== id));
  }

  getEmployeeById(id: number): Employee | undefined{
    return this.employees().find(e=>e.id === id);
  }

  updateEmployee(updatedEmployee: Employee){
    this.employees.update(currentemp=>{
      return currentemp.map(e=> e.id === updatedEmployee.id ? updatedEmployee : e);
    }); 
  }
}
