import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Child } from './child/child';

@Component({
  imports: [RouterOutlet, Child ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit 
{
  message: string = '';
  count: number= 0;
  showMessage: boolean = true;
  showChild: boolean = true;

  ngOnInit(): void {
    this.message = "Component Intialized!";
    this.count = 10;
    console.log('ngOnInIt executed!');
    console.log('Intial Count: ', this.count)
  }

  hideMessage():void
  {
    this.showMessage= false;
  }

  toggleChild(): void{
    this.showChild = !this.showChild;
  }
}
