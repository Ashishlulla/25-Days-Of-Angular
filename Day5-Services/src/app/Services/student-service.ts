import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class StudentService {
  students = [
    { id: 1, name: 'Ashish', course: 'Angular' },
    { id: 2, name: 'Rahul', course: 'C#' },
    { id: 3, name: 'Priya', course: '.NET' },
  ];
}
