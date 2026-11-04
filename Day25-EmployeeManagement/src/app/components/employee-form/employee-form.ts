import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Employeeservice } from '../../services/employeeservice';
import { Employee } from '../../models/employee';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';



@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-employee-form',
  styleUrl: './employee-form.css',
  templateUrl: './employee-form.html',
})

export class EmployeeForm implements OnInit {
  
  private fb = new FormBuilder();


  constructor(private employeeService: Employeeservice, private router: Router, private activatedRoute: ActivatedRoute){}

  employeeForm = this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required, Validators.email]],
    department:['', [Validators.required]],
  });

  existingEmployee?: Employee;
   
  isEditMode: boolean = false;
  

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

    if (this.isEditMode) {
  const employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  newEmployee.id = employeeId;

  // Preserve the employee's existing status
  newEmployee.isActive =
    this.existingEmployee?.isActive ?? true;
        this.employeeService.updateEmployee(newEmployee);
  } else {
    this.employeeService.addEmployee(newEmployee).subscribe({
      next:(response)=>{
        console.log("Employee Added Successfully",response );
        this.router.navigate(['/dashboard']);
        this.employeeService.LoadEmployees();
      }, 
      error: (error)=>{
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Response:', error.error);}});
  };

    console.log("Submitted Data:", this.employeeForm.value);

    this.employeeForm.reset();
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    const employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if(!employeeId){
      this.isEditMode = false;
      return;
    } 
    this.isEditMode = true;

   this.employeeService.getEmployeeById(employeeId).subscribe({
    next:(employee)=>{
      this.existingEmployee = employee;
    this.employeeForm.patchValue({
      name: employee.name,
      department: employee.department,
      email: employee.email,
    })
   },
   error: (error)=>{
    console.error("Error fetching employee", error);
   }});
    
    
  }
}
