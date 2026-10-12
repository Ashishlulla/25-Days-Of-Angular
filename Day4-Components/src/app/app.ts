import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentCard } from './student-card/student-card';

@Component({
  imports: [RouterOutlet, StudentCard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Day4-Components');
  studentName: string= 'Ashish';
  enrolledCourse: string = 'Angular';
  studentId: number = 1;
}
