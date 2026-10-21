import { LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe, CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReverseTextPipe } from './reverse-text-pipe';

@Component({
  imports: [RouterOutlet, UpperCasePipe, LowerCasePipe, TitleCasePipe, DatePipe, CurrencyPipe, PercentPipe, ReverseTextPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  developerName: string = 'Ashish';
  message: string = "Welcome to Day 15 Pipes";
  title: string = "day15- angular pipes";
  today: Date = new Date();
  ammount: number = 500000;
  completion: number = 0.75;
  stringValue: string = 'Reverse Text Demonstration';
}
