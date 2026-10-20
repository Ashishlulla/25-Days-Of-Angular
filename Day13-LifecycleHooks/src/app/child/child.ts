import { Component, OnDestroy} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-child',
  styleUrl: './child.css',
  templateUrl: './child.html',
})
export class Child implements OnDestroy {

  constructor(){
    console.log('child component created!');
  }

  ngOnDestroy(): void {
    console.log('child component destroyed!');
  }
}
