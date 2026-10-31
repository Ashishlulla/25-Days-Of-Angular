import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  apiUrl: string = "http://localhost:5069/api/employees";

  constructor(private http: HttpClient){}

  getEmployees()
  {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee){
    return this.http.post<Employee>(this.apiUrl,employee)
  }

  updateEmployee(employee: Employee){
    return this.http.put<Employee>(this.apiUrl, employee);
  }

  deleteEmployee(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

}
