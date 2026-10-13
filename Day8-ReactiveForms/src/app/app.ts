import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  studentForm = new  FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    course: new FormControl('', Validators.required)    
  });
  
  submittedStudent: any = null;
  onSubmit(): void{

    if(this.studentForm.invalid){
        this.studentForm.markAllAsTouched();
        return;
    }

    this.submittedStudent = this.studentForm.value;
    console.log("Form Values: ", this.studentForm.value);
  }
}
