import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormArray,  Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  imports: [RouterOutlet, ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  employeeForm;
  successMessage: string = '';

  constructor(private fb: FormBuilder){
    this.employeeForm= this.fb.group({
      employeeName: ['',[Validators.required, Validators.minLength(3)]],
      employeeEmail: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      skills: this.fb.array([this.fb.control('',Validators.required)])
    });
  }

  onSubmit(): void{
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched();
      return;
    }

    console.log("Employee Details: ", this.employeeForm.getRawValue());

    this.successMessage = `Employee ${this.employeeForm.controls.employeeName.value} registered successFully`;
  }

  resetForm(): void {
  this.employeeForm.reset();
  this.skills.clear();
  this.skills.push(this.fb.control('',Validators.required));
  this.successMessage = '';
}

  get skills(): FormArray{
    return this.employeeForm.controls.skills as FormArray;
  }

  addSkill():void{
    this.skills.push(this.fb.control('',Validators.required));
  }

  removeSkill(index: number): void{
    this.skills.removeAt(index);
  }
}
