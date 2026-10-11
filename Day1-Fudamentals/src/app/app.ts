import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
   title = 'Learning Angular';
   course = 'Angular';
   day = 1;
   count = 0;

   isDisabled = false;
   buttonText = "cick me!!!";

   increaseCount(): void{
    this.count = this.count+1;
   }
}
