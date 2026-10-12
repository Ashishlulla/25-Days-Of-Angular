import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentService } from './Services/student-service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  

  students: { id: number; name: string; course: string; }[] | undefined;

  constructor(private studentService: StudentService){
    this.students= this.studentService.students;
  }
}
