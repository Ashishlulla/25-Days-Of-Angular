import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  name= input<string>();
  course= input<string>();
  studentId= input<number>();
}
