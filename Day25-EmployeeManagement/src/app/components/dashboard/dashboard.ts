import { Component, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {employeeData} from '../../data/employee-data';
import {RouterLink} from '@angular/router';
import {Employeeservice} from '../../services/employeeservice';

@Component({
  imports: [ FormsModule, RouterLink ],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})

export class Dashboard {

  constructor(private employeeService: Employeeservice){}

  totalEmployees = 25;
    totalDepartments = 5;
    activeEmployees = 22;
    searchText: string = '';
    selectedStatus = 'All';
  
    get employees() {
      return this.employeeService.employees();
    }
  
    get filteredEmployees() {
      const search = this.searchText.toLowerCase();
      
       return this.employees.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(search) || employee.email.toLowerCase().includes(search);
        
        const matchesStatus = this.selectedStatus === 'All' || (this.selectedStatus === 'Active' && employee.isActive) || (this.selectedStatus === 'Inactive' && !employee.isActive);
        
        return matchesSearch && matchesStatus;
      });
    }

    deleteEmployee(id: number) {

      if(!confirm('Are you sure you want to delete this employee?')) {
        return
      }
      this.employeeService.deleteEmployee(id);
    }
}
