import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-employee',
  styleUrl: './employee.css',
  templateUrl: './employee.html',
})
export class Employee {
  @Input() name: string='';
  @Output() employeeSelected= new EventEmitter<string>();

  selectEmployee(): void{
    this.employeeSelected.emit(this.name);
  }
}
