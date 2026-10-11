import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  studentName: string = '';
  courseName : string  = 'Angular';
  learningDay: number = 2;

  count: number = 0;
  isDisabled: boolean = true;

  increaseCount(): void{
    this.count +=1;
  }

  decreaseCount(): void{
    this.count -= 1;
  }
}
