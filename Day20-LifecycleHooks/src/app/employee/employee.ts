import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-employee',
  styleUrl: './employee.css',
  templateUrl: './employee.html',
})
export class Employee implements OnChanges, OnDestroy {
   
  @Input() employeeName: string = '';

  ngOnChanges(changes: SimpleChanges): void{

    const nameChange = changes['employeeName'];

    if(nameChange){
      console.log("Previous:", nameChange.previousValue);
      console.log("Current: ", nameChange.currentValue);
      console.log("First Change: ", nameChange.firstChange);
    }

  }

  ngOnDestroy(): void {
    console.log('Employee component destroyed!');
  }
}

