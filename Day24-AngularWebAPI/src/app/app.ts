import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './Services/employee-service';
import { CommonModule } from '@angular/common';
import { Employee } from './models/employee';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, CommonModule, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App implements OnInit {
  
  constructor(private employeeService: EmployeeService){}
  employees: Employee[] =[];

  newEmployee: Employee ={id:0, name:'', dept:''};
  isEditing: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees():void{
    this.employeeService.getEmployees().subscribe({
      next: (data:Employee[])=>{
        this.employees = data;
        console.log("API DATA: ", data);
      }, 
      error: (error)=>{ console.error("Error Fethching employees", error); this.errorMessage = error;}})
  }

  addEmployee():void{
    const employee = {name:this.newEmployee?.name, dept: this.newEmployee?.dept} as Employee;

    this.employeeService.addEmployee(employee).subscribe({
      next: ()=>{

        this.resetForm();
        this.successMessage = `Employee ${this.newEmployee.name} added successfully !`;
        this.loadEmployees();
      }, 
      error: (error)=>{console.error("Failed to add employee !", error); this.errorMessage = error;}}); 
  }

  onEditEmployee(employee: Employee){
    this.isEditing = true;

    this.newEmployee = {id: employee.id, name: employee.name, dept: employee.dept};

  }

  updateEmployee(){

    this.employeeService.updateEmployee(this.newEmployee).subscribe({next: (response)=>{
      const index = this.employees.findIndex(e=>e.id === response.id);

      if(index !== -1){
        this.employees[index] = response;
        this.successMessage  = `Employee Updated successfully!`;
      }
      this.loadEmployees();
      this.resetForm()

    }, 
    error: (error)=>{console.error("Error Updating employee"); this.errorMessage = error;}});
  }
  
  deleteEmployee(id:number): void{

    if( !confirm("Are you sure you want to delete this employee")){
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next:()=>{
        console.log("Deleted employee with Id: ",id)
        this.employees = this.employees.filter(e=>e.id !== id);
        this.successMessage = "Employee deleted successfully!";
        this.loadEmployees();
      }, 
      error:(error)=>{console.error("Error deleting employee: ", error); this.errorMessage = error;}})
  }

  resetForm(){
    this.newEmployee = {
      id:0,
      name:'',
      dept:''
    }
    this.successMessage = '';
    this.errorMessage = '';
  }

}
