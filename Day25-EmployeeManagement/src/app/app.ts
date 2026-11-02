import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {employeeData} from './data/employee-data';
import { FormsModule } from '@angular/forms';
import {EmployeeForm} from './components/employee-form/employee-form';

@Component({
  imports: [RouterOutlet, FormsModule, EmployeeForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
  totalEmployees = 25;
  totalDepartments = 5;
  activeEmployees = 22;

  searchText: string = '';
  selectedStatus = 'All';

  employees = employeeData;

  get filteredEmployees() {
    const search = this.searchText.toLowerCase();
    
     return this.employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(search) || employee.email.toLowerCase().includes(search);
      
      const matchesStatus = this.selectedStatus === 'All' || (this.selectedStatus === 'Active' && employee.isActive) || (this.selectedStatus === 'Inactive' && !employee.isActive);
      
      return matchesSearch && matchesStatus;
    });
  }
}
