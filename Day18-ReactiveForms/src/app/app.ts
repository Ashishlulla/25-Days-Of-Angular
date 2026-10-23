import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [RouterOutlet, ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
  employeeForm = new FormGroup({
    employeeName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    employeeEmail: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', [Validators.required])
  });

  successMessage: string = '';

  onSubmit(): void{
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched();
      return;
    }
    
    const employee = this.employeeForm.getRawValue();

    console.log("Employee Details: ", employee);

    this.successMessage =` Employee ${employee.employeeName} registered Successfully!`;
  }

  resetForm(): void{
    this.employeeForm.reset();
    this.successMessage ='';
  }
}
