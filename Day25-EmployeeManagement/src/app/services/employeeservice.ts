import { inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { employeeData } from '../data/employee-data';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Employeeservice {

  employees = signal<Employee[]>(employeeData);

  http = inject(HttpClient);
  apiUrl:string = 'https://localhost:7190/api/Employee';

  addEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  deleteEmployee(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`, {
    responseType: 'text'
  });
}

  getEmployeeById(id: number): Observable<Employee>{
    return  this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(updatedEmployee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}/${updatedEmployee.id}`, updatedEmployee)
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl);
  }

  LoadEmployees(){
    this.getEmployees().subscribe({
      next: (data) =>{
        this.employees.set(data); 
        console.log('Fetched employees:', data);}, 
      error: (error)=>{console.error('Error fetching employees:', error);}});
  }
}
