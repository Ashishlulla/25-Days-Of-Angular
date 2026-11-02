import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Employeeservice } from '../../services/employeeservice';
import { Employee } from '../../models/employee';
import {Router} from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-employee-form',
  styleUrl: './employee-form.css',
  templateUrl: './employee-form.html',
})

export class EmployeeForm {
  
  private fb = new FormBuilder();


  constructor(private employeeService: Employeeservice, private router: Router){}

  employeeForm = this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required, Validators.email]],
    department:['', [Validators.required]],
  });
   
  

  onSubmit(){
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched();
      return;
    }

    const newEmployee: Employee = {
      id: 0, 
      name: this.employeeForm.value.name!,
      email: this.employeeForm.value.email!,
      isActive: true,
      department: this.employeeForm.value.department!,
    };

    this.employeeService.addEmployee(newEmployee);

    console.log("Submitted Data:", this.employeeForm.value);

    this.employeeForm.reset();
    this.router.navigate(['/dashboard']);
  }
}
